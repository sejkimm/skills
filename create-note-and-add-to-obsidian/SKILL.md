---
name: "create-note-and-add-to-obsidian"
description: "Use when the user asks to turn a source, link, file, or session content into a note, or to save, add, or place a note in an Obsidian vault, including \"정리해줘\", \"노트로 정리\", \"옵시디언에 저장\", \"볼트에 추가\", \"make this into a note\", or \"add to Obsidian\"."
---

# Create Note and Add to Obsidian

This skill writes a note from source material and saves it to an Obsidian vault. It has two modes.

- Save mode: write the note, place it in the vault, and verify it. Use this mode when the user names this skill, or mentions Obsidian, the vault, saving, or adding.
- Chat mode: write the note and return it in the reply as one Markdown block. Do not read or write the vault. Use this mode when the user asks only to organize or show the content, or says not to save.

The writing rules are the same in both modes.

## 1. Workflow

1. Get the source. Read every link, file, and part of the conversation that the user gives. If you cannot read a source, tell the user. Do not write from a guess.
2. Save mode: find the vault and read its rule documents (section 4).
3. Save mode: select the area and the folder with the rule documents. Check for duplicates.
4. Save mode: search the vault for notes on the key terms of the note. Use the results as wikilink targets.
5. Write the body (section 2).
6. Write the frontmatter (section 3).
7. Save mode: write the file (section 5). Read it back.
8. Check the quality gates (section 6).
9. Report. In save mode, give the vault-relative path in one line. In chat mode, return the Markdown block.

## 2. Body Rules

These rules apply to a distilled note: a note that explains a concept, mechanism, method, paper, article, or talk. For another note type, such as a record or a template, follow the body rules in the rule document of its area. If that document has no body rules, apply 2.2 to 2.6 and do not apply 2.1.

### 2.1 Structure

```markdown
# <Title>

## 1. 핵심 요약

- <core claim 1>
- <core claim 2>
- <core claim 3>

## 2. 용어

| 용어 | 정의 |
|---|---|
| <term> | <definition> |

## 3. <Section title that states the content>

### 3.1 <Subsection title>

<body>

[^1]: <footnote>
```

- Number every `##` section. Number subsections as `3.1`, `3.2`.
- Section 1 is the summary. It is the first section after the title. It has one to three bullets. Each bullet states one core claim.
- Section 2 defines the terms that the note uses. If the note has no term to define, omit section 2 and start the body at section 2.
- The body sections follow. Give each section a title that states its content, such as `## 3. 쓰기 경로의 병목`. Do not use a generic title such as `## 3. 본문`.
- Include the details of the source: numbers, steps, examples, code, and diagrams. Do not pad a short source.
- Do not add a limits section. Exception: the source is mainly about limits, or the user asks for one.
- Do not add a sources section, an English version, an English appendix, or a note about the writing rules.
- Do not use a question-and-answer form unless the user asks for a FAQ.

### 2.2 Language and Style

Write the body in Korean unless the user asks for another language. Apply the ASD-STE100 Simplified Technical English rules to the Korean text:

- One sentence states one idea.
- Use active voice.
- Use short sentences.
- Use one term for one meaning in the whole note.
- Name the subject. Do not use a pronoun if its referent is unclear.
- End every sentence, bullet, and table cell sentence with the plain declarative `-다` form, such as `-한다`, `-이다`, `-했다`.
- Do not use 개조식 endings (`-음`, `-함`, `-됨`, `-임`). Do not use polite endings (`-합니다`, `-입니다`).

Other style rules:

- Keep established English technical terms in English. Do not transliterate them into Hangul. Write `LRU`, not `엘알유`.
- Do not use em dashes or en dashes. Use a comma, a colon, or a new sentence.
- Use parentheses only for short clarifications, such as `LRU(Least Recently Used)`. Put a longer aside in a new sentence or a footnote.
- Use backticks only for code, commands, file names, and identifiers.

### 2.3 Bullets, Paragraphs, and Tables

- Use bullets for parallel items. Use short paragraphs for a continuous argument.
- Nest bullets to two levels at most. If you need a third level, make a new subsection.
- Use a table when the same attributes apply to several items: a comparison, a schema, a decision matrix, or a list of roles. Keep a table to four columns or fewer.
- Do not use a table for one item, or when a cell needs more than a short sentence.

### 2.4 Faithfulness

