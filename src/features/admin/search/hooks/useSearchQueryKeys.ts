/**
 * Search query keys for React Query cache management
 */

import { SearchFilters, PaginationParams } from "../api/searchApi";

export const searchQueryKeys = {
  all: ["search"] as const,
  goods: () => [...searchQueryKeys.all, "goods"] as const,
  goodsList: (query: string, filters: SearchFilters, pagination: PaginationParams) =>
    [...searchQueryKeys.goods(), "list", { query, filters, pagination }] as const,
  containers: () => [...searchQueryKeys.all, "containers"] as const,
  containersList: (query: string, filters: SearchFilters, pagination: PaginationParams) =>
    [...searchQueryKeys.containers(), "list", { query, filters, pagination }] as const,
  clients: () => [...searchQueryKeys.all, "clients"] as const,
  clientsList: (query: string, filters: SearchFilters, pagination: PaginationParams) =>
    [...searchQueryKeys.clients(), "list", { query, filters, pagination }] as const,
  global: () => [...searchQueryKeys.all, "global"] as const,
  globalSearch: (query: string) => [...searchQueryKeys.global(), query] as const,
  suggestions: () => [...searchQueryKeys.all, "suggestions"] as const,
  suggestionsList: (query: string) => [...searchQueryKeys.suggestions(), query] as const,
  presets: () => [...searchQueryKeys.all, "presets"] as const,
};
