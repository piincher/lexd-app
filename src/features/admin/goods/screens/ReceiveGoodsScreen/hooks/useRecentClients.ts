/**
 * useRecentClients - Persistent list of recently-selected clients.
 * Tracks selections (not just saves), survives across sessions via AsyncStorage so the
 * operator can re-pick a frequent client without searching. Max 8, deduped by _id,
 * newest first.
 */

import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { userData } from '@src/shared/types/user';

const STORAGE_KEY = '@chinalink/receive_recent_clients';
const MAX_RECENT = 8;

export const useRecentClients = () => {
  const [recentClients, setRecentClients] = useState<userData[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setRecentClients(parsed.slice(0, MAX_RECENT));
          }
        } catch {
          // Ignore malformed storage payloads.
        }
      })
      .catch(() => {});
  }, []);

  const addRecentClient = useCallback((client: userData | null) => {
    if (!client?._id) return;
    setRecentClients((current) => {
      const next = [client, ...current.filter((c) => c._id !== client._id)].slice(0, MAX_RECENT);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const clearRecentClients = useCallback(() => {
    setRecentClients([]);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  return { recentClients, addRecentClient, clearRecentClients };
};
