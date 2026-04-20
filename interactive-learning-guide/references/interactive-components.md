# Interactive Components Reference

This document defines the HTML structure and JavaScript behavior for all interactive
elements in a learning guide.

## Table of Contents

1. Page Structure
2. Expandable Concept Cards
3. Quiz Component
4. Chapter Navigation
5. Putting It All Together

---

## 1. Page Structure

Every guide follows this top-level structure:

```html
<!DOCTYPE html>
<html lang="ko"> <!-- or "en", matching the guide language -->
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guide Title</title>
<style>
  /* Import fonts, :root variables, all CSS from design-system.md */
</style>
</head>
<body>
<div class="wrap">

  <h1>Guide Title</h1>
  <p class="sub">Subtitle — brief description of scope</p>

  <div class="progress-bar">
    <div class="progress-fill" id="progress" style="width:16%"></div>
  </div>

  <div class="chapters">
    <button class="ch-btn active" onclick="go(0)">Ch.1 Title</button>
    <button class="ch-btn" onclick="go(1)">Ch.2 Title</button>
    <!-- ... one button per chapter -->
  </div>

  <!-- Chapter content sections -->
  <div class="chapter active" id="ch0">...</div>
  <div class="chapter" id="ch1">...</div>
  <!-- ... -->

</div>
<script>
  /* Navigation and quiz functions */
</script>
</body>
</html>
```

The progress bar width is calculated as `(currentChapter + 1) / totalChapters * 100%`.
Set the initial width based on which chapter is shown first (usually chapter 1, so
`1/N * 100%`).

## 2. Expandable Concept Cards

Concept cards are the primary content containers within chapters. They start collapsed
and expand when clicked, revealing the detailed explanation.

### HTML Structure

```html
<div class="concept" onclick="this.classList.add('open')">
  <div class="concept-head">
    <span class="arrow">&#9654;</span>        <!-- right-pointing triangle -->
    <span class="num">1</span>                <!-- concept number within chapter -->
    <h3>Concept Title</h3>
    <span class="brief">short label</span>    <!-- 2-4 words, right-aligned -->
  </div>
  <div class="concept-body">
    <!-- Content goes here: <p>, .codeblock, .dia, .highlight, .analogy, .tbl -->
    <p>Explanation text with <strong>emphasis</strong> and <code>inline code</code>.</p>
  </div>
</div>
```

### CSS for Concept Cards

```css
.concept {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  margin-bottom: 14px;
  overflow: hidden;
  transition: all .25s;
}
.concept:hover { border-color: var(--t5); }
.concept-head {
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
}
.concept-head .arrow {
  font-size: 10px;
  color: var(--t4);
  transition: transform .25s;
  flex-shrink: 0;
}
.concept.open .concept-head .arrow {
  transform: rotate(90deg);
  color: var(--ac-purple);
}
.concept-head .num {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  border: 1.5px solid var(--t5);
  color: var(--t3);
  background: transparent;
}
.concept.open .concept-head .num {
  background: var(--white);
  color: var(--bg);
  border-color: var(--white);
}
.concept-head h3 {
  font-size: 14px;
  font-weight: 600;
  flex: 1;
  color: var(--t2);
}
.concept.open .concept-head h3 { color: var(--white); }
.concept-head .brief {
  font-size: 11px;
  color: var(--t4);
  margin-left: auto;
  white-space: nowrap;
}
.concept-body {
  display: none;
  padding: 0 24px 22px;
}
.concept.open .concept-body {
  display: block;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}
.concept-body p {
  font-size: 13px;
  color: var(--t2);
  line-height: 1.9;
  margin-bottom: 14px;
}
.concept-body p:last-child { margin-bottom: 0; }
.concept-body strong { color: var(--white); }
```

### Content Inside Concept Cards

A concept card body typically contains a mix of these elements:

1. **Paragraphs** (`<p>`): explanatory text
2. **Code blocks** (`.codeblock`): real code with syntax-highlighted spans
3. **Diagrams** (`.dia > svg`): visual representations
4. **Highlight boxes** (`.highlight.hl-*`): key insights
5. **Analogy boxes** (`.analogy`): everyday comparisons
6. **Supplement boxes** (`.supplement`): clarifying context for sentences that might
   not land on first read. Used primarily in revision mode. Place immediately after
   the sentence or paragraph being clarified.
7. **Tables** (`.tbl`): comparisons and data

Order matters for pedagogy. A common effective pattern:

- Start with a paragraph explaining the concept
- If the sentence uses unfamiliar terms or has a non-obvious logical jump,
  add a `.supplement` box immediately after
- Show a diagram or analogy to make it concrete
- Show the actual code
- End with a highlight summarizing the key insight

### Supplement Box HTML

```html
<div class="supplement">
  <p>Clarifying context that fills in what the preceding sentence left implicit.
  Written in the same voice as the rest of the guide — not a formal footnote.</p>
</div>
```

Placement rules:
- Place right after the sentence or `<p>` it clarifies
- Don't cluster multiple supplements — if two consecutive sentences both need
  clarification, put each supplement after its own sentence
- Don't use supplements for things the target reader already knows
- Supplements should add the missing concrete detail (a specific example, a
  mechanism, a term definition), not restate the original in different words

## 3. Quiz Component

