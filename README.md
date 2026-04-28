# Skills

- Created: 2026.01.29
- Updated: 2026.04.01 - Added `interactive-learning-guide` skill.
- Updated: 2026.04.06 - Added `doc-rewriter` and `ralph-codex-orchestrator` skills.
- Updated: 2026.04.10 - Added `consulting-style-deck` skill.
- Updated: 2026.04.14 - Added `humanizer-ko` skill.
- Updated: 2026.04.15 - Added `autoresearch` skill.
- Updated: 2026.04.27 - Renamed `create-obsidian-note` to `add-to-obsidian-vault`.
- Updated: 2026.04.27 - Merged `humanizer-ko` into `humanizer`.
- Updated: 2026.04.28 - Added `create-structured-note` skill.

## Included Skills

| skill name | folder dir | description | original github url |
| --- | --- | --- | --- |
| `humanizer` | `./humanizer` | Remove signs of AI-generated writing from English or Korean text and rewrite it to sound more natural. | English rules copied/adapted from [blader/humanizer](https://github.com/blader/humanizer) under the MIT License, Copyright (c) 2025 Siqi Chen; Korean rules from the former `humanizer-ko` in this repo. |
| `superpowers` | `./superpowers` | Complete software development workflow for coding agents with composable skills and process guardrails. | [obra/superpowers](https://github.com/obra/superpowers) |
| `ui-ux-pro-max` | `./ui-ux-pro-max` | UI and UX design intelligence with searchable database. | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| `interactive-learning-guide` | `./interactive-learning-guide` | Create interactive HTML learning guides | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/interactive-learning-guide) |
| `doc-rewriter` | `./doc-rewriter` | Rewrite documents to improve readability, simplify difficult content, and polish language to a professional business tone. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/doc-rewriter) |
| `ralph-codex-orchestrator` | `./ralph-codex-orchestrator` | Orchestrate ralph-loop and codex-plugin-cc together for autonomous development with rigorous verification. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/ralph-codex-orchestrator) |
| `consulting-style-deck` | `./consulting-style-deck` | Build editorial, consulting-grade .pptx presentation decks in a polished strategy-firm visual style. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/consulting-style-deck) |
| `autoresearch` | `./autoresearch` | Autonomous goal-directed iteration loop — modify, verify, keep/discard, repeat. Applies Karpathy's autoresearch principles to any task. | [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) |
| `add-to-obsidian-vault` | `./add-to-obsidian-vault` | Add, route, classify, move, or organize notes and artifacts into the right Obsidian vault location. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/add-to-obsidian-vault) |
| `create-structured-note` | `./create-structured-note` | Structure arbitrary content into an Obsidian-ready Markdown note in bullet-first 개조식 style. | Local Claude skill export |

## Notes

- following [agentskills.io](https://agentskills.io)

- This folder can be easily integrated with codex by creating a symlink.

    ``` shell
    ln -s $(this folder) ~/.codex
    ```
