/*
 * Keep the static Expo configuration in app.json, but derive unique native
 * identifiers per build profile so development and production can coexist.
 */
const baseConfig = require('./app.json').expo;

const variant = process.env.APP_VARIANT || 'production';
const isProduction = variant === 'production';

const appName = isProduction ? baseConfig.name : `${baseConfig.name} ${variant[0].toUpperCase()}${variant.slice(1)}`;
const identifierSuffix = variant === 'development' ? 'dev' : variant;
const nativeIdentifier = isProduction
  ? 'com.nuvotech.chinalinkexpress'
  : `com.nuvotech.chinalinkexpress.${identifierSuffix}`;

module.exports = {
  ...baseConfig,
  name: appName,
  ios: {
    ...baseConfig.ios,
    bundleIdentifier: nativeIdentifier,
  },
  android: {
    ...baseConfig.android,
    package: nativeIdentifier,
    // Development does not use production FCM/push credentials. Omitting this
    // file prevents Gradle from running processDebugGoogleServices for the
    // separate .dev package. Production keeps the existing Firebase client.
    googleServicesFile: isProduction ? baseConfig.android.googleServicesFile : undefined,
  },
};
