# WARP.md

This directory contains a bilingual writing skill implemented in Markdown.

## Structure

- `SKILL.md` is the router. Keep it short and limited to language selection,
  workflow, and global formatting policy.
- `en/rules.md` contains the English editing rules.
- `ko/rules.md` contains the Korean workflow and links to Korean references.
- `ko/patterns/` contains Korean pattern files.
- `ko/examples/` contains Korean examples.

## Editing Guidance

When changing behavior, update the routed language file, not the router, unless
the route selection itself changes.

Keep the heavy-emphasis and label-led-list cleanup optional. They are not
required AI-writing rules unless the user requests them, a style guide requires
them, or they appear as part of another active pattern.

Preserve valid YAML frontmatter in `SKILL.md`. Only `name` and `description` are
needed.
