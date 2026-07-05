// Null-transforms the Expo async-require HMR modules so they do not execute
// during jest-expo's preset setup.
module.exports = {
  process() {
    return { code: 'module.exports = {};', map: null };
  },
};
