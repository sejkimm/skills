# Quality Gates

## Before Writing

Confirm these conditions:

- The current workspace or user-provided context identifies the target vault.
- A `Learning Material` directory exists.
- Active operating rules and metadata rules were read from the vault.
- The chosen folder exists in the current tree.
- The note has exactly one physical home.
- The chosen folder is a leaf folder for normal notes, or it is covered by an explicit exception in the active rules.
- The title is specific and does not collide with an existing basename.

## Stop Conditions

Stop and ask one concise question if any of these are true:

- The vault cannot be located.
- `Learning Material` cannot be found.
- Active rule documents are missing.
- Multiple active rule documents conflict.
- The folder tree and active rules disagree in a way that affects placement.
- The only apparent destination would mix normal notes and subfolders under one folder without an explicit exception.
- Two physical homes remain equally plausible after applying the ambiguity rules.
- The user appears to want a project log, archive, or temporary note rather than reusable learning material.

## After Writing

Verify the result:

```bash
test -f "$NOTE_PATH"
sed -n '1,40p' "$NOTE_PATH"
find "Learning Material" -type f -name "$(basename "$NOTE_PATH")"
```

Check that:

- Required frontmatter fields are present.
- `primary` uses the active metadata vocabulary.
- Optional metadata is useful and not decorative.
- `assistant`, when present, uses canonical naming from the note-authoring rule. Legacy aliases such as `Opus 4.7`, `Sonnet 4.6`, `GPT o1`, `ChatGPT`, or comma-separated scalar values are not used.
- `references`, when present, is an Obsidian-compatible list of URLs or vault links. Nested reference objects such as `references: - title: ...` are not used.
- Extra source detail properties such as `source_title`, `source_author`, `published`, and `accessed` are not added by default.
- The note was not written into a branch folder that already contains subfolders, unless the active rules explicitly allow that folder type.
- No private local absolute path was written into the note unless the note is explicitly about that local environment.
- Wikilinks point to likely existing notes, or speculative links are removed.
- MOC files were not edited unless curated MOC handling was explicitly requested.

## Public-Repo Hygiene

This skill may be published. Keep it portable:

- Do not include private usernames, home directories, cloud-sync paths, machine names, or local project paths.
- Do not encode one user's vault folder map into the skill.
- Use relative examples rooted at `Learning Material`.
- Keep personal operating decisions in the vault's canonical rule documents, not in the public skill.
