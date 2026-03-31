---
name: interactive-learning-guide
description: >
  Create interactive HTML learning guides that explain projects, codebases, or technical concepts
  from scratch in a step-by-step, chapter-based format. Use this skill whenever the user asks to
  "explain a project", "help me understand this codebase", "create a learning guide", "make an
  interactive tutorial", "visualize how something works", or wants a deep-dive walkthrough of
  any technical or non-technical topic. Also trigger when the user says things like "기초부터
  이해하고 싶어요", "step by step으로 알려주세요", or asks for an "interactive explanation".
  This skill covers both project-specific analysis (reading code and explaining architecture)
  and general concept guides (explaining topics from foundational principles).
---

# Interactive Learning Guide

Build single-file interactive HTML guides that take someone from zero understanding to deep
comprehension of a subject. The guide follows a chapter-based structure where each chapter
builds on the previous one, starting from the most foundational concepts.

## When to Use This Skill

This skill applies to two main scenarios:

1. **Project/codebase explanation**: The user has a codebase and wants to understand how it works.
   Read the code first, identify the key concepts and their dependencies, then build the guide
   bottom-up from the most basic prerequisite knowledge.

2. **General concept guide**: The user wants to understand a technical or non-technical topic.
   Break it down into progressive chapters that build understanding layer by layer.

In both cases, the output is a **single .html file** with embedded CSS and JS. No external
frameworks — pure HTML/CSS/JS for maximum portability.

## Process

### Step 1: Analyze the Subject

For codebase projects:
- Read the key source files to understand the architecture
- Identify the core concepts and their dependency order
- Note which concepts are prerequisites for others

For general topics:
- Identify what foundational knowledge the reader needs first
- Map out the concept dependency graph
- Determine a logical progression from simple to complex

### Step 2: Plan the Chapter Structure

Organize concepts into 4-8 chapters. Each chapter should:
- Have a clear, specific focus
- Build on what previous chapters established
- Contain 3-6 expandable concept cards
- End with a comprehension quiz

A good ordering principle: if concept B requires understanding concept A, then A comes first.
Don't assume any prior knowledge unless the user says otherwise.

### Step 3: Build the HTML

Read the design reference at `references/design-system.md` for the complete CSS variable set,
component patterns, and color system. Read `references/interactive-components.md` for the
JavaScript patterns and component HTML structures.

**Code block whitespace is critical.** The `.codeblock` CSS uses `white-space: pre`, which
means every space and newline in the HTML source renders literally. Code content must start
at column 0 (no HTML nesting indentation), and the closing `</div>` must sit on the same
line as the last code line with no gap. See `references/design-system.md` section 5 for the
exact rules and examples. Getting this wrong produces broken indentation in the browser.

The file structure follows this pattern:

```
<!DOCTYPE html>
<html lang="...">
<head>
  <meta charset="UTF-8">
  <style>
    /* Full CSS here — see design-system.md for the complete set */
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Title</h1>
    <p class="sub">Subtitle</p>
    <div class="progress-bar">...</div>
    <div class="chapters"><!-- chapter nav buttons --></div>

    <!-- Chapter sections -->
    <div class="chapter active" id="ch0">
      <div class="intro-box">...</div>
      <div class="concept" onclick="this.classList.toggle('open')">...</div>
      <!-- more concepts -->
      <div class="quiz">...</div>
      <button class="next-ch" onclick="go(1)">Next Chapter</button>
    </div>
    <!-- more chapters -->
  </div>
  <script>
    /* Navigation and quiz logic — see interactive-components.md */
  </script>
</body>
</html>
```

### Step 4: Write Content That Teaches

The goal is genuine understanding, not information dumping. For each concept:

- **Start with the "why"**: before explaining what something is, explain why it exists or why
  someone would need it. What problem does it solve?
- **Use analogies**: connect abstract concepts to everyday experiences. Wrap these in the
  `.analogy` component. Good analogies make unfamiliar things feel intuitive.
- **Show real code**: when explaining a codebase, include actual code snippets from the project
  with syntax highlighting using the gruvbox color classes. Don't just describe code — show it.
- **Use diagrams**: SVG diagrams inside `.dia` containers help visualize data flow, architecture,
  and relationships. Keep them grayscale with subtle accent colors.
- **Highlight key insights**: use `.highlight` boxes sparingly for the most important takeaways.
  Each highlight should be something the reader would want to remember.
- **Include comparisons**: tables (`.tbl`) work well for comparing options, showing tradeoffs,
  or listing properties side by side.

### Step 5: Add Comprehension Checks

Each chapter ends with a quiz. Good quiz questions:
- Test understanding of concepts, not memorization of facts
- Have one clearly correct answer and plausible distractors
- Include an explanation that reinforces the key concept

## Language

Match the user's language. If the user writes in Korean, write the guide in Korean. If English,
write in English. Technical terms should remain in English regardless of the guide language.

## Design Philosophy

The visual design follows a strict system: dark background with minimal color, letting the
content breathe. Color is used only where it serves a pedagogical purpose — to draw attention
to key insights, differentiate code syntax, or label diagram elements. The complete design
specification is in `references/design-system.md`.

Core principles:
- **Dark base**: #0a0a0a background with grayscale hierarchy for text and borders
- **Code**: Gruvbox Material Hard Dark theme on pure #000000 background
- **Accents**: Low-saturation purple/red/blue gradation, used sparingly for highlights and
  diagram annotations
- **Typography**: Google Sans Flex for English body, IBM Plex Sans KR as Korean fallback,
  Google Sans Code for code blocks
- **Spacing**: Generous whitespace — let content breathe rather than cramming
