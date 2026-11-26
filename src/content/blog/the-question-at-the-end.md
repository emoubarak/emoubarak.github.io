---
title: "The Question I Told the Model to Ask: Nine Days of Approving AI-Drafted Replies"
description: "Local models draft replies to comments on three of my projects, and nothing goes out until I approve it. Nine days of data showed that the habit I blamed on the model came from my own instructions, and that my approval had let it through. What changed, and the replay that measured it."
pubDate: 2026-11-26
tags: ["AI", "Workflow"]
cover: "/blog/the-question-at-the-end.webp"
coverAlt: "A phone on a desk showing a speech bubble that ends in a large orange question mark, a hand holding scissors about to cut the question mark off, and a small stack of approved bubbles with check marks beside it."
tldr:
  - "A model drafts each reply, I approve or reject it, and code enforces what can be checked without judgment: links, length, duplicates, and since this week, no closing question unless the model filed the reply under the question track."
  - "From 18 to 26 November: 93 drafts, 67 replies sent, 24 rejected. 40 drafts ended with a question, and I approved 17 questions I should have cut."
  - "The question came from my own voice line. Rewriting it was enough: a replay of the same comments went from 32 closing questions out of 50 to two, both where the model chose to ask. A rule in code is the backstop."
---

Four of my projects get comments and messages on TikTok, YouTube, Facebook and Instagram. Nearly all of them go to three: a psychology channel in French, its English version, and a client in B2B services. Replying matters, the replies are short, and there are a lot of them, so local models running on my own GPU write the first draft, with a Claude model as fallback.

They only write the draft. Every reply waits in a page called To review until I approve it, edit it or reject it. I described where that page sits in [My One-Person IT Department](/blog/one-person-it-department). After nine days I went through every draft, expecting to write about a quirk of the model.

## The loop

1. **Reading.** A few times a day, code collects new comments and messages. No model reads them at this step.
2. **Drafting.** Shortly after, a model drafts a reply for each one worth answering. It has no tools: it receives the comment, the post it was left under, the account's voice and rules, and returns text.
3. **Checking.** Code inspects each draft before I see it.
4. **Approving.** I read the exchange as chat bubbles and tap Approve, Like only, Reject or Stop conversation.
5. **Sending.** A sender posts only what I approved, one reply at a time, and checks each one afterwards.

[![The To review page with sample data: four drafts, each shown as a short conversation. On the left the comment ("This one hit home."), on the right the drafted reply ("Glad it landed. What part of it resonated most?"), with Approve, Like only, Reject and Stop conversation buttons and a character counter such as "121 / 150 characters".](/blog/the-question-at-the-end/to-review.webp)](/blog/the-question-at-the-end/to-review.webp)

The capture uses invented accounts and comments. Two of the drafts in it are real ones, the others are close to real.

## What code checks

Comments are text written by strangers, so the rules that matter run in code, whatever the model does:

- **Links and phone numbers** outside the account's allowed list: a link in a comment is removed, and any other link or full-length number gets the draft discarded. On the psychology accounts, a sentence giving a helpline or emergency number is removed too: we don't judge how serious someone's situation is, and the numbers are on the website.
- **Length**: each account has a limit (150 characters for a TikTok reply), and since 26 November Approve is refused above it on TikTok.
- **Duplicates**: a comment the same person posts twice gets only one reply.
- **Sending**: the sender reads the text back from the reply box before the final click, then looks for the reply on the page. A reply it cannot confirm is marked "to check" and never resent on its own.

## Nine days, 93 drafts

| From 18 to 26 November | Drafts |
|---|---|
| Approved as written and sent | 61 |
| Edited, then sent | 6 |
| "Like only", no reply | 2 |
| Rejected | 24 |

## The question at the end

40 of the 93 drafts ended with a question. "What part of it resonated most?" "What helped you get through it?" 14 of the 24 rejected drafts were among them. I was ready to call it the model's habit.

Then I counted by account. 35 of the 40 came from the psychology accounts, 35 of their 61 drafts. On the client's account: 5 out of 30. All three local models did it. The cause sat in my own configuration: the voice line of the psychology accounts said "warm, a little mischievous, ask a short question back". The models followed it.

The worse part is what I approved. 21 of the 67 replies that went out end with a question. Four ask for something the next message needs, such as the details of a request. The other 17 are the kind I thought I was cutting. The model itself had labelled 12 of those comments as testimonies, several from people describing a partner or a parent who had hurt them. One person described the moment they walked out on an abusive husband. The draft asked them how leaving had felt, and I approved it.

My tap was meant to cover tone. On a busy evening it covered the obvious and missed the rest.

## Moving the rule into code

One rule had already moved. On 19 November I rejected two drafts that asked yet another question of someone replying to our reply. Two minutes later, a function stripped every question from replies to someone answering us. Those never came back.

The same fix now covers the rest:

- **The voice line and the rules** describe what I actually want on these accounts, attentive listening: reflect what the person lived through in their words, then stop. Misogynist or racist comments get no reply.
- **A track per reply.** The model picks one and writes it next to the draft: a plain reply, a reply with a question, the account's quiz for someone doubting themselves or a partner, a book recommendation for someone who wants to understand more, a pointer to the help resources on the website for someone still in it, or an invitation to share their story for a future episode. One track per reply, and the plain reply stays the most common.
- **Code removes any question** from a reply the model labels a testimony or files outside the question track. It would have caught 12 of the 17 questions I sent.

Then I replayed the 50 first-level comments those accounts had drafts for, through the new instructions:

| Same 50 comments | Closing question |
|---|---|
| Drafts from 18 to 26 November | 32 of 50 |
| Replay with the new instructions | 2 of 49, both on the question track |

The model judged one comment not worth a reply, the misogynist one. It picked the plain reply 38 times, the quiz 5 times, the story invitation 3 times and the question twice. In this replay the code had nothing to remove: the new voice line had already done the work. The code is there for the day the model ignores it.

The replay also showed which model to use. That evening the larger local model had been unloaded for lack of memory, and the small fallback opened 14 of 24 French TikTok replies with the same "Yes,". Claude Haiku on the same comments did it once and also picked the help and story tracks, so drafts now skip the small model.

## When the sender stops

16 approved replies hit a stop at least once, across 29 attempts. The sender could not find the comment or the button, the reply box opened under another comment, the person had written again since the draft, or our message was already the last one in the conversation. 15 of those replies went out later, most within fifteen minutes. One was dropped because the conversation had moved on. None went to the wrong place.

Two of those stops were mine, and so was a third refusal. I approved three drafts the page had flagged as too long. On 23 November the sender refused the first two because the text in the box no longer matched the approved text. Minutes later it learned to refuse an over-long text before opening the browser, and the third, two days later, was refused that way at every pass and never went out. That is why Approve now refuses anything over the limit.

## What I take from it

The count by account found the cause, and the replay showed that rewriting one line fixed most of it. When a model keeps doing something, read your own instructions first. When an approval keeps missing something, move that check into code and keep the approval for what code cannot judge. The general version of that rule, deciding what an agent needs before you leave it alone, is in [Lazy by Design](/blog/lazy-by-design).
