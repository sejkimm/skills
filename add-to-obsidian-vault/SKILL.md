---
name: add-to-obsidian-vault
description: Use when the user asks to add, place, save, route, classify, move, or organize an Obsidian vault artifact across learning notes, source clips, course records, career artifacts, project notes, assets, templates, archive/system areas, or existing Inbox contents.
---

# Add To Obsidian Vault

## Overview

This skill is an Obsidian vault router. It decides what kind of vault artifact the user is adding or organizing, loads only the relevant route instructions, and then places, creates, moves, or advises on the artifact.

This skill is for vault placement and lifecycle decisions. A separate `create-structured-note` skill writes Markdown notes returned in chat, not learning notes saved to the vault.

The skill must stay portable. It must not encode a private vault snapshot, absolute local paths, personal folder names, file counts, real note titles, real project names, real company names, or dated inspection metadata.

## Required First Reference

Always read:

1. `references/privacy-and-portability.md`
2. `references/obsidian-cli.md`
3. `references/shared-frontmatter.md`
4. `references/shared-markdown-format.md`
5. `references/router.md`

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
- Use Obsidian CLI for vault inspection and mutations when it is available. If it is not available, use the host-shell fallback in `references/obsidian-cli.md` only under its conditions. If neither is available, stop and report.
- Use vault-local active rules at runtime instead of hardcoding a folder map.
- Do not create new notes in Inbox. If the placement of a new note is not clear: in an interactive session, ask one concise question before writing; in an unattended session, apply the fallback of the active rules and report the note in the final output. If the active rules define no fallback, stop and report.
- If the user explicitly asks to create, save, or capture a new note in Inbox, ask for a non-Inbox destination or route.
- When organizing Inbox, full-scan the Inbox tree before moving or rewriting anything.
- Preserve source context for source-first notes; do not force them into durable learning notes.
- Promote notes between routes only when the note's role changes, not merely because the topic overlaps.
- Write only explicitly allowed frontmatter properties: fields required by the selected route, active vault rules, or the user's direct request. Do not invent optional properties. If the active rules contain a complete field table, that table is the full set of allowed properties. Follow its field order, value shapes, list caps, slug format, and controlled values.
- Do not manually edit Dataview or MOC files unless the user explicitly asks for curated MOC handling.
- Do not write private local paths, personal metadata, or inspection counts into generated notes unless the user explicitly asks for a local-environment note.

## Active Vault Rule Precedence

Active vault rule documents win over the reference files of this skill on these topics:

- Folder placement and folder naming.
- The boundary between the learning-material tree and the source-archive area.
- Frontmatter fields, field order, values, list caps, and vocabulary.
- Review status values and the fallback for unclear placement.
- Note body structure.

The examples in the reference files are fallbacks for vaults without rules.

## Output Standard

Write a note or routing recommendation, not a transcript. Preserve the reusable conclusion, source, context, and relevant links according to the selected route. Apply the shared Markdown body formatting rules before writing. Verify writes through Obsidian CLI, or through the host-shell fallback when its conditions are true. If verification fails, stop and report the error. Leave no validation artifacts behind.
