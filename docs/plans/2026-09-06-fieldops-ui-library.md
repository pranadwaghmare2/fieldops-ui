# fieldops-ui Library Creation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold and ship `fieldops-ui` as a bob-built React Native component library (five components, NativeWind v4 dual style path, preset export, dual examples excluded from npm).

**Architecture:** Layers `core/tokens → core/styles → core/logic → core/integrations/styling → components/* → src/index.ts`. Defaults from tokens as both StyleSheet and class recipes; consumer overrides via `style` and/or `className` (merge last-wins). Host owns NativeWind babel/metro; library ships `fieldops-ui/preset`.

**Tech Stack:** TypeScript strict, react-native-builder-bob, NativeWind v4, Tailwind CSS v3 (host), tailwind-merge + clsx behind integrations, Jest + @testing-library/react-native, Expo example + bare RN example.

**Spec / law:** `docs/specs/2026-09-06-fieldops-ui-library-design.md`, `docs/requirements.md`, `docs/decisions.md`, `.cursor/rules/000|010|020|060|070-*.mdc`.

## Global Constraints

- Exactly five public components: Button, Text, TextField, Select, Badge — no sixth.
- NativeWind v4 + modern RN/Expo floor; peers: `react`, `react-native`, `nativewind`.
- Dual style: `className` (NW) + `style` (native); Tailwind-without-NW on RN is forbidden.
- Components import only `react` / `react-native` as third-party; styling only via `core/integrations/styling`.
- Bob `prepare`; lean `files` (no examples/src plans); npm/yarn/pnpm docs.
- Composable hatch: TextField right adornment; Select uses FlatList.
- No dark mode, no obfuscation, no `useLayoutEffect` size engine.
- Plan lives at `docs/plans/` (not `docs/superpowers/` — gitignored).
- After each task: commit with Conventional Commits (`040-git-commits.mdc`).

## File map (target)

```
package.json
bob.config or package.json react-native-builder-bob
tsconfig.json / tsconfig.build.json
jest.config.js / jest.setup.js
README.md
LICENSE
src/
  index.ts
  preset.ts                          # or src/core/integrations/styling/preset.ts re-exported
  core/tokens/index.ts
  core/styles/{button,text,field,badge,select}.ts
  core/logic/select.ts               # option identity helpers if needed
  core/integrations/styling/
    composeClassName.ts
    composeStyle.ts
    index.ts
  components/
    Button/{Button.tsx,Button.types.ts,Button.styles.ts,Button.test.tsx,index.ts}
    Text/...
    TextField/...
    Select/...
    Badge/...
example-expo/                        # not in npm files
example-bare/                        # not in npm files
```

---

### Task 1: Bob package scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.build.json`, `jest.config.js`, `jest.setup.js`, `src/index.ts` (empty named exports stub), `LICENSE`
- Modify: `.gitignore` (ensure `lib/` present)

**Interfaces:**
- Produces: `prepare` → `bob build`; scripts `build`, `test`, `lint`, `typecheck`; `exports` for `.` and `./preset`

- [ ] **Step 1: Init package.json**

Use name `fieldops-ui`, version `0.1.0`. Include at minimum:

```json
{
  "name": "fieldops-ui",
  "version": "0.1.0",
  "main": "./lib/module/index.js",
  "types": "./lib/typescript/src/index.d.ts",
  "exports": {
    ".": {
      "types": "./lib/typescript/src/index.d.ts",
      "default": "./lib/module/index.js"
    },
    "./preset": {
      "types": "./lib/typescript/src/preset.d.ts",
      "default": "./lib/module/preset.js"
    },
    "./package.json": "./package.json"
  },
  "files": ["lib", "README.md", "LICENSE"],
  "scripts": {
    "prepare": "bob build",
    "build": "bob build",
    "test": "jest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint \"src/**/*.{ts,tsx}\""
  },
  "peerDependencies": {
    "nativewind": "^4.0.0",
    "react": ">=18.2.0",
    "react-native": ">=0.73.0"
  },
  "devDependencies": {
    "react-native-builder-bob": "^0.40.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "@testing-library/react-native": "^12.0.0",
    "react-test-renderer": "18.2.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "nativewind": "^4.0.0",
    "tailwind-merge": "^2.0.0",
    "clsx": "^2.0.0",
    "@types/react": "^18.0.0"
  },
  "react-native-builder-bob": {
    "source": "src",
    "output": "lib",
    "targets": [
      ["module", { "esm": true }],
      "typescript"
    ]
  }
}
```

