/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './node_modules/fieldops-ui/lib/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [
    require('nativewind/preset'),
    // Bob ESM default export — CJS require exposes it on `.default`.
    require('fieldops-ui/preset').default,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
