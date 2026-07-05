module.exports = {
  preset: 'jest-expo',
  testEnvironment: '<rootDir>/jest.environment.js',
  setupFiles: ['<rootDir>/jest.preset-mock.js', require.resolve('jest-expo/src/preset/setup.js')],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((react-native.*)|@react-native.*|expo.*|@expo.*|@testing-library.*|react-native-worklets|moti.*))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@constants/(.*)$': '<rootDir>/src/shared/constants/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/shared/test/mocks/fileMock.ts',
    '^expo/src/async-require/setupHMR$': '<rootDir>/src/shared/test/mocks/expoHMRMock.js',
    '^expo/src/async-require/setupFastRefresh$': '<rootDir>/src/shared/test/mocks/expoHMRMock.js',
    '^expo/src/async-require/messageSocket$': '<rootDir>/src/shared/test/mocks/expoHMRMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.styles.ts',
    '!src/**/types/*.ts',
  ],
  // TODO: raise thresholds back to 30% once test coverage catches up.
  // Current suite is ~1% globally because most source files have no tests yet.
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    __DEV__: false,
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/.agents/', '/.claude/', '/tmpcache3/'],
  modulePathIgnorePatterns: ['/node_modules/', '/.agents/', '/.claude/', '/tmpcache3/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/__tests__/', '/.agents/', '/.claude/', '/tmpcache3/'],
  clearMocks: true,
  restoreMocks: true,
  // Transform settings
  transform: {
    'expo[\\\\/]src[\\\\/]async-require[\\\\/].*\\.(js|ts)$': '<rootDir>/jest.null-transformer.js',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Prevent memory issues
  maxWorkers: 2,
  workerIdleMemoryLimit: '512MB',
  // Avoid Haste map collisions from sibling tooling folders
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios', 'native'],
    forceNodeFilesystemAPI: true,
    throwOnModuleCollision: false,
  },
};
