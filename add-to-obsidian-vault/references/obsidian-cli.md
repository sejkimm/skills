# Obsidian CLI

## Goal

Use Obsidian's `obsidian` command for vault-aware inspection and changes.

## Availability

- Check `command -v obsidian` before relying on CLI behavior.
- Prefer `obsidian vaults verbose` for target vault discovery. Use `obsidian vault info=name` or `obsidian vault info=path` only when active-vault output is present.
- Pass `vault=<name>` once the target vault is known, especially when more than one vault exists.
- If the CLI is unavailable or a command fails, stop the vault operation and report the error.
- Do not use filesystem fallback for vault inspection, validation, writes, moves, renames, or deletes.
- Installer-age warnings do not block the workflow when the command exits successfully and the output is usable.

## Command Selection

- Inspect vault state with `obsidian files`, `obsidian folders`, `obsidian file`, `obsidian read`, `obsidian search`, `obsidian properties`, and route-specific commands.
- Create or change artifacts with `obsidian create`, `obsidian append`, `obsidian prepend`, `obsidian move`, `obsidian rename`, `obsidian delete`, and `obsidian property:set`.
- Use `obsidian property:set` only for property names explicitly required by the selected route, active vault rules, or the user's direct request.
- Use `path=<vault-relative-path>` for exact paths. Use `file=<name>` only when filename-style resolution is intended.
- Quote values containing spaces. Use `\n` in `content=<text>` values when passing multiline content through the CLI.

## Write Workflow

1. Identify the target vault and selected route.
2. Check destination folders and likely duplicates through CLI inspection.
3. Create, move, rename, delete, or update through CLI.
4. Read back or inspect the result through CLI.
5. Validate frontmatter and links using the generated file content.
6. If CLI verification fails or cannot answer a required question, stop and report the blocker. Do not continue through filesystem fallback.

## Temporary Validation

Avoid temporary validation files in the real vault. If a real-vault probe is necessary, use a unique validation name, create it through CLI, read it through CLI, delete it with `obsidian delete ... permanent`, and verify that neither the file nor its marker remains. Never leave validation artifacts behind.
