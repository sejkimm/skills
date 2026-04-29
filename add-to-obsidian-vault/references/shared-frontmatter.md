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
