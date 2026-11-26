#!/usr/bin/env node
/**
 * Tells the search engines about the site after a deployment.
 *
 *  1. (before the deploy) --changed-out: compares each page of the fresh build
 *     with the live one and lists the URLs that changed, appeared or vanished;
 *  2. (option) waits until production serves the new sitemaps and pages;
 *  3. checks that every URL in the sitemaps answers 200: a sitemap pointing at
 *     404s or redirects is worse than no sitemap;
 *  4. Google: Search Console API `sitemaps.submit` on the sitemap index (the old
 *     google.com/ping?sitemap= endpoint was retired in 2023, the API is the only
 *     way left to signal a resubmission);
 *  5. Bing, Yandex, Naver, Seznam: IndexNow, with the changed URLs only (or all
 *     of them with --indexnow-all).
 *
 * No npm dependency: native fetch, and crypto to sign the service-account JWT.
 *
 * Usage:
 *   node scripts/submit-sitemap.js                        # verify and submit now
 *   node scripts/submit-sitemap.js --changed-out=f.json   # list pages that differ from the live site
 *   node scripts/submit-sitemap.js --changed=f.json       # URLs to push to IndexNow
 *   node scripts/submit-sitemap.js --indexnow-all         # push every sitemap URL to IndexNow
 *   node scripts/submit-sitemap.js --wait-for-prod        # wait until the deploy is live
 *   node scripts/submit-sitemap.js --remote               # read the live sitemaps, not dist/
 *   node scripts/submit-sitemap.js --dry-run              # call no API
 *   node scripts/submit-sitemap.js --verify-only          # check the URLs, submit nothing
 *   node scripts/submit-sitemap.js --check-auth           # check the Search Console rights
 *
 * Credentials (environment variables, in this order):
 *   GSC_SERVICE_ACCOUNT_JSON  service account added as a user of the property
 *   GSC_CLIENT_ID / GSC_CLIENT_SECRET / GSC_REFRESH_TOKEN
 *                             OAuth "installed app" with the webmasters (write) scope
 *   locally, as a fallback: emoubarak.github.io-secrets/gsc/token.json (gitignored)
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const GSC_SECRETS = path.join(ROOT, 'emoubarak.github.io-secrets', 'gsc');
const ORIGIN = 'https://moubarak.dev';
const SITEMAP_URL = `${ORIGIN}/sitemap-index.xml`;
const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:moubarak.dev';
const SCOPE = 'https://www.googleapis.com/auth/webmasters';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const flag = name => args.includes(name);
const option = name => (args.find(a => a.startsWith(`${name}=`)) || '').slice(name.length + 1);
const DRY_RUN = flag('--dry-run');
const CHECK_AUTH = flag('--check-auth');
const WAIT_FOR_PROD = flag('--wait-for-prod');
const VERIFY_ONLY = flag('--verify-only');
const SKIP_VERIFY = flag('--skip-verify');
const REMOTE = flag('--remote');
const INDEXNOW_ALL = flag('--indexnow-all');
const CHANGED_FILE = option('--changed');
const CHANGED_OUT = option('--changed-out');
const WAIT_TIMEOUT_MS = Number(process.env.SITEMAP_WAIT_TIMEOUT_MS || 10 * 60 * 1000);
const WAIT_INTERVAL_MS = Number(process.env.SITEMAP_WAIT_INTERVAL_MS || 20 * 1000);

const sleep = ms => new Promise(r => setTimeout(r, ms));
const locs = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

/**
 * GitHub Pages sits behind a CDN that caches pages and 404s (max-age=600): a
 * unique query string skips its cache. 15 s timeout: a stalled site must not
 * hold the build job, and the deploy behind it.
 */
