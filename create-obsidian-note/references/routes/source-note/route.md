# Source Note Route

## Use This Route When

The user wants to preserve a raw source quickly: copied article, quote, thread, source summary, translation, reading note, or "save now, organize later" capture.

## Do Not Use This Route When

- The user asks for a distilled reusable learning note.
- The material is primarily a course, certification, or cohort record.
- The material is tied to an application, interview, assignment, or admissions process.
- The material is a project-local decision or work log.

## Destination

Use the vault's source-note or quick-capture area if active rules define one. If not, infer the current source-first area from folder names and note patterns at runtime. Do not add the inferred private folder map to this skill.

## Frontmatter

Use:

```yaml
---
date: YYYY-MM-DD HH:mm
type: source-note
status: raw
references:
  - https://example.com/source
summary: ""
---
```

Add `assistant` only if an assistant materially summarized, translated, or restructured the source.

## Body

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

