/**
 * Device ID utilities
 * Generates and persists a stable device identifier for backend version-gate whitelist.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const DEVICE_ID_KEY = '@device_id';

let cachedDeviceId: string | null = null;

/**
 * Generate a UUID v4 using Math.random()
 */
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Async: fetch or create the device ID, cache it, and return it.
 */
export const getDeviceId = async (): Promise<string> => {
  if (cachedDeviceId) {
    return cachedDeviceId;
  }

  try {
    const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (stored) {
      cachedDeviceId = stored;
      return stored;
    }
  } catch {
    // Fallback to generating a new one if storage read fails
  }

  const newId = generateUUID();
  cachedDeviceId = newId;

  try {
    await AsyncStorage.setItem(DEVICE_ID_KEY, newId);
  } catch {
    // Silently ignore storage write failures
  }

  return newId;
};

/**
 * Sync: return the cached device ID if already loaded.
 * Useful in synchronous request interceptors.
 */
export const getDeviceIdSync = (): string | null => cachedDeviceId;

// Auto-init on module load so the sync accessor is usually populated
// before the first API request.
getDeviceId().catch(() => {});
