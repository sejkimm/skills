# Obsidian CLI

## Goal

Use Obsidian's macOS `obsidian` command for vault-aware inspection and changes.

## Availability

- This skill supports Obsidian CLI operations on macOS only. If the execution environment is not macOS and no macOS host-execution transport is available, use the host-shell fallback when its conditions are true. Otherwise, stop and report the blocker.
- Resolve the CLI command with `command -v obsidian` first.
- If `command -v obsidian` fails, use `/usr/local/bin/obsidian` only when it exists and is executable.
- Do not use Homebrew-specific paths such as `/opt/homebrew/bin/obsidian`, app-bundle paths, `mdfind`, or other discovery fallbacks.
- Treat binary discovery as incomplete until the resolved command passes a vault health check with an explicit selector: `<obsidian-cli> vault=<selector> vault info=path`.
- Put `vault=<selector>` as the first parameter on every Obsidian CLI command.
- If the CLI is unavailable or cannot reach the selected vault, use the host-shell fallback below only if its conditions are true. Otherwise, stop and report.
- If a CLI command fails on a reachable vault, stop and report. Do not switch to the fallback to bypass the error.
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
3. For new notes with a creation timestamp field, capture the host-local timestamp immediately before writing. Follow the timestamp rules in `references/shared-frontmatter.md`; do not rely on container-default UTC when the vault lives on a host with a different timezone.
4. Create, move, rename, delete, or update through CLI.
5. Read back or inspect the result through CLI.
6. Validate frontmatter, including the captured creation timestamp value when present, and links using the generated file content.
7. If CLI verification fails or cannot answer a required question, stop and report the blocker. Do not continue through any filesystem path other than the host-shell fallback.

## Temporary Validation

Avoid temporary validation files in the real vault. If a real-vault probe is necessary, use a unique validation name, create it through CLI, read it through CLI, delete it with `<obsidian-cli> vault=<selector> delete ... permanent`, and verify that neither the file nor its marker remains. Never leave validation artifacts behind.

## Host-Shell Fallback

Use this fallback only when all conditions are true:

- The Obsidian CLI is not reachable from the current environment.
- A shell runs on the computer that holds the vault, and the vault folder is available in that shell.

Rules:

1. Before a move, rename, or delete, record a manifest. Include every affected path, its modification time, and its frontmatter. Keep the manifest outside the vault.
2. Keep file names unchanged during moves, unless the task is a rename.
3. After moves, rewrite every path-style wikilink (`[[folder/name]]`, `![[folder/file]]`) whose target moved. Then confirm that every path-style wikilink in the vault resolves to an existing file.
4. If you change only metadata or links in a file, restore its original modification time. Queries that sort by modification time depend on it.
5. Compare file names after Unicode NFC normalization. Keep the on-disk form of existing names when you write.
6. Compare note counts before and after the operation. Report any difference.
7. Read back each written file and validate its frontmatter as YAML.
8. Delete files only when the user asked. Remove only empty folders that the task emptied. Never remove a reserved folder.
9. If the CLI becomes reachable, use the CLI.
