# Project Note Route

## Use This Route When

The note is meaningful mainly inside one project: overview, plan, decision, design, research memo, implementation note, asset index, dataset note, or project-local work log.

## Do Not Use This Route When

- The note is reusable knowledge independent of the project.
- The note is a raw source clipping with no project-specific work.
- The note documents a job application or interview process.
- The note is course-bound.

## Destination

Use the vault's project area if active rules define one. Otherwise infer the project destination from explicit user context. Create a new project folder only when the user clearly intends ongoing project work.

## Frontmatter

Use:

```yaml
---
date: YYYY-MM-DD HH:mm
type: project-note
status: active
project: ""
references:
  - https://example.com/source
summary: ""
---
```

## Body

Recommended sections:

1. Context
2. Decision or finding
3. Evidence
4. Next steps
5. Project links

## Outlier Handling

- Distill generalizable findings into the learning-material route.
- Keep the project-specific framing in the project route.
- Keep original career assignments in the career route unless the work becomes independent.
- Keep source-first material in the source-note route and link to it if needed.

