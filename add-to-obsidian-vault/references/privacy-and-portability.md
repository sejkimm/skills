# Privacy And Portability

## Purpose

Keep this skill usable across vaults without exposing private local context.

## Never Store These In The Skill

- Private absolute paths
- Usernames, home directories, machine names, or cloud-sync paths
- Personal vault names
- Real note titles from a private vault
- Real project names from a private vault
- Real company or school names from a private vault
- File counts, folder counts, or dated inspection snapshots
- Private metadata values copied from existing notes
- One user's complete folder map as a fixed taxonomy

## Allowed Patterns

Use generic placeholders:

- `<vault-root>`
- `<folder>`
- `<inbox-root>`
- `<note-title>`
- `<project-name>`
- `<organization>`
- `<source-url>`

Use role examples instead of private examples:

- `technical essay summary`
- `course quiz`
- `company-specific interview prep`
- `project overview`
- `generated artifact`
- `meeting template`
- `Inbox triage`

## Runtime Inspection Rule

Runtime inspection is allowed, but inspection findings must not become reusable skill content.

Allowed:

- Inspect the current vault to choose a destination.
- Read active vault rule documents.
- Check whether a folder exists before writing.
- Check for duplicates before creating a note.

Not allowed:

- Writing file counts or private file names into skill references.
- Adding a private folder snapshot to route instructions.
- Treating one vault's current state as a global rule.

## Generated Note Rule

Do not write private local absolute paths into generated notes unless the user explicitly asks for a local-environment note. Prefer vault-relative links and source URLs.
