module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    // Reanimated 3 — must be listed last (NativeWind 4.1 + Expo 51 band).
    plugins: ['react-native-reanimated/plugin'],
  };
};
