# FieldOps UI Expo example

Consumes **`@pranadwaghmare2/fieldops-ui` from npmjs** (`^0.1.1`), not a local `file:..` link.

Publish the library first, then:

```sh
cd example-expo
npm install   # or yarn / pnpm
npx expo start -c
```

## Android (physical device or emulator)

`Failed to download remote update` means Expo Go cannot reach Metro.

1. Same Wi‑Fi as the Mac; turn off VPN if needed.
2. `npx expo start -c`, open via QR in Expo Go (SDK 51 band).
3. If LAN still fails: `npx expo start --tunnel -c`.
4. Emulator only (optional): `adb reverse tcp:8081 tcp:8081`.

This example disables Expo Updates (`app.json` → `updates.enabled: false`) so Go does not chase an OTA channel for local demos.
