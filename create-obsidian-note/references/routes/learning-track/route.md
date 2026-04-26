# Learning Track Route

## Use This Route When

The item belongs to a structured learning program: course, certification, cohort, challenge, language study, quiz, assignment, lecture note, or progress record.

## Do Not Use This Route When

- The result is a durable learning note independent of the course.
- The item is a raw source clipping unrelated to a learning program.
- The item is tied to one job application or interview process.
- The item is an independent project.

## Destination

Use the vault's learning-track or course-progress area if active rules define one. Otherwise infer a destination by role at runtime. Course asset trees may contain mixed file types because preserving the course structure is often more useful than enforcing note-only folder purity.

## Frontmatter

Use a route-specific type:

```yaml
---
date: YYYY-MM-DD HH:mm
type: course-note
status: active
track: ""
references:
  - https://example.com/course
summary: ""
---
```

Use `certification-note`, `challenge-note`, or `language-note` when more specific.

## Body

Prefer a progress-oriented structure:

1. Link or source
2. Timeline or module
3. Notes
4. Exercises or artifacts
5. Next steps

## Outlier Handling

- Distill reusable concepts into the learning-material route.
- Keep course dumps, notebooks, datasets, and quizzes in this route while they remain course-bound.
- Move company-specific interview preparation to the career route.
- Move independent implementation work to the project route.

