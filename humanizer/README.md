# Humanizer

A bilingual Codex/Claude skill for editing AI-generated English and Korean text
into more natural writing.

```text
humanizer/
├── SKILL.md      # shared rules, routing, workflow
├── en/rules.md   # English patterns
└── ko/rules.md   # Korean patterns and output format
```

## Usage

```text
/humanizer

[paste text here]
```

`SKILL.md` picks `en/rules.md` or `ko/rules.md` by the dominant language. Its
shared rules apply to both: never invent facts, keep every supported claim and
the original register, and act only on strong or co-occurring patterns.
Formatting-only cleanup is optional.

## References

- English rules are adapted from [blader/humanizer](https://github.com/blader/humanizer),
  MIT License, Copyright (c) 2025 Siqi Chen.
- Korean translationese, severity, and over-polish guard ideas are adapted from
  [epoko77-ai/im-not-ai](https://github.com/epoko77-ai/im-not-ai), MIT License,
  Copyright (c) 2026 epoko77-ai.
- [KatFishNet](https://aclanthology.org/2025.acl-long.1030/) (ACL 2025), source
  of the Korean comma signal.
- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
  maintained by WikiProject AI Cleanup.
