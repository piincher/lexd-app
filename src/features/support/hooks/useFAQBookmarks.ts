import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FAQBookmark } from '../types';

const STORAGE_KEY = '@help_center_bookmarks';
const MAX_BOOKMARKS = 50;

export function useFAQBookmarks() {
  const [bookmarks, setBookmarks] = useState<FAQBookmark[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setBookmarks(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const persist = useCallback((next: FAQBookmark[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const addBookmark = useCallback((bookmark: Omit<FAQBookmark, 'bookmarkedAt'>) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.faqId === bookmark.faqId)) return prev;
      const next = [{ ...bookmark, bookmarkedAt: new Date().toISOString() }, ...prev].slice(0, MAX_BOOKMARKS);
      persist(next);
      return next;
    });
  }, [persist]);

  const removeBookmark = useCallback((faqId: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.faqId !== faqId);
      persist(next);
      return next;
    });
  }, [persist]);

  const isBookmarked = useCallback((faqId: string) => bookmarks.some((b) => b.faqId === faqId), [bookmarks]);

  const toggleBookmark = useCallback((bookmark: Omit<FAQBookmark, 'bookmarkedAt'>) => {
    if (isBookmarked(bookmark.faqId)) {
      removeBookmark(bookmark.faqId);
    } else {
      addBookmark(bookmark);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return { bookmarks, loaded, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
}
