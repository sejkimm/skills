# Style guide

Detailed tone, language, and formatting rules. SKILL.md gives the rules in summary; this file gives the full forms with examples.

## Korean: 개조식 (default for bullets)

Korean bullets must end in 개조식 form. Concretely, bullet items end in one of these shapes:

- A noun: "...핵심 신호이며, 이는 문화 적합성과 맥락 이해를 동시에 검증하는 지표"
- A verb stem with -음 / -함 / -됨 / -임: "...구체적이고 실행 가능한 아이디어를 만들어냄", "...자기 사일로만 개선하지 않음"
- A nominalizer 것: "...단순히 들은 것을 앵무새처럼 반복하는 것"
- An interrogative ending when the bullet itself is a question being raised: "...아직 모르는 부분을 인정하는가"

Do not end Korean bullets with -합니다, -입니다, or any other 종결어미. Bullets are not full sentences in 개조식.

Do not drop into banmal or plain form: -한다, -이다, -였다, -했다, -된다 are all forbidden inside bullets.

Connectives like -이며, -이고, -이지만 are fine inside a bullet to chain related observations:

- "트래픽 패턴이 시간대별 집중 형태이며, LFU 의 stale entry 문제 회피가 필요함"

## Korean: prose paragraphs

Prose paragraphs are rare. When you do use them, end every sentence with -합니다, -입니다, or -됩니다.

Examples of acceptable prose:

- "리뷰 가이드라인을 만들자는 의견과, 가이드라인 자체가 오버엔지니어링이라는 의견이 맞섰습니다. 합의에 이르지 못하여 다음 회고에서 다시 다루기로 하였습니다."

Never mix 개조식 bullets and -합니다 endings within the same bullet. Pick one register per bullet, and use 개조식 by default.

## English: bullets

English bullets can be telegraphic or full sentences. Pick one mode within a single list to keep parallelism.

Telegraphic style:

- "Stronger on recent-access patterns"
- "Sensitive to scan-pattern cache pollution"
- "Fails the working-set control requirement"

Full-sentence style:

- "Their advice felt tailor-made to the situation rather than generic."
- "The reference checks revealed a clear pattern of thriving in early-stage chaos."

Do not mix telegraphic and full-sentence bullets in the same list. If half your bullets are telegraphic and half are sentences, rewrite to one mode.

Avoid contractions in English prose. Bullets that drop verbs are fine.

## Nesting

Nested bullets serve three purposes:

- Subdivide a parent claim into named cases, where each child adds a specific instance.
- Show reasoning structure, with the parent as the claim and children as the support.
- Capture two-sided opinions, with the parent naming the topic and children listing the for and against positions.

Do not nest more than two levels. If you need three, split into a new sibling section.

Example of two-sided opinions as nested bullets:

- 코드 리뷰 코멘트 수 줄이기
  - 리뷰 가이드라인을 만들자는 의견
  - 가이드라인이 오버엔지니어링이라는 반대 의견

## Em dash and dashes

Avoid em dashes (—) and en dashes (–). Replace them with one of:

- A comma: "A, B" instead of "A — B"
- A colon: "A: B" instead of "A — B"
- A new sentence
- A new bullet or nested bullet

## Parentheses

Allowed for short inline clarifications such as:

- 위음성(false negative, 좋은 사람을 놓침)
- (이들은 다른 직장을 가장 쉽게 찾을 수 있음)
- LRU(Least Recently Used)

For longer asides, prefer a child bullet or a new sentence. If a parenthetical is more than about ten characters and adds substantive content, it likely belongs on its own line.

## Technical terms

Keep established English technical terms in English: API, latency, throughput, embedding, vector, schema, hit rate, working set, ETA, microservice, verification, cache, evict, scan pattern, cold start.

Do not transliterate them into Hangul. Write "LRU" not "엘알유", "API" not "에이피아이", "hit rate" not "히트 레이트".

Use backticks for inline code identifiers and file names: `CLAUDE.md`, `useState`, `aggregate_benchmark.py`. Do not wrap natural-language terms in backticks.

## Links

Preserve inline links from the source as `[text](url)`. Links are part of the value of the note for later re-reading.

Do not strip URLs even when they look noisy. Do not invent URLs the source did not provide.

If the same link appears multiple times, the first occurrence in the note can carry the link; later mentions can be plain text.

## Faithfulness

The default mode is faithful reorganization. Keep what the source says, restructure it for skim-later use. Do not add interpretations the source did not make.

If the user explicitly asks for inference or implication, place those in a clearly labeled `## Commentary` or `## 코멘트` section so factual recall stays separate from interpretation.

Do not invent facts, citations, or numbers. If a number appears in the source without attribution, leave it as the source reports it. Do not round it to a more confident-sounding figure.
