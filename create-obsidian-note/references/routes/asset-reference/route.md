# Asset Reference Route

## Use This Route When

The user asks to place, index, describe, or route a binary file, generated artifact, attachment, image, PDF, slide deck, spreadsheet, media file, dataset, or other non-note asset.

## Destination Rule

Prefer local ownership:

1. If one project owns the asset, keep it under that project.
2. If one course or cohort owns it, keep it under that learning-track area.
3. If one career artifact owns it, keep it near that artifact.
4. If one learning note owns it, link or colocate according to vault-local rules.
5. If ownership is unclear or shared, use the vault's shared asset area if one exists.

Do not default to a shared asset area when a clear local owner exists.

## Metadata

Only create a Markdown index note when useful. If creating one, use:

```yaml
---
date: YYYY-MM-DD HH:mm
type: asset-reference
status: active
summary: ""
---
```

## Outlier Handling

- Generated standalone guides can remain assets if they are not normal notes.
- Source PDFs tied to one note should be linked from that note.
- Career assignment files should stay with the career artifact.
- Course datasets and notebooks should stay with the course unless they become independent projects.

