# Shared Markdown Format

## Scope

Apply these rules to generated Markdown note bodies before writing them to the vault.

Do not apply these rules inside YAML frontmatter or fenced code blocks.

## List Indentation

Prefer literal tab characters for Markdown body list indentation.

Use this shape when possible:

```markdown
- top level
	- second level
		- third level
```

If the generator or formatter must use spaces, use 4 spaces per nesting depth. Do not use 2-space indentation in new note bodies.

Use this shape only when space indentation is required or when an Obsidian Linter rule will normalize to it:

```markdown
- top level
    - second level
        - third level
```

Depth rules:

- Depth 1: no indent
- Depth 2: one literal tab or 4 spaces
- Depth 3: two literal tabs or 8 spaces

For deeper lists, increase by one literal tab or 4 spaces per depth.

## Exceptions

- YAML frontmatter always uses spaces.
- Fenced code block indentation must preserve code meaning.
- Existing notes may keep their current indentation unless the user asks for normalization or the edited block is being rewritten.
