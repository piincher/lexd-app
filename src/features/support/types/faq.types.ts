/**
 * FAQ Types - Type definitions for FAQ feature
 * Following SRP: Single file for FAQ-related types
 */

export enum FAQCategory {
  GENERAL = 'general',
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  ACCOUNT = 'account',
  TRACKING = 'tracking',
  CUSTOMS = 'customs',
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  isPopular?: boolean;
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

// Category colors for UI
export const FAQ_CATEGORY_COLORS: Record<FAQCategory, string> = {
  general: '#22C55E',
  shipping: '#3B82F6',
  payment: '#D4AF37',
  account: '#8B5CF6',
  tracking: '#F59E0B',
  customs: '#EF4444',
};