async function fetchLive(url, init = {}) {
  const u = new URL(url);
  u.searchParams.set('nocache', `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  return fetch(u, {
    signal: AbortSignal.timeout(15000),
    ...init,
    headers: { 'Cache-Control': 'no-cache', ...(init.headers || {}) },
  });
}

/* ----------------------------------------------------------- the build --- */

/** Where a URL of the site lives in dist/ (directory format: /blog/x/ -> blog/x/index.html). */
function distFile(url) {
  let p = decodeURIComponent(new URL(url).pathname);
  if (p.endsWith('/')) p += 'index.html';
  else if (!path.extname(p)) p += '/index.html';
  return path.join(DIST, p);
}

/**
 * The sitemap index and its child sitemaps, read from dist/ (or from production
 * with --remote), with the page URLs they list.
 */
async function loadSitemaps({ remote = REMOTE } = {}) {
  const read = async url => {
    if (!remote) return fs.readFileSync(distFile(url), 'utf8');
    const res = await fetchLive(url);
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return res.text();
  };
  const files = [{ url: SITEMAP_URL, xml: await read(SITEMAP_URL) }];
  for (const url of locs(files[0].xml)) files.push({ url, xml: await read(url) });
  return { files, pages: files.slice(1).flatMap(f => locs(f.xml)) };
}

/** Astro fingerprints its assets (/_astro/x.<hash>.css): a CSS edit alone is not new content. */
const normalizePage = html => html.replace(/\/_astro\/[^"'\s)>]+/g, '/_astro/*').replace(/\s+/g, ' ').trim();
const normalizeXml = xml => xml.replace(/\s+/g, ' ').trim();

/* --------------------------------------------- what changed (pre-deploy) --- */

/**
 * Run between the build and the deploy: production still serves the previous
 * version, so a page whose HTML differs from the live one is a changed page.
 * Pages that left the sitemap are listed too: IndexNow takes deleted URLs.
 */
async function listChanged(outFile) {
  const { pages } = await loadSitemaps({ remote: false });
  let livePages = [];
  try {
    livePages = (await loadSitemaps({ remote: true })).pages;
  } catch (err) {
    console.warn(`⚠️  Live sitemap unreadable (${err.message}): removed pages not listed.`);
  }

  const changed = [];
  const queue = [...pages];
  const worker = async () => {
    for (let url = queue.shift(); url; url = queue.shift()) {
      const local = normalizePage(fs.readFileSync(distFile(url), 'utf8'));
      try {
        const res = await fetchLive(url);
        if (!res.ok || normalizePage(await res.text()) !== local) changed.push(url);
      } catch {
        changed.push(url);
      }
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));

  const removed = livePages.filter(u => !pages.includes(u));
  changed.sort();
  fs.writeFileSync(outFile, JSON.stringify({ changed, removed }, null, 2) + '\n');
  console.log(`📝 ${changed.length} changed page(s), ${removed.length} removed, out of ${pages.length}:`);
  [...changed, ...removed.map(u => `${u} (removed)`)].forEach(u => console.log(`   - ${u}`));
}

/* ----------------------------------------------------- wait for the deploy --- */

/** Production is up to date once it serves our sitemaps and our version of the changed pages. */
async function waitForProd(changed) {
  const { files } = await loadSitemaps({ remote: false });
  const expected = [
    ...files.map(f => ({ url: f.url, body: normalizeXml(f.xml), norm: normalizeXml })),
    ...changed
      .filter(url => fs.existsSync(distFile(url)))
      .map(url => ({ url, body: normalizePage(fs.readFileSync(distFile(url), 'utf8')), norm: normalizePage })),
  ];
  const deadline = Date.now() + WAIT_TIMEOUT_MS;

  console.log(`⏳ Waiting for production to serve ${expected.length} updated file(s)...`);
  for (let attempt = 1; ; attempt++) {
    const stale = [];
    for (const { url, body, norm } of expected) {
      try {
        const res = await fetchLive(url);
        if (!res.ok || norm(await res.text()) !== body) stale.push(`${url} (HTTP ${res.status})`);
      } catch (err) {
        stale.push(`${url} (${err.message})`);
      }
    }
    if (!stale.length) {
      console.log(`✅ Production serves the new version (attempt ${attempt})`);
      return true;
    }
    console.log(`   ... ${stale.length} file(s) not live yet, attempt ${attempt}: ${stale[0]}`);
    if (Date.now() + WAIT_INTERVAL_MS > deadline) {
      // deploy-pages has already confirmed the deployment: the likely cause is a
      // newer deploy that replaced this build. Submitting is still right.
      console.warn('⚠️  Timeout: production does not serve this exact build, submitting anyway.');
      return true;
    }
    await sleep(WAIT_INTERVAL_MS);
  }
}

/* ---------------------------------------------------------- URL guard --- */

/**
 * Every sitemap URL must answer 200 itself: a redirect counts as an error, the
 * sitemap must list the final canonical URL, not a hop.
 */
async function verifyUrls(urls) {
  console.log(`🔎 Checking the ${urls.length} sitemap URLs...`);
  const failures = [];
  const queue = [...urls];
  const worker = async () => {
    for (let url = queue.shift(); url; url = queue.shift()) {
      let status;
      try {
        let res = await fetchLive(url, { method: 'HEAD', redirect: 'manual' });
        if (res.status === 405 || res.status === 501) res = await fetchLive(url, { redirect: 'manual' });
        status = res.status;
      } catch (err) {
        failures.push(`${url}: ${err.message}`);
        continue;
      }
      if (status !== 200) failures.push(`${url}: HTTP ${status}`);
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));

  if (failures.length) {
    console.error(`❌ ${failures.length} invalid URL(s), submission cancelled:`);
    failures.forEach(f => console.error(`   - ${f}`));
    return false;
  }
  console.log('✅ Every URL answers 200');
  return true;
}

/* --------------------------------------------------------- Google auth --- */

const b64url = buf =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function postToken(uri, params) {
  const res = await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`token exchange refused (HTTP ${res.status}): ${body}`);
  const json = JSON.parse(body);
  if (!json.access_token) throw new Error(`response without access_token: ${body}`);
  return json.access_token;
}

async function tokenFromServiceAccount(sa) {
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: tokenUri, iat: now, exp: now + 3600 }));
  const signature = b64url(crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(sa.private_key));
  return postToken(tokenUri, {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: `${header}.${claims}.${signature}`,
  });
}

const tokenFromRefreshToken = ({ clientId, clientSecret, refreshToken }) =>
  postToken('https://oauth2.googleapis.com/token', {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

/** An access token, or null when no credential is available. */
async function googleAccessToken() {
  const env = process.env;
  if (env.GSC_SERVICE_ACCOUNT_JSON) return tokenFromServiceAccount(JSON.parse(env.GSC_SERVICE_ACCOUNT_JSON));
  if (env.GSC_CLIENT_ID && env.GSC_CLIENT_SECRET && env.GSC_REFRESH_TOKEN) {
    return tokenFromRefreshToken({
      clientId: env.GSC_CLIENT_ID,
      clientSecret: env.GSC_CLIENT_SECRET,
      refreshToken: env.GSC_REFRESH_TOKEN,
    });
  }
  const tokenPath = path.join(GSC_SECRETS, 'token.json');
  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    if (token.refresh_token) {
      return tokenFromRefreshToken({
        clientId: token.client_id,
        clientSecret: token.client_secret,
        refreshToken: token.refresh_token,
      });
    }
  }
  return null;
}

/**
 * Checks that the credentials can write to the property: what breaks first is a
 * token limited to the readonly scope, or an account that is not a user of it.
 */
async function checkAuth() {
  const accessToken = await googleAccessToken();
  if (!accessToken) {
    console.error('❌ No Google credential available.');
    return false;
  }
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`❌ Property list refused (HTTP ${res.status}): ${body}`);
    return false;
  }
  const entry = (JSON.parse(body).siteEntry || []).find(s => s.siteUrl === SITE_URL);
  if (!entry) {
    console.error(`❌ ${SITE_URL} is not reachable with these credentials.`);
    return false;
  }
  // siteOwner and siteFullUser can submit a sitemap, siteRestrictedUser cannot.
  const canWrite = ['siteOwner', 'siteFullUser'].includes(entry.permissionLevel);
  console.log(`${canWrite ? '✅' : '❌'} ${SITE_URL}: permission ${entry.permissionLevel}`);

  // The permission level says nothing about the token scope: a readonly token
  // lists the properties but gets its PUT refused.
  const info = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(accessToken)}`);
  if (!info.ok) return canWrite;
  const hasWriteScope = (JSON.parse(await info.text()).scope || '').split(' ').includes(SCOPE);
  console.log(`${hasWriteScope ? '✅' : '❌'} scope ${SCOPE}${hasWriteScope ? '' : ' missing (readonly token)'}`);
  return canWrite && hasWriteScope;
}

