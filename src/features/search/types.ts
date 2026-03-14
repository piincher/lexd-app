/**
 * Search Feature Types
 */

export type SearchSortOption = 'relevance' | 'date_desc' | 'date_asc' | 'price_asc' | 'price_desc';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface SearchResult {
  _id: string;
  title: string;
  description: string;
  type: 'order' | 'goods' | 'container'; // 'invoice' type removed
  metadata: {
    createdAt: string;
    price?: number;
    currency?: string;
    status?: string;
  };
}

export interface SearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
