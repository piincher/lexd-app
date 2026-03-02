/**
 * Offline Storage Layer
 * Provides unified storage interface using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageStats {
  totalKeys: number;
  totalSize: number; // in bytes
  keys: string[];
}

/**
 * Set an item in storage
 */
export const setItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const serialized = JSON.stringify(value);
    await AsyncStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`[OfflineStorage] Error setting item ${key}:`, error);
    throw new Error(`Failed to store item: ${key}`);
  }
};

/**
 * Get an item from storage
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`[OfflineStorage] Error getting item ${key}:`, error);
    return null;
  }
};

/**
 * Remove an item from storage
 */
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[OfflineStorage] Error removing item ${key}:`, error);
    throw new Error(`Failed to remove item: ${key}`);
  }
};

/**
 * Get all keys in storage
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('[OfflineStorage] Error getting all keys:', error);
    return [];
  }
};

/**
 * Get multiple items at once
 */
export const multiGet = async <T>(keys: string[]): Promise<Record<string, T | null>> => {
  try {
    if (keys.length === 0) return {};
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    const result: Record<string, T | null> = {};
    
    keyValuePairs.forEach(([key, value]) => {
      result[key] = value ? JSON.parse(value) : null;
    });
    
    return result;
  } catch (error) {
    console.error('[OfflineStorage] Error in multiGet:', error);
    return {};
  }
};

/**
 * Set multiple items at once
 */
export const multiSet = async <T>(items: Record<string, T>): Promise<void> => {
  try {
    const keyValuePairs = Object.entries(items).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(keyValuePairs as [string, string][]);
  } catch (error) {
    console.error('[OfflineStorage] Error in multiSet:', error);
    throw new Error('Failed to store multiple items');
  }
};

/**
 * Remove multiple items at once
 */
export const multiRemove = async (keys: string[]): Promise<void> => {
  try {
    if (keys.length === 0) return;
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('[OfflineStorage] Error in multiRemove:', error);
    throw new Error('Failed to remove multiple items');
  }
};

/**
 * Clear all data from storage (use with caution)
 */
export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('[OfflineStorage] Error clearing storage:', error);
    throw new Error('Failed to clear storage');
  }
};

/**
 * Get storage usage statistics
 */
export const getStorageSize = async (): Promise<StorageStats> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    
    let totalSize = 0;
    keyValuePairs.forEach(([, value]) => {
      if (value) {
        // Approximate size in bytes (2 bytes per character for UTF-16)
        totalSize += value.length * 2;
      }
    });

    return {
      totalKeys: keys.length,
      totalSize,
      keys,
    };
  } catch (error) {
    console.error('[OfflineStorage] Error calculating storage size:', error);
    return { totalKeys: 0, totalSize: 0, keys: [] };
  }
};

/**
 * Check if storage is near capacity (AsyncStorage limit is typically ~6MB)
 */
export const isStorageNearLimit = async (threshold = 0.8): Promise<boolean> => {
  const stats = await getStorageSize();
  const limit = 6 * 1024 * 1024; // 6MB typical limit
  return stats.totalSize > limit * threshold;
};

/**
 * Merge an object with existing value
 */
export const mergeItem = async <T>(key: string, value: Partial<T>): Promise<void> => {
  try {
    const existing = await getItem<T>(key);
    const merged = existing ? { ...existing, ...value } : value;
    await setItem(key, merged);
  } catch (error) {
    console.error(`[OfflineStorage] Error merging item ${key}:`, error);
    throw new Error(`Failed to merge item: ${key}`);
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  getAllKeys,
  multiGet,
  multiSet,
  multiRemove,
  clear,
  getStorageSize,
  isStorageNearLimit,
  mergeItem,
};
