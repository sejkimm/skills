# Template Note Route

## Use This Route When

The user wants a reusable note scaffold, prompt template, meeting template, research template, study template, or repeatable writing structure.

## Do Not Use This Route When

- The user wants a normal note created from a template.
- The prompt or scaffold is useful only inside one project.
- The content is a source article about prompting, not a reusable prompt.

## Destination

Use the vault's template area if active rules define one. Otherwise ask before creating a new template area.

## Template Frontmatter

Use generic placeholders. Do not include real private metadata values.

```yaml
---
date: <% tp.file.creation_date() %>
type:
summary: ""
---
```

If the vault does not use Templater, use plain placeholders instead of Templater syntax.

## Body

Use placeholders and reusable headings. Do not include real personal content except as explicitly requested by the user.

## Outlier Handling

- Reusable prompts stored as normal notes can be moved conceptually to this route.
- Project-specific prompts stay in the project route.
- Source notes about prompt design stay in the source-note route unless converted into a reusable scaffold.

