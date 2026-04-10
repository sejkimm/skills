# Slide Patterns Reference

Six core patterns. Use them as building blocks. Compose for anything else.

## 1. Cover

Vertical stack with a navy accent bar on the left, eyebrow + serif title (regular weight) + serif italic continuation in navy + italic subtitle, then a four-column meta row at the bottom (PREPARED FOR / PREPARED BY / DOCUMENT / CONTACT).

Key positions: accent bar at x=ML, y=1.35, w=0.08, h=4.35. Title at y=1.7, fontSize 52. Italic continuation at y=2.85. Subtitle at y=4.3. Meta row at y=5.85 above a horizontal rule.

## 2. Table of contents

`chrome(slide, 2, "CONTENTS")` plus `titleBlock(slide, "Contents", "From the problem to the value")`. Then six rows separated by hairlines, each row with:
- Roman numeral on the left in italic BLUE_ACC, fontSize 18
- Section title in serif bold BLACK, fontSize 22
- Italic descriptor underneath in SANS GREY_DARK, fontSize 11
- Page number right-aligned in NAVY bold, fontSize 22

Row height ~0.74. First row starts at y = 2.53. Top accent rule at y = 2.35.

## 3. Three-column problem/solution

Three labelled columns separated by gaps of 0.3. Each column has:
- Top hairline (NAVY, width 1.5)
- Italic small number "01" / "02" / "03" in BLUE_ACC
- All-caps category label in bold BLACK with charSpacing 2
- Bold navy lead phrase + grey body in the same text frame

Optional: a navy pull quote underneath at y = 5.7, behind a NAVY rule, with the word "OUR CONCLUSION" or similar in small caps, and the conclusion in 20pt italic.

## 4. Horizontal flow with arrows

4 elements with 3 right-arrows between them. Element x positions:
```
const arrowW = 0.45;
const colW = (CW - arrowW * 3) / 4;
const x0 = ML;
const x1 = x0 + colW + arrowW;
const x2 = x1 + colW + arrowW;
const x3 = x2 + colW + arrowW;
```

Arrows are `pres.shapes.RIGHT_ARROW`, fill NAVY, placed at the vertical centre of the flow.

Use this for "from X to Y" architectures: input → layer 1 → layer 2 → output. Endpoints are usually photo placeholders, middle elements are BLUE_PALE boxes with bold lead bullets inside.

## 5. Reference case slide

Two-column split. Left column is text content, right column is a photo placeholder.

Left column (lW = CW * 0.55):
- Eyebrow "REFERENCE 01 · CATEGORY"
- Hairline below eyebrow
- Project name in serif bold, fontSize 20
- Italic project description in SANS GREY_DARK
- "WHAT WE DELIVERED" small label
- 3 lead bullets at fontSize 12/11
- Transfer block at the bottom: BLUE_PALE rectangle with NAVY accent bar on the left, "HOW IT TRANSFERS" label, one-line transfer statement

Right column (rW = CW - lW - 0.4):
- Photo placeholder, height ~3.85, with caption underneath

Wrap as a helper function `referenceSlide(opts)` that takes `{pageNum, section, title, subtitle, eyebrow, projectName, projectDesc, delivered, transfer, photoCaption}`.

## 6. Value cards

Three vertical cards in BLUE_PALE with NAVY accent bars on top. Each card has:
- Italic number "01" in BLUE_ACC at top-left
- Bold serif lead title (~2 lines max)
- Hairline divider
- Body paragraph in SANS GREY_DARK, fontSize 10.5–11
- Italic NAVY pull line at the bottom of the card

Card geometry: cY = 2.45, cH = 3.7–3.95, gap = 0.35, colW = (CW - gap * 2) / 3.

Below the cards, a NAVY rule, then a "NEXT STEP" eyebrow + one-line CTA on the left, and a contact block on the right.

## Composing for other layouts

For layouts not in the 6 patterns above, compose from primitives:
- **Capability matrix**: pptxgenjs `addTable` with single-word headers (avoid `\n` mid-word), `●` / `○` / `—` glyphs, hairline borders in GREY_HAIR
- **Two-panel framework**: two BLUE_PALE rectangles side by side with NAVY accent bars, leadBullets inside each, OUTCOME line at the bottom
- **Process flow with steps**: 4 cards in a row with right-triangle arrows between them at the vertical centre

Always re-check after rendering that no element crosses y = 7.05.
