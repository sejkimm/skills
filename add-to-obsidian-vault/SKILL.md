---
name: add-to-obsidian-vault
description: Use when the user asks to add, place, save, route, classify, move, or organize an Obsidian vault artifact across learning notes, source clips, course records, career artifacts, project notes, assets, templates, archive/system areas, or existing Inbox contents.
---

# Add To Obsidian Vault

## Overview

This skill is an Obsidian vault router. It decides what kind of vault artifact the user is adding or organizing, loads only the relevant route instructions, and then places, creates, moves, or advises on the artifact.

This skill is for vault placement and lifecycle decisions. A separate `create-obsidian-note` skill can own the task of turning given text or information into an Obsidian-ready note body.

The skill must stay portable. It must not encode a private vault snapshot, absolute local paths, personal folder names, file counts, real note titles, real project names, real company names, or dated inspection metadata.

## Required First Reference

Always read:

1. `references/privacy-and-portability.md`
2. `references/router.md`

Then read only the selected route reference.

## Route Selection

Use the user's wording and the current vault context to select exactly one primary route:

| User intent | Route |
|---|---|
| Request to organize existing Inbox contents | `references/routes/inbox/route.md` |
| Reusable concept, mechanism, technical explanation, paper note, or durable learning artifact | `references/routes/learning-material/route.md` |
| Raw source clipping, copied article, quote, quick capture, or source-first note | `references/routes/source-note/route.md` |
| Course, certification, cohort, challenge, language study, quiz, or learning progress record | `references/routes/learning-track/route.md` |
| Job posting, resume, application, interview, coding test, assignment, recap, or admissions artifact | `references/routes/career-artifact/route.md` |
| Project-specific plan, decision, design, research note, or project-local asset | `references/routes/project-note/route.md` |
| Binary attachment, generated artifact, or shared file reference | `references/routes/asset-reference/route.md` |
| Reusable note scaffold or prompt template | `references/routes/template-note/route.md` |
| Obsidian configuration, trash, archive, recovery, or system-area decision | `references/routes/system-archive/route.md` |

If two routes remain equally plausible after reading the router rules, ask one concise question. If the user explicitly names a route or folder, prefer that unless it conflicts with the route's stop conditions.

## Core Rules

- Classify by operational role before topic.
- Give each normal note exactly one physical home.
- Use vault-local active rules at runtime instead of hardcoding a folder map.
- Do not create new notes in Inbox. If a new note's destination is unknown, ask one concise question before writing instead of saving to Inbox.
- If the user explicitly asks to create, save, or capture a new note in Inbox, ask for a non-Inbox destination or route.
- When organizing Inbox, full-scan the Inbox tree before moving or rewriting anything.
- Preserve source context for source-first notes; do not force them into durable learning notes.
- Promote notes between routes only when the note's role changes, not merely because the topic overlaps.
- Use frontmatter only when it improves retrieval, provenance, routing, or lifecycle clarity.
- Do not manually edit Dataview or MOC files unless the user explicitly asks for curated MOC handling.
- Do not write private local paths, personal metadata, or inspection counts into generated notes unless the user explicitly asks for a local-environment note.

## Output Standard

Write a note or routing recommendation, not a transcript. Preserve the reusable conclusion, source, context, limits, and relevant links according to the selected route. Verify the file exists and the frontmatter is valid whenever writing a file.
