---
name: ralph-codex-orchestrator
description: >
  Orchestrate ralph-loop and codex-plugin-cc together for autonomous development with rigorous
  verification. Use this skill whenever the user wants to run an autonomous development loop that
  should not stop until all test/build/lint conditions pass, or when the user wants Claude to
  delegate difficult implementations to Codex while iterating autonomously, or when the user wants
  mid-iteration design review from Codex. Trigger on phrases like: "run until tests pass",
  "don't stop until it works", "delegate to codex", "autonomous dev loop", "ralph-loop with codex",
  "verify everything end to end", "keep iterating until done", or any request combining autonomous
  iteration with verification gates or Codex delegation. Also trigger when the user mentions
  ralph-loop and codex together, or asks for a persistent development loop with code review
  checkpoints.
---

# Ralph-Codex Orchestrator

Combines ralph-loop's autonomous iteration with codex-plugin-cc's implementation delegation and
design review into a single disciplined workflow.

## Prerequisites

Both plugins must be installed in Claude Code.

- **ralph-loop**: provides `/ralph-loop` and `/cancel-ralph`
- **codex-plugin-cc**: provides `/codex:rescue`, `/codex:review`, `/codex:adversarial-review`, `/codex:status`, `/codex:result`, `/codex:cancel`

If either plugin is missing, inform the user and stop. Do not attempt the workflow without both.

## Core Workflow

### Phase 0: Collect Exit Criteria

Before starting any iteration, collect all four items below from the user. Do not proceed if any
item is missing.

1. **Verification command**: a single command that validates all conditions at once.
   Examples: `pnpm test && pnpm lint && pnpm build`, `cargo test && cargo clippy -- -D warnings`,
   `pytest -x && mypy . && ruff check .`

2. **Success definition**: exit code 0 from the verification command is the baseline. If the user
   has additional conditions beyond that, capture them explicitly.
   Examples: "test coverage above 80%", "specific endpoint returns 200"

3. **Max iterations**: a safety cap. If the user does not specify one, suggest 25 as the default.

4. **Scope**: what to implement, constraints, and boundaries.

Use these four items to compose the ralph-loop prompt in Phase 1.

### Phase 1: Compose and Launch the Ralph-Loop

The ralph-loop slash command has strict limitations on argument parsing. Multi-line strings, angle
brackets, pipe characters, backticks, and embedded slash commands inside the quoted argument will
cause parsing failures. To avoid this, use the two-step approach below.

#### Step 1: Write the prompt to a temporary file

Before invoking ralph-loop, write the full structured prompt to `/tmp/ralph-prompt.md` using the
Bash tool or Write tool. This file serves as the detailed context that Claude will reference
during iteration.

Template for `/tmp/ralph-prompt.md`:

```markdown
## Task
[user-defined scope and requirements]

## Exit Criteria
ALL of the following must be satisfied before completion:
- Verification command exits with code 0: [verification command]
- [any additional success conditions]

## Verification
At the start of every iteration, run the verification command to assess current state:
[verification command]

## Complexity Delegation Rules
Delegate to codex rescue when any of the following occur:
- The same failure repeats for 2 consecutive iterations
- A large-scale refactoring spanning 3 or more files is required
- An algorithm or architecture design decision is needed
- Debugging undocumented behavior in an external library

When delegating:
1. Run codex rescue in background mode with a clear description of the problem and prior attempts
2. Poll codex status until the job finishes
3. Retrieve the result with codex result
4. Apply the result and immediately re-run the verification command

## Mid-Iteration Review Rules
Run codex adversarial-review at these checkpoints:
- Immediately after designing a new module, class, or major function
- Immediately after completing a core algorithm implementation
- When the verification command passes for the first time before declaring completion

If the review surfaces a critical issue, resolve it before moving on.
Minor suggestions can be noted and deferred.

## When Stuck
If iteration count exceeds 75% of max-iterations without completion:
- Document every approach attempted so far
- Analyze remaining failure causes
- Delegate the blocking problem to codex rescue

When all exit criteria are met, output COMPLETE as the final word.
```

#### Step 2: Launch ralph-loop with a minimal one-line prompt

After writing the file, read it back so its contents are in the conversation context. Then invoke
ralph-loop with a **single-line, plain-text** prompt.

```
/ralph-loop "Implement [one-line scope]. Verify: [command]. Read /tmp/ralph-prompt.md for full rules. Output COMPLETE when done." --completion-promise "COMPLETE" --max-iterations [N]
```

**Strict rules for the inline prompt string:**

- Maximum 200 characters
- No angle brackets: do not use < or >
- No backticks
- No pipe characters
- No embedded slash commands like /codex:rescue
- No newlines: the entire prompt must be on a single line
- If user-supplied values contain double quotes, replace them with single quotes before embedding
- All detailed delegation and review rules come from Phase 2 below, not from this string

