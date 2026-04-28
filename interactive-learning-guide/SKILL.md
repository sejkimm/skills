---
name: interactive-learning-guide
description: >
  Create interactive learning guides that explain projects, codebases, papers, or technical
  concepts from scratch in a step-by-step, chapter-based format. Use this skill whenever the
  user asks to "explain a project", "help me understand this codebase", "create a learning
  guide", "make an interactive tutorial", "visualize how something works", or wants a deep-dive
  walkthrough. Also trigger when the user says things like "기초부터 이해하고 싶어요",
  "step by step으로 알려주세요", or asks for an "interactive explanation". The guide is produced
  through a Hyperscribe-style semantic JSON envelope rendered into a self-contained HTML file.
---

# Interactive Learning Guide

Build a self-contained interactive HTML guide from a semantic JSON envelope. The model emits
teaching structure and content only; `scripts/render.mjs` validates the envelope and owns HTML,
CSS, JS, layout, code block whitespace, chapter navigation, expandable cards, and quizzes.

Do not hand-write the final HTML unless you are changing the renderer itself.

## When to Use

Use this skill for two scenarios:

1. **Project/codebase explanation**: read the code first, identify the architecture and concept
   dependency order, then teach from foundations to implementation details.
2. **General concept guide**: map prerequisite concepts, then build a progressive explanation
   from simple ideas to the user-facing practice.

The output is a single `.html` file plus the source `.json` envelope used to render it.

## Workflow

### 1. Analyze the Subject

For codebases:

- Read key source files before planning.
- Identify the core modules, data flow, control flow, and user-facing workflow.
- Note which concepts are prerequisites for others.

For general topics:

- Identify what the reader must understand first.
- Map the concept dependency graph.
- Decide what can be compressed because the user likely already knows it.

### 2. Plan Chapters

Create 4-8 chapters. Each chapter should:

- Have one clear focus.
- Build on previous chapters.
- Contain 3-6 `ilg/ConceptCard` components.
- End with one `ilg/Quiz`.

If concept B requires concept A, chapter A comes first.

### 3. Build the Semantic Envelope

Read `references/catalog.md` before writing the envelope. Use the catalog exactly.

Canonical shape:

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
        "language": "en"
      },
      "children": []
    }
  ]
}
```

Rules:

- Emit semantic data only. Never include `style`, `className`, colors, fonts, spacing, or layout props.
- Use `ilg/Chapter` for navigation units and `ilg/ConceptCard` for expandable explanations.
- Use `ilg/CodeBlock` or `ilg/AnnotatedCode` for real source code. Put raw code in the `code`
  prop; the renderer handles escaping and whitespace.
- Use `ilg/FlowChart`, `ilg/DataTable`, `ilg/Diagram`, `ilg/Highlight`, `ilg/Analogy`, and
  `ilg/Supplement` where they teach better than prose.
- Every quiz must have exactly one correct option.

### 4. Render and Validate

Render by invoking the Node script directly:

```bash
node /Users/sejkimm/dev/project/l1/skills/interactive-learning-guide/scripts/render.mjs \
  --in /absolute/path/to/guide.json \
  --out /absolute/path/to/guide.html
```

Validation-only:

```bash
node /Users/sejkimm/dev/project/l1/skills/interactive-learning-guide/scripts/render.mjs \
  --in /absolute/path/to/guide.json \
  --validate-only
```

If validation fails, stderr reports `path: message`. Fix the JSON and retry up to two times.
Do not silently fall back to hand-written HTML.

### 5. Verify the Artifact

Open or inspect the generated HTML. For substantial visual changes, use a browser/screenshot
check. Confirm:

- Chapter buttons switch chapters.
- Progress bar updates.
- Concept cards expand and collapse.
- Quizzes reveal the correct answer and explanation.
- Code snippets preserve indentation.

## Writing Content That Teaches

- Start every concept with the "why": what problem does this solve?
- Prefer concrete examples over broad background.
- Show real code for codebase guides.
- Use diagrams for flow, architecture, state, and relationships.
- Use `ilg/Highlight` sparingly for points worth remembering.
- Use `ilg/Analogy` only when it makes an abstract idea easier to reason about.
- Use `ilg/Supplement` immediately after a sentence or paragraph that may block the reader.
- Keep prose direct. The guide should build understanding, not dump information.

## Revision Mode

When revising an existing guide, rewrite the envelope rather than editing rendered HTML.

### Pass 1: Sentence-Level Clarity

Read every sentence. If a reader would pause, add `ilg/Supplement` immediately after the
sentence or paragraph. A supplement should add missing context, a mechanism, or a concrete
example. It should not paraphrase the original sentence.

### Pass 2: Reader-Specific Narrative

If the user names a reader persona, reorder the guide around that reader's journey:

1. Start from the reader's actual entry point.
2. Reorder chapters by the reader's needs, not the source material's order.
3. Weave domain mapping into each concept card.
4. Cut prerequisites the reader already knows.

### Pass 3: Korean Humanizer Rules

For Korean guides:

- Use 서술체 unless the existing guide deliberately uses 경어체.
- Keep technical terms in English where natural: React, Kubernetes, Sharpe ratio, PGR.
- Remove inflated AI phrasing such as "획기적인", "핵심적인", "역동적인" unless the word is truly needed.
- Break chained connective endings like "~하며 ~하고 ~함으로써" into clearer sentences.
- Avoid vague authority. Cite a source or drop the claim.
- Write supplements in the same natural voice as the guide.

## Language

Match the user's language. If the user writes in Korean, write the guide in Korean. If English,
write in English. Technical terms may remain in English when that is the natural term.

## Renderer Maintenance

The renderer files live under this skill:

- `spec/catalog.json`: machine-readable component schema.
- `references/catalog.md`: human-readable component guide.
- `scripts/render.mjs`: CLI renderer.
- `scripts/lib/`: validation, markdown, and HTML helpers.
- `assets/base.css` and `assets/interactive.js`: visual system and interactions.

Only read `references/design-system.md` or `references/interactive-components.md` when changing
renderer styling or interaction behavior. Normal guide creation should use `references/catalog.md`.

When changing renderer behavior, add or update focused tests under `tests/` and run:

```bash
node --test /Users/sejkimm/dev/project/l1/skills/interactive-learning-guide/tests/*.test.mjs
```
