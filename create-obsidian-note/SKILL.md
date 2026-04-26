---
name: create-obsidian-note
description: Use when the user asks to save a conversation, technical explanation, external resource analysis, or reusable learning as a new Obsidian note in a Learning Material vault.
---

# Create Obsidian Note

## Overview

Create one distilled, reusable learning note in an Obsidian `Learning Material` tree. This skill is a resolver: it reads the vault's current canonical taxonomy rules at runtime instead of carrying a fixed folder map.

## When to Use

Use when the user explicitly asks to create or save a reusable Obsidian note from a conversation, explanation, source analysis, or technical learning artifact.

Do not use for project logs, course progress, article clipping, daily notes, or short-lived reminders unless the user explicitly says the note belongs in `Learning Material`.

## Required References

Read these support files in order:

1. `references/taxonomy-resolution.md`
2. `references/note-authoring.md`
3. `references/quality-gates.md`

## Core Rules

- Do not hardcode private absolute paths, personal vault names, dated rule filenames, or a fixed taxonomy table.
- Locate the active `Learning Material` tree from the current workspace or from the user's explicit vault context.
- Treat the vault's active operating rules and metadata rules as the source of truth.
- Give every note exactly one physical home folder.
- Preserve the vault's folder content rule: a normal folder should contain either subfolders or notes, not both, except for explicit taxonomy, MOC, index, archive, attachment, template, or Inbox exceptions defined by the active rules.
- Use frontmatter for vendor, product, source, assistant, secondary domain, and cross-domain retrieval axes.
- Do not manually edit Dataview MOC files unless the user explicitly asks for curated MOC handling.
- If active rules conflict, required rule documents are missing, or placement remains ambiguous after applying the rules, stop and ask one concise question.

## Output Standard

Write a note, not a transcript. Preserve the reusable conclusion, mechanism, evidence, limitations, and relevant links. Verify the file exists, frontmatter is valid, and no duplicate note was silently created.
