# fieldops-ui library design

Date: 2026-09-06  
Status: approved for implementation planning (components not built in this change)

## Goal

Standalone React Native component library (`fieldops-ui`) per `docs/requirements.md`: five components, bob publish, NativeWind v4 + token preset, dual Expo/bare examples excluded from npm, dual style path for NW and non-NW hosts.

## Locked choices

| Topic | Choice |
| --- | --- |
| Security / bundle | Open bob build + lean `files` (no obfuscation) |
| Package managers | npm, yarn, pnpm (docs + `prepare`) |
| Styling engine | NativeWind v4; Tailwind v3 host toolchain |
| Non-NW hosts | Token StyleSheet defaults + consumer `style` |
| Breakpoints | Host/preset `screens` (no layout-effect size engine) |
| Scaffold | bob / create-react-native-library + dual examples |
| Version floor | Modern band compatible with NativeWind v4 |
| Composable hatch | TextField right adornment |
| Select list | FlatList |
| Spec location | `docs/specs/` (not `docs/superpowers/` — gitignored) |

## Architecture

```
core/tokens → core/styles → core/logic → core/integrations/styling → components/* → src/index.ts
+ fieldops-ui/preset export
+ example-expo/ + example-bare/ (dev only)
```

## Dual style (feasibility)

- NativeWind `className`: requires host NW wiring + `content` scan of `lib/`.
- Tailwind without NativeWind on RN: **not possible**.
- Native `style`: always available; defaults from tokens via StyleSheet recipes.

## NativeWind package boundary

See `docs/decisions.md` §2 and `.cursor/rules/060-nativewind.mdc`.

## Publish

See `.cursor/rules/070-publish.mdc`. Lean tarball; examples out; peers for react / react-native / nativewind.

## Components (implement later)

Button, Text, TextField, Select, Badge — contracts in `010-coding-and-docs.mdc` / requirements.

## Rules updated this turn

`000`, `010`, `020`, `060` (rewritten), `070` (new), `AGENTS.md`, `CLAUDE.md`, `docs/decisions.md`, `.gitignore`.

## Non-goals (this change)

- No component source, no bob scaffold run, no example apps created yet.
- Next: implementation plan (writing-plans), then scaffold + build.
