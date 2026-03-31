# Design System Reference

This document defines the complete visual design system for interactive learning guides.
Every guide must use these exact values to maintain visual consistency.

## Table of Contents

1. CSS Variables
2. Typography
3. Base Layout
4. Color Usage Rules
5. Code Block Styling (Gruvbox)
6. SVG Diagram Conventions
7. Component Styling Reference

---

## 1. CSS Variables

Copy this entire `:root` block into every guide. These are the canonical values.

```css
:root {
  /* Base palette — dark background, grayscale hierarchy */
  --bg: #0a0a0a;       /* page background */
  --bg2: #111111;      /* recessed areas, inline code bg */
  --card: #141414;     /* card backgrounds */
  --card2: #1a1a1a;    /* slightly elevated cards, analogy boxes */
  --text: #e8e8e8;     /* primary body text */
  --t2: #b0b0b0;       /* secondary text, descriptions */
  --t3: #787878;        /* tertiary text, labels, subtitles */
  --t4: #505050;        /* quaternary text, faint labels */
  --t5: #333333;        /* borders, faintest text */
  --white: #f0f0f0;    /* headings, emphasis, bright elements */
  --border: #222222;   /* primary border */
  --border2: #2a2a2a;  /* secondary border, slightly lighter */

  /* Low-saturation accent gradation: purple → red → blue */
  --ac-purple: #8a7191;
  --ac-purple-dim: #5e4d65;
  --ac-red: #91706e;
  --ac-red-dim: #6b4f4d;
  --ac-blue: #6e7d91;
  --ac-blue-dim: #4d5a6b;

  /* Accent tints for backgrounds — very subtle, 7% opacity */
  --ac-purple-bg: rgba(138,113,145,.07);
  --ac-red-bg: rgba(145,112,110,.07);
  --ac-blue-bg: rgba(110,125,145,.07);

  /* Gruvbox Material Hard Dark — code theme */
  --gb-bg: #000000;    /* code block background — pure black */
  --gb-fg: #d4be98;    /* default code text */
  --gb-gray: #665c54;  /* comments */
  --gb-red: #ea6962;   /* keywords */
  --gb-green: #a9b665; /* function names */
  --gb-yellow: #d8a657;/* strings */
  --gb-blue: #7daea3;  /* builtins */
  --gb-purple: #d3869b;/* numbers */
  --gb-aqua: #89b482;  /* method calls */
  --gb-orange: #e78a4e;/* operators */
}
```

## 2. Typography

Import these fonts at the top of the `<style>` block:

```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&family=Google+Sans+Code:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap');
```

Font stack:
- English body: `Google Sans Flex`
- Korean fallback: `IBM Plex Sans KR`
- Code: `Google Sans Code`
- Full body font-family: `'Google Sans Flex', 'IBM Plex Sans KR', -apple-system, BlinkMacSystemFont, sans-serif`
- Full code font-family: `'Google Sans Code', monospace`
- Body line-height: 1.7
- Code line-height: 1.9

Font sizes follow a strict hierarchy:
- Page title (h1): 32px, weight 800, letter-spacing -.02em
- Chapter title (intro-box h2): 22px, weight 700
- Concept heading (h3): 14px, weight 600
- Body text: 13-13.5px
- Code: 11.5px
- Labels/tags: 9-11px, uppercase where noted

