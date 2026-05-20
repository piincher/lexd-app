/**
 * FAQ API - Real API client for FAQ endpoints
 * Replaces mock data with backend calls to /api/v2/faqs
 */

import { apiClientV2 } from '@src/api/client';
import type {
  FAQItem,
  FAQCategoryCount,
  FAQSearchSuggestion,
  FAQFeedbackResponse,
  FAQListResponse,
} from '../types';

const BASE_URL = '/faqs';

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const getFAQs = async (params?: {
  category?: string;
  search?: string;
  popular?: boolean;
  page?: number;
  limit?: number;
}): Promise<FAQListResponse> => {
  const response = await apiClientV2.get(BASE_URL, { params });
  return unwrap(response);
};

export const getFAQById = async (id: string): Promise<FAQItem> => {
  const response = await apiClientV2.get(`${BASE_URL}/${id}`);
  return unwrap(response);
};

export const incrementFAQViews = async (id: string): Promise<{ viewCount: number }> => {
  const response = await apiClientV2.post(`${BASE_URL}/${id}/view`);
  return unwrap(response);
};

export const submitFAQFeedback = async (
  id: string,
  isHelpful: boolean
): Promise<FAQFeedbackResponse> => {
  const response = await apiClientV2.post(`${BASE_URL}/${id}/feedback`, { isHelpful });
  return unwrap(response);
};

export const getFAQSearchSuggestions = async (query: string): Promise<FAQSearchSuggestion[]> => {
  const response = await apiClientV2.get(`${BASE_URL}/search/suggestions`, { params: { q: query } });
  return unwrap(response);
};

export const getFAQCategories = async (): Promise<FAQCategoryCount[]> => {
  const response = await apiClientV2.get(`${BASE_URL}/categories`);
  return unwrap(response);
};

export const getPopularFAQs = async (limit?: number): Promise<FAQItem[]> => {
  const response = await apiClientV2.get(`${BASE_URL}/popular`, { params: { limit } });
  return unwrap(response);
};

export const seedFAQs = async (): Promise<{ seeded: number; message?: string }> => {
  const response = await apiClientV2.post(`${BASE_URL}/seed`);
  return unwrap(response);
};
