# Source Note Route

## Use This Route When

The user wants to preserve a raw source quickly: copied article, quote, thread, source summary, translation, reading note, or "save now, organize later" capture.

## Do Not Use This Route When

- The user asks for a distilled reusable learning note.
- The material is primarily a course, certification, or cohort record.
- The material is tied to an application, interview, assignment, or admissions process.
- The material is a project-local decision or work log.

## Destination

1. Read the active vault rules. Find the boundary rule between the learning-material tree and the source-archive area.
2. If the source passes the boundary rule for the learning-material tree, resolve its folder with `references/routes/learning-material/taxonomy-resolution.md`. Use the learning-material metadata rules and the source-note type value that they define.
3. If the source does not pass, put it in the source-archive area that the active rules define.
4. If the vault has no boundary rule, use the vault's source-note or quick-capture area. Infer it from folder names and note patterns at runtime. Do not add the inferred folder map to this skill.

## Frontmatter

Use the active metadata rules of the destination. If no active rule exists, use this baseline:

```yaml
---
date: YYYY-MM-DD HH:mm
type: source-note
summary: ""
references:
  - https://example.com/source
reference_created: YYYY-MM-DD
---
```

Do not use `status: raw`. The `source-note` type already marks a raw source. Add `status` only for an exception state that the active rules define.

Add `reference_created` only when the source's own date is clearly known. Use the date format of the active rules.

Add `assistant` only if an assistant materially summarized, translated, or restructured the source.

## Body

If the vault defines body rules for source notes, follow them. Use the sections below only as a fallback.

Preserve source context first. A source note can be rough. It does not need a complete learning-note structure.

Recommended sections:

1. Source
2. Capture
3. Notes
4. Follow-up

## Outlier Handling

- If the note becomes reusable knowledge, promote it to the learning-material route after rewriting.
- If the note becomes a project plan, route it to the project route.
- If the note informs a specific application or interview, route it to the career route.
- If it is a reusable prompt scaffold, route it to the template route.
