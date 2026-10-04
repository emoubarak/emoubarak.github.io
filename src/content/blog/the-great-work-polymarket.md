---
title: "The Great Work: I Tried to Turn Bitcoin Coin Flips into Gold"
description: "I named my trading bots after mystics and alchemists, pointed them at Polymarket's five-minute Bitcoin markets, and spent June watching every edge turn back into lead. A field report on the efficient market, in five alchemical stages."
pubDate: 2026-07-15
tags: ["Satire", "Engineering", "Research"]
cover: "/blog/the-great-work-polymarket.webp"
coverAlt: "A bearded alchemist at his bench, a laptop chart beside him: an orange coin flips above the flask and comes out as grey lead."
tldr:
  - "Every edge I found on Polymarket's Bitcoin Up or Down markets was an artifact: stale data, a cherry-picked cell, or momentum that only works when Bitcoin trends."
  - "The favorite won 84.5% of the time when its price said 84.2%. That is what an efficient market looks like up close."
  - "The money I found was not in predicting the flip. It was in the fees the exchange shares with whoever provides liquidity."
---

Look, let's be real. I am a software developer with no background in finance, and in June I decided to beat a market.

Not any market. Polymarket's "Bitcoin Up or Down": every five or fifteen minutes, a binary bet on whether BTC closes above where it opened. Up trades at 51¢, Down at 49¢, the window closes, the oracle speaks, repeat forever. It looked like a coin flip with a price tag, and I had the arrogance of a man who has written a lot of unit tests.

So I did what any serious quantitative researcher does. I named my bots after mystics.

The first generation was esoteric: **gurdjieff**, **iching**, **kabbalah**, **tao**, **hermetic**. When they died, the second generation was alchemical: **rubedo**, **citrinitas**, **albedo**, **coniunctio**, **fixatio**, **aurum**, **lapis**, **coagula**. In hindsight, the naming was the most accurate part of the project. Alchemy is the ancient discipline of believing very hard that lead is about to become gold.

Here is how the Great Work went.

---

## 1. Nigredo: The Blackening

> *"Five brains, live paper trading, real order books. What could go wrong?"*

Nigredo is the stage where everything rots. Mine took a few days.

gurdjieff and iching bet on direction with a diffusion model. kabbalah bought the favorite whenever the model agreed. tao traded the trend as a maker. hermetic quoted both sides like a respectable market maker. Every one of them was negative or an artifact.

hermetic deserves a special mention. Delta-neutral market making sounds like free money until you meet **adverse selection**: your passive order gets filled exactly when someone faster knows you are wrong. You are not providing liquidity. You are providing exit liquidity, with a smile.

## 2. Albedo: The Purification

> *"The model sees the future. Let's backtest it to be sure."*

Albedo is the washing. My backtest washed me.

I rebuilt a full retroactive harness over the market's history and Binance prices, and the directional edge was gorgeous. It was also a **lookahead artifact**. The market's price history is sampled about once a minute, with a median staleness of **56 seconds**. My "fresh" Binance price was comparing itself to a quote from a minute ago. I wasn't predicting Bitcoin. I was reading next minute's newspaper and congratulating myself on my instincts.

Second purification, same week: the market doesn't even settle on Binance. It settles on the **Chainlink oracle**. I had been carefully optimising against the wrong referee.

(There was also a bot actually called albedo. It was rejected out of sample. Even the name couldn't save it.)

## 3. Citrinitas: The Yellowing

> *"Plus five percent per dollar, positive four days out of five. We're rich."*

Citrinitas is the dawn, the first gleam of gold. Mine gleamed for about 28 hours.

The second research wave found it: three minutes before the end of a window, buy the favorite that is already extreme, skip the volatile windows. The writeup said **+5% per dollar, positive four days out of five**. I deployed it as **coagula**, the alchemists' word for the moment the work finally solidifies.

97 live trades later: it won **84.5%** of the time. Break-even, after fees, was **85.2%**. I was paying 84.2¢ for a favorite that won 84.5% of the time. The market had priced it to within a third of a point. Zero mispricing.

The autopsy found two stacked cherry-picks. The "+5%" came from a single cell of the grid, the one with zero execution cost; the same script in a realistic configuration printed **−$10 a day**, positive on one day in six. And the edge itself was momentum in disguise: the favorite only beats its price when Bitcoin trends, and the four "positive days" were trending days.

The lesson, carved into the research journal in capitals: **"positive N days out of N, in-sample" is worth nothing.** Report the realistic configuration, never the best cell.

## 4. Rubedo: The Reddening

> *"Fine. No predictions. Just the bare favorite, held to settlement."*

Rubedo is completion, the red stone. Mine was the bare 15-minute favorite, plus a price-lead floor normalised by volatility. It became the **zlead** family, and it is the one thing that kept surviving out-of-sample tests.

Its net edge after fees: about zero.

Meanwhile I falsified everything else that sounded clever. The tie rule: a coin flip, near-ties resolve 50/50. Betting on reversion after the last window: dead, and the fee is at its maximum exactly at 50¢, where the tiny skew lives. Risk-free arbitrage, buying Up and Down for less than a dollar: in 147 snapshots the books dipped to 0.99 once, which after fees is 1.0012. The HFT bots keep it tight. They have been doing this longer than my bots have had names.

## 5. Lapis: The Philosopher's Stone (Someone Else's)

> *"Somebody is making money here. Let's find out who."*

So I stopped trying to predict and started reading other people's wallets on-chain. One was up about $80k. Its secret was not a model.

It was **maker rebates**. On these markets, the exchange hands a share of the taker fees back to whoever provides liquidity. The gold was never in calling the flip. It was in being the counterparty the exchange pays to exist. The philosopher's stone was real. It just wasn't mine, and it wasn't magic: it was fee accounting.

---

### The Low-Level Truth

The market is efficient. Not "efficient, sort of, until a clever developer shows up". Efficient in five independent ways I tried to break, with no arbitrage left on the table.

What did I actually transmute? My ego, into a method:

- **A raw measurement beats a derived field.** Read the transaction receipt, not the API summary.
- **Out of sample, or it didn't happen.**
- **When the data contradicts a strategy you like, the strategy dies.** Even if it's called coagula and you were very proud of the name.
- **"There is nothing here" is a result.** It's the most common one, and almost nobody publishes it.

The code and the dated research journal: [polymarket-updown-lab](https://github.com/emoubarak/polymarket-updown-lab).

**Lead remains lead, homie. But now it's measured lead.**
