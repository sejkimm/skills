---
name: create-structured-note
description: Structure arbitrary content into a clean Obsidian-ready Markdown note in a bullet-first 개조식 style. Use this skill whenever the user asks to "정리해줘", "노트로 정리", "note 형태로", "structure this as a note", "make this into notes", "마크다운 노트로", "summarize as notes", "요약해줘", "정리해서 보여줘", or any variation that asks for content to be reorganized into a readable note. Also trigger when the user pastes raw text, links to an article, references an uploaded document, or asks for the current session content to be summarized in note form. The skill produces a top-of-note executive summary as a small bullet list, followed by topic sections that are themselves bullet-first, with nested bullets up to two levels, links preserved inline, and Korean text in 개조식 noun-ending form. Tables are used for matrix-shaped data such as comparisons and action items. Returns Markdown inline as the response, not as a saved file.
---

# Structured Note

Turn arbitrary content into an Obsidian-friendly Markdown note. The user copies the response into Obsidian themselves, so the deliverable is the Markdown text in chat, not a saved file.

## Bundled references

- `references/style-guide.md` — full Korean and English tone rules with worked examples for 개조식 forms, prose register, em dash and parenthesis handling, technical term policy, links, and faithfulness. Read whenever a tone judgment is non-obvious.
- `references/worked-examples.md` — two complete worked examples, one Korean technical article and one English meeting transcript. Read when you need to see how the rules combine on a real source.

## What the user wants

The user is collecting notes for later re-reading and synthesis. The pattern they prefer has two distinct levels.

- A short executive summary at the top of the note, four to seven bullets, that captures the source's main moves in compact form.
- Topic sections below, each headed by `##`, with their own bullet lists that go into more detail. Nested bullets up to two levels are used freely.

Bullets are the default unit. Prose paragraphs are rare. Tables are used whenever the data is matrix-shaped.

The output is a Markdown block returned inline. Do not save a file.

## Required note structure

```
# [Title of the note]

## 요약
- [executive bullet 1]
- [executive bullet 2]
- [executive bullet 3]
- [executive bullet 4]
- [executive bullet 5]

## [Topic section 1]
- [bullet]
- [bullet]
  - [nested bullet]
  - [nested bullet]

## [Topic section 2]
- [bullet]
...
```

Notes about each part:

- The `#` title summarizes what the note is about. Use the source's own title if it is descriptive; otherwise rewrite it.
- The 요약 section is mandatory unless the source is so short the summary would just duplicate the body. Four to seven bullets is the target. Each summary bullet should compress one major move of the source.
- Section headings must be informative, not generic. Prefer `## 검증 중심 조직으로의 재편` over `## Section 4`.
- A note may end with `## References` or `## 참고` if there are external links worth pulling out. Inline links inside bullets are usually enough.

## Bullets, prose, and tables

Pick the right unit per section.

### Bullets are the default

Treat each bullet as one substantive thought. Two-word bullets are too small; if you have a list of two-word items, you are probably collapsing too aggressively or splitting a single thought into pieces.

Korean bullets end in 개조식 form. Concretely: a noun, a verb stem with -음 / -함 / -됨 / -임, the nominalizer 것, or an interrogative ending when raising a question. Never -합니다, never banmal. Full forms and examples in `references/style-guide.md`.

English bullets can be telegraphic or full sentences. Pick one mode per list to keep parallelism. Formal register throughout.

Nested bullets are limited to two levels. Use them to subdivide a parent claim, show reasoning structure, or capture two-sided opinions. If three levels seem necessary, split into a new sibling section.

### Prose is rare

Use a short prose paragraph only when:

- The thought is genuinely continuous and bulleting would split a single argument into noise.
- A short narrative anchors the rest of the note, such as a "Background" or "맥락" lead-in.

Korean prose uses -합니다, -입니다, -됩니다 endings. English prose uses formal full sentences. Two to four sentences per paragraph; if you are writing more, the content probably wants to become bullets.

### Tables are the default for matrix-shaped data

Use a Markdown table whenever the same set of attributes is evaluated across multiple items. Tables make these passages dramatically easier to scan than the equivalent nested bullets.

Reach for a table when you see any of these patterns in the source:

- Comparison of options, libraries, policies, vendors on a shared set of attributes.
- Action items or task lists with owner, action, and due date. Three to four rows justify a table.
- Schema, API, or endpoint listings with field, type, description.
- Decision matrices: option × criterion grids.
- Role and responsibility tables: person × responsibilities.

Suggested table shapes:

| Shape | Columns |
|---|---|
| Comparison of options | item, attribute 1, attribute 2, ... |
| Action items | owner, action, due |
| Schema | field, type, description |
| Roles | person, responsibilities |

Use nested bullets instead of a table when:

- There is just one item, so there is no matrix to fill.
- Each cell needs more than a short phrase.
- The attribute set is inconsistent across items, so several cells would be empty.

Keep tables to four columns or fewer for readability.

## Tone and writing rules

- Korean register stays formal throughout. Bullets in 개조식, prose in -합니다 form. No banmal anywhere.
- English register stays formal. Avoid contractions in prose; bullets that drop verbs are fine.
- Avoid em dashes (—) and en dashes (–). Replace with comma, colon, or new sentence.
- Parentheses are allowed for short inline clarifications; for longer asides, use a child bullet or new sentence.
- Keep established English technical terms in English; do not transliterate into Hangul.
- Preserve inline links from the source as `[text](url)`. Do not invent URLs.
- Do not invent facts, citations, or numbers. If a number appears in the source without attribution, leave it as the source reports it.
- Do not pad a short source. A two-paragraph article should produce a short note.

For detailed forms and examples, see `references/style-guide.md`.

## Faithfulness vs synthesis

The default is faithful reorganization. Keep what the source says, restructure it for skim-later use. Do not add interpretations the source did not make.

If the user explicitly asks for inference or implication, place those in a clearly labeled `## Commentary` or `## 코멘트` section so factual recall stays separate from interpretation.

## What not to do

- Do not save a file. Return Markdown inline.
- Do not skip the top-of-note 요약 unless the source is genuinely too short.
- Do not write Korean bullets in -합니다 form. Bullets are 개조식.
- Do not drop into banmal or plain form anywhere.
- Do not use em dashes.
- Do not transliterate established English technical terms into Hangul.
- Do not use a table for a non-matrix list.
- Do not invent links, headings, or facts that are not in the source.
- Do not pad a short source.
