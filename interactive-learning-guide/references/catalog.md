# Interactive Learning Guide Catalog — interactive-learning-guide/v1

The guide renderer accepts an A2UI-style JSON envelope. The model emits semantic data only;
`scripts/render.mjs` validates the envelope and builds the self-contained HTML file.

## Envelope

```json
{
  "a2ui_version": "0.9",
  "catalog": "interactive-learning-guide/v1",
  "is_task_complete": true,
  "parts": [
    {
      "component": "ilg/LearningGuide",
      "props": {
        "title": "Guide title",
        "subtitle": "Short scope statement",
        "language": "en",
        "audience": "Who this guide is for",
        "objectives": ["What the reader should be able to do"],
        "prerequisites": ["What the reader should already know"]
      },
      "children": []
    }
  ]
}
```

Rules:

- `parts` must contain exactly one root component.
- The root component must be `ilg/LearningGuide`.
- Props carry semantic data only. Do not use `style`, `className`, color, font, spacing, or layout props.
- Use `audience`, `objectives`, and `prerequisites` when they clarify reader fit.
- Prefer structured catalog diagrams over Mermaid or raw SVG so the renderer can enforce bounds.
- Container components use `children`; leaf components omit `children`.
- Unknown props fail validation.

## Components

### `ilg/LearningGuide`

Root container for one guide.

Props:

- `title` string, required
- `subtitle` string, optional
- `language` `"en" | "ko"`, optional, default `"en"`
- `audience` string, optional
- `objectives` string array, optional
- `prerequisites` string array, optional

Children: `ilg/Chapter[]`.

### `ilg/Chapter`

Navigable chapter. The renderer creates sidebar chapter links, one accent progress bar, and a
collapsed section outline for inactive chapters. It also renders sharp previous/next controls at
the bottom of each chapter.

Props:

- `id` kebab-case string, required
- `title` string, required
- `lead` string, optional

Children: usually 3-6 `ilg/ConceptCard` components followed by one `ilg/Quiz`.

### `ilg/ConceptCard`

Document section in the rendered wiki template. The title becomes a sublink under the active
chapter in the sidebar. Put the "why" first, then examples, code, diagrams, or checks.

Props:

- `number` number, required
- `title` string, required
- `brief` string, optional

Children: `ilg/Prose`, `ilg/Analogy`, `ilg/Supplement`, `ilg/Highlight`, `ilg/CodeBlock`,
`ilg/AnnotatedCode`, `ilg/DataTable`, `ilg/Diagram`, or `ilg/FlowChart`.

### `ilg/Prose`

Markdown paragraph block. Supports paragraphs, simple lists, bold, emphasis, and inline code.

Props:

- `markdown` string, required

### `ilg/Analogy`

Everyday comparison that makes an abstract idea intuitive.

Props:

- `body` markdown string, required
- `title` string, optional, default `"Analogy"`

### `ilg/Supplement`

Clarifying context for a preceding sentence or paragraph. Use only where the reader might pause.

Props:

- `body` markdown string, required

### `ilg/Highlight`

Key insight box.

Props:

- `body` markdown string, required
- `tone` `"primary" | "warn" | "info"`, optional
- `title` string, optional

### `ilg/CodeBlock`

Single code snippet. The renderer handles escaping, line numbers, and whitespace.

Props:

- `lang` string, required
- `code` string, required
- `filename` string, optional
- `highlight` number array, optional

### `ilg/AnnotatedCode`

Code snippet with side annotations.

Props:

- `lang` string, required
- `code` string, required
- `filename` string, optional
- `annotations` array of `{ line, title, body }`, required

### `ilg/DataTable`

Comparison or evidence table.

Props:

- `columns` array of `{ key, label, align? }`, required
- `rows` array of row objects keyed by column keys, required
- `caption` string, optional

### `ilg/Diagram`

Inline SVG escape hatch. Prefer `ilg/FlowChart` when a simple directed flow is enough. Use this
only for vetted SVG with its own `viewBox`; arbitrary Mermaid exports and text-heavy SVGs often
break the document width or overflow labels.

Props:

- `svg` string, required
- `caption` string, optional

### `ilg/FlowChart`

Simple left-to-right directed flow. The renderer wraps long node and edge labels into bounded
SVG text. Keep flows small; split complex diagrams into multiple flow charts.

Props:

- `nodes` array of `{ id, label, tag? }`, required
- `edges` array of `{ from, to, label? }`, required

### `ilg/Quiz`

Chapter comprehension check.

Props:

- `id` kebab-case string, required
- `question` string, required
- `options` array of `{ label, correct }`, required
- `explanation` string, required

Exactly one option must have `correct: true`; the renderer throws a loud error otherwise.

## Minimal Example

```json
{
  "a2ui_version": "0.9",
  "catalog": "interactive-learning-guide/v1",
  "is_task_complete": true,
  "parts": [
    {
      "component": "ilg/LearningGuide",
      "props": {
        "title": "Renderer Guide",
        "subtitle": "A semantic learning guide",
        "language": "en",
        "audience": "Engineers learning the renderer contract",
        "objectives": ["Explain why the envelope exists"],
        "prerequisites": ["Basic JSON"]
      },
      "children": [
        {
          "component": "ilg/Chapter",
          "props": {
            "id": "foundation",
            "title": "Foundation",
            "lead": "Start with why the concept exists."
          },
          "children": [
            {
              "component": "ilg/ConceptCard",
              "props": {
                "number": 1,
                "title": "Semantic output",
                "brief": "JSON first"
              },
              "children": [
                {
                  "component": "ilg/Prose",
                  "props": {
                    "markdown": "The model writes **meaning**, not HTML."
                  }
                }
              ]
            },
            {
              "component": "ilg/Quiz",
              "props": {
                "id": "q1",
                "question": "What does the renderer own?",
                "options": [
                  { "label": "Presentation details", "correct": true },
                  { "label": "Source analysis", "correct": false }
                ],
                "explanation": "The renderer owns HTML, CSS, and interaction details."
              }
            }
          ]
        }
      ]
    }
  ]
}
```