- Keep what the source says. Do not add interpretation.
- Copy numbers exactly as the source gives them. Do not round them.
- Do not invent facts, quotes, numbers, links, or note titles.
- If the user asks for interpretation, put it in a separate section titled `코멘트`.

### 2.5 Footnotes

Use Markdown footnotes (`[^n]`) for these items:

- Sources. Add a source footnote to each number and each quote. If the note uses more than one source, also add a source footnote to each claim, so that the reader can see which source supports it. Give the title, the URL, and the section or page if known: `[^1]: [Title](https://example.com/post), "Section name".`
- Details of a term or a side detail that would interrupt the main text.
- Caveats. Write a caveat only if it changes how the reader applies a claim. Put it in a footnote, or in one sentence next to that claim.

Rules:

- If several claims come from the same place, use the same footnote again.
- Number footnotes in the order of first use.
- Put all footnote definitions at the end of the note.
- Every reference has a definition. Every definition has a reference.
- A footnote contains only content that the source supports.

### 2.6 Wikilinks

- Save mode: search the vault for existing notes on the key terms and concepts of the note.
- Link each matching note at its first mention in the body: `[[Note Title]]` or `[[Note Title|표시 텍스트]]`.
- Link only notes that exist. Do not link a planned note.
- Chat mode: add a wikilink only to a note that the user names.
- Keep each source link as a Markdown link `[text](url)` or move it to a footnote. Do not delete a source URL.

## 3. Frontmatter

Save mode: the metadata rules of the vault are the full set of allowed properties. Follow their field order, value forms, list limits, slug format, and controlled values. Do not add a property that the rules do not list.

Fallback when the vault has no metadata rules:

```yaml
---
date: YYYY-MM-DD HH:mm
type: learning-note
summary: "<one sentence that describes the content>"
references:
  - https://example.com/source
---
```

- `date` is the creation time of the note in the host time zone (5.2). It is not the publication date of the source.
- `summary` is one sentence that describes the content. It does not copy the title.
- `references` is a flat list of URLs or vault links. List every source URL that a footnote cites. Do not use nested objects.
- `assistant`, if the rules allow it, names the model that wrote the note. If the model is unknown, omit it.
- For an open-vocabulary list, reuse a value that the vault already uses. Make a new value only if no equal value exists.
- Use `status` only for an exception state that the rules define.

Chat mode: include `date`, `type`, `summary`, and `references`. Omit fields that need the vault rules.

## 4. Vault Rules and Placement

The vault holds its own structure. This skill holds no folder names, area names, or taxonomy.

1. Find the vault from the path that the user gives or from the connected folder.
2. Find the rule documents by meaning, not by file name. Signals: frontmatter `type: index`, a title that ends with `Index` or `Rules`, or content that defines areas, folder placement, or metadata. Look at the vault root and at the root of each top-level folder.
3. Select the area. The rule documents define which notes each area accepts. Classify a note by its role before its topic. For example, a raw source to keep as is, a distilled note, and a record of one process can go to different areas.
4. Select the folder with the placement rules of that area. Put the note in exactly one folder. Use an existing leaf folder. A leaf folder contains notes and their attachments only. Do not put a note in a folder that contains subfolders. Do not make a new folder for one note.
5. Make the file name with the naming rule of the vault. Fallback: `(YYYY.MM) Specific Title.md`, with the month of note creation. Make the title specific. Do not use a generic title such as `Overview` or `Today`.
6. Check for duplicates: the same file name, and notes on the same topic in the same area. If a close note exists, ask the user to merge, append, or make a more specific note.

If the user asks to keep a source as is, do not distill it. Follow the source-note rules of the area.

If the placement is not clear:

- In an interactive session, ask one short question.
- In an unattended session, apply the fallback of the rules, such as the nearest leaf with a review status. Report it.
- If the rules have no fallback, or no rule document covers the note, stop and report.

Also stop and ask if two rule documents conflict, or if the folder tree and the rules disagree on the placement.

Do not create an Inbox. Do not save a new note to a temporary or unsorted folder. Do not edit index, MOC, or Dataview files unless the user asks.

## 5. Writing to the Vault

### 5.1 Tools

Use the Obsidian CLI (`obsidian`) when it is available.

