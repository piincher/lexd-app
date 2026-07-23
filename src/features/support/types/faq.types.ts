/**
 * FAQ Types - Type definitions for FAQ feature
 * Following SRP: Single file for FAQ-related types
 */

import { amber, green, semantic } from '@src/shared/constants/brand';

export enum FAQCategory {
  GENERAL = 'general',
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  ACCOUNT = 'account',
  TRACKING = 'tracking',
  CUSTOMS = 'customs',
}

export interface FAQItem {
  _id?: string;
  id?: string; // legacy compatibility
  question: string;
  answer: string;
  category: FAQCategory | string;
  order: number;
  isPopular?: boolean;
  isActive?: boolean;
  viewCount?: number;
  helpfulCount?: number;
  notHelpfulCount?: number;
  helpfulnessRatio?: number;
  relatedFAQIds?: FAQItem[] | string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQFilter {
  searchQuery: string;
  category: FAQCategory | 'all';
}

export interface FAQData {
  items: FAQItem[];
  categories: FAQCategory[];
  lastUpdated: string;
}

export interface FAQListResponse {
  items: FAQItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface FAQCategoryCount {
  id: string;
  label: string;
  count: number;
}

export interface FAQSearchSuggestion {
  _id: string;
  question: string;
  category: string;
}

export interface FAQFeedbackResponse {
  helpfulCount: number;
  notHelpfulCount: number;
  helpfulnessRatio: number;
}

export interface FAQBookmark {
  faqId: string;
  question: string;
  category: string;
  bookmarkedAt: string;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: string;
}

// French translations for categories
export const FAQ_CATEGORY_LABELS: Record<FAQCategory | 'all', string> = {
  all: 'Toutes',
  general: 'Général',
  shipping: 'Expédition',
  payment: 'Paiement',
  account: 'Compte',
  tracking: 'Suivi',
  customs: 'Douane',
};

// Category colors for UI — mapped to the brand token ramps where a matching
// token exists. `account` keeps its categorical purple: the token set has no
// purple step, and remapping would collide with another category hue.
export const FAQ_CATEGORY_COLORS: Record<FAQCategory, string> = {
  general: green[500],
  shipping: semantic.info,
  payment: amber[500],
  account: '#8B5CF6',
  tracking: semantic.warning,
  customs: semantic.error,
};

// Category icons for UI
export const FAQ_CATEGORY_ICONS: Record<FAQCategory | 'all', string> = {
  all: 'view-grid-outline',
  general: 'information-outline',
  shipping: 'ferry',
  payment: 'credit-card-outline',
  account: 'account-outline',
  tracking: 'map-marker-outline',
  customs: 'shield-check-outline',
};
