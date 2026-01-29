# OUTPUT_FORMAT

## Standard Removal Plan Format

Fill out the following for each removal item.

- Item: file path, symbol, config key, endpoint
- Classification: Safe to remove, Potentially stale, Not removable
- Evidence
  - rg results: search keywords and a short summary
  - Entrypoint trace: where it starts and how it connects to runtime
  - Build and deploy linkage: whether referenced by Dockerfile/CI/manifests
  - Test linkage: whether referenced by tests/fixtures
- Action
  - Remove: what to delete
  - Refactor: any simplification/moves needed
  - Docs and spec updates: README/OpenAPI/config sample changes
- Risk
  - Behavior change: yes/no
  - Breaking change: yes/no
- Validation
  - Commands: tests/lint/build commands you ran
  - Result: pass/fail and a short note

## PR Summary Template

- What changed
  - What you removed
  - What you simplified
- Why
  - Why the items were unused (evidence summary)
  - Why docs/specs needed reconciliation
- Risks
  - Whether behavior changed and whether this is a breaking change
- Validation
  - Commands run and results

## Docs/Specs Update Checklist

- README examples and config samples match runtime behavior.
- OpenAPI (OAS) paths/schemas match routes and models.
- References to unsupported features are removed.
- If changes affect an external contract, mark as a breaking change.
