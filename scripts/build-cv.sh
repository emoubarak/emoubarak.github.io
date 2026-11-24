#!/usr/bin/env bash
# Compile public/en.tex and public/fr.tex with pdfLaTeX into public/cv-en.pdf and public/cv-fr.pdf.
# Build happens in a temp dir so no .aux/.log/.out lands in the repo.
# Fedora: sudo dnf install texlive-scheme-basic texlive-collection-latex texlive-collection-latexrecommended \
#   texlive-collection-fontsrecommended texlive-sourcesanspro texlive-fontawesome5 texlive-microtype texlive-titlesec \
#   texlive-enumitem texlive-needspace texlive-pgf texlive-accsupp texlive-ly1 texlive-babel-french \
#   texlive-hyphen-french texlive-hyphen-english texlive-cm-super qpdf
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
for l in en fr; do
  cp "$root/public/$l.tex" "$work/"
  # 3 passes: hyperref bookmarks and tikz overlay need them
  for _ in 1 2 3; do (cd "$work" && pdflatex -interaction=nonstopmode -halt-on-error "$l.tex" >"$l.build" 2>&1) || { tail -30 "$work/$l.build"; exit 1; }; done
  cp "$work/$l.pdf" "$root/public/cv-$l.pdf"
done
