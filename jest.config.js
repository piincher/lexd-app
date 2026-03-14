module.exports = {
  preset: 'jest-expo',
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
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/test/mocks/fileMock.ts',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.styles.ts',
    '!src/**/types/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/__tests__/'],
  clearMocks: true,
  restoreMocks: true,
  // Handle ES modules
  extensionsToTreatAsEsm: [],
  // Transform settings
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Prevent memory issues
  maxWorkers: 2,
  workerIdleMemoryLimit: '512MB',
};
