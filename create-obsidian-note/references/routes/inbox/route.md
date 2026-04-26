# Inbox Route

## Use This Route When

The user wants an unsorted note, a temporary capture, an unknown-destination note, or a request to organize Inbox contents.

Use Inbox when speed matters more than correct final placement, or when the user explicitly asks to "put this somewhere for now."

## Do Not Use This Route When

- The user already gave a clear destination route.
- The user wants a polished reusable learning note.
- The user wants a source-first clipping with clear source context and no ambiguity.
- The item belongs to a known project, course, career process, template, asset, or archive route.

## Inbox Location

Use the vault's active Inbox if one is defined by vault-local rules.

If no active Inbox is defined and the user asks for unsorted capture, create or use a top-level `Inbox/` folder. This folder is intentionally generic and should not encode a private vault taxonomy.

If multiple Inbox candidates exist, ask one concise question before writing or moving files.

## New Inbox Note

Use minimal metadata:

```yaml
---
date: YYYY-MM-DD HH:mm
type: inbox-note
status: needs-triage
summary: ""
---
```

Add `references` only when a source URL or vault link is known. Add `assistant` only if an assistant materially helped write, summarize, translate, or structure the note.

## Body

Keep the body simple. Preserve the captured material and any user-provided context.

Recommended sections:

1. Capture
2. Source
3. Triage hints

## Organizing Inbox

When the user asks to organize Inbox contents, full-scan the Inbox tree before moving or rewriting anything.

Required workflow:

1. Locate the active Inbox root.
2. Enumerate every file under the Inbox root, recursively.
3. Separate normal notes, source files, binary assets, generated artifacts, and system files.
4. For every Markdown note, read frontmatter and enough body text to classify it. If classification is unclear, read the full note.
5. For non-Markdown artifacts, classify by filename, extension, nearby notes, and user-provided context. Do not guess when the owner is unclear.
6. Assign exactly one primary route to every item: learning material, source note, learning track, career artifact, project note, asset reference, template note, system/archive, or keep in Inbox.
7. Produce a routing plan before bulk moves unless the user explicitly asked for direct execution.
8. When executing moves, preserve links when possible. Prefer vault-aware or Obsidian-safe moves when link preservation matters.
9. Leave uncertain items in Inbox with `status: needs-triage` and a short triage reason.

## Triage Output

For an Inbox organization request, report:

- Total items scanned.
- Items moved or proposed by route.
- Items left in Inbox and why.
- Any duplicate or conflict candidates.
- Any moves skipped because link preservation or ownership was unclear.

Do not include private absolute paths in the report. Use vault-relative paths or generic descriptions.

## Promotion Rule

Inbox is temporary. A note leaves Inbox only when one primary home is clear.

- Reusable learning material goes to the learning-material route.
- Raw source capture goes to the source-note route.
- Course or progress material goes to the learning-track route.
- Career or admissions material goes to the career-artifact route.
- Project-local material goes to the project-note route.
- Attachments go to the asset-reference route.
- Reusable scaffolds go to the template-note route.
- System, archive, or recovery items go to the system-archive route.

