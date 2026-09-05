# CLAUDE.md — fieldops-ui

Entry point for Claude (or any AI assistant) in this repository.
Full detail lives under `.cursor/rules/*.mdc` — read those before non-trivial changes. This file is the map, not the territory.

## What this repo is

`fieldops-ui` is a standalone React Native component library:

- Built with `react-native-builder-bob`
- Styled with **NativeWind v4** (`className`) through an integrations layer, plus token **StyleSheet** defaults/`style` overrides for hosts without NativeWind
- Publishes a token preset at `fieldops-ui/preset`
- Dual local examples (`example-expo`, `example-bare`) that never ship in the npm tarball
- Consumed as a real installable package — never as a relative source import

Nothing in this repo imports from or knows about a consuming app’s domain modules.

Requirements: `docs/requirements.md`.  
Trade-offs: `docs/decisions.md` (four grader sections — see `.cursor/rules/030-decisions.mdc`).  
NativeWind law: `.cursor/rules/060-nativewind.mdc`. Publish law: `.cursor/rules/070-publish.mdc`.

## Non-negotiable constraints

1. Exactly five public components: `Button`, `Text`, `TextField`, `Select`, `Badge`. Do not add a sixth.
2. Dual style overrides: `className` merge (NW) and `style` last-wins (native), both documented and tested via `core/integrations/styling`.
3. Package builds via bob with correct peers, entry points, `prepare`, lean `files`. Consumers must not need the source tree.
4. TypeScript `strict`, no `any`. Every public prop has per-prop TSDoc — see `010-coding-and-docs.mdc`.
5. Composable hatch among the five: **TextField** right adornment (document in TSDoc + `docs/decisions.md` §1).
6. Explicit named exports in `src/index.ts`. No `export *`.
7. Design values live once in `core/tokens`. Class and StyleSheet recipes both read tokens — no forked hex.

## Architecture (short)

```
core/tokens → core/styles → core/logic → core/integrations/* → components/* → src/index.ts
```

Inner layers never import outer layers. Swapping NativeWind/merge libs edits `core/integrations/` only.

## Rule index

| File | Covers |
| --- | --- |
| `000-architecture.mdc` | Layers, SOLID, dual style, exports |
| `010-coding-and-docs.mdc` | TS/RN, contracts, TSDoc |
| `020-testing.mdc` | Risk surface |
| `030-decisions.mdc` | Decisions log shape |
| `040-git-commits.mdc` | Conventional Commits |
| `050-ponytail.mdc` | YAGNI ladder |
| `060-nativewind.mdc` | NW boundary + dual path |
| `070-publish.mdc` | Lean npm + examples + multi-PM |

Process: `AGENTS.md`.

## When context is ambiguous

1. Requirements win over rules if they conflict.
2. If there is no single correct answer: pick a defensible option, log it in `docs/decisions.md` per `030-decisions.mdc`, and continue.
3. Do not block shipping on perfect consensus.

## Out of scope — do not implement

- App screens, navigation, networking, forms orchestration, TanStack Query, auth, offline sync
- Dark mode / theming systems beyond the shipped light tokens
- Tailwind-without-NativeWind utility styling on RN (impossible — use `style` path instead)
- CI/CD, store publishing, monorepo merge with a host app as the library home
- A sixth public component or app-specific widgets
- javascript-obfuscator / opaque builds that break Metro or class strings