/* -------------------------------------------------- Search Console submit --- */

async function submitToGoogle() {
  let accessToken;
  try {
    accessToken = await googleAccessToken();
  } catch (err) {
    console.error(`❌ Google: authentication failed: ${err.message}`);
    return false;
  }
  if (!accessToken) {
    console.warn('⚠️  Google skipped: no credential (GSC_SERVICE_ACCOUNT_JSON or GSC_CLIENT_ID/SECRET/REFRESH_TOKEN).');
    return null;
  }

  const url =
    'https://www.googleapis.com/webmasters/v3/sites/' +
    `${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  if (DRY_RUN) {
    console.log(`🔎 [dry-run] PUT ${url}`);
    return true;
  }

  const res = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) {
    console.error(`❌ Google Search Console: HTTP ${res.status}: ${await res.text()}`);
    if (res.status === 403) console.error(`   The account cannot write to ${SITE_URL} (scope needed: ${SCOPE}).`);
    return false;
  }
  console.log(`✅ Google Search Console: ${SITEMAP_URL} submitted to ${SITE_URL}`);

  // Read back what Search Console now records for this sitemap.
  const got = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (got.ok) {
    const s = await got.json();
    console.log(`   lastSubmitted ${s.lastSubmitted}, lastDownloaded ${s.lastDownloaded || 'not yet'}, ` +
      `index ${Boolean(s.isSitemapsIndex)}, errors ${s.errors ?? 0}, warnings ${s.warnings ?? 0}`);
  }
  return true;
}

/* ------------------------------------------------------- IndexNow submit --- */

/** The IndexNow key is the name of the <key>.txt file published at the site root (public/). */
function indexNowKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const file = fs.readdirSync(PUBLIC).find(f => /^[0-9a-f]{8,128}\.txt$/i.test(f));
  return file ? path.basename(file, '.txt') : null;
}

async function submitToIndexNow(urls) {
  if (!urls.length) {
    console.log('ℹ️  IndexNow skipped: no changed URL.');
    return null;
  }
  const key = indexNowKey();
  if (!key) {
    console.warn('⚠️  IndexNow skipped: no <key>.txt file in public/.');
    return null;
  }
  const payload = {
    host: new URL(ORIGIN).host,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList: urls.slice(0, 10000),
  };
  if (DRY_RUN) {
    console.log(`🔎 [dry-run] POST ${INDEXNOW_ENDPOINT}: ${payload.urlList.length} URL(s)`);
    return true;
  }
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  // 200 = accepted, 202 = accepted while the key is being validated.
  if (res.ok) {
    console.log(`✅ IndexNow: ${payload.urlList.length} URL(s) submitted (HTTP ${res.status})`);
    return true;
  }
  console.error(`❌ IndexNow: HTTP ${res.status}: ${await res.text()}`);
  return false;
}

/* ----------------------------------------------------------------- main --- */

/** The URLs to announce, or null when the list was asked for but is missing. */
function readChanged() {
  if (!CHANGED_FILE) return [];
  if (!fs.existsSync(CHANGED_FILE)) {
    console.warn(`⚠️  ${CHANGED_FILE} not found (the diff step failed?): IndexNow gets every URL.`);
    return null;
  }
  const { changed = [], removed = [] } = JSON.parse(fs.readFileSync(CHANGED_FILE, 'utf8'));
  return [...changed, ...removed];
}

async function main() {
  if (CHECK_AUTH) process.exit((await checkAuth()) ? 0 : 1);

  if (!REMOTE && !fs.existsSync(path.join(DIST, 'sitemap-index.xml'))) {
    console.error('❌ dist/sitemap-index.xml not found: run npm run build first (or pass --remote).');
    process.exit(1);
  }

  if (CHANGED_OUT) {
    await listChanged(CHANGED_OUT);
    return;
  }

  const { pages } = await loadSitemaps();
  const listed = readChanged();
  const changed = listed || [];
  const indexNowUrls = INDEXNOW_ALL || !listed ? pages : changed;
  console.log(`📄 ${SITEMAP_URL}: ${pages.length} URL(s), ${indexNowUrls.length} to push to IndexNow.`);

  if (WAIT_FOR_PROD && !REMOTE && !DRY_RUN && !(await waitForProd(changed))) process.exit(1);
  if (!SKIP_VERIFY && !DRY_RUN && !(await verifyUrls(pages))) process.exit(1);
  if (VERIFY_ONLY) return;

  const results = [await submitToGoogle(), await submitToIndexNow(indexNowUrls)];
  // null = skipped on purpose (no credential, nothing to send): not a failure.
  if (results.some(r => r === false)) process.exit(1);
}

main().catch(err => {
  console.error(`❌ ${err.stack || err.message}`);
  process.exit(1);
});
