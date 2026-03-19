# OpenClaw Skill Test — Memory Game

This repository is a public skill-test implementation of the Frontend Mentor memory game, rebuilt through an OpenClaw-driven experiment focused on pixel-accurate React + TypeScript + Tailwind delivery.

## What this repo is testing

This repo is not just a normal app build. It is an experiment in whether a structured agent workflow can repeatedly:

1. extract an implementation handoff from Figma,
2. turn that handoff into frontend code,
3. review the output against the reference,
4. iterate until the layout and state behavior are visually aligned.

## Workflow under test

The active workflow is:

1. **Figma skill** → refresh design handoff and screen/state geometry
2. **Frontend build skill** → implement/refine the React + TypeScript + Tailwind app
3. **Parent review** → evaluate the result against the design/reference
4. **Build / deploy verification** → confirm the GitHub Pages output is live

## Tech stack

- React
- TypeScript
- Tailwind CSS
- Vite
- GitHub Pages

## Experiment reporting

See [`EXPERIMENTLOG.md`](./EXPERIMENTLOG.md) for the running experiment record, including:

- model/thinking settings used for worker runs,
- observations from each pass,
- what changed,
- what regressed,
- and what was verified.

## Status

This repo is still under active calibration as part of the experiment.

The current goal is not merely functional parity, but layout/state fidelity strong enough to survive direct visual comparison across setup, gameplay, menu, and result states on mobile and desktop.

### Current experiment finding

The strongest workflow tested so far is:

1. refresh the implementation handoff from Figma,
2. run a focused builder pass on `openai-codex/gpt-5.4`,
3. review visually at the parent level,
4. then issue ultra-narrow corrective passes.

This worked better than the earlier speed-first worker setup, but it still did **not** eliminate the need for strict human/parent visual review. The bottleneck is no longer just code generation — it is last-mile layout judgment.

## Live site

- GitHub Pages: https://ringlochid.me/OpenClawSkillTest-Memory-game/

## Notes

This repo intentionally documents the process as well as the product. It is both:

- a working memory game implementation, and
- a report on an OpenClaw skill-test / iteration experiment.
