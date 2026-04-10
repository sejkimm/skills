---
name: consulting-style-deck
description: Build editorial, consulting-grade .pptx presentation decks in a polished strategy-firm visual style. Use this skill whenever the user asks for a "consulting-style deck", "executive presentation", "board deck", "strategy presentation", "investor pitch with editorial design", "professional slide deck", or any presentation that needs a polished serif-headline editorial look rather than a generic template. Also trigger when the user asks for a multi-slide pptx with chrome elements like section eyebrows, page numbers, hairline rules, or pull quotes. Default output is .pptx via pptxgenjs. Default font is Google Sans Flex. Default language is English with Korean optional.
---

# Consulting-Style Deck Builder

Build consulting-grade .pptx decks with editorial typography, restrained palette, hairline rules, and disciplined whitespace. The aesthetic is the kind of print-quality executive report you would see from a top-tier strategy firm: serif headlines, sans body, navy and grey, generous margins, no decoration for decoration's sake.

## When to use this skill

Use this skill for any multi-slide presentation that needs an executive, strategic, or editorial look. Do NOT use it for casual one-pagers, social posts, or slides where the user explicitly wants a colourful or playful theme.

## Core workflow

1. **Read `references/design-system.md`** before writing any code. It contains the palette hex codes, the typography rules, the chrome layout, the helper functions (`chrome`, `titleBlock`, `leadBullets`, `photoPlaceholder`), and the safe-area rules.
2. **Read `references/slide-patterns.md`** to pick which of the 6 core slide patterns to use for each slide the user asked for. Do NOT invent layouts from scratch when a pattern fits.
3. **Write a single `build.js` file** that uses pptxgenjs and emits one .pptx. Place it in `/home/claude/deck/build.js` (or the working directory if outside the Claude container). Use the helpers and constants verbatim from the design system reference.
4. **Build, render, QA**. Run `node build.js`, convert with `soffice --headless --convert-to pdf`, rasterize with `pdftoppm`, and view each slide image to check for overflow, mid-word wraps, and footer collisions. Fix issues before delivering.
5. **Deliver** the .pptx via the appropriate file-presentation tool. If the user provided photos or charts, drop them into the photo placeholders before delivery. Otherwise the placeholders ship as dashed-border frames the user can replace in PowerPoint.

## Rules that always apply

- **Layout**: LAYOUT_WIDE, 13.333 × 7.5 inches. Never change this.
- **Font**: Google Sans Flex by default for both serif and sans roles. The script writes the font face into the .pptx; if the rendering machine does not have Google Sans Flex installed, previews fall back to a default sans, but the actual file is correct. Only change the font if the user explicitly requests something else.
- **Palette**: A restrained editorial palette of navy, grey and pale blue. Exact hex codes are in `references/design-system.md`. Do not add accent colours.
- **Footer safety**: The page rule sits at y = 7.05. Nothing except the page number and corporate footer goes below it. Always re-check this after rendering.
- **Acronyms**: Define on first use as "Full Term: ACRONYM", then reuse the acronym. Minimise them.
- **Punctuation**: No em dashes. Avoid parentheses; use colons or new sentences instead.
- **Korean**: Off by default. Turn on only if the user asks. When on, keep technical terms in English, use consistent honorifics, and follow the same no-em-dash, no-parentheses rule.

## Slide patterns

Six core patterns live in `references/slide-patterns.md`. Use them as building blocks:

1. **Cover** — title, italic subtitle, meta row at the bottom
2. **Table of contents** — roman numerals, section titles, italic descriptors, right-aligned page numbers
3. **Three-column problem/solution** — three labelled columns with bold lead phrases and grey body, optional pull quote underneath
4. **Horizontal flow** — 4 elements with right-arrow shapes between them, used for "from X to Y" architectures
5. **Reference case** — left column with project description and bullets, right column with photo placeholder, transfer block underneath
6. **Value cards** — 3 vertical cards with numbered eyebrow, bold lead, body paragraph, italic pull line

For anything else (capability matrix, two-panel framework, scenario grid), compose from the primitives in `references/design-system.md`. Always prefer composing over inventing.

## Test cases

When testing this skill, three prompts cover the surface area:

1. **Generic strategy deck**: "Build me a 6-slide consulting-style deck on why a mid-sized SaaS company should expand into Europe. Audience is the board." Should produce cover, TOC, problem framing, solution framework, one supporting slide, closing.
2. **Reference-heavy deck**: "Build a 10-slide consulting deck pitching our company's services to a manufacturing client. Include three case study references with photo placeholders." Should produce cover, TOC, what-we-solve, framework, three reference slides with placeholders, proposed plan, closing.
3. **Korean optional**: "Build a 5-slide investor update in editorial style for a Korean fintech. Korean content, English technical terms preserved." Should switch to Korean while keeping English terms, no em dashes, no parentheses.

For each, after building, view all rendered slides and confirm no footer collisions, no mid-word wraps, no overflow, and a clean editorial look.

## Anti-patterns

- **Do not** decorate with gradients, shadows, or 3D effects.
- **Do not** use stock icons unless the user asks.
- **Do not** stack more than 5 bullets in one column.
- **Do not** put body text below y = 7.0.
- **Do not** invent new fonts. Default is Google Sans Flex. Period.
- **Do not** use bullet points in slide titles.
