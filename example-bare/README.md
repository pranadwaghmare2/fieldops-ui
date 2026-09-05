# FieldOps UI bare React Native example

Consumes **`@pranadwaghmare2/fieldops-ui` from npmjs** (`^0.1.0`), not a local `file:..` link.
Includes committed `ios/` and `android/` for RN 0.74.

## Run

Publish the library first (`npm publish --access public` from repo root on `main`), then:

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
- Metro: `withNativeWind` on the app config
- Tailwind: `nativewind/preset` + `@pranadwaghmare2/fieldops-ui/preset`, content scans `node_modules/.../lib/`
