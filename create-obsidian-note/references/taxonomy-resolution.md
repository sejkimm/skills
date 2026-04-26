# Taxonomy Resolution

## Goal

Resolve the note's physical folder and `primary` metadata from the vault's current rules. Do not preserve taxonomy decisions inside the skill itself.

## Locate the Vault

Use the user's explicit path or current workspace first. The target vault must contain a `Learning Material` directory.

If the current workspace is already the vault root, use:

```bash
find "Learning Material" -maxdepth 2 -type d | sort
```

If not, inspect nearby workspace paths. Do not embed personal absolute paths in notes, skill files, or reusable examples.

## Find Active Rule Documents

Inside `Learning Material/00. Maps & Taxonomy`, locate the current taxonomy documents by meaning, not by dated filename.

Preferred signals:

- Stable title or filename such as `Learning Material Operating Rules`
- Frontmatter such as `type: taxonomy-rule`
- `status: active`
- Headings or content that define folder placement, metadata, MOC behavior, or note creation rules

Use the operating rules as the source of truth for folder placement, Inbox fallback, and MOC behavior. Use metadata rules for frontmatter vocabulary and examples. If multiple active rule documents conflict, stop and ask before writing.

## Resolve Placement

1. Rewrite the source material into one learning question.
2. Read the active folder decision table from the operating rules.
3. Choose exactly one physical top-level folder by primary learning lens.
4. Read the active ambiguity rules for cross-domain cases.
5. Inspect the real folder tree under the chosen top-level folder.
6. Choose the narrowest existing leaf folder that matches the learning question and preserves the folder content rule.

Do not create a new leaf folder for a single note unless the user explicitly asks for a structural change. Store one level up until the topic has enough notes to justify a new folder, but never place a normal note directly in a branch folder that already contains subfolders.

## Folder Content Rule

For normal learning folders, a folder should be either:

- a branch folder that contains subfolders, or
- a leaf folder that contains notes.

Do not mix normal notes and subfolders under the same folder. If a leaf folder needs to become more granular, move its existing notes into appropriate child leaf folders before treating it as a branch folder.

Follow the active operating rules for exceptions. Common exceptions are taxonomy, MOC, index, archive, attachment, template, and Inbox areas.

## Ambiguity Handling

Use metadata and dynamic MOCs for secondary axes. Do not move a note into a folder mainly because of:

- vendor
- product
- source website
- assistant used
- project where the question arose
- application domain that is not the primary learning question

If placement remains unclear, use the vault's Inbox rule only when saving now is more important than resolving taxonomy immediately. Mark the note as needing review and include a placement reason if the active metadata rules support that field.

## Anti-Drift Rules

- Do not refer to rule section numbers; use headings or document roles.
- Do not copy the folder decision table into this skill.
- Do not use old primary aliases from memory.
- Do not assume a folder still exists; inspect the current tree.
- Do not assume a folder can accept notes just because it exists; check whether it is a branch folder with subfolders.
- Do not assume a dated metadata rule file is still current.
