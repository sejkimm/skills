---
name: drawing-paper-figures
description: Draw figures in the classic LaTeX paper style as SVG, with a white background, thin black lines, serif text, unfilled boxes, and line weight or dashes instead of color. Use when making a diagram, flowchart, architecture figure, or data plot for a paper, report, or technical write-up, or when the user asks for an "academic", "paper-style", or "LaTeX-style" figure.
---

# Drawing Paper Figures

Draw each figure so it could sit in a LaTeX paper. There are two kinds:

- **Diagram** (boxes, arrows, flows): hand-write the SVG, starting from `assets/diagram.svg`.
- **Data plot**: generate it with matplotlib using the style below, from a script kept in the project and rerun with `uv run`.

## Rules

- **One question.** Each figure answers one question. In a diagram, write that question in `<title>` and describe the whole figure in full sentences in `<desc>`. A plot has neither, so put both in the alt text where the document embeds it.
- **Monochrome.** White background rect, black strokes at 1px, unfilled boxes. Grays only for data marks that need a fill. No color.
- **Emphasis by line.** Distinguish with stroke weight (1 / 2) and dashes (`5 4`, `2 3`). Give each emphasis one meaning per document, state it in the caption, and use it for nothing else. One cue per element: a bold box is not also hatched.
- **Serif text.** Keep the font stack from the template. Labels are short noun phrases, in the document's figure language (English by default).
- **Room for fallback fonts.** Latin Modern may be missing on the viewer's machine, so leave at least 20% slack between a label and its box edge.
- **Caption outside.** The caption, figure number, and any explanatory note ("failure mode studied") live in the document, not in the SVG.

## Data plot style

```python
import matplotlib
matplotlib.use("svg")
import matplotlib.pyplot as plt
from cycler import cycler

plt.rcParams.update({
    "font.family": "serif",
    "font.serif": ["Latin Modern Roman", "CMU Serif", "Times New Roman", "DejaVu Serif"],
    "axes.prop_cycle": cycler(color=["black"]),
    "axes.spines.top": False,
    "axes.spines.right": False,
    "svg.fonttype": "path",  # glyphs as paths, so the plot looks the same everywhere
})
```

Tell series apart with dashes, markers, hatches, or gray fills.

## Check

1. Run `uv run <this skill's dir>/scripts/check_svg.py <file.svg>...` and fix every error it prints. It prints `ok: <file>` for each file that passes.
2. Render to PNG (for example with `rsvg-convert`) and look at it: no overlapping text, no clipped lines, no label leaving its box.
3. Read `<title>` and `<desc>` again against the final drawing.
