---
name: codebase-pruning
description: Find and remove dead code paths, orphaned files/assets, stale config keys, and drifted docs/specs across the repo, keeping runtime behavior and docs (README/OpenAPI) consistent. Use when asked to delete unused code, remove unreferenced assets, prune stale endpoints/config keys, or align docs/specs with reality.
compatibility: Requires git and ripgrep (rg). Assumes local filesystem access to the repo and the ability to run repo-standard tests/lint/build.
metadata:
  short-description: Prune unused code and align docs/specs
---

# Codebase Pruning

## When to use this skill

Use this skill when you need to:

- remove dead code paths or orphaned files/assets
- prune stale endpoints, feature flags, or config keys
- reconcile drift between runtime behavior and README/OpenAPI/config samples

## Goal

- Remove dead code paths, files, configs, docs, and specs that are no longer used.
- Reduce maintenance cost and confusion by eliminating drift between implementation and docs/specs.

## Scope

- Source code: `src`, `services`, `packages`, `apps`, `libs`
- Build and deploy assets: `Dockerfile*`, `compose*`, manifests, CI config
- Scripts and tooling: `scripts`, `tools`, `Makefile`, task runner config
- Tests and fixtures
- Documentation and specs: `README`, `docs`, `openapi`, `swagger`, ADRs

## Principles

- Use ripgrep (`rg`) to prove references, and trace wiring from entrypoints to runtime execution.
- Deletions must be evidence-based; do not remove things based on guesses.
- If behavior changes, call it out. If the public contract changes, mark it as a breaking change.

## Workflow

1. List repository components
   - Enumerate top-level services, packages, apps, and libraries.
   - Confirm boundaries via `rg --files` and directory listings.

2. Build a per-component feature inventory
   - Extract the feature list from docs/specs and entrypoints.
   - Map each feature to code (handlers, routes, jobs, CLIs, schedulers).

3. Identify candidates
   - Mark items with no references in code, build, deploy, tests, docs/specs as candidates.
   - Separate docs-only features from runtime-only features.

4. Classify candidates
   - Safe to remove: no references in code/tests/docs/build/deploy.
   - Potentially stale: exists only in docs/specs; if removed, update docs/specs together.
   - Not removable: used by runtime wiring, build/deploy, ops flows, or tests.

5. Write a Deletion Plan
   - Record evidence per item (search results and entrypoint trace).
   - List required updates to docs/specs/tests.
   - Follow `references/OUTPUT_FORMAT.md`.

6. Remove and simplify
   - Remove files, modules, functions, types, and fields.
   - Remove unused config keys and validation.
   - Reduce unnecessary helpers and wrappers.

7. Reconcile docs/specs
   - Align README and config samples with runtime behavior.
   - Align OpenAPI (OAS) paths/schemas and request/response shapes with code.
   - Remove references to unsupported features.

8. Validate
   - Run repo-standard tests, lint, and build.
   - Re-run `rg` checks to confirm references are gone.

## Required Reference Checks

- Source: `src`, `services`, `packages`
- Build and deploy: `Dockerfile*`, CI config, manifests
- Scripts: `scripts`, `Makefile`, `*.yaml`, `*.yml`
- Tests: `test`, `tests`, `spec`
- Docs and specs: `README`, `docs`, `openapi`, `swagger`

Use the default search patterns in `references/COMMANDS.md`.

## Safety Guardrails

- Do not delete items referenced by:
  - build and deploy assets
  - release/ops flows (scripts/manifests)
  - tests/fixtures
- These patterns may be dynamically referenced; do extra confirmation:
  - reflection, plugin registries, codegen outputs
  - string-key lookups, feature flags, env vars, CLI option mappings
- If evidence is inconclusive, do not delete. Record it in the Removal Plan and treat it as not removable until proven otherwise.
- If behavior changes, call it out in the summary.

## Deliverables

- Removal Plan
- Updated code, docs, and specs
- Proof that repo-standard tests and lint pass
- A short explanation of what was removed and why

## References

- `references/DETECTION.md`
- `references/COMMANDS.md`
- `references/OUTPUT_FORMAT.md`
