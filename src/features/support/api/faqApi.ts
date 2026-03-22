/**
 * FAQ API - API calls for FAQ data
 * Following SRP: This file only handles FAQ API calls
 * Mock data for now - will be replaced with actual API calls
 */

import { FAQItem, FAQData, FAQCategory } from '../types';
import { MOCK_FAQS } from './faqMockData';

const CACHE_KEY = 'faq_cache';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedFAQData {
  data: FAQData;
  timestamp: number;
}

/**
 * Get cached FAQ data from local storage
 */
const getCachedFAQs = (): FAQData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedFAQData = JSON.parse(cached);
      const now = Date.now();
      if (now - parsed.timestamp < CACHE_DURATION_MS) {
        return parsed.data;
      }
    }
  } catch {
    // Silently fail if cache is invalid
  }
  return null;
};

/**
 * Cache FAQ data to local storage
 */
const cacheFAQs = (data: FAQData): void => {
  try {
    const cacheData: CachedFAQData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch {
    // Silently fail if storage is unavailable
  }
};

/**
 * Get all FAQ items
 * Returns cached data if available, otherwise fetches from API
 */
export const getFAQs = async (): Promise<FAQItem[]> => {
  // Check cache first for offline support
  const cached = getCachedFAQs();
  if (cached) {
    return cached.items;
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const sortedItems = [...MOCK_FAQS].sort((a, b) => a.order - b.order);

  // Cache the data
  const faqData: FAQData = {
    items: sortedItems,
    categories: Object.values(FAQCategory),
    lastUpdated: new Date().toISOString(),
  };
  cacheFAQs(faqData);

  return sortedItems;
};

/**
 * Search FAQs by query string
 * Searches in both question and answer fields
 */
export const searchFAQs = async (query: string): Promise<FAQItem[]> => {
  const allFAQs = await getFAQs();

  if (!query.trim()) {
    return allFAQs;
  }

  const lowerQuery = query.toLowerCase();
  return allFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get FAQ data with full structure (items, categories, lastUpdated)
 */
export const getFAQData = async (): Promise<FAQData> => {
  const cached = getCachedFAQs();
  if (cached) {
    return cached;
  }

  const items = await getFAQs();
  return {
    items,
    categories: Object.values(FAQCategory),
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Clear FAQ cache
 * Call this when you want to force a fresh fetch
 */
export const clearFAQCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Silently fail
  }
};
