# Skills

## Included Skills

| skill name | folder dir | description | original github url |
| --- | --- | --- | --- |
| `humanizer` | `./humanizer` | Rewrite English or Korean text to remove AI writing patterns while keeping its meaning and voice. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/humanizer), [blader/humanizer](https://github.com/blader/humanizer) under the MIT License, Copyright (c) 2025 Siqi Chen. |
| `superpowers` | `./superpowers` | Software development workflow skills for coding agents: brainstorming, planning, TDD, debugging, and code review. | [obra/superpowers](https://github.com/obra/superpowers) `skills` under the MIT License, Copyright (c) 2025 Jesse Vincent. |
| `consulting-style-deck` | `./consulting-style-deck` | Build .pptx decks in an editorial consulting style with serif headlines. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/consulting-style-deck) |
| `autoresearch` | `./autoresearch` | Run an autonomous loop that modifies, verifies, and keeps or discards changes against a metric. | [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) `.agents/skills/autoresearch` under the MIT License, Copyright (c) 2026 Udit Goenka. |
| `create-note-and-add-to-obsidian` | `./create-note-and-add-to-obsidian` | Write a note from a source and save it to an Obsidian vault, or return it in chat. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/create-note-and-add-to-obsidian) |
| `grilling` | `./grilling` | Question the user in rounds about a plan or decision until every branch is settled. | [mattpocock/skills](https://github.com/mattpocock/skills) `skills/productivity/grilling` under the MIT License, Copyright (c) 2026 Matt Pocock. |
| `drawing-paper-figures` | `./drawing-paper-figures` | Draw diagrams and data plots as SVG in the classic LaTeX paper style. | [sejkimm/skills](https://github.com/sejkimm/skills/tree/main/drawing-paper-figures) |
| `anatomy` | `./anatomy` | Build interactive isometric SVG figures that explain a technical idea as a physical object. | [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) under the MIT License, Copyright (c) 2026 Ryan. |

## Notes

- following [agentskills.io](https://agentskills.io)

- This folder can be integrated with Codex and Claude by creating symlinks.

    ``` shell
    ln -s $(this folder) ~/.codex/skills
    ln -s $(this folder) ~/.claude/skills
    ```

## Changelog

- 2026.01.29 - Created.
- 2026.04.01 - Added `interactive-learning-guide` skill.
- 2026.04.06 - Added `doc-rewriter` and `ralph-codex-orchestrator` skills.
- 2026.04.10 - Added `consulting-style-deck` skill.
- 2026.04.14 - Added `humanizer-ko` skill.
- 2026.04.15 - Added `autoresearch` skill.
- 2026.04.27 - Renamed `create-obsidian-note` to `add-to-obsidian-vault`.
- 2026.04.27 - Merged `humanizer-ko` into `humanizer`.
- 2026.04.28 - Added `create-structured-note` skill.
- 2026.05.12 - Added `grill-me` skill.
- 2026.10.12 - Added `anatomy` skill.
- 2026.10.12 - Removed `ui-ux-pro-max`, `interactive-learning-guide`, `doc-rewriter`, and `ralph-codex-orchestrator` skills.
- 2026.10.12 - Updated `superpowers` to v7.0.0 and `autoresearch` to v2.2.2, and replaced `grill-me` with `grilling`.
- 2026.10.12 - Removed `codebase-pruning` skill.
- 2026.10.20 - Added `create-note-and-add-to-obsidian` skill, which replaces `add-to-obsidian-vault` and `create-structured-note`.
- 2026.11.01 - Added `drawing-paper-figures` skill.
