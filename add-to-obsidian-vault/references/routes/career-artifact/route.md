# Career Artifact Route

## Use This Route When

The artifact is tied to career execution: job posting, resume, application form, interview prep, interview recap, coding test, take-home assignment, company research, admissions, transcript, diploma, or statement of purpose.

## Do Not Use This Route When

- The note is generic reusable technical knowledge.
- The note is general course or certification progress.
- The note is a raw article not tied to a career decision.
- The note is an independent project artifact.

## Destination

Use the vault's career or admissions area if active rules define one. Otherwise infer a destination by process stage and year only at runtime. Do not encode observed private process stages into this skill.

## Frontmatter

Use:

```yaml
---
date: YYYY-MM-DD HH:mm
type: career-artifact
status: active
career_area: ""
organization: ""
role: ""
year: YYYY
references:
  - https://example.com/source
reference_created: YYYY-MM-DD
summary: ""
---
```

Use `reference_created` only for the referenced posting, assignment, or official document date when it is clearly known.

For sensitive or official documents, frontmatter may be optional. Preserve original files as-is.

## Outlier Handling

- Distill reusable technical prep into the learning-material route.
- Keep application-specific framing here.
- Keep original assignment records here, even if a later independent project emerges elsewhere.
- Keep assignment-local binary files beside the assignment when they are only useful there.
