/*
 * Keep the static Expo configuration in app.json, but derive unique native
 * identifiers per build profile so development and production can coexist.
 */
const baseConfig = require('./app.json').expo;
const { withAndroidManifest, withAndroidStyles } = require('@expo/config-plugins');

const variant = process.env.APP_VARIANT || 'production';
const isProduction = variant === 'production';

const appName = isProduction ? baseConfig.name : `${baseConfig.name} ${variant[0].toUpperCase()}${variant.slice(1)}`;
const identifierSuffix = variant === 'development' ? 'dev' : variant;
const nativeIdentifier = isProduction
  ? 'com.nuvotech.lexd'
  : `com.nuvotech.lexd.${identifierSuffix}`;

const SYSTEM_BAR_STYLE_ITEMS = new Set([
  'android:statusBarColor',
  'android:navigationBarColor',
]);

const withLargeScreenFriendlyManifest = (config) =>
  withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application?.[0];
    const mainActivity = application?.activity?.find(
      (activity) => activity.$?.['android:name'] === '.MainActivity'
    );

    if (mainActivity?.$) {
      delete mainActivity.$['android:screenOrientation'];
      delete mainActivity.$['android:resizeableActivity'];
    }

    return config;
  });

const withEdgeToEdgeFriendlyStyles = (config) =>
  withAndroidStyles(config, (config) => {
    const styles = config.modResults.resources?.style || [];
    const appTheme = styles.find((style) => style.$?.name === 'AppTheme');

    if (Array.isArray(appTheme?.item)) {
      appTheme.item = appTheme.item.filter(
        (item) => !SYSTEM_BAR_STYLE_ITEMS.has(item.$?.name)
      );
    }

    return config;
  });

const withPlayConsoleAndroidCompliance = (config) =>
  withEdgeToEdgeFriendlyStyles(withLargeScreenFriendlyManifest(config));

module.exports = withPlayConsoleAndroidCompliance({
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
});
