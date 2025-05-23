// // // This replaces `const { getDefaultConfig } = require('expo/metro-config');`
// const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// // This replaces `const config = getDefaultConfig(__dirname);`
// // const config = getSentryExpoConfig(__dirname);
// module.exports = config;
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
