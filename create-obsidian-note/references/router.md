# Router

## Goal

Choose the note route by operational role before topic. A note about the same topic may belong in different routes depending on whether it is a raw source, durable learning note, course artifact, career artifact, or project-local record.

## Routing Questions

Ask these in order:

1. Is the user asking to preserve a raw source quickly?
2. Is the user asking for an unsorted capture or Inbox triage?
3. Is the result meant to be reusable learning material?
4. Is the item part of a course, certification, challenge, language cohort, or learning-progress record?
5. Is it tied to a job, application, interview, resume, assignment, or admissions process?
6. Is it meaningful mainly inside one project?
7. Is it a reusable template or prompt scaffold?
8. Is it a binary artifact or attachment reference?
9. Is it an archive, trash, recovery, or app-configuration decision?

## Route Map

| Role | Reference |
|---|---|
| Unsorted capture or Inbox organization | `references/routes/inbox/route.md` |
| Durable learning note | `references/routes/learning-material/route.md` |
| Raw source or quick capture | `references/routes/source-note/route.md` |
| Course or learning-progress record | `references/routes/learning-track/route.md` |
| Career or admissions artifact | `references/routes/career-artifact/route.md` |
| Project-local note | `references/routes/project-note/route.md` |
| Binary or generated artifact | `references/routes/asset-reference/route.md` |
| Reusable scaffold or prompt | `references/routes/template-note/route.md` |
| System, archive, trash, or recovery decision | `references/routes/system-archive/route.md` |

## Tie Breakers

- If the user says "distill", "explain", "make reusable", or "learning note", prefer `learning-material`.
- If the user says "Inbox", "unsorted", "triage", "sort my inbox", or "organize Inbox", prefer `inbox`.
- If the user says "copy", "clip", "save source", "just store this", or "no LLM", prefer `source-note`.
- If the user says "course", "class", "certification", "quiz", "challenge", or "cohort", prefer `learning-track`.
- If the user says "job", "resume", "application", "interview", "assignment", "coding test", or "admissions", prefer `career-artifact`.
- If the user names a project context and the note would not be useful outside that project, prefer `project-note`.
- If the user asks for a reusable prompt or note skeleton, prefer `template-note`.

If two routes remain equally plausible, ask one concise question. Do not silently duplicate a note across routes.

## Promotion Rule

Moving a note across routes is promotion only when the note's role changes:

- Source note to learning note: after distillation.
- Course note to learning note: after extracting reusable concepts.
- Career prep to learning note: after removing application-specific framing.
- Project note to learning note: after extracting generalizable knowledge.
- Project artifact to career artifact: when the artifact primarily documents an application or interview process.
- Inbox note to any route: after full-scan triage identifies one primary home.

## Inbox Organization Rule

If the user asks to organize Inbox contents, do not sample. Full-scan the Inbox tree first, classify every document or artifact, and then move or rewrite items according to the selected route rules.
