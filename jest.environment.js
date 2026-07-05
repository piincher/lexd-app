const { TestEnvironment: NodeEnvironment } = require('jest-environment-node');

/**
 * Custom Jest environment that keeps `global.window` undefined while the
 * jest-expo preset loads. This prevents `expo/src/async-require/setup` from
 * pulling in Expo's HMR/fast-refresh runtime, which is meant for Metro and
 * crashes in Jest with a "Missing required parameter `platform`" error.
 */
class ExpoTestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);

    // Define on the outer Node global so it is visible from the setup files.
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      enumerable: true,
      get: () => undefined,
      set: () => {
        // no-op: ignore jest-expo's attempt to set window = global
      },
    });
  }
}

module.exports = ExpoTestEnvironment;
