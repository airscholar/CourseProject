module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/__tests__/*.spec.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["*.spec.ts", "<rootDir>/src/**/__tests__/*.spec.ts"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testTimeout: 8000,
  verbose: true,
};