## 3. Base Layout

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
::selection { background: var(--ac-purple-dim); color: var(--white); }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Google Sans Flex', 'IBM Plex Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 880px; margin: 0 auto; padding: 48px 28px 80px; }
```

## 4. Color Usage Rules

These rules maintain the visual hierarchy.

**Grayscale is the default.** Most of the page uses the gray scale: --bg through --white.
Text, borders, card backgrounds, and SVG diagram outlines are all grayscale.

**Accent colors are for pedagogical emphasis only.** Use them when something genuinely
needs to stand out: a key insight, an important distinction, a critical warning. The three
accent colors carry semantic meaning:

- **Purple** (`--ac-purple`): primary accent. Chapter indicators, active states, primary
  highlights, the "most important" color.
- **Red** (`--ac-red`): warnings, tradeoffs, things to watch out for.
- **Blue** (`--ac-blue`): secondary information, supplementary insights.

In practice, a typical chapter might use accents in:
- 1-2 highlight boxes
- Progress bar gradient
- Active navigation indicator
- SVG diagram annotations (sparingly)
- Quiz section header

Everything else stays grayscale.

**The gradient** `linear-gradient(90deg, var(--ac-purple), var(--ac-red), var(--ac-blue))`
is used only for the progress bar fill. Don't apply it to other elements.

## 5. Code Block Styling (Gruvbox Material Hard Dark)

Code blocks use the Gruvbox Material Hard Dark color scheme on a pure black background.

```css
/* Inline code */
code {
  background: var(--bg2);
  color: var(--gb-fg);
  padding: 2px 7px;
  border-radius: 5px;
  font-size: 11.5px;
  font-family: 'Google Sans Code', monospace;
  border: 1px solid var(--border);
}

/* Code blocks */
.codeblock {
  background: var(--gb-bg);  /* #000000 */
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px 22px;
  margin: 14px 0;
  font-family: 'Google Sans Code', monospace;
  font-size: 11.5px;
  line-height: 1.9;
  overflow-x: auto;
  color: var(--gb-fg);
  white-space: pre;  /* CRITICAL — preserves indentation and line breaks */
}
```

### Code Block Whitespace Rules

Because `.codeblock` uses `white-space: pre`, the browser renders every space and
newline in the HTML source literally. This means careless HTML formatting will break
the visual output. Follow these rules strictly:

1. **First line of code starts on the line after the opening `<div>` tag, at column 0.**
   Do not indent code lines to match the surrounding HTML nesting. The code content
   lives outside the normal HTML indentation hierarchy.

2. **The closing `</div>` goes on the same line as the last line of code, immediately
   after the content.** If you put `</div>` on a new line with indentation, those
   spaces render as visible trailing whitespace inside the code block.

3. **Code indentation within the block uses real spaces** matching the language's
   convention (e.g., 4 spaces for Python). These are intentional and will render
   correctly.

Correct example:
```html
      <div class="codeblock">
<span class="kw">def</span> <span class="fn">train</span>(model, data):
    loss = model(data)
    loss.<span class="aq">backward</span>()
    <span class="kw">return</span> loss.<span class="aq">item</span>()</div>
```

Incorrect — extra whitespace will appear in the rendered code:
```html
      <div class="codeblock">
        <span class="kw">def</span> <span class="fn">train</span>(model, data):
            loss = model(data)
      </div>
```

Syntax highlighting uses span classes within `.codeblock`:

| Class   | Color          | Usage                    |
|---------|----------------|--------------------------|
| `.kw`   | `--gb-red`     | Keywords: def, class, if, for, return, import, assert |
| `.fn`   | `--gb-green`   | Function/class names in definitions |
| `.num`  | `--gb-purple`  | Numeric literals         |
| `.cm`   | `--gb-gray`    | Comments (also italic)   |
| `.str`  | `--gb-yellow`  | String literals          |
| `.op`   | `--gb-orange`  | Operators: +, -, *, @, = |
| `.bi`   | `--gb-blue`    | Built-in functions: range, len, min, max |
| `.aq`   | `--gb-aqua`    | Method calls: .append(), .encode() |

Example:
```html
<div class="codeblock">
<span class="kw">def</span> <span class="fn">train_step</span>(model, batch):
    loss = model(<span class="bi">input</span>=batch)
    loss.<span class="aq">backward</span>()   <span class="cm"># compute gradients</span>
    <span class="kw">return</span> loss.<span class="aq">item</span>()
