/**
 * Encrypted AsyncStorage Adapter
 * Encrypts sensitive values using AES before persisting to AsyncStorage.
 * The encryption key is stored securely via expo-secure-store.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';

const KEY_NAME = 'CHINALINK_ASYNCSTORAGE_KEY';

let cachedKey: string | null = null;

const getEncryptionKey = async (): Promise<string> => {
  if (cachedKey) {
    return cachedKey;
  }

  let key = await SecureStore.getItemAsync(KEY_NAME);
  if (!key) {
    key = CryptoJS.lib.WordArray.random(32).toString();
    await SecureStore.setItemAsync(KEY_NAME, key);
  }

  cachedKey = key;
  return key;
};

const encrypt = async (value: string): Promise<string> => {
  const key = await getEncryptionKey();
  return CryptoJS.AES.encrypt(value, key).toString();
};

const decrypt = async (encrypted: string): Promise<string | null> => {
  try {
    const key = await getEncryptionKey();
    const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  const encrypted = await AsyncStorage.getItem(key);
  if (encrypted === null) {
    return null;
  }
  return decrypt(encrypted);
};

export const setItem = async (key: string, value: string): Promise<void> => {
  const encrypted = await encrypt(value);
  await AsyncStorage.setItem(key, encrypted);
};

export const removeItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

export const getAllKeys = async (): Promise<string[]> => {
  return AsyncStorage.getAllKeys();
};

export const multiGet = async (
  keys: string[]
): Promise<[string, string | null][]> => {
  const pairs = await AsyncStorage.multiGet(keys);
  const result: [string, string | null][] = [];

  for (const [key, value] of pairs) {
    if (value === null) {
      result.push([key, null]);
    } else {
      result.push([key, await decrypt(value)]);
    }
  }

  return result;
};

export const multiSet = async (
  keyValuePairs: [string, string][]
): Promise<void> => {
  const encryptedPairs: [string, string][] = [];

  for (const [key, value] of keyValuePairs) {
    encryptedPairs.push([key, await encrypt(value)]);
  }

  await AsyncStorage.multiSet(encryptedPairs);
};

export const multiRemove = async (keys: string[]): Promise<void> => {
  await AsyncStorage.multiRemove(keys);
};

export const clear = async (): Promise<void> => {
  await AsyncStorage.clear();
};
