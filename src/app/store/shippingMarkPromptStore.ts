import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface PromptState {
  dismissedAt?: string;
  downloadedAt?: string;
  acknowledgedAt?: string;
}

interface ShippingMarkPromptStore {
  users: Record<string, PromptState>;
  dismissForever: (userId: string) => void;
  markDownloaded: (userId: string) => void;
  markAcknowledged: (userId: string) => void;
  resetForUser: (userId: string) => void;
}

const STORAGE_KEY = '@chinalink/shipping-mark-prompt';

const asyncStorage: PersistStorage<ShippingMarkPromptStore> = {
  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

const now = () => new Date().toISOString();

const updateUser = (
  users: Record<string, PromptState>,
  userId: string,
  patch: Partial<PromptState>,
): Record<string, PromptState> => ({
  ...users,
  [userId]: { ...users[userId], ...patch },
});

export const useShippingMarkPromptStore = create<ShippingMarkPromptStore>()(
  persist(
    (set, get) => ({
      users: {},
      dismissForever: (userId: string) => {
        set({ users: updateUser(get().users, userId, { dismissedAt: now() }) });
      },
      markDownloaded: (userId: string) => {
        set({ users: updateUser(get().users, userId, { downloadedAt: now() }) });
      },
      markAcknowledged: (userId: string) => {
        set({ users: updateUser(get().users, userId, { acknowledgedAt: now() }) });
      },
      resetForUser: (userId: string) => {
        const next = { ...get().users };
        delete next[userId];
        set({ users: next });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: asyncStorage,
    },
  ),
);