#### Fallback: if ralph-loop still fails

If the one-line approach also fails, try these alternatives in order:

1. **No quotes around prompt**: `/ralph-loop Implement X and verify with Y then output COMPLETE --completion-promise COMPLETE --max-iterations N`
2. **Single quotes**: `/ralph-loop 'Implement X. Verify: Y. Output COMPLETE when done.' --completion-promise 'COMPLETE' --max-iterations N`
3. **Prompt only, no flags**: `/ralph-loop Implement X. Verify with Y. Output COMPLETE when all checks pass.` and rely on ralph-loop defaults for iteration limit.

If all three fallbacks fail, notify the user that ralph-loop's argument parser is incompatible
with the current invocation, and offer to run the iteration loop manually using Phase 2 rules
without the ralph-loop wrapper.

### Phase 2: Behavior Rules During Iteration

Once ralph-loop is running, follow these rules strictly. These rules are internalized by Claude
before the loop starts; they are NOT passed as part of the ralph-loop argument.

#### 2-1. Every Iteration Start

1. Run the verification command to check current state.
2. Identify which checks are failing and prioritize them.
3. Compare against the previous iteration to detect repeated failures.

#### 2-2. Codex Delegation Judgment

When any condition below is met, delegate to `/codex:rescue`.

| Condition | Delegation pattern |
|---|---|
| Same failure repeated 2 consecutive iterations | `/codex:rescue "Prior attempts: [summary]. Failure: [details]. Fix this." --background` |
| Large refactoring needed across 3+ files | `/codex:rescue "[scope description]. Refactor safely." --background` |
| Algorithm or architecture decision required | `/codex:rescue "[requirements]. Propose and implement the best design." --background` |
| External library debugging | `/codex:rescue "[library] [symptoms]. Investigate root cause and fix." --background` |

After every delegation:
1. Run `/codex:status` until the job completes.
2. Run `/codex:result` to retrieve the output.
3. Apply the changes.
4. Re-run the verification command immediately.

If Codex fails or times out, fall back to solving the problem directly. If that also fails, try
a different approach. If three different approaches all fail, document the situation and alert
the user.

#### 2-3. Mid-Iteration Codex Review

Run `/codex:adversarial-review` at these checkpoints:

- After writing a new module, class, or major function
- After completing core logic implementation
- When all tests pass for the first time

```
/codex:adversarial-review challenge whether this implementation handles edge cases and failure modes correctly
```

If the review finds a critical issue, resolve it before continuing.
Minor suggestions can be recorded and addressed later.

#### 2-4. Completion Gate

Output `COMPLETE` ONLY when ALL of these are true:

1. The verification command returns exit code 0.
2. Every user-defined additional condition is satisfied.
3. The most recent `/codex:adversarial-review` found no critical issues.

If any condition is not met, do NOT output COMPLETE. Keep iterating.

### Phase 3: Completion Report

After all conditions are met and the loop exits, produce a summary covering:

1. **Total iterations**: how many loops it took
2. **Codex delegation log**: how many times Codex was called, what each delegation solved
3. **Codex review summary**: issues found and whether they were resolved
4. **Final verification output**: the full command execution log
5. **Changed files**: list of modified files with a brief description of each change

## Edge Cases

### Codex fails or times out

If `/codex:status` shows failed or timed-out:
1. Attempt the delegated task directly.
2. If that fails, switch to a different approach.
3. If three different approaches fail, document the situation and notify the user.

### Verification command itself is broken

If the verification command fails due to environment issues rather than code issues:
1. Determine whether the failure is environmental, not code-related.
2. Attempt to fix the environment issue, but if it fails 3 times, notify the user.
3. Ask the user whether the verification command needs to be updated.

### Max iterations reached

When the iteration limit is hit:
1. Document progress so far.
2. List remaining failures and approaches already tried.
3. Report to the user and discuss next steps.

### Ralph-loop argument parsing failure

If ralph-loop fails to start due to argument parsing:
1. Try the fallback invocation patterns listed in Phase 1 Step 2.
2. If all fallbacks fail, run the iteration loop manually: execute the task, run verification,
   and repeat until exit criteria are met or max iterations are reached.
3. Follow all Phase 2 rules identically whether running inside ralph-loop or manually.

## Quick Reference

| Command | Purpose | When |
|---|---|---|
| `/ralph-loop` | Start autonomous iteration | Phase 1, once |
| `/codex:rescue --background` | Delegate difficult implementation | On complexity threshold |
| `/codex:adversarial-review` | Review design and implementation | After major implementation milestones |
| `/codex:status` | Check delegated task progress | After rescue |
| `/codex:result` | Retrieve delegation output | After status confirms completion |
| `/cancel-ralph` | Emergency stop | On user request |
