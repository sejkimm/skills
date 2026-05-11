# Shared Frontmatter

## Baseline

Use the smallest explicitly allowed frontmatter.

```yaml
---
date: YYYY-MM-DD HH:mm
type: <note-type>
summary: ""
---
```

Write only properties explicitly named by the selected route, active vault rules, or the user's direct request. Do not add properties merely because they seem useful for retrieval, provenance, routing, or lifecycle clarity.

## Shared Fields

These fields are available only when explicitly allowed by the selected route, active vault rules, or the user's direct request.

| Field | Use |
|---|---|
| `date` | Note creation time or artifact capture time |
| `type` | Route-specific note type |
| `summary` | One sentence explaining the note's purpose |
| `status` | Only when lifecycle state matters |
| `references` | List of source URLs or vault links |
| `assistant` | AI model or assistant that materially helped write, summarize, translate, or structure the note |

## Date

Use `date` for the note creation time or artifact capture time.

When creating a new note, capture the timestamp exactly once immediately before the Obsidian CLI write. Use the macOS host local system time from the same execution context used for Obsidian CLI:

```bash
date '+%Y-%m-%d %H:%M'
```

Write that value unchanged to frontmatter:

```yaml
date: YYYY-MM-DD HH:mm
```

Do not use the source publication date, model current date, sandbox/container time, file creation time, Obsidian Linter timestamp, or Templater timestamp as the frontmatter `date`.

After writing, verify the saved `date` value through Obsidian CLI readback or property inspection. If the saved value differs from the captured timestamp, stop and report the mismatch.

## References

Use a list of URLs or vault links:

```yaml
references:
  - https://example.com/source
```

Do not use nested reference objects:

```yaml
references:
  - title: "Source title"
    url: "https://example.com"
```

Keep source details in the body unless a vault-local rule explicitly requires specific properties.

## Assistant

Use `assistant` only for provenance, never as topic or category metadata. If the model is unknown, omit the field rather than guessing.
