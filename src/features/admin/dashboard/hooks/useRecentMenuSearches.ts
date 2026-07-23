import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@admin_tools_recent_searches";
const MAX_RECENT = 8;

/**
 * Persist and manage recent search queries for the admin tools directory.
 */
export const useRecentMenuSearches = () => {
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
      const trimmed = query.trim();
      if (!trimmed) return;
      const filtered = recents.filter((r) => r.toLowerCase() !== trimmed.toLowerCase());
      saveRecents([trimmed, ...filtered].slice(0, MAX_RECENT));
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
