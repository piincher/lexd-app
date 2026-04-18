// // This replaces `const { getDefaultConfig } = require('expo/metro-config');`
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// This replaces `const config = getDefaultConfig(__dirname);`
const config = getSentryExpoConfig(__dirname);

const originalGetTransformOptions = config.transformer.getTransformOptions;
config.transformer.getTransformOptions = async () => {
  const existing = originalGetTransformOptions ? await originalGetTransformOptions() : {};
  return {
    ...existing,
    transform: {
      ...existing.transform,
      inlineRequires: true,
    },
  };
};

config.transformer.minifierConfig = {
  keep_classnames: false,
  keep_fnames: false,
};

config.resolver = config.resolver || {};
config.resolver.blockList = [
  /.*\/node_modules\/.*\/(__tests__|__mocks__|docs|test|tests)\/.*/,
];
config.resolver.unstable_enablePackageExports = true;

module.exports = wrapWithReanimatedMetroConfig(config);
