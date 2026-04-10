# Design System Reference

Read this file before writing any deck code. It contains the constants, helpers, and rules that every slide depends on.

## Constants

```javascript
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

// Palette — editorial navy + grey + pale blue
const NAVY       = "1F3864";  // primary brand colour
const BLUE_ACC   = "2E5C9E";  // accent for italic eyebrows and numbers
const BLUE_PALE  = "F0F4FB";  // panel backgrounds
const BLUE_LIGHT = "D9E2F3";  // secondary tints inside navy panels
const BLACK      = "0B0B0B";
const INK        = "1A1A1A";
const GREY_DARK  = "4A4A4A";  // body text
const GREY_MID   = "737373";  // labels, footers
const GREY_SOFT  = "A6A6A6";
const GREY_LINE  = "BFBFBF";  // section rules
const GREY_HAIR  = "D9D9D9";  // table hairlines, panel borders

// Typography — Google Sans Flex for both roles by default
const SERIF = "Google Sans Flex";
const SANS  = "Google Sans Flex";

// Layout
const W = 13.333, H = 7.5;
const ML = 0.5, MR = 0.5;       // left/right margins
const CW = W - ML - MR;          // content width
const TOTAL = 10;                // override per deck
```

## Safe areas

- Top chrome rule sits at y = 0.5
- Section eyebrow at y = 0.62
- Title block at y = 0.95 (height 0.65)
- Subtitle at y = 1.6 (height 0.35)
- Content area: y = 2.3 to y = 7.0
- Bottom chrome rule at y = 7.05
- Page number footer at y = 7.15

**Never place body content below y = 7.0.** This is the most common bug. Always re-check after rendering.

## Chrome helper

Every slide except the cover calls `chrome(slide, n, sectionLabel)`:

```javascript
function chrome(slide, n, section) {
  slide.addText("BRAND   ×   CLIENT", {
    x: ML, y: 0.22, w: 6, h: 0.22,
    fontFace: SANS, fontSize: 9, color: GREY_MID, bold: true, charSpacing: 2, margin: 0,
  });
  slide.addText("CONFIDENTIAL   ·   MONTH YEAR", {
    x: W - 6 - MR, y: 0.22, w: 6, h: 0.22,
    fontFace: SANS, fontSize: 9, color: GREY_MID, bold: true, charSpacing: 2, align: "right", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: ML, y: 0.5, w: CW, h: 0,
    line: { color: GREY_LINE, width: 0.5 },
  });
  if (section) {
    slide.addText(section, {
      x: ML, y: 0.62, w: CW, h: 0.28,
      fontFace: SANS, fontSize: 10, color: NAVY, bold: true, charSpacing: 3, margin: 0,
    });
  }
  slide.addShape(pres.shapes.LINE, {
    x: ML, y: 7.05, w: CW, h: 0,
    line: { color: GREY_LINE, width: 0.5 },
  });
  const page = String(n).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");
  slide.addText(page, {
    x: ML, y: 7.15, w: 2, h: 0.22,
    fontFace: SANS, fontSize: 9, color: GREY_MID, margin: 0,
  });
}
```

Replace "BRAND × CLIENT" and "CONFIDENTIAL · MONTH YEAR" with actual values from the user.

## Title block helper

```javascript
function titleBlock(slide, title, subtitle) {
  slide.addText(title, {
    x: ML, y: 0.95, w: CW, h: 0.65,
    fontFace: SERIF, fontSize: 26, color: INK, margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: ML, y: 1.6, w: CW, h: 0.35,
      fontFace: SANS, fontSize: 12, color: GREY_DARK, italic: true, margin: 0,
    });
  }
}
```

Title is **never** bold and **never** has a bullet. Subtitle is italic grey.

## Lead bullets helper

For bullet lists where each item has a bold navy lead phrase followed by grey body text:

```javascript
function leadBullets(items, leadSize, bodySize) {
  leadSize = leadSize || 12;
  bodySize = bodySize || 12;
  const arr = [];
  items.forEach((it, i) => {
    const isLast = i === items.length - 1;
    arr.push({
      text: it.lead + ":",
      options: { bullet: true, bold: true, color: NAVY, fontSize: leadSize, fontFace: SANS },
    });
    arr.push({
      text: " " + it.body,
      options: { color: GREY_DARK, fontSize: bodySize, fontFace: SANS, breakLine: !isLast },
    });
  });
  return arr;
}
```

Usage: `slide.addText(leadBullets([{lead: "Foo", body: "explanation"}, ...]), {x, y, w, h, paraSpaceAfter: 6, margin: 0})`

## Photo placeholder helper

For reference slides where the user will drop in a photo later:

```javascript
function photoPlaceholder(slide, x, y, w, h, caption) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: BLUE_PALE },
    line: { color: BLUE_ACC, width: 1, dashType: "dash" },
  });
  slide.addShape(pres.shapes.LINE, {
    x: x + 0.3, y: y + 0.3, w: w - 0.6, h: h - 0.6,
    line: { color: GREY_HAIR, width: 0.5 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: x + 0.3, y: y + h - 0.3, w: w - 0.6, h: -(h - 0.6),
    line: { color: GREY_HAIR, width: 0.5 },
  });
  slide.addText("PHOTO PLACEHOLDER", {
    x, y: y + h / 2 - 0.32, w, h: 0.3,
    fontFace: SANS, fontSize: 11, bold: true, color: BLUE_ACC,
    charSpacing: 4, align: "center", margin: 0,
  });
  slide.addText("Insert photo here", {
    x, y: y + h / 2, w, h: 0.28,
    fontFace: SANS, fontSize: 10, italic: true, color: GREY_MID,
    align: "center", margin: 0,
  });
  if (caption) {
    slide.addText(caption, {
      x, y: y + h + 0.12, w, h: 0.32,
      fontFace: SANS, fontSize: 9, italic: true, color: GREY_MID,
      align: "center", margin: 0,
    });
  }
}
```

## Build and QA pipeline

```bash
node build.js
soffice --headless --convert-to pdf <name>.pptx
pdftoppm -jpeg -r 110 <name>.pdf slide
# View slide-01.jpg through slide-NN.jpg, fix issues, repeat
```

## Common bugs and fixes

- **Mid-word wrap on table headers**: shorten to single words, do not use `\n` inside header cells
- **Footer collision**: reduce card height or move bottom block up
- **Title overflow**: shorten the title; never let it wrap onto a third line
- **Email wrap**: widen the contact column to at least 21% of CW
- **Font fallback in preview**: this is normal in headless rendering, the .pptx is correct
