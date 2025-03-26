export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
    "^styles/(.*)$": "<rootDir>/src/styles/$1"
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  testMatch: [
    "<rootDir>/src/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ]
};