Pin exact versions to whatever `create-react-native-library` / NativeWind v4 install docs recommend at implement time (modern floor A). Prefer generating via:

```bash
npx create-react-native-library@latest fieldops-ui-tmp --slug fieldops-ui
```

then merge into this repo root (keep existing `docs/`, `.cursor/`, `.gitignore` rules). Delete template example if conflicting; we add `example-expo` / `example-bare` later.

- [ ] **Step 2: Install and verify empty build**

```bash
pnpm install   # or npm i / yarn
pnpm build
```

Expected: `lib/` generated; empty `src/index.ts` may export nothing yet — add:

```ts
export {};
```

until Task 11.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json jest.config.js jest.setup.js src/index.ts LICENSE
git commit -m "build: scaffold bob package for fieldops-ui"
```

---

### Task 2: Design tokens

**Files:**
- Create: `src/core/tokens/index.ts`, `src/core/tokens/tokens.test.ts`

**Interfaces:**
- Produces: `colors`, `spacing`, `typography`, `radius`, `statusTone` maps matching requirements.md exactly

- [ ] **Step 1: Write failing token test**

```ts
import { colors, spacing, radius, statusTone, typography } from './index';

describe('tokens', () => {
  it('matches FieldOps colour contract', () => {
    expect(colors.primary).toBe('#1D4ED8');
    expect(colors.danger).toBe('#DC2626');
    expect(statusTone.open).toBe('fgMuted');
    expect(statusTone.done).toBe('success');
  });

  it('uses 4-point spacing and radius 10', () => {
    expect(spacing[4]).toBe(16);
    expect(radius.md).toBe(10);
    expect(typography.title.fontSize).toBe(22);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
pnpm test -- src/core/tokens/tokens.test.ts
```

- [ ] **Step 3: Implement tokens**

```ts
export const colors = {
  bg: '#FFFFFF',
  surface: '#F6F7F9',
  border: '#E3E6EA',
  fg: '#111827',
  fgMuted: '#6B7280',
  primary: '#1D4ED8',
  primaryFg: '#FFFFFF',
  danger: '#DC2626',
  warning: '#D97706',
  success: '#15803D',
} as const;

export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32 } as const;

export const radius = { md: 10 } as const;

export const typography = {
  title: { fontSize: 22, fontWeight: '600' as const },
  heading: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '500' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const;

export type StatusKey = 'open' | 'in_progress' | 'blocked' | 'done';

export const statusTone: Record<StatusKey, keyof typeof colors> = {
  open: 'fgMuted',
  in_progress: 'primary',
  blocked: 'warning',
  done: 'success',
};
```

Map `fg-muted` token name to `fgMuted` in TS; Tailwind preset uses `'fg-muted'` key.

- [ ] **Step 4: Tests PASS → commit**

```bash
git add src/core/tokens
git commit -m "feat(tokens): add FieldOps design tokens"
```

---

### Task 3: Styling integration ports

**Files:**
- Create: `src/core/integrations/styling/composeClassName.ts`, `composeStyle.ts`, `index.ts`, `composeClassName.test.ts`, `composeStyle.test.ts`

**Interfaces:**
- Produces:
  - `composeClassName(...inputs: ClassValue[]): string`
  - `composeStyle(...styles: Array<StyleProp<ViewStyle | TextStyle> | undefined>): StyleProp<...>`

- [ ] **Step 1: Failing merge tests**

```ts
import { composeClassName } from './composeClassName';

it('lets consumer utility win conflicting group', () => {
  expect(composeClassName('bg-primary', 'bg-danger')).toContain('bg-danger');
  expect(composeClassName('bg-primary', 'bg-danger')).not.toMatch(/bg-primary/);
});
```

```ts
import { StyleSheet } from 'react-native';
import { composeStyle } from './composeStyle';

it('appends consumer style last', () => {
  const base = { backgroundColor: '#1D4ED8' };
  const override = { backgroundColor: '#DC2626' };
  const merged = StyleSheet.flatten(composeStyle(base, override));
  expect(merged.backgroundColor).toBe('#DC2626');
});
```

- [ ] **Step 2: Implement**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function composeClassName(...inputs: ClassValue[]): string {
  // Group-aware last-wins so NativeWind hosts get predictable overrides.
  return twMerge(clsx(inputs));
}
```

```ts
import { StyleSheet, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

type AnyStyle = ViewStyle | TextStyle;

export function composeStyle(
  ...styles: Array<StyleProp<AnyStyle> | undefined>
): StyleProp<AnyStyle> {
  return StyleSheet.flatten(styles.filter(Boolean) as StyleProp<AnyStyle>[]);
}
```

Prefer returning array `[base, consumer]` from components if flatten loses some RN behaviors — document choice in decisions if you switch. Default: flatten in port for testability; components may still pass `[base, style]`.

- [ ] **Step 3: PASS → commit**

```bash
git commit -am "feat(integrations): add className and style compose ports"
```

---

### Task 4: Core style recipes + preset

**Files:**
- Create: `src/core/styles/text.ts`, `button.ts`, `field.ts`, `badge.ts`, `select.ts`
- Create: `src/preset.ts`
- Test: `src/preset.test.ts` (shape smoke)

**Interfaces:**
- Produces: recipe functions returning `{ className: string; style: ViewStyle | TextStyle }` from tokens
- Produces: default export / named `fieldopsPreset` for Tailwind `presets: [...]`

- [ ] **Step 1: Implement text recipe (pattern for others)**

```ts
import { colors, typography, type typography as T } from '../tokens';
import type { TextStyle } from 'react-native';

export type TextRole = keyof typeof typography;

const roleClass: Record<TextRole, string> = {
  title: 'text-[22px] font-semibold text-fg',
  heading: 'text-[17px] font-semibold text-fg',
  body: 'text-[15px] font-normal text-fg',
  label: 'text-[13px] font-medium text-fg',
  caption: 'text-[12px] font-normal text-fg-muted',
};

export function textRecipe(role: TextRole): { className: string; style: TextStyle } {
  const t = typography[role];
  return {
    className: roleClass[role],
    style: {
      fontSize: t.fontSize,
      fontWeight: t.fontWeight,
      color: role === 'caption' ? colors.fgMuted : colors.fg,
    },
  };
}
```

Mirror for button variants/sizes, field chrome, badge status, select trigger — always both `className` and `style` from tokens. Hairline border, radius 10, no shadows.

- [ ] **Step 2: Preset**

```ts
import type { Config } from 'tailwindcss';
import { colors, spacing, radius } from './core/tokens';

const fieldopsPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        surface: colors.surface,
        border: colors.border,
        fg: colors.fg,
        'fg-muted': colors.fgMuted,
        primary: colors.primary,
        'primary-fg': colors.primaryFg,
        danger: colors.danger,
        warning: colors.warning,
        success: colors.success,
      },
      spacing: {
        1: `${spacing[1]}px`,
        2: `${spacing[2]}px`,
        3: `${spacing[3]}px`,
        4: `${spacing[4]}px`,
        6: `${spacing[6]}px`,
        8: `${spacing[8]}px`,
      },
      borderRadius: { md: `${radius.md}px` },
      screens: {
        sm: '390px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
};

export default fieldopsPreset;
```

- [ ] **Step 3: Build + commit**

```bash
pnpm build
git add src/core/styles src/preset.ts
git commit -m "feat(styles): add token recipes and Tailwind preset"
```

---

### Task 5: Text component

**Files:**
- Create: `src/components/Text/Text.types.ts`, `Text.styles.ts`, `Text.tsx`, `Text.test.tsx`, `index.ts`

**Interfaces:**
- Produces: `Text`, `TextProps` with `role`, `className`, `style`, children

- [ ] **Step 1: Failing tests (default render, className merge via port mock-free, style override)**

```tsx
import { render, screen } from '@testing-library/react-native';
import { Text } from './Text';

it('renders children with body role by default', () => {
  render(<Text>Hello</Text>);
  expect(screen.getByText('Hello')).toBeTruthy();
});
```

- [ ] **Step 2: Implement forwardRef Text wrapping RN Text; apply `textRecipe`; `composeClassName` / `composeStyle`**

- [ ] **Step 3: PASS → commit `feat(text): add typographic Text component`**

---

### Task 6: Badge component

**Files:** `src/components/Badge/*`

**Interfaces:** `status: StatusKey`; one tone per status via `statusTone`

- [ ] Tests: each status renders; className/style overrides
- [ ] Implement
- [ ] Commit `feat(badge): add status Badge`

---

### Task 7: Button component

**Files:** `src/components/Button/*`

**Interfaces:** `variant`, `size`, `isLoading`, `isDisabled`, `leadingIcon?`, `onPress`, `className`, `style`, a11y props

- [ ] Tests: variants, loading/disabled a11yState, merge
- [ ] Implement Pressable + optional ActivityIndicator; shallow tree
- [ ] Commit `feat(button): add variants sizes loading`

---

### Task 8: TextField component (composable hatch)

**Files:** `src/components/TextField/*`

**Interfaces:**
- `label`, `placeholder`, `helperText`, `errorMessage?`, `value`, `onChangeText`
- `endAdornment?: React.ReactNode` (documented hatch)
- `className`, `style`, optional `inputClassName` / `inputStyle` if needed

- [ ] Tests: controlled change; error state; adornment renders without breaking error
- [ ] Implement
- [ ] Commit `feat(textfield): add field with end adornment hatch`

---

### Task 9: Select component

**Files:** `src/components/Select/*`, maybe `src/core/logic/select.ts`

**Interfaces:**
- Generic `<T,>` options `{ label: string; value: T }[]`
- `value`, `onValueChange`, `errorMessage?`, FlatList for options
- `className`, `style`

- [ ] Tests: select option; long list uses FlatList (query by testID on list); error
- [ ] Implement modal/sheet or inline expanded list — keep shallow; prefer Pressable trigger + FlatList
- [ ] Commit `feat(select): add single-select with FlatList`

---

### Task 10: Public API + README + pack proof

**Files:**
- Modify: `src/index.ts`
- Create: `README.md`
- Optional: `.npmignore` mirroring `files`

- [ ] **Step 1: Explicit exports only**

```ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
export { Text } from './components/Text';
export type { TextProps } from './components/Text';
export { TextField } from './components/TextField';
export type { TextFieldProps } from './components/TextField';
export { Select } from './components/Select';
export type { SelectProps } from './components/Select';
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';
```

Do **not** `export *`. Preset via `./preset` export only.

- [ ] **Step 2: README** — install (npm/yarn/pnpm), NW host steps + non-NW `style` note, one example per component, preset snippet with `content` including `node_modules/fieldops-ui/lib/**/*.{js,jsx,ts,tsx}`

- [ ] **Step 3: Pack dry-run**

```bash
pnpm build && npm pack --dry-run
```

Expected: `lib/`, README, LICENSE only — **no** `example-*`, `.cursor`, `docs/superpowers`

- [ ] **Step 4: `pnpm test && pnpm lint && pnpm build` all green → commit**

```bash
git commit -am "docs(readme): add install and component examples"
```

---

### Task 11: example-expo (dev only)

**Files:** `example-expo/**` (App, babel, metro, tailwind.config, global.css)

- [ ] Create Expo app in `example-expo` with NativeWind per https://www.nativewind.dev/docs/getting-started/installation
- [ ] Depend on `fieldops-ui` via workspace/`file:..` or bob recommended linking
- [ ] `content` includes library path; presets include `fieldops-ui/preset`
- [ ] Screen demos all five components
- [ ] Confirm root `package.json` `files` still excludes example
- [ ] Commit `chore(example-expo): wire NativeWind consumer demo`

---

### Task 12: example-bare (dev only)

**Files:** `example-bare/**`

- [ ] Bare RN app with NativeWind frameworkless install guide
- [ ] Same five-component demo + preset/`content` wiring
- [ ] Commit `chore(example-bare): wire bare RN consumer demo`

---

### Task 13: Handoff gate

- [ ] Re-read `docs/decisions.md` — still five defend entries; §2/§3 accurate
- [ ] `npm pack --dry-run` clean
- [ ] `pnpm test && pnpm lint && pnpm build`
- [ ] Final commit if docs tweaks: `docs(decisions): sync handoff notes`

---

## Spec coverage checklist

| Requirement | Task |
| --- | --- |
| Five components | 5–9 |
| className override merge | 3, 5–9 |
| Dual `style` path | 3–9 |
| bob build / prepare / peers | 1, 10 |
| Preset tokens | 2, 4 |
| Composable hatch | 8 |
| Long-list Select | 9 |
| README examples | 10 |
| Expo + bare examples, not in npm | 11–12, 10 pack |
| TS autocomplete | types on all `*Props` |

## Execution handoff

Plan saved to `docs/plans/2026-09-06-fieldops-ui-library.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute in this session with executing-plans checkpoints  

**Which approach?**
