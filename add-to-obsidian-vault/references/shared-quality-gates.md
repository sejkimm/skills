# Shared Quality Gates

## Before Writing

Confirm:

- The target vault is identified by the current workspace or explicit user context.
- The selected route is clear.
- The destination folder exists or the user explicitly asked to create it.
- The note has one physical home.
- New notes are not being written to Inbox.
- Inbox organization requests used a full Inbox inventory, not a sample.
- The title is specific enough to avoid ambiguity.
- A duplicate or near-duplicate check was performed when creating a new Markdown note.
- Private paths and private local metadata are not being written into the note unless explicitly requested.

## Stop Conditions

Stop and ask one concise question if:

- The target vault cannot be identified.
- Two routes remain equally plausible.
- More than one Inbox candidate exists and the intended Inbox root cannot be identified.
- The user wants to create a new note in Inbox or asks for an unsorted/temporary note without a non-Inbox destination.
- The user appears to want a raw capture but also asks for a polished learning note.
- The only apparent destination would violate a known vault-local folder rule.
- Creating the note would silently duplicate an existing note.
- Required route-specific rule documents are missing or conflict.

## After Writing

Verify:

- The file exists.
- Frontmatter is valid YAML.
- Required route-specific fields are present.
- Optional metadata is useful, not decorative.
- Links are source URLs or likely valid vault links.
- No private absolute path was written by accident.
- No MOC or index file was edited unless the user asked for curated MOC handling.