Each chapter should end with a comprehension quiz. The quiz has multiple-choice options,
reveals whether the answer is correct or wrong, and shows an explanation.

### HTML Structure

```html
<div class="quiz">
  <h4>Check Your Understanding</h4>
  <p>Question text goes here?</p>
  <button class="quiz-opt" onclick="checkQuiz(this,'wrong','q1')">
    A. Wrong answer
  </button>
  <button class="quiz-opt" onclick="checkQuiz(this,'correct','q1')">
    B. Correct answer
  </button>
  <button class="quiz-opt" onclick="checkQuiz(this,'wrong','q1')">
    C. Wrong answer
  </button>
  <button class="quiz-opt" onclick="checkQuiz(this,'wrong','q1')">
    D. Wrong answer
  </button>
  <div class="quiz-explain" id="q1">
    Explanation of why B is correct and what the key concept is.
  </div>
</div>
```

Important details:

- Each quiz needs a unique ID string for its explain div (q1, q2, q3...)
- Exactly one option should have `'correct'` in its onclick
- The quiz locks after first answer (dataset.answered flag)
- Wrong answers get strikethrough; the correct answer is always revealed

### CSS for Quiz

```css
.quiz {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin: 24px 0;
}
.quiz h4 {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--ac-purple);
  margin-bottom: 14px;
}
.quiz > p {
  font-size: 13px;
  color: var(--t2);
  margin-bottom: 14px;
}
.quiz-opt {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 18px;
  margin-bottom: 8px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--t2);
  font-size: 12.5px;
  cursor: pointer;
  transition: all .15s;
  font-family: inherit;
}
.quiz-opt:hover {
  border-color: var(--t4);
  color: var(--white);
  background: var(--card2);
}
.quiz-opt.correct {
  background: var(--white);
  border-color: var(--white);
  color: var(--bg);
}
.quiz-opt.wrong {
  background: var(--bg);
  border-color: var(--border);
  color: var(--t4);
  text-decoration: line-through;
}
.quiz-explain {
  display: none;
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--t2);
  line-height: 1.8;
  padding: 16px 18px;
  background: var(--bg2);
  border-radius: 10px;
  border: 1px solid var(--border);
}
```

## 4. Chapter Navigation

### JavaScript

Place this at the bottom of the HTML, inside a `<script>` tag:

```javascript
function go(idx) {
  const chapters = document.querySelectorAll('.chapter');
  const buttons = document.querySelectorAll('.ch-btn');
  const totalChapters = chapters.length;

  chapters.forEach((c, i) => c.classList.toggle('active', i === idx));
  buttons.forEach((b, i) => b.classList.toggle('active', i === idx));
  document.getElementById('progress').style.width =
    ((idx + 1) / totalChapters * 100) + '%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkQuiz(btn, result, explainId) {
  const parent = btn.closest('.quiz');
  if (parent.dataset.answered) return;
  parent.dataset.answered = '1';
  btn.classList.add(result);
  if (result === 'wrong') {
    parent.querySelectorAll('.quiz-opt').forEach(b => {
      if (b.getAttribute('onclick').includes("'correct'")) {
        b.classList.add('correct');
      }
    });
  }
  document.getElementById(explainId).style.display = 'block';
}
```

### Chapter Visibility

Only one chapter is visible at a time:

```css
.chapter { display: none; }
.chapter.active { display: block; }
```

### Next Chapter Button

Place at the bottom of each chapter (except the last):

```html
<button class="next-ch" onclick="go(N)">Chapter N+1: Title &rarr;</button>
```

For the last chapter, you can either omit the button or replace it with a summary
highlight box that wraps up the entire guide.

## 5. Putting It All Together

A typical chapter structure:

```html
<div class="chapter" id="chN">
  <!-- 1. Chapter intro -->
  <div class="intro-box">
    <span class="tag tag-ch">Chapter N</span>
    <span class="tag tag-topic">Topic Category</span>
    <h2>Chapter Title</h2>
    <p>Brief overview of what this chapter covers and why it matters.</p>
  </div>

  <!-- 2. Expandable concepts (3-6 per chapter) -->
  <div class="concept" onclick="this.classList.add('open')">
    <div class="concept-head">
      <span class="arrow">&#9654;</span>
      <span class="num">1</span>
      <h3>First Concept</h3>
      <span class="brief">short label</span>
    </div>
    <div class="concept-body">
      <p>Explanation...</p>
      <div class="dia"><svg>...</svg></div>
      <div class="codeblock">...</div>
      <div class="highlight hl-purple"><strong>Key:</strong> ...</div>
    </div>
  </div>

  <!-- ... more concepts ... -->

  <!-- 3. Comprehension quiz -->
  <div class="quiz">
    <h4>Check Your Understanding</h4>
    <p>Question?</p>
    <button class="quiz-opt" onclick="checkQuiz(this,'wrong','qN')">A. ...</button>
    <button class="quiz-opt" onclick="checkQuiz(this,'correct','qN')">B. ...</button>
    <button class="quiz-opt" onclick="checkQuiz(this,'wrong','qN')">C. ...</button>
    <div class="quiz-explain" id="qN">Explanation...</div>
  </div>

  <!-- 4. Navigation to next chapter -->
  <button class="next-ch" onclick="go(N+1)">Next Chapter &rarr;</button>
</div>
```
