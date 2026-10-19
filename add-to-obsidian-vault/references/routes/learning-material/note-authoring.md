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

Use the active metadata rules as the vocabulary source. Include only the fields required by the vault's current rules, the selected route, or the user's direct request.

If the active metadata rules contain a complete field table, use it as the full set of allowed properties. Follow its field order, value shapes, list caps, slug format, and controlled values. Do not add a property that the table does not list.

Before you add a value to an open-vocabulary list (persons, organizations, technologies), check the existing values in the vault. Reuse an equal value. Make a new value only if no equal value exists.

If no active rule exists, use this baseline:

```yaml
---
date: YYYY-MM-DD HH:mm
type: learning-note
primary: <value-from-active-metadata-rules>
summary: "One sentence that describes the content of the note."
---
```

The summary describes the content. Do not copy the title.

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

Use `reference_created` only for one clear primary reference date. Use the date format of the active rules. If there are multiple references with different dates, keep those dates in the body beside the relevant reference descriptions.

Do not use nested reference objects. Do not add source detail properties by default. If the note really needs source explanation, put it in the body as natural language rather than expanding frontmatter.

## Body

If the vault defines note body rules, follow them. They override the default structure below.

Do not paste the transcript. Distill the material into a reusable note in this order:

1. Summary: the first body section after the title heading. One to three bullets, one core claim each. Write the heading in the note's language, such as `## 요약`.
2. Mechanism or reasoning
3. Evidence, examples, commands, diagrams, or code

Use the topic as the subject. Avoid Q&A framing unless the note is intentionally a FAQ.

### Limits

Write a limit or caveat only where it changes how the reader applies a claim. Put it in one sentence next to that claim, or in a footnote. Add a dedicated limits section only when the source itself is mainly about limits or the user asks for one.

### Writing Style

Write the body in ASD-STE100 Simplified Technical English style:

- One sentence states one idea.
- Use active voice.
- Use short sentences.
- Use one term for one meaning throughout the note.
- Name the subject. Do not use a pronoun when its referent is unclear.

For a Korean note, apply the same rules and end every sentence and bullet with the plain declarative `-다` form.

### Footnotes And Wikilinks

Use Markdown footnotes (`[^n]`) for source citations, term definitions, side details, and caveats that would interrupt the main text. Put each footnote definition at the end of the note. A footnote carries only content that the source supports.

Use wikilinks (`[[Note Title]]`) for related concepts. Before writing, search the vault for existing notes on the key terms of the note. Link each matching note at its first mention in the body.

## MOC Handling

Default to metadata-first and index-optional. Do not manually edit MOC files when adding a normal note. Dataview MOCs update their rendered results from path, filename, and frontmatter.

Only add curated MOC metadata or edit a curated MOC when the user explicitly requests curated MOC handling or the active rule document requires it for that note type.
