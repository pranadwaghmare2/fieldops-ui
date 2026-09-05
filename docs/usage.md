# Usage — fieldops-ui

Package: `@pranadwaghmare2/fieldops-ui` (npmjs).

Install and host setup: see [README](../README.md).

## Dual style path

Every public component accepts:

- **`className`** — NativeWind utilities; merged with defaults via `composeClassName` (last-wins per utility group). When a non-empty `className` is passed, StyleSheet token defaults are skipped so NativeWind can win over inline styles.
- **`style`** — React Native style; always last in the style array when applied. Use this without NativeWind, or to override after class resolution.

## Button

Pressable with variants, sizes, loading, disabled, optional leading icon. Forwards ref to `Pressable`.

| Prop | Type | Notes |
| --- | --- | --- |
| `children` | `ReactNode` | Label content |
| `onPress` | `() => void` | Required for press |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | Default `primary` |
| `size` | `'sm' \| 'md' \| 'lg'` | Default `md` |
| `isLoading` | `boolean` | Shows busy state; disables press |
| `isDisabled` | `boolean` | Disables press |
| `leadingIcon` | `ReactNode` | Optional leading slot |
| `className` | `string` | NW override |
| `style` | `StyleProp<ViewStyle>` | Native override |
| `accessibilityLabel` | `string` | Prefer when children are not plain text |

```tsx
import { Button } from '@pranadwaghmare2/fieldops-ui';

<Button variant="primary" size="md" onPress={save} isLoading={saving}>
  Save
</Button>
```

## Text

Typographic roles from tokens. Forwards ref to RN `Text`.

| Prop | Type | Notes |
| --- | --- | --- |
| `children` | `ReactNode` | Text content |
| `role` | `'title' \| 'heading' \| 'body' \| 'label' \| 'caption'` | Default `body` |
| `className` / `style` | — | Dual overrides |

```tsx
<Text role="heading">Work orders</Text>
```

## TextField

Labeled input with helper/error and optional end adornment (composable escape hatch). Forwards ref to `TextInput`. Controlled via `value` / `onChangeText`.

| Prop | Type | Notes |
| --- | --- | --- |
| `label` | `string` | Visible label |
| `value` / `onChangeText` | controlled | Form-library friendly |
| `placeholder` | `string` | — |
| `helperText` | `string` | Shown when no error |
| `errorMessage` | `string` | Error state; sets invalid a11y |
| `endAdornment` | `ReactNode` | End/right slot (e.g. show password) |
| `isDisabled` | `boolean` | — |
| `className` / `style` | — | Apply to the field chrome |

```tsx
<TextField
  label="Password"
  value={password}
  onChangeText={setPassword}
  errorMessage={error}
  endAdornment={<Button variant="ghost" onPress={toggle}>Show</Button>}
/>
```

## Select

Single-select from options. The options list opens in a **Modal** with `FlatList`
virtualization (safe inside host `ScrollView`s). Forwards ref to the trigger.

| Prop | Type | Notes |
| --- | --- | --- |
| `options` | `{ label: string; value: T }[]` | Generic `T` |
| `value` | `T` | Selected value |
| `onValueChange` | `(value: T) => void` | — |
| `accessibilityLabel` | `string` | Required for the trigger |
| `placeholder` | `string` | When nothing selected |
| `errorMessage` | `string` | Sets `accessibilityState.invalid` |
| `isDisabled` | `boolean` | — |
| `className` / `style` | — | Trigger chrome |

```tsx
<Select
  accessibilityLabel="Status"
  options={[
    { label: 'Open', value: 'open' },
    { label: 'Done', value: 'done' },
  ]}
  value={status}
  onValueChange={setStatus}
/>
```

## Badge

Status tone from the library token map (`open`, `in_progress`, `blocked`, `done`).

| Prop | Type | Notes |
| --- | --- | --- |
| `status` | `'open' \| 'in_progress' \| 'blocked' \| 'done'` | Drives color |
| `children` | `ReactNode` | Label |
| `className` / `style` | — | Dual overrides |

```tsx
<Badge status="blocked">Blocked</Badge>
```

## Preset

```js
require('@pranadwaghmare2/fieldops-ui/preset');
```

Ships FieldOps colors, spacing, radius, and screens for host Tailwind configs.
