# Humanizer

A bilingual Codex/Claude skill for editing AI-generated English and Korean text
into more natural writing.

`SKILL.md` is now only the router. The actual editing rules live under each
language directory:

```text
humanizer/
├── SKILL.md
├── en/
│   └── rules.md
└── ko/
    ├── rules.md
    ├── patterns/
    └── examples/
```

## Usage

Invoke the skill with English, Korean, or mixed text:

```text
/humanizer

[paste text here]
```

The router selects `en/rules.md` for English and `ko/rules.md` for Korean. Mixed
text uses the dominant language first, then consults the other rules only for
embedded passages.

## Rule Scope

The required rules focus on patterns that commonly make text sound generated:

- significance inflation and vague importance claims
- promotional language
- superficial connective analysis
- vague attribution
- AI-heavy vocabulary
- negative parallelism
- forced three-part lists
- synonym cycling
- false ranges
- dash or comma overuse
- emoji decoration
- chatbot artifacts
- knowledge-cutoff disclaimers
- sycophantic tone
- filler, hedging, and generic conclusions
- Korean-specific technical-term, personification, and register issues

Pure formatting cleanup, such as heavy emphasis or label-led bullet items, is
optional. Apply it only when requested, required by the target style guide, or
part of another active issue such as emoji decoration or repetitive list
structure.

## References

- English humanizer rules are copied and adapted from
  [blader/humanizer](https://github.com/blader/humanizer), distributed under
  the MIT License. Original copyright notice: Copyright (c) 2025 Siqi Chen.
- Korean humanizer rules were originally maintained in this repository as
  `humanizer-ko` and are now merged into this `humanizer` skill.
- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- [WikiProject AI Cleanup](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup)