</div>
```

## 6. SVG Diagram Conventions

Diagrams are placed inside `.dia` containers:

```css
.dia {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin: 16px 0;
  overflow-x: auto;
}
.dia svg { width: 100%; min-width: 600px; }
.dia svg text { font-family: 'Google Sans Flex', 'IBM Plex Sans KR', -apple-system, sans-serif; }
```

SVG color conventions:
- Primary boxes/shapes: `fill="#e8e8e8"` (--white) with dark text `fill="#0a0a0a"`
- Secondary shapes: `fill="var(--card)"` with `stroke="var(--border)"`
- Arrows and connectors: `stroke="#787878"` (--t3) or `stroke="#505050"` (--t4)
- Accent annotations: use `--ac-purple-dim`, `--ac-red-dim`, `--ac-blue-dim` sparingly
  for callout lines or emphasis, never for primary shapes
- Text hierarchy: primary labels `fill="#e8e8e8"`, secondary `fill="#b0b0b0"`,
  tertiary `fill="#505050"`

Arrow markers:
```html
<defs>
  <marker id="a1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
    <polygon points="0 0,7 2.5,0 5" fill="#e8e8e8"/>
  </marker>
  <marker id="a1d" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
    <polygon points="0 0,7 2.5,0 5" fill="#787878"/>
  </marker>
</defs>
```

Use `id="a1"` for bright arrows, `id="a1d"` for dim arrows. Since IDs must be unique
across the entire HTML document, define arrow markers once in the first SVG and reference
them throughout. Or use unique IDs per SVG if needed.

## 7. Component Styling Reference

### Progress Bar
```css
.progress-bar {
  height: 2px;
  background: var(--t5);
  margin: 28px 0 32px;
  border-radius: 1px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ac-purple), var(--ac-red), var(--ac-blue));
  transition: width .5s cubic-bezier(.4,0,.2,1);
}
```

### Chapter Navigation
```css
.chapters {
  display: flex;
  gap: 0;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.ch-btn {
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--t3);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all .2s;
  font-family: inherit;
}
.ch-btn:hover { color: var(--t2); }
.ch-btn.active {
  color: var(--white);
  border-bottom-color: var(--ac-purple);
  font-weight: 600;
}
```

### Intro Box (chapter header)
```css
.intro-box {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 32px;
  margin-bottom: 32px;
  background: var(--card);
}
.intro-box h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--white);
}
```

### Tags
```css
.tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  margin-right: 6px;
  margin-bottom: 10px;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.tag-ch { background: var(--ac-purple-dim); color: var(--white); }
.tag-topic { background: var(--border2); color: var(--t2); }
```

### Highlight Boxes
```css
.highlight {
  border-radius: 12px;
  padding: 18px 22px;
  margin: 16px 0;
  font-size: 12.5px;
  line-height: 1.85;
}
.hl-purple {
  background: var(--ac-purple-bg);
  border: 1px solid var(--ac-purple-dim);
  color: var(--t2);
}
.hl-purple strong { color: var(--ac-purple); }
.hl-red {
  background: var(--ac-red-bg);
  border: 1px solid var(--ac-red-dim);
  color: var(--t2);
}
.hl-red strong { color: var(--ac-red); }
.hl-blue {
  background: var(--ac-blue-bg);
  border: 1px solid var(--ac-blue-dim);
  color: var(--t2);
}
.hl-blue strong { color: var(--ac-blue); }
.hl-white {
  background: var(--card2);
  border: 1px solid var(--border);
  color: var(--t2);
}
.hl-white strong { color: var(--white); }
```

### Analogy Box
```css
.analogy {
  background: var(--card2);
  border-left: 3px solid var(--t4);
  border-radius: 0 12px 12px 0;
  padding: 18px 22px;
  margin: 16px 0;
}
.analogy::before {
  content: "ANALOGY";
  display: block;
  font-size: 9px;
  font-weight: 700;
  color: var(--t4);
  letter-spacing: .1em;
  margin-bottom: 6px;
}
.analogy p {
  font-size: 12.5px;
  color: var(--t2);
  line-height: 1.85;
}
```

### Table
```css
.tbl {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0;
  font-size: 12.5px;
}
.tbl th {
  text-align: left;
  padding: 12px 16px;
  background: var(--bg2);
  color: var(--t3);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
  font-size: 11px;
  letter-spacing: .02em;
  text-transform: uppercase;
}
.tbl td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--t2);
}
.tbl tr:hover td { background: var(--card2); }
```

### Next Chapter Button
```css
.next-ch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding: 14px 32px;
  background: var(--white);
  color: var(--bg);
  border: none;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;
}
.next-ch:hover {
  opacity: .85;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(255,255,255,.08);
}
```
