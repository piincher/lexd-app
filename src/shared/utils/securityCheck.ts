import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Platform, Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';

/**
 * Run basic device security checks on app startup.
 *
 * NOTE: Full root/jailbreak detection requires native modules.
 * expo-device and expo-application provide device context but cannot
 * reliably detect rooting on their own. This function establishes the
 * hook point for future native hardening.
 */
export const runSecurityChecks = () => {
  if (Platform.OS === 'web') {
    return;
  }

  const compromised = isDeviceCompromised();

  if (compromised) {
    Alert.alert(
      'Security Warning',
      'This device appears to be rooted or jailbroken. Security may be compromised. Continue at your own risk.',
      [{ text: 'OK' }]
    );
  }

  Sentry.captureMessage('Security check completed', {
    level: compromised ? 'warning' : 'info',
    tags: {
      compromised: String(compromised),
      platform: Platform.OS,
      isDevice: String(Device.isDevice),
      brand: Device.brand || 'unknown',
      model: Device.modelName || 'unknown',
    },
  });
};

/**
 * Basic compromised-device heuristic.
 *
 * Currently returns false because expo-device does not expose root/jailbreak
 * APIs. When native detection is added, replace this with real checks.
 */
function isDeviceCompromised(): boolean {
  // Simulators/emulators are not treated as compromised for UX reasons
  if (!Device.isDevice) {
    return false;
  }

  // Placeholder for future native root/jailbreak detection.
  // On Android: check for su binary, test-keys, Superuser.apk, etc.
  // On iOS: check for Cydia, unusual file permissions, etc.
  return false;
}
