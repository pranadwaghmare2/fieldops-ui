# FieldOps UI bare React Native example

Consumes `@pranad/fieldops-ui` via `file:..` (same as a published install). Includes
committed `ios/` and `android/` for RN 0.74.

## Run

From the repository root, build the library once if `lib/` is missing:

```sh
npm install && npm run build
```

Then:

```sh
cd example-bare
npm install   # or: yarn / pnpm install
npm run android
# or
npm run ios
```

`npm start` runs Metro alone. iOS may run CocoaPods automatically (`react-native.config.js`); if needed: `npm run pod-install`.

## NativeWind

- Babel: `nativewind/babel` + Reanimated last
- Metro: `withNativeWind` + parent `watchFolders` for `file:..`
- Tailwind: `nativewind/preset` + `@pranad/fieldops-ui/preset`, content scans `lib/`
