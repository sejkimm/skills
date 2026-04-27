# Note Authoring

## Scope Check

Create a learning-material note only when the result is reusable learning material. If the content is mainly a project log, course-progress record, article archive, daily note, or temporary reminder, route it outside this route or ask for confirmation.

## Filename

Use the vault's current filename convention. If no active rule overrides it, use:

```text
(YYYY.MM) Specific Title.md
```

Use the note creation month, not the source publication month. Choose a title specific enough to avoid wikilink ambiguity. Avoid time-relative, requester-centric, or generic names such as `Today`, `This Conversation`, `User Asked`, `Overview.md`, or a bare vendor name.

## Duplicate Check

Before writing, check exact filename collision and likely duplicate topics in the selected learning-material tree.

If a close note exists, ask whether to merge, append, or create a more specific note. Do not create duplicates silently.

## Frontmatter

Use the active metadata rules as the vocabulary source. At minimum, include the fields required by the vault's current rules.

If no stricter active rule exists, use this baseline:

```yaml
---
date: YYYY-MM-DD HH:mm
type: learning-note
primary: <value-from-active-metadata-rules>
summary: "One sentence that explains what this note is for."
---
```

Use `status` only for exception states such as `needs-review` or `deprecated`, unless active local rules require normal lifecycle values.

Add optional metadata only when it improves retrieval or provenance:

```yaml
domains:
  - <application-domain>
technologies:
  - <technology-or-protocol>
vendors:
  - <company-or-organization>
products:
  - <product-service-model-or-hardware>
assistant:
  - <assistant-or-model-name>
references:
  - https://example.com/source
also_relevant:
  - <secondary-primary-lens-if-supported>
```

Do not repeat the primary lens in `domains`. `domains` is an application or context axis, not the physical home.

## Assistant Naming

Use `assistant` only for provenance: the AI model or assistant that materially helped write, summarize, translate, or structure the note. Do not use it as a topic, category, or vendor field.

Use canonical names from the vault's active metadata rules when available. If the model is unknown, do not guess. Omit `assistant` or use `assistant: []` if the active metadata rules prefer explicit empty values.

## Reference Properties

Keep frontmatter compatible with Obsidian property types. Obsidian Properties support scalar and list values; nested objects are not supported in the Properties UI.

Use `references` only as a list of URLs or vault links:

```yaml
references:
  - https://example.com/source
```

Do not use nested reference objects. Do not add source detail properties by default. If the note really needs source explanation, put it in the body as natural language rather than expanding frontmatter.

## Body

Do not paste the transcript. Distill the material into a reusable note:

1. Core claim or conclusion
2. Mechanism or reasoning
3. Evidence, examples, commands, diagrams, or code
4. Limits, gotchas, and assumptions
5. Related vault links, only when the target likely exists

Use the topic as the subject. Avoid Q&A framing unless the note is intentionally a FAQ.

## MOC Handling

Default to metadata-first and index-optional. Do not manually edit MOC files when adding a normal note. Dataview MOCs update their rendered results from path, filename, and frontmatter.

Only add curated MOC metadata or edit a curated MOC when the user explicitly requests curated MOC handling or the active rule document requires it for that note type.
