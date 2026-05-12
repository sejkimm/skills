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
| `date` | Note creation time or artifact capture time; do not use for source publication dates |
| `reference_created` | Date the primary referenced document was authored, published, posted, or last materially updated |
| `type` | Route-specific note type |
| `summary` | One sentence explaining the note's purpose |
| `status` | Only when lifecycle state matters |
| `references` | List of source URLs or vault links |
| `assistant` | AI model or assistant that materially helped write, summarize, translate, or structure the note |

## Date

Use `date` for the note creation time or artifact capture time.

When creating a new note, capture the timestamp exactly once immediately before the Obsidian CLI write. Use the host local system time, not the model current date.

If the agent runs directly on the macOS host, capture:

```bash
date '+%Y-%m-%d %H:%M'
```

If the agent runs inside a container or remote sandbox while writing to a host vault, do not trust bare `date`; it often returns container UTC. Resolve the host timezone first, then capture with that timezone:

1. Use an explicit user or vault instruction when provided.
2. Use the runtime `timezone` value when the environment context exposes one.
3. Use `TZ` when it is already set to the host IANA timezone, such as `Asia/Seoul`.
4. Use a host-execution transport or mounted host timezone data only when it clearly reflects the vault host.

When the host timezone is known:

```bash
TZ='Area/City' date '+%Y-%m-%d %H:%M'
```

If no reliable host timezone signal is available from inside the container, stop before writing and report that the host timezone is not observable. Do not silently fall back to UTC and do not hardcode KST.

Write the captured value unchanged to frontmatter:

```yaml
date: YYYY-MM-DD HH:mm
```

Do not use the source publication date, model current date, sandbox/container time, file creation time, Obsidian Linter timestamp, or Templater timestamp as the frontmatter creation timestamp.

After writing, verify the saved creation timestamp through Obsidian CLI readback or property inspection. If the saved value differs from the captured timestamp, stop and report the mismatch.

## Reference Created

Use `reference_created` for the primary referenced document's authored, published, posted, or last materially updated date. This separates when the Obsidian note was created from when the referenced document itself was created.

Add `reference_created` only when there is one clear primary reference and the date is present in the reference or supplied by the user:

```yaml
reference_created: YYYY-MM-DD
```

Use a datetime only when the reference itself provides a meaningful time:

```yaml
reference_created: YYYY-MM-DD HH:mm
```

If multiple references have different dates, omit `reference_created` from frontmatter and describe the per-reference dates in the body. Do not overload `references` with nested date objects.

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
