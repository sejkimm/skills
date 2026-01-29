# DETECTION

## Goal

- Identify unused code, orphaned assets, stale config, and drifted docs/specs based on evidence.
- To reduce false positives, suspect dynamic references first.

## Baseline Rule

- If there are no references in any of the following, it is a candidate:
  - runtime code
  - build/deploy assets
  - scripts
  - tests
  - docs/specs

## Evidence Checklist

- Entry points
  - service main, app bootstrap, framework route registry, worker scheduler
- Wiring
  - dependency injection, module registration, router registration, job registration
- Build/deploy linkage
  - Dockerfile COPY, image build context, CI job step, manifest mount
- Test coverage
  - integration test invocation, fixture references, golden file usage
- Docs/spec linkage
  - README examples, config samples, OpenAPI (OAS) routes/schemas

## Dynamic Reference Warning Signs

- String-based lookups
  - patterns that look up types/handlers by map keys
  - patterns that build import paths from strings
- Reflection and plugins
  - registries, entrypoint discovery, runtime loading
- Code generation
  - generated files as the source of truth
  - importing generated code produced from schemas
- Feature flags and env vars
  - string keys declared in one place and used in many places
- CLI options
  - option names mapped by strings and branching handlers

If these warning signs exist, do not conclude removal from `rg` results alone. Add entrypoint tracing and confirm the runtime path.

## Detecting Stale Docs/Specs

- Endpoints/fields that exist only in docs/specs (not in code) are likely stale.
- Endpoints/fields that exist only in code (not in docs/specs) are likely undocumented.
- If there is an external contract, classify changes as breaking when applicable (use `OUTPUT_FORMAT` criteria).

## Final Pre-Deletion Checks

- Run repo-standard build/tests once to establish a baseline.
- After removing candidates, re-run the same build/tests.
- If there are deploy artifacts, run staging deploys or smoke tests when available.
