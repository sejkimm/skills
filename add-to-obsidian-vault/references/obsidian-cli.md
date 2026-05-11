# Obsidian CLI

## Goal

Use Obsidian's macOS `obsidian` command for vault-aware inspection and changes.

## Availability

- This skill supports Obsidian CLI operations on macOS only. If the execution environment is not macOS and no macOS host-execution transport is available, stop and report the blocker.
- Resolve the CLI command with `command -v obsidian` first.
- If `command -v obsidian` fails, use `/usr/local/bin/obsidian` only when it exists and is executable.
- Do not use Homebrew-specific paths such as `/opt/homebrew/bin/obsidian`, app-bundle paths, `mdfind`, or other discovery fallbacks.
- Treat binary discovery as incomplete until the resolved command passes a vault health check with an explicit selector: `<obsidian-cli> vault=<selector> vault info=path`.
- Put `vault=<selector>` as the first parameter on every Obsidian CLI command.
- If the CLI is unavailable, cannot reach the selected vault, or a command fails, stop the vault operation and report the error.
- Do not use filesystem fallback for vault inspection, validation, writes, moves, renames, or deletes.
- Installer-age warnings do not block the workflow when the command exits successfully and the output is usable.

## Command Selection

- Inspect vault state with `<obsidian-cli> vault=<selector> files`, `folders`, `file`, `read`, `search`, `properties`, and route-specific commands.
- Create or change artifacts with `<obsidian-cli> vault=<selector> create`, `append`, `prepend`, `move`, `rename`, `delete`, and `property:set`.
- Use `property:set` only for property names explicitly required by the selected route, active vault rules, or the user's direct request.
- Use `path=<vault-relative-path>` for exact paths. Use `file=<name>` only when filename-style resolution is intended.
- Quote values containing spaces. Use `\n` in `content=<text>` values when passing multiline content through the CLI.

## Write Workflow

1. Identify the target vault and selected route.
2. Check destination folders and likely duplicates through CLI inspection.
3. For new notes with a `date` field, capture the macOS host local timestamp immediately before writing with `date '+%Y-%m-%d %H:%M'`.
4. Create, move, rename, delete, or update through CLI.
5. Read back or inspect the result through CLI.
6. Validate frontmatter, including the captured `date` value when present, and links using the generated file content.
7. If CLI verification fails or cannot answer a required question, stop and report the blocker. Do not continue through filesystem fallback.

## Temporary Validation

Avoid temporary validation files in the real vault. If a real-vault probe is necessary, use a unique validation name, create it through CLI, read it through CLI, delete it with `<obsidian-cli> vault=<selector> delete ... permanent`, and verify that neither the file nor its marker remains. Never leave validation artifacts behind.
