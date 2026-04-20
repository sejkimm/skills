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

## Revision Mode: Feedback-Driven Rewrite

An existing guide may need revision rather than creation from scratch. The most common
revision pattern combines three passes in a single rewrite:

### Pass 1: Sentence-Level Clarity Review

Read every sentence in the existing guide sequentially. For each sentence, judge:
- "A reader would understand this immediately" → keep as-is
- "A reader would pause here" → add a `.supplement` box right after

Supplement boxes explain what might not land on first read: unfamiliar terms, implicit
assumptions, non-obvious logical jumps, or domain-specific jargon used without context.
Don't paraphrase the original — add the missing context that makes it click.

Good supplements:
- Define the specific term that blocks understanding ("cross-fitted logistic probe"
  → explain the split-and-predict mechanic)
- Show the concrete scenario behind an abstract claim ("불완전한 판단으로 능력을
  끌어낸다" → a 0.5B model labeling data for a 4B model)
- Explain the mechanism, not just the name ("label exfiltration" → flipping one
  prediction at a time and watching the score change)

Bad supplements:
- Restating the same sentence in different words
- Adding background so broad it could apply to anything
- Explaining things the target reader already knows

### Pass 2: Narrative Refocus for a Specific Reader

When the user specifies a reader persona (e.g., "quant researcher using autoresearch"),
restructure the entire chapter order and framing around that reader's journey:

1. **Identify the reader's entry point.** What do they already know? What's their
   first question? Start there, not at the source material's beginning.

2. **Reorder chapters by the reader's needs, not the paper's structure.** A paper
   goes problem → method → results → discussion. A quant researcher reading the
   same paper might need: why this matters to me → concept mapping → what to steal
   → what to watch out for → how to set it up.

3. **Weave the domain mapping into every concept**, not just a final "applications"
   chapter. Each concept card should land with "here's how this shows up in your
   work" right where the concept is explained.

4. **Cut what the reader doesn't need.** If the reader already does autoresearch,
   don't spend a chapter explaining what an agent is. Compress prerequisites and
   expand the parts that change their practice.

### Pass 3: Humanizer-KO Integration (Korean guides only)

When revising Korean-language guides, apply humanizer-ko patterns during the rewrite
rather than as a separate post-processing step. The key patterns to watch for:

**Tone and register:**
- Use 서술체 ("~이다/~한다") for guides, not 경어체 ("~입니다/~합니다"), unless the
  user's existing guide uses 경어체 deliberately
- Insert 1인칭 opinions where the author has a genuine take ("내가 가장 신경 쓰는
  부분은 이거다")
- Vary sentence rhythm — mix short declarative sentences with longer explanatory ones

**Patterns to remove:**
- AI vocabulary inflation: "획기적인", "핵심적인", "역동적인" → use plain alternatives
- Chained connective endings: "~하며 ~하고 ~함으로써" → break into separate sentences
- Rule-of-three listings for the sake of comprehensiveness → keep only what's needed
- Negative parallelism: "단순히 X가 아니라 Y이다" → state Y directly
- Vague authority: "전문가들은 ~라고 말한다" → cite the specific source or drop it

**Patterns to keep:**
- Technical terms in English: React, Kubernetes, Sharpe ratio, PGR
- Korean loanwords that are fully naturalized: 서버, 데이터, 프로그램

**How supplements interact with humanizer-ko:** Supplement boxes should be written in
the same natural voice as the rest of the guide. Don't switch to a more formal or
explanatory register inside supplements — they should feel like the author leaning in
to clarify, not a textbook footnote.

### The `.supplement` Component

Add this CSS to the guide's stylesheet alongside `.analogy`:

```css
.supplement {
  background: var(--card2);
  border-left: 3px solid var(--ac-blue-dim);
  border-radius: 0 12px 12px 0;
  padding: 18px 22px;
  margin: 16px 0;
}
.supplement::before {
  content: "보충";
  display: block;
  font-size: 9px;
  font-weight: 700;
  color: var(--ac-blue-dim);
  letter-spacing: .1em;
  margin-bottom: 6px;
}
.supplement p {
  font-size: 12.5px;
  color: var(--t2);
  line-height: 1.85;
}
```

For English guides, change the `content` to `"SUPPLEMENT"`.

HTML usage:
```html
<div class="supplement">
  <p>Explanation that fills in the gap the preceding sentence left.</p>
</div>
```

Place supplements immediately after the sentence or paragraph they clarify.
Don't cluster multiple supplements — if two consecutive sentences both need
clarification, put each supplement right after its sentence.

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
