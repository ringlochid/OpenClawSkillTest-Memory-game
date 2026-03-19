# Experiment Log

## Objective
Rebuild and calibrate the memory game implementation against the Figma design, reference implementation, and private screenshot review using a stricter loop:

1. Figma skill handoff
2. Frontend build skill implementation
3. Parent-agent review
4. Build/test/deploy verification

## Experiment rules
- Screenshot evidence is used only for internal review and must not be surfaced in public-facing repo docs.
- Review loop remains: review -> improve -> test.
- We are explicitly testing whether deeper subagent reasoning helps reduce drift.

## Experiment 1 — model/thinking override
- Subagent model override: `openai-codex/gpt-5.4`
- Planned thinking levels:
  - Figma handoff: `medium`
  - Builder: `high`
  - Follow-up review/builder adjustments may vary `low -> medium -> high` if needed.
- Baseline before experiment: `2dd3b98` (`Tighten mobile board and modal geometry for one-screen fit`)
- Working hypothesis: prior drift may have been caused partly by speed-first subagent reasoning depth (`openai-codex/gpt-5.3-codex-spark`) being too shallow for screenshot-accurate multi-state layout correction.

## Experiment 1A — Figma handoff (`gpt-5.4`, thinking `medium`)
### Outcome
Useful. The refreshed handoff suggests the recent drift was caused less by screenshot ambiguity and more by physical token mismatch against Figma in a few anchor states.

### Key observations
- Keep **CSS as the sole sizing owner** for board, modal, and layout geometry.
- Mobile setup canonical geometry is compact:
  - canvas `375x667`
  - panel `327x386`
  - panel radius `10`
  - title `32px`
  - CTA `276x48`
- Mobile gameplay 4x4 canonical geometry remains:
  - board `326.1x326.1`
  - tile `72.5`
  - gap `12`
- Mobile menu modal canonical shell is `327x224`, radius `10`, background closer to `#F2F2F2`.
- Desktop 4x4 board should be **544px total footprint**, not the current oversized `568px` implementation.
- Setup text/pill semantics drifted from Figma more than expected:
  - labels should be closer to `Numbers of Players`, `Grid Size`
  - player pills are `1/2/3/4`, not `1P/2P/3P/4P`
  - inactive setup pills should be closer to `#BCCED9`

### Structural conclusion
The safest model is:
- CSS owns all physical sizing via tokens/custom properties
- JS owns only state, counts, and content
- do not let JS and CSS both size the board/modal

## Experiment 1B — Builder pass (`gpt-5.4`, thinking `high`)
### Outcome
Improved structurally, but not yet visually accepted.

### Verified facts
- Builder pass pushed commit `630b6ba`.
- Live Pages deployment returned HTTP 200.
- The pass corrected several implementation-model issues:
  - stronger CSS ownership of geometry
  - setup semantics and pill labels moved closer to Figma
  - mobile 4x4 board returned to canonical `72.5 / 12`
  - desktop 4x4 board target moved to the correct `544px` footprint model

### Parent-agent review
Private review against the screenshot truth set suggests the result is still materially off in at least the mobile setup state.

Observed at review time:
- the setup screen still appears too large/dense in the wrong places rather than matching the target rhythm cleanly
- visual centering and proportion are still not fully correct
- the model upgrade helped, but did not by itself solve the last-mile fidelity problem

### Experiment conclusion so far
`openai-codex/gpt-5.4` with higher thinking appears better than the earlier speed-first subagent path for this problem, but the bottleneck is still the precision of the review/build loop rather than raw model access alone.

## Experiment 1C — Builder pass 2 (`gpt-5.4`, thinking `high`, setup-only calibration)
### Outcome
Clear improvement over the first gpt-5.4 builder pass, but still not visually accepted.

### Verified facts
- Narrow setup calibration pass pushed commit `277b812`.
- Live Pages deployment returned HTTP 200.
- The pass did improve the setup screen compared with the previous too-large/too-dense version.

### Parent-agent review
Private review still finds the mobile setup materially off, though closer than before.

Remaining issues observed at review time:
- horizontal balance / centering still feels wrong
- title remains too visually dominant and not placed quite right
- pills and CTA still read slightly too tall/heavy
- panel radius and internal spacing rhythm are still not tight enough

### Experiment conclusion so far
The model/thinking upgrade is helping, but the successful pattern is now clearly:
- deeper subagent reasoning for implementation,
- followed by parent-owned visual review,
- followed by a very narrow corrective pass.

This is converging, but not automatically.

## Experiment 1D — Builder passes 3 and 4 (`gpt-5.4`, thinking `high`, setup micro-calibration)
### Outcome
Both passes improved the mobile setup screen incrementally, but parent review still does not consider the state near-final.

### Verified facts
- Setup micro pass 3 pushed commit `da1dc1b`.
- Setup micro pass 4 pushed commit `66edc22`.
- Live Pages deploy checks continued to return HTTP 200 after each pass.

### Parent-agent review
Private review on freshly captured mobile setup renders shows the same residual mismatch category surviving multiple corrections:
- setup panel still reads too wide / unevenly placed
- title still reads too dominant and too low
- pill and CTA controls still read too heavy
- spacing rhythm still does not fully match the target feel

### Experiment conclusion
This is the most useful result of the experiment so far:
- `openai-codex/gpt-5.4` with `thinking: high` is materially better than the prior speed-first worker path for this task.
- But the model upgrade alone does not finish last-mile visual parity.
- The most reliable workflow observed so far is:
  1. Figma handoff refresh
  2. focused `gpt-5.4` builder pass
  3. parent-owned screenshot review
  4. ultra-narrow corrective pass

In other words: better worker depth helps, but parent visual judgment is still the decisive control loop.

## Notes
- Repo-local docs will be updated after each completed loop with observations, decisions, and verified outcomes.
