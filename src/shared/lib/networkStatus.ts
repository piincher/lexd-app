/**
 * Network Status Utilities
 * Helper functions for network state detection
 */

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

/**
 * Check if device is currently online
 */
export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return !!state.isConnected;
};

/**
 * Check connection type
 */
export const getConnectionType = async (): Promise<string> => {
  const state = await NetInfo.fetch();
  return state.type;
};

/**
 * Check if on WiFi
 */
export const isWifiConnected = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.type === 'wifi' && !!state.isConnected;
};

/**
 * Check if on cellular
 */
export const isCellularConnected = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.type === 'cellular' && !!state.isConnected;
};

/**
 * Check if connection is metered (expensive)
 */
export const isConnectionMetered = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  // @ts-ignore - isConnectionExpensive might be available
  const isExpensive = state.details?.isConnectionExpensive ?? false;
  return state.type === 'cellular' || isExpensive;
};

/**
 * Get detailed connection info
 */
export const getConnectionInfo = async (): Promise<NetInfoState> => {
  return await NetInfo.fetch();
};

/**
 * Wait for online connection
 * @param timeout Maximum time to wait in ms
 */
export const waitForOnline = async (timeout = 30000): Promise<boolean> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const online = await isOnline();
    if (online) return true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  
  return false;
};

/**
 * Retry a function when online
 */
export const retryWhenOnline = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  retryDelay = 1000
): Promise<T> => {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      // Wait for online if not connected
      const online = await isOnline();
      if (!online) {
        await waitForOnline();
      }
      
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (i + 1)));
      }
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
};

export default {
  isOnline,
  getConnectionType,
  isWifiConnected,
  isCellularConnected,
  isConnectionMetered,
  getConnectionInfo,
  waitForOnline,
  retryWhenOnline,
};
