# Worked examples

Two full examples illustrating the skill's preferred output. Read these when in doubt about how to combine the rules in SKILL.md and references/style-guide.md.

## Example 1: long-form Korean technical article

Source: a Korean blog post that mixes a narrative on why the author moved from TTL caching to LRU and a comparison of cache eviction policies.

```markdown
# LRU 캐시 도입 후기

## 요약
- 단순 TTL 기반 캐시에서는 hot key 가 만료 시점에 한꺼번에 evict 되며 thundering herd 가 발생했음
- TTL 값을 늘리는 방식으로는 working set 크기를 통제할 수 없어 정책 자체를 바꿔야 했음
- 후보로 LRU, LFU, TTL only 를 검토했고 시간대별 트래픽 집중 패턴과 운영 단순성을 고려해 LRU 를 선택함
- 한 달 운영 결과 hit rate 가 약 12 percentage point 개선되고 메모리 상한 통제가 가능해짐
- 남은 과제는 scan 패턴 방어이며 SLRU, ARC 도입을 트래픽 분석 후 결정할 예정

## 배경
- 추천 서비스에서 메모리 사용량이 예상보다 빠르게 증가
- 단순 TTL 기반 캐시 사용 중이었음
- hot key 가 만료 시점에 동시에 evict 되며 origin DB 로 thundering herd 가 발생함
- TTL 을 늘려보았으나 working set 크기 미통제라는 근본 문제는 그대로 남음

## 후보 정책 비교

| 정책 | 장점 | 단점 |
|------|------|------|
| LRU | 최근 접근 패턴에 강함, 시간대별 트래픽 집중에 자연스러움 | scan 패턴에서 cache pollution 발생 |
| LFU | hit rate 가 안정적 | 한때 인기였던 key 가 빈도 카운터로 잔존하는 stale entry 문제 |
| TTL only | 구현이 가장 단순 | working set 미통제, 도입 전 겪던 문제 그 자체 |

## LRU 선택 사유
- 트래픽이 시간대별 집중 형태라 최근성 기반 정책이 자연스러움
- 추천 결과가 1주일 단위로 갱신되어 LFU 의 stale entry 문제가 치명적임
- 운영 단순성 우선

## 도입 결과
- hit rate 가 기존 대비 약 12 percentage point 개선됨
- 메모리 상한을 명시적으로 둘 수 있게 되어 OOM 위험이 사라짐

## 남은 과제
- scan 패턴에 대한 방어가 미흡함
- SLRU, ARC 등을 검토 중이나 트래픽 분석을 더 진행한 후 결정할 예정
```

Notice the choices:

- The comparison of three policies on shared attributes 장점/단점 becomes a Markdown table.
- Every Korean bullet ends in 개조식 form.
- The summary at the top compresses the article into five lines.
- Em dashes are absent; the LFU 단점 entry uses a comma to chain two clauses.
- Technical terms LRU, LFU, TTL, hit rate, working set, thundering herd, scan, cache pollution, OOM, SLRU, ARC stay in English.

## Example 2: English meeting transcript

Source: a meeting transcript with discussion, decisions, and action items.

```markdown
# Pricing meeting notes

Date: 2026-04-14
Attendees: Alice (PM), Ben (Eng lead), Cara (Finance)

## Summary
- Mid tier holds only about 4 percent of paid accounts and is shrinking from 7 percent a year ago
- Decision to collapse three consumer tiers into two, keeping enterprise as a separate motion
- Open question: how to handle existing mid-tier accounts; one-year grandfather is on the table but deferred
- Customer comms drafted by Alice for 2026-04-21; pricing page mocks by Ben for 2026-04-25; churn-risk model by Cara for 2026-04-30
- Follow-up review scheduled for 2026-05-05

## Context
- Q1 usage data shows the mid tier is rarely chosen
- Trend is downward, from 7 percent to 4 percent of paid accounts year over year
- Mid tier failed its intended role of capturing customers outgrowing entry

## Decisions
- Collapse the three consumer tiers into two by removing the mid tier
- Keep enterprise as a separate motion with custom pricing
- Hold the new structure for one quarter before re-evaluating

## Open questions
- Handling of existing mid-tier accounts
  - Option A: indefinite grandfather at current price and feature set
  - Option B: migrate to entry plus an add-on bundle
  - Cara argued against indefinite grandfathering and proposed a one-year grandfather followed by migration
  - Decision deferred pending revenue impact modeling
- Communication to customers currently in a mid-tier trial
  - Likely needs to go out within the week if the change is committed

## Action items

| Owner | Action | Due |
|-------|--------|-----|
| Alice | Draft customer comms | 2026-04-21 |
| Ben | Update pricing page mocks | 2026-04-25 |
| Cara | Run churn-risk model on mid-tier accounts | 2026-04-30 |

## Next meeting
- Follow-up review on 2026-05-05
```

Notice the choices:

- Action items become a table because owner, action, and due date form a clean matrix.
- The open question about grandfathering decomposes into nested bullets covering both options and the deferred decision.
- The summary at the top reduces a multi-page transcript to five lines.
- Bullets stay in formal English register; no contractions, no em dashes.
