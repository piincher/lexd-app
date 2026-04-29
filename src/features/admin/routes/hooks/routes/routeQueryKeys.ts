/**
 * Route Query Keys - Centralized React Query key factory
 */

import { RouteFilters } from '../../types';

export const routeQueryKeys = {
  all: ['routes'] as const,
  lists: () => [...routeQueryKeys.all, 'list'] as const,
  list: (filters: RouteFilters | undefined) =>
    [...routeQueryKeys.lists(), filters] as const,
  details: () => [...routeQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...routeQueryKeys.details(), id] as const,
  active: () => [...routeQueryKeys.all, 'active'] as const,
  activeByMode: (mode: string | undefined) =>
    [...routeQueryKeys.active(), mode] as const,
};