- Resolve it with `command -v obsidian`. If that fails, use `/usr/local/bin/obsidian` only if it exists and is executable.
- Check the vault with `<cli> vault=<selector> vault info=path`. Put `vault=<selector>` first in every command.
- Inspect with `files`, `folders`, `read`, `search`, and `properties`. Write with `create`, `append`, `move`, `rename`, and `property:set`.
- Use `path=<vault-relative-path>` for exact paths. Quote values that contain spaces.
- If a CLI command fails on a reachable vault, stop and report. Do not use the fallback to bypass the error.

Use the host-shell fallback only if both conditions are true:

- The CLI is not reachable.
- A shell runs on the computer that holds the vault, and the vault folder is available in that shell.

Fallback rules:

1. Before a move, rename, or delete, record a manifest outside the vault. Record the path, modification time, and frontmatter of each affected file.
2. Keep file names during a move.
3. After a move, rewrite each path-style wikilink to a moved file. Then check that every path-style wikilink resolves.
4. If you change only metadata or links in a file, restore its original modification time.
5. Compare file names after Unicode NFC normalization. Keep the on-disk form of existing names.
6. Delete files only if the user asks. Never delete a folder that the rules mark as reserved.

If neither the CLI nor the fallback is available, give the note in chat mode and report that you did not save it.

### 5.2 Timestamp

Capture the creation time once, immediately before the write, in the host time zone:

```bash
TZ='Area/City' date '+%Y-%m-%d %H:%M'
```

Get the time zone from the user, the environment context, or a shell on the host. Do not use container UTC. If no reliable time zone is available, stop and report. After the write, check that the saved value is the same as the captured value.

### 5.3 Markdown Format

- Indent nested list items with one tab per level. If a tool needs spaces, use four spaces per level.
- Use spaces in YAML frontmatter.
- Do not change indentation in code blocks.

## 6. Quality Gates

Check every item before you report. If a gate fails, fix the note. If you cannot fix it, report the failure.

Body:

- Section 1 is the first section after the title and has one to three bullets.
- In a Korean note, every sentence and bullet ends with `-다`. No `-음`, `-함`, `-됨`, `-임`, `-합니다`, or `-입니다` ending remains.
- No limits section exists, unless an exception in 2.1 applies.
- No sources section, English version, English appendix, or writing-rule note exists.
- Each number and each quote has a source footnote. In a note with more than one source, each claim has a source footnote.
- Every `[^n]` has a definition, and every definition is used.
- Every wikilink resolves to an existing note.
- No em dash or en dash exists.
- Every number matches the source.

Save mode:

- The file exists at one path, in a leaf folder.
- The frontmatter is valid YAML. It has the required fields. Each property is allowed by the rules and is in the order of the rules.
- `primary`, if the rules use it, matches the folder.
- `summary` does not copy the title.
- `date` matches the captured time.
- `references` contains every URL that a footnote cites.
- The note contains no private absolute path.
- No temporary validation file remains in the vault.

## 7. Example

```markdown
---
date: 2026-01-15 10:30
type: learning-note
summary: TTL 캐시를 LRU 캐시로 바꾼 사례로 eviction 정책의 선택 기준과 운영 결과를 설명한다
references:
  - https://example.com/lru-migration
---

# TTL 캐시에서 LRU 캐시로의 전환

## 1. 핵심 요약

- TTL 캐시에서는 hot key가 같은 시점에 만료되어 thundering herd가 발생했다.
- 팀은 세 가지 [[Cache Eviction Policy|eviction 정책]]을 비교하고 LRU를 선택했다.
- 전환 후 hit rate는 약 12 percentage point 올랐다.[^1]

## 2. 용어

| 용어 | 정의 |
|---|---|
| hot key | 요청이 집중되는 key이다. |
| thundering herd | 많은 요청이 동시에 origin으로 가는 현상이다. |

## 3. eviction 정책 비교

| 정책 | 장점 | 단점 |
|---|---|---|
| LRU | 최근 접근 패턴에 강하다. | scan 패턴에서 cache pollution이 생긴다.[^2] |
| LFU | hit rate가 안정적이다. | 과거에 인기 있던 key가 오래 남는다. |

[^1]: [LRU 캐시 도입 후기](https://example.com/lru-migration), "운영 결과".
[^2]: scan 패턴은 한 번만 읽는 key를 대량으로 읽는 접근 패턴이다.
```

## 8. Maintenance Rules for This Skill

- Do not add the folder names, area names, note titles, project names, file counts, or paths of a specific vault to this skill. The rule documents in the vault hold the structure.
- Keep this skill in one file. Do not add reference files or agent configuration files.