# fieldops-ui

Five token-driven React Native components for field operations. Supports NativeWind
`className` and React Native `style` overrides.

Published as **`@pranad/fieldops-ui`** on **npmjs** (public).

Full API: [docs/usage.md](docs/usage.md).

## Install

```sh
npm install @pranad/fieldops-ui
# or
yarn add @pranad/fieldops-ui
# or
pnpm add @pranad/fieldops-ui
```

Peers: `react`, `react-native`, `nativewind` (v4). NativeWind hosts also need
`react-native-reanimated`, `react-native-safe-area-context`, and `tailwindcss@^3`
per the [NativeWind install guide](https://www.nativewind.dev/docs/getting-started/installation).

## Host matrix

| Host | Appearance |
| --- | --- |
| Expo + NativeWind | `className` + token preset |
| Bare RN + NativeWind | same |
| No NativeWind | StyleSheet token defaults + `style` only |

### NativeWind setup

Configure Babel, Metro (`withNativeWind`), and `global.css` in the **host**, then:

```js
// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@pranad/fieldops-ui/lib/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [
    require('nativewind/preset'),
    require('@pranad/fieldops-ui/preset'),
  ],
};
```

`./preset` resolves to a CJS wrapper (`preset.cjs`) for `require()`.

### Without NativeWind

```tsx
import { Button } from '@pranad/fieldops-ui';

<Button style={{ opacity: 0.8 }} onPress={handleSave}>
  Save
</Button>
```

## Quick examples

```tsx
import {
  Badge,
  Button,
  Select,
  Text,
  TextField,
} from '@pranad/fieldops-ui';

<Button variant="primary" onPress={handleSave} isLoading={isSaving}>
  Save
</Button>

<Text role="heading">Work orders</Text>

<TextField
  label="Email"
  value={email}
  onChangeText={setEmail}
  endAdornment={<Button variant="ghost">Show</Button>}
/>

<Select
  accessibilityLabel="Status"
  options={[{ label: 'Open', value: 'open' }]}
  value="open"
  onValueChange={setStatus}
/>

<Badge status="in_progress">In progress</Badge>
```

## Local examples

`example-expo/` and `example-bare/` are for development only — not published.

```sh
# Expo
cd example-expo && npm install && npm start

# Bare RN (includes ios/ + android/)
cd example-bare && npm install && npm run android
# or: npm run ios
```

Yarn / pnpm work the same way in each example folder.

## Publish (maintainers)

After merging to `main`, from an npm account that owns the **`pranad`** scope:

```sh
npm login
npm publish --access public
```

Bump `version` in `package.json` before each release. Reviewers install with no token.

## License

MIT
