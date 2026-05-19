import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@client_recent_searches";
const MAX_RECENT = 8;

/**
 * Hook to persist and manage recent search queries.
 */
export const useRecentSearches = () => {
  const [recents, setRecents] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setRecents(JSON.parse(json));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const saveRecents = useCallback((updated: string[]) => {
    setRecents(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {});
  }, []);

  const addRecent = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      const normalized = query.trim();
      const filtered = recents.filter((r) => r.toLowerCase() !== normalized.toLowerCase());
      saveRecents([normalized, ...filtered].slice(0, MAX_RECENT));
    },
    [recents, saveRecents]
  );

  const removeRecent = useCallback(
    (query: string) => {
      saveRecents(recents.filter((r) => r !== query));
    },
    [recents, saveRecents]
  );

  const clearRecents = useCallback(() => {
    saveRecents([]);
  }, [saveRecents]);

  return { recents, loaded, addRecent, removeRecent, clearRecents };
};
