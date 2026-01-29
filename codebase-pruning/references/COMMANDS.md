# COMMANDS

## Principles

- Prefer repo-standard commands if they exist.
- The commands below are a generic cookbook; adapt them to the project.

## File and Directory Inventory

```bash
ls
find . -maxdepth 2 -type d
rg --files .
```

## Search for Symbol/File References

```bash
rg -n "<symbol>" .
rg -n "<filename>" .
rg --files . | rg "<pattern>"
```

## Trace Entrypoints and Wiring

```bash
rg -n "main|bootstrap|createServer|listen|router|register" .
rg -n "inject|container|module|provider|wire" .
```

## Find Config Key Usage

```bash
rg -n "<CONFIG_KEY>" .
rg -n "process\.env\.|ENV\[|getenv|viper\.Get|spf13" .
```

## Find Endpoints and Routes

```bash
rg -n "route|router|get\(|post\(|put\(|delete\(" .
rg -n "OpenAPI|swagger|paths:" openapi docs .
```

## Check Build/Deploy References

```bash
rg -n "Dockerfile|FROM|COPY|ADD|ARG|ENV" .
rg -n "\.github|gitlab|buildkite|ci" .
rg -n "helm|kustomize|manifest|deployment|service" .
```

## Check Test/Fixture References

```bash
rg -n "describe|it\(|test\(|pytest|go test|cargo test" .
rg -n "fixtures|golden|snapshot" .
```

## Git Checks

```bash
git status
git diff
git log -n 20 --oneline
git grep "<symbol>"
```

## Validation

These are examples; replace them with repo-standard commands.

```bash
make test
make lint
make build
```
