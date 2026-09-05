module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/test/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/example-expo/', '<rootDir>/example-bare/'],
  watchman: false,
};
