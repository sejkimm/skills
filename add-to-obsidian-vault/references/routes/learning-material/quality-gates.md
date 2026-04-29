# Quality Gates

## Before Writing

Confirm these conditions:

- The current workspace or user-provided context identifies the target vault.
- A learning-material tree or explicit equivalent exists.
- Active operating rules and metadata rules were read from the vault.
- The chosen folder exists in the current tree.
- The note has exactly one physical home.
- The chosen folder is a leaf folder for normal notes, or it is covered by an explicit exception in the active rules.
- The title is specific and does not collide with an existing basename.

## Stop Conditions

Stop and ask one concise question if any of these are true:

- The vault cannot be located.
- The learning-material tree cannot be found.
- Active rule documents are missing.
- Multiple active rule documents conflict.
- The folder tree and active rules disagree in a way that affects placement.
- The only apparent destination would mix normal notes and subfolders under one folder without an explicit exception.
- Two physical homes remain equally plausible after applying the ambiguity rules.
- The user appears to want a project log, archive, or temporary note rather than reusable learning material.

## After Writing

Verify:

- The file exists.
- Required frontmatter fields are present.
- `primary`, when required, uses the active metadata vocabulary.
- Every written property is explicitly allowed by active metadata rules, the selected route, or the user's direct request.
- `assistant`, when present, uses canonical naming from active rules.
- `references`, when present, is an Obsidian-compatible list of URLs or vault links.
- The note was not written into a branch folder that already contains subfolders, unless the active rules explicitly allow that folder type.
- No private local absolute path was written unless the note is explicitly about that local environment.
- Wikilinks point to likely existing notes, or speculative links are removed.
- MOC files were not edited unless curated MOC handling was explicitly requested.

## Public-Repo Hygiene

This skill may be published. Keep it portable:

- Do not include private usernames, home directories, cloud-sync paths, machine names, or local project paths.
- Do not encode one user's vault folder map into the skill.
- Use generic route examples and placeholders.
- Keep personal operating decisions in the vault's canonical rule documents, not in the public skill.
