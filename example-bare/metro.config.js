const path = require('path');
const {
  getDefaultConfig,
  mergeConfig,
} = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const appNodeModules = path.resolve(__dirname, 'node_modules');
const appRuntimePackages = [
  'nativewind',
  'react',
  'react-native',
  'react-native-css-interop',
  'react-native-reanimated',
  'react-native-safe-area-context',
];

const config = mergeConfig(getDefaultConfig(__dirname), {
  // npm links `file:..` outside this app root; Metro must watch that package.
  watchFolders: [path.resolve(__dirname, '..')],
  resolver: {
    unstable_enableSymlinks: true,
    resolveRequest: (context, moduleName, platform) => {
      const runtimePackage = appRuntimePackages.find(
        (packageName) =>
          moduleName === packageName || moduleName.startsWith(`${packageName}/`)
      );

      // Linked library imports must share the app's React Native runtime.
      return context.resolveRequest(
        context,
        runtimePackage
          ? path.join(appNodeModules, moduleName)
          : moduleName,
        platform
      );
    },
  },
});

module.exports = withNativeWind(config, {
  input: './global.css',
});
