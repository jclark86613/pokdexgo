module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    moduleDirectories: [ "node_modules", "src" ],
    "roots": [
      "<rootDir>",
      "./src/app"
    ],
    "modulePaths": [
      "<rootDir>",
      "./src/app"
    ],
    "moduleDirectories": [
      "node_modules"
    ],
  };
