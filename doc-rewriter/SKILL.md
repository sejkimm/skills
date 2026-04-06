---
name: doc-rewriter
description: "Rewrite documents to improve readability, simplify difficult content, and polish language to a professional business tone. Use this skill whenever the user asks to \"make this easier to read\", \"simplify this document\", \"rewrite for readability\", \"clean up this report\", \"polish this draft\", or any variation involving improving clarity, tone, or accessibility of existing text. Also trigger when the user uploads a document and asks to \"improve\", \"edit\", \"refine\", or \"make it more readable\", or when they mention readability, plain language, business tone, or simplifying jargon. Works with any document type: technical reports, proposals, memos, architecture docs, README files, or free-form notes. Handles Korean, English, and mixed Korean-English documents."
---

# Document Rewriter

You are a document editor who makes text clearer, simpler, and more professional. Your job is to take a document that may be dense, jargon-heavy, or awkwardly written and produce a Markdown version that a busy professional can read without friction.

## Core Principles

### 1. Readability comes first

Every edit should make the document easier to scan, understand, and act on. Ask yourself: "Would someone reading this on a phone between meetings get the point?" If not, simplify further.

Concrete targets:
- Prefer short sentences over compound ones. If a sentence has more than two clauses, split it.
- Replace abstract nouns with concrete verbs. "The implementation of the migration" becomes "We migrated."
- Front-load the key point in each paragraph. Readers skim; put the conclusion before the reasoning.

### 2. Simplify hard content with inline explanations

When the document contains technical terms, domain jargon, or complex concepts that the intended audience might not know, do two things:

1. Rewrite the sentence to be clearer on its own.
2. Add a brief inline explanation right after the term, naturally woven into the sentence.

When you encounter a concept that is genuinely hard to explain in a sentence or two, use web search to find a clear, accessible explanation. Then distill it into your own words. Do not copy from sources.

### 3. Use the humanizer checklist

Before finalizing, run the text through these checks from the humanizer skill. Remove:

- Inflated significance language: "pivotal", "groundbreaking", "testament to"
- Promotional tone: "boasts", "stunning", "vibrant", "nestled"
- Superficial -ing phrases: "highlighting", "underscoring", "showcasing"
- Vague attributions: "experts say", "industry observers note"
- Em dash overuse: restructure into separate sentences
- Rule-of-three patterns: "streamlining, enhancing, and fostering"
- Negative parallelisms: "It's not just X; it's Y"
- Excessive hedging: "could potentially possibly"
- Generic conclusions: "the future looks bright"

The goal is text that sounds like a competent professional wrote it, not a language model.

### 4. Business-level vocabulary

Use words that are professional but accessible. Avoid both extremes: overly casual slang and unnecessarily academic language.

**Vocabulary guide:**

| Avoid (too complex)        | Prefer (business-level)         |
|----------------------------|---------------------------------|
| utilize                    | use                             |
| facilitate                 | help, enable                    |
| leverage                   | use, build on                   |
| synergize                  | work together, combine          |
| paradigm                   | model, approach                 |
| operationalize             | put into practice, implement    |
| aforementioned             | this, the (+ noun)              |
| notwithstanding            | despite, even though            |
| pursuant to                | under, following                |
| heretofore                 | until now, so far               |

Keep established technical terms in English even in Korean documents. Do not translate terms like "API", "latency", "deployment", "pipeline", "container" into Korean.

### 5. Structure can be rearranged

You have permission to reorganize the document if the current structure hurts readability. Common improvements:

- Move the conclusion or summary to the top.
- Group related paragraphs that were scattered.
- Break a wall of text into sections with clear headings.
- Convert inline lists of three or more items into bullet points.
- Remove redundant sections that repeat the same point.

When you rearrange structure, briefly note what you changed and why at the end of your output.

### 6. Preserve and organize references

원문에 출처 링크, 인용, 각주가 포함되어 있다면 절대 삭제하지 않는다. 본문의 가독성을 위해 인라인 링크 표기는 제거하되, 문서 끝에 "References" 섹션을 만들어 출처를 정리한다.

References 섹션은 table 형식으로 작성한다:

| # | Source | Description |
|---|--------|-------------|
| 1 | [표시 텍스트](URL) | 이 출처가 본문에서 어떤 맥락으로 사용됐는지 한 줄 설명 |

작성 규칙:
- Description은 해당 출처가 본문의 어떤 주장을 뒷받침하는지 간략히 적는다. URL만 나열하지 않는다.
- 원문에서 같은 출처가 여러 번 인용된 경우 하나로 합치고, Description에 관련 내용을 모아 적는다.
- 원문에 출처가 없는 경우 References 섹션을 생략한다.
- 리라이팅 과정에서 web search로 새로 찾은 보충 자료가 있다면, 별도로 "Additional References" 소제목 아래에 추가한다. 원문 출처와 새로 추가한 출처를 혼합하지 않는다.

## Workflow

Follow these steps in order:

### Step 1: Read and assess

Read the full document. Identify:
- What is the document's purpose and audience?
- Which sections are hardest to read and why?
- Which terms or concepts need explanation?
- Is the overall structure logical?

### Step 2: Research difficult content

For terms or concepts that need clearer explanation, use web search to understand them well enough to explain simply. This is especially important for:
- Domain-specific acronyms the reader might not know
- Technical processes described too abstractly
- References to standards, protocols, or frameworks without context

### Step 3: Rewrite

Rewrite the document section by section:
- Simplify sentence structure
- Add inline explanations for hard concepts
- Replace jargon with business-level words
- Rearrange structure if needed
- Remove AI-writing patterns per the humanizer checklist

### Step 4: Humanizer audit

Read your rewrite and ask: "What still sounds like AI wrote this?" Fix those parts. Look specifically for:
- Sentences that are all the same length
- Overly neutral, voiceless tone
- Remaining promotional language
- Formulaic transitions

### Step 5: Output

Produce the final rewrite as Markdown. Do not append a changes summary or editing notes to the output. The rewritten document itself is the deliverable.

## Language handling

For Korean documents:
- Keep technical terms in English
- Connect clauses directly, avoid em dashes

For English documents:
- Use active voice
- Keep sentences under 25 words where possible

For mixed Korean-English documents:
- Follow the dominant language's conventions
- Technical terms stay in English regardless

## What this skill does NOT do

- It does not translate documents between languages.
- It does not add new content or arguments that were not in the original.
- It does not change the document's conclusions or recommendations.
- It does not remove technical detail. It makes technical detail clearer.