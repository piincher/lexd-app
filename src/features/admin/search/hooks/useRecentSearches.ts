/**
 * useRecentSearches - Hook for managing recent searches in local storage
 */

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_SEARCHES_KEY = "lexd_recent_searches";
const MAX_RECENT_SEARCHES = 10;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load recent searches:", e);
      }
    };
    loadRecentSearches();
  }, []);

  const saveRecentSearches = async (searches: string[]) => {
    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (e) {
      console.error("Failed to save recent searches:", e);
    }
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const newSearches = [
        query.trim(),
        ...prev.filter((s) => s.toLowerCase() !== query.trim().toLowerCase()),
      ].slice(0, MAX_RECENT_SEARCHES);
      saveRecentSearches(newSearches);
      return newSearches;
    });
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => {
      const newSearches = prev.filter((s) => s !== query);
      saveRecentSearches(newSearches);
      return newSearches;
    });
  };

  const clearRecentSearches = async () => {
    setRecentSearches([]);
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      console.error("Failed to clear recent searches:", e);
    }
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
};
