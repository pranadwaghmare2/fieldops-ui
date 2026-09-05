# fieldops-ui

Five token-driven React Native components for field operations. Components
support NativeWind `className` overrides and React Native `style` overrides.

## Install

Install the library with your package manager:

```sh
npm install fieldops-ui
# or
yarn add fieldops-ui
# or
pnpm add fieldops-ui
```

`react`, `react-native`, and `nativewind` are peer dependencies. NativeWind
hosts also need the packages from the
[NativeWind installation guide](https://www.nativewind.dev/docs/getting-started/installation):

```sh
npm install nativewind react-native-reanimated react-native-safe-area-context
npm install --save-dev tailwindcss@^3
```

Use the equivalent `yarn add` or `pnpm add` commands when appropriate.

## NativeWind host setup

NativeWind is configured by the consuming app, not by this library. Complete
NativeWind's Babel, Metro (`withNativeWind`), and `global.css` setup, then add
both presets and scan the compiled library:

```js
// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/fieldops-ui/lib/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [
    require('nativewind/preset'),
    require('fieldops-ui/preset'),
  ],
};
```

The `fieldops-ui/preset` entry exposes the same colors, spacing, radius, and
responsive screens used by the components' native defaults. Import your
NativeWind `global.css` from the app entry point after completing the host
setup.

### Without NativeWind

Components still render their token defaults through React Native styles.
Override them with the `style` prop. A `className` prop is accepted but React
Native does not apply utility classes unless the host configures NativeWind.

```tsx
<Button style={{ opacity: 0.8 }} onPress={handleSave}>
  Save
</Button>
```

## Components

### Button

```tsx
import { Button } from 'fieldops-ui';

<Button variant="primary" onPress={handleSave} isLoading={isSaving}>
  Save
</Button>;
```

### Text

```tsx
import { Text } from 'fieldops-ui';

<Text role="heading">Work orders</Text>;
```

### TextField

```tsx
import { TextField } from 'fieldops-ui';

<TextField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="name@example.com"
/>;
```

`TextField` also accepts an `endAdornment` node for controls such as password
visibility toggles or unit labels.

### Select

```tsx
import { Select } from 'fieldops-ui';

<Select
  accessibilityLabel="Status"
  options={[{ label: 'Open', value: 'open' }]}
  value="open"
  onValueChange={setStatus}
/>;
```

### Badge

```tsx
import { Badge } from 'fieldops-ui';

<Badge status="in_progress">In progress</Badge>;
```

## License

MIT
