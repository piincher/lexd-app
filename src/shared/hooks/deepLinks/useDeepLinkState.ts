/**
 * useDeepLinkState Hook
 *
 * Manages pending deep link storage in AsyncStorage.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const PENDING_DEEP_LINK_KEY = "CHINALINK_PENDING_DEEP_LINK";

/** Store a pending deep link for post-login navigation */
export async function storePendingDeepLink(url: string): Promise<void> {
  try {
    await AsyncStorage.setItem(PENDING_DEEP_LINK_KEY, url);
  } catch {
    // Silently fail
  }
}

/** Retrieve and clear the pending deep link */
export async function getPendingDeepLink(): Promise<string | null> {
  try {
    const url = await AsyncStorage.getItem(PENDING_DEEP_LINK_KEY);
    if (url) {
      await AsyncStorage.removeItem(PENDING_DEEP_LINK_KEY);
    }
    return url;
  } catch {
    return null;
  }
}


