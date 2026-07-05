// Prevent Expo's HMR/fast-refresh setup from loading in the Jest environment.
// This must run before jest-expo/src/preset/setup.js.
global.__DEV__ = false;
