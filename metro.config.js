// // // This replaces `const { getDefaultConfig } = require('expo/metro-config');`
// const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// // This replaces `const config = getDefaultConfig(__dirname);`
// // const config = getSentryExpoConfig(__dirname);
// module.exports = config;
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = wrapWithReanimatedMetroConfig(config);
