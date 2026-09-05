# AGENTS.md — fieldops-ui

Operating instructions for coding agents working in this repo.
Style and architecture live in `.cursor/rules/*.mdc` and `CLAUDE.md`. This file is *process*.

## Source of truth

1. Product requirements: `docs/requirements.md`
2. How to build: `.cursor/rules/*.mdc` (always apply)
3. Trade-offs: `docs/decisions.md` (four grader sections — see `030-decisions.mdc`)

If a rule and the requirements conflict, requirements win. Engineering defaults in the rules fill gaps the requirements leave open.

## Setup

Any of npm / yarn / pnpm (docs show all three; pick one lockfile for this repo):

```bash
pnpm install   # or: npm install / yarn
pnpm build     # react-native-builder-bob — consumer must not need source tree
pnpm test      # jest + @testing-library/react-native
pnpm lint      # eslint + typecheck
```

Before calling a task done: test, lint, and build must pass (once those scripts exist). A change that only looks right in source is not done.

## Rule index (current)

| File | Covers |
| --- | --- |
| `000-architecture.mdc` | Folder layers, dependency isolation, tokens, dual style, public exports |
| `010-coding-and-docs.mdc` | TypeScript/RN, component contracts, styling-in-code, TSDoc |
| `020-testing.mdc` | Risk-surface tests, skip list, layering smoke |
| `030-decisions.mdc` | Grader-shaped `docs/decisions.md` |
| `040-git-commits.mdc` | Conventional Commits for this library repo only |
| `050-ponytail.mdc` | Prefer simplest working solution; YAGNI ladder |
| `060-nativewind.mdc` | NativeWind v4 boundary, dual `className`/`style` path, host duties |
| `070-publish.mdc` | Bob lean tarball, dual examples, multi-package-manager |

## Task loop

1. Read the relevant `.cursor/rules/*.mdc` file(s) for the area touched — do not rely on stale session memory.
2. Place code in the correct layer:
   - design values → `core/tokens`
   - reusable recipes → `core/styles` (class + StyleSheet forms from tokens)
   - pure behaviour → `core/logic`
   - third-party wrappers → `core/integrations/*`
   - UI → `components/<Name>/`
   - public surface → explicit named exports in `src/index.ts`
3. Components must not import third-party packages except `react` / `react-native`. Styling engines only via `core/integrations/styling`.
4. Make the smallest coherent change that satisfies one requirement.
5. Add/update tests per `020-testing.mdc`.
6. Add/update TSDoc per `010-coding-and-docs.mdc`.
7. Log trade-offs in `docs/decisions.md` same turn per `030-decisions.mdc`.
8. Commit per `040-git-commits.mdc` only when the human asks for a commit.
9. Update `README.md` if public API or install/build steps changed.

## Things an agent must never do unprompted

- Add a dependency not implied by the requirements without flagging for human review.
- Import third-party styling libraries directly inside `components/`.
- Put adapter/integration code inside a component folder.
- Collapse this repo into a host app or add monorepo linking as the publish model — package stays standalone.
- Widen scope (6th component, dark mode system, app screens, navigation, data fetching).
- Claim Tailwind utilities work on RN without NativeWind.
- Ship `example-expo/` or `example-bare/` in the npm tarball.
- Disable a lint or type-check rule to force a green build instead of fixing the root cause.
- Use `export *` from `src/index.ts`.
- Hard-code hex/spacing/radius outside `core/tokens`.
- Commit unless the human explicitly asks.

## Decision logging

This repo owns `docs/decisions.md`. Law: `030-decisions.mdc`.

Four fixed sections: (1) five decisions to defend, (2) NativeWind across package boundary + cost, (3) what we cut, (4) AI tools used and where.
