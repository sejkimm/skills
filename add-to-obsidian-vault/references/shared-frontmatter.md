# Shared Frontmatter

## Baseline

Use the smallest frontmatter that supports retrieval and provenance.

```yaml
---
date: YYYY-MM-DD HH:mm
type: <note-type>
summary: ""
---
```

Add route-specific fields only when the route reference asks for them or when they clearly help retrieval.

## Shared Fields

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

Keep source details in the body unless a vault-local rule requires specific properties.

## Assistant

Use `assistant` only for provenance, never as topic or category metadata. If the model is unknown, omit the field rather than guessing.

