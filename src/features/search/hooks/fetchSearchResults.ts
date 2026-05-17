import { apiClientV2 } from '@src/api/client';
import type { SearchFilters, SearchSortOption, SearchResult } from '../types';

const mapItem = (item: any, type: SearchResult['type']): SearchResult => ({
  _id: item._id || item.id,
  title: item.title || item.description || item.goodsDescription || item.name || 'Untitled',
  description: item.subtitle || item.description || item.goodsDescription || '',
  type,
  metadata: {
    createdAt: item.createdAt || item.metadata?.createdAt || new Date().toISOString(),
    price: item.price || item.totalPrice || item.metadata?.price,
    currency: item.currency || item.metadata?.currency,
  },
});

export const fetchSearchResults = async (
  query: string,
  filters: SearchFilters,
  sort: SearchSortOption
): Promise<SearchResult[]> => {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.append('dateTo', filters.dateTo);
  if (sort) params.append('sort', sort);

  const response = await apiClientV2.get(`/search/global?${params.toString()}&limit=100`);
  const results = response.data?.results || {};

  return [
    ...(results.goods || []).map((item: any) => mapItem(item, 'goods')),
    ...(results.containers || []).map((item: any) => mapItem(item, 'container')),
    ...(results.clients || []).map((item: any) => mapItem(item, 'order')),
  ];
};
