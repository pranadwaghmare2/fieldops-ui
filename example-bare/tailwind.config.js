/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './node_modules/@pranad/fieldops-ui/lib/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [
    require('nativewind/preset'),
    require('@pranad/fieldops-ui/preset'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
