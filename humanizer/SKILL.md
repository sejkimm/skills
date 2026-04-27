---
name: humanizer
description: Use when editing or reviewing English or Korean text to remove AI-generated writing patterns while preserving meaning, tone, and voice.
---

# Humanizer Router

This skill routes text to the right language-specific humanizer rules.

## Route

- Use `en/rules.md` for English text.
- Use `ko/rules.md` for Korean text.
- For mixed Korean and English, choose the dominant language, then consult the other rules only for embedded passages where those rules clearly apply.
- If the user explicitly asks for Korean, 한국어, or the old `humanizer-ko` behavior, use `ko/rules.md`.
- If the language is ambiguous, infer from the text instead of asking unless the choice would change the user's requested tone.

## Workflow

1. Read the input carefully and identify the language route.
2. Read the routed rules file.
3. Load only the referenced examples or pattern files needed for the text type.
4. Rewrite the text to remove AI-generated writing patterns.
5. Preserve the original meaning, register, and intended audience.
6. Do a second pass for leftover AI-sounding phrasing.
7. Use the output format specified by the routed rules file.

## Formatting Cleanup

Do not treat heavy bold emphasis or label-led bullet lists as required AI-writing
signals by default. Clean them only when the user asks, the target style guide
requires it, or they are part of another active issue such as chatbot artifacts,
emoji decoration, promotional copy, or repetitive rule-of-three structure.
