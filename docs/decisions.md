# Decisions — fieldops-ui

Reviewers should learn *why* the codebase looks the way it does without reading chat history.

Shape and agent law: `.cursor/rules/030-decisions.mdc`.  
Update the matching section **in the same turn** as each choice. Replace stubs before handoff — do not leave `<!-- replace -->` markers.

---

## 1. Five decisions to defend

Exactly five entries at handoff. Each must include the rejected option and why.

### className merge last-wins (utility group)

- **Why:** Requirements require predictable consumer `className` overrides over internal utilities.
- **What:** `composeClassName` in `core/integrations/styling` using group-aware merge (`tailwind-merge` behind the port); defaults then consumer; last-wins per utility group.
- **Rejected:** String concatenation / order-only merge — conflicting utilities can silently fail after NativeWind resolves classes.
- **How:** Port in `core/integrations/styling`; components call the port only; tested in adapter + one component risk-surface test.

### Dual style path (`className` + `style`)

- **Why:** NativeWind hosts need `className`; hosts that skip NativeWind still need token defaults and overrides. Tailwind utilities without NativeWind on RN are impossible.
- **What:** Token defaults as StyleSheet recipes (always) plus class recipes (NW). Consumer `style` last in RN style array; consumer `className` via merge port.
- **Rejected:** NativeWind-only defaults (non-NW hosts render unstyled); pretending `className` works without NativeWind; adding Emotion/styled-components.
- **How:** `core/tokens` → parallel recipes in `core/styles`; law in `060-nativewind.mdc`; README documents both host types.

### TextField right adornment as composable hatch

- **Why:** Requirements require one genuine escape hatch among the five components.
- **What:** TextField optional right adornment slot (render prop / `ReactNode`).
- **Rejected:** Inventing a sixth “Slot” component; making Select the only hatch before TextField covers form DX.
- **How:** Documented on `TextFieldProps` + TSDoc `@remarks`; risk-surface test in `020-testing.mdc`.

### Select long list via FlatList

- **Why:** Requirements: Select must work with a long list; keep tree shallow for New Arch / jank less.
- **What:** RN `FlatList` virtualization for options.
- **Rejected:** Static `.map` of all options; FlashList dependency (extra peer, not required yet).
- **How:** `components/Select`; no layout-effect size machine for the list itself.

### Bob lean publish + dual examples excluded

- **Why:** Requirements: real bob build; consumers must not need source tree; examples must not bloat npm.
- **What:** `prepare: bob build`; `module` + `typescript`; `files` whitelist `lib` + preset + README/LICENSE; `example-expo` + `example-bare` local only; npm/yarn/pnpm docs.
- **Rejected:** Shipping `src` + examples in tarball; javascript-obfuscator; pnpm-only consumer story.
- **How:** `070-publish.mdc`; package `exports` for `.` and `./preset`.

### Candidates (prune before handoff)

_(empty — five defend entries above are the handoff set)_

---

## 2. NativeWind across package boundary

How styles and tokens cross the installable package boundary, and what that costs.

- **Problem:** Class strings inside a published package do nothing unless the **host** runs NativeWind (babel/metro/css) and Tailwind `content` includes the library’s compiled files. Skipping the shipped preset makes token utilities (`bg-primary`, etc.) miss or diverge. Without a StyleSheet fallback, non-NW hosts would get empty defaults.
- **Solution:**
  - Peer `nativewind` (v4); ship `fieldops-ui/preset` with FieldOps tokens + native-oriented `screens`.
  - Bob `lib/` keeps class strings; host `content` includes `node_modules/fieldops-ui/lib/**/*`.
  - Host steps documented: presets `[nativewind/preset, fieldops-ui/preset]`, babel, `withNativeWind`, `global.css`.
  - Dual path: StyleSheet token defaults + `style` override so non-NW hosts still work; `className` for NW hosts.
  - Styling third-party libs stay behind `core/integrations/styling`.
  - Dual examples prove Expo and bare RN wiring; neither ships in npm.
- **Cost:** Host setup burden; peer version pins (NW v4 + Tailwind 3); dual recipe maintenance (class + StyleSheet); silent unstyled `className` if `content` wrong; two examples to maintain; lean tarball discipline (`files` / `.npmignore`).

---

## 3. What we cut

Be specific. This section matters more than the others. Name the thing not built.

- **Cut:** Dark mode / multi-theme system beyond shipped light tokens  
  - **Why:** Requirements are light-token only; theming systems expand scope.  
  - **Rejected alternative:** CSS-variable theme provider across the package boundary.

- **Cut:** `useLayoutEffect` / measure-based responsive size engine for phone/tablet/foldable  
  - **Why:** Option A — host/preset `screens` + discrete `size` props suffice.  
  - **Rejected alternative:** Runtime `FieldOpsProvider` breakpoint object on every component.

- **Cut:** Tailwind utility styling without NativeWind on React Native  
  - **Why:** Impossible on RN — `className` is ignored without the NW bridge.  
  - **Rejected alternative:** Documenting fake “use Tailwind only” host setup.

- **Cut:** javascript-obfuscator / opaque production bundles for the library  
  - **Why:** Breaks Metro, source maps, and class-string scanning; not industry practice for UI kits.  
  - **Rejected alternative:** Closed obfuscated `lib` with no readable types path.

- **Cut:** FlashList / sixth public component / app screens / Emotion  
  - **Why:** YAGNI vs requirements five-component surface.  
  - **Rejected alternative:** Extra list virtualization peer; work-order card component.

- **Cut:** Publishing examples or `docs/superpowers/` agent specs in the npm package (and keep agent specs out of git)  
  - **Why:** Lean tarball; plans are local agent noise.  
  - **Rejected alternative:** Monorepo app shipped as part of `fieldops-ui` publish.

---

## 4. AI tools used and where

Append on first use of a tool in a work stream.

- **Tool:** Cursor Agent (Composer) + brainstorming skill  
  - **Where:** Decisions log rubric; library design alignment (rules `060`/`070`, dual style path, publish shape); `docs/decisions.md` fill; design spec under `docs/specs/`  
  - **Not used for:** Five-component implementation (deferred until implementation plan)

- **Tool:** caveman communication mode  
  - **Where:** Design dialogue compression only  
  - **Not used for:** Committed docs/rules (normal prose)
