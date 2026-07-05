// Mock out the HMR/fast-refresh modules that crash under Jest
// because the preset evaluates them with __DEV__=true/window defined.
jest.mock('expo/src/async-require/setup', () => ({}));
jest.mock('expo/src/async-require/setupFastRefresh', () => ({}));
jest.mock('expo/src/async-require/setupHMR', () => ({}));
jest.mock('expo/src/async-require/messageSocket', () => ({}));
