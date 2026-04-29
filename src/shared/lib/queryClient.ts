/**
 * React Query Client Configuration with Offline Persistence
 * Configures React Query with AsyncStorage persister for offline support
 */

import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import * as EncryptedStorage from './encryptedStorage';

// Cache strategies for different data types
export const CACHE_STRATEGIES = {
  // Critical data - always available offline
  DASHBOARD: { staleTime: Infinity, gcTime: Infinity },
  USER_PROFILE: { staleTime: Infinity, gcTime: Infinity },
  GOODS_LIST: { staleTime: 5 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
  CONTAINER_LIST: { staleTime: 5 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
  ORDER_LIST: { staleTime: 5 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
  
  // Data that can be stale
  REPORTS: { staleTime: 60 * 60 * 1000, gcTime: 7 * 24 * 60 * 60 * 1000 },
  ANNOUNCEMENTS: { staleTime: 30 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
  
  // Real-time data - don't cache
  NOTIFICATIONS: { staleTime: 0, gcTime: 5 * 60 * 1000 },
  CHAT_MESSAGES: { staleTime: 0, gcTime: 10 * 60 * 1000 },
  
  // Admin data
  USERS_LIST: { staleTime: 10 * 60 * 1000, gcTime: 60 * 60 * 1000 },
  EXPENSES: { staleTime: 15 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
} as const;

// Keys of queries that should be persisted
const PERSISTED_QUERY_KEYS = [
  'dashboard',
  'user',
  'profile',
  'goods',
  'containers',
  'orders',
  'reports',
  'announcements',
  'users',
  'expenses',
  'invoices',
  'routes',
  'consignees',
];

/**
 * Create the React Query client with offline support
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data stays fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
        // Keep cached data for 24 hours
        gcTime: 24 * 60 * 60 * 1000,
        // Retry failed queries only once, and not on network errors
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors (client errors)
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          // Don't retry network errors (backend down / no connection)
          if (error?.message === 'Network Error' || !error?.response) {
            return false;
          }
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Mobile apps don't need window focus refetching
        refetchOnWindowFocus: false,
        // Refetch on reconnect only if data is stale
        refetchOnReconnect: 'always',
        // Only refetch on mount if data is stale
        refetchOnMount: false,
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
        retryDelay: 1000,
      },
    },
  });
};

/**
 * Create the AsyncStorage persister for React Query
 */
export const createPersister = () => {
  return createAsyncStoragePersister({
    storage: EncryptedStorage,
    key: 'CHINALINK_QUERY_CACHE',
    // Throttle writes to storage (ms)
    throttleTime: 1000,
    // Serialize/deserialize functions
    serialize: (data) => JSON.stringify(data),
    deserialize: (data) => JSON.parse(data),
  });
};

/**
 * Persist configuration options
 */
export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: createPersister(),
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  buster: 'v3', // Version key - increment to invalidate old cache
  dehydrateOptions: {
    // Only persist these query keys
    shouldDehydrateQuery: (query) => {
      if (query.state.status === 'pending') return false;
      const queryKey = query.queryKey[0] as string;
      return PERSISTED_QUERY_KEYS.some(key => 
        typeof queryKey === 'string' && queryKey.includes(key)
      );
    },
  },
};

// Global query client instance
let queryClientInstance: QueryClient | null = null;

/**
 * Get or create the query client instance
 */
export const getQueryClient = (): QueryClient => {
  if (!queryClientInstance) {
    queryClientInstance = createQueryClient();
  }
  return queryClientInstance;
};

/**
 * Reset the query client (useful for logout)
 */
export const resetQueryClient = (): void => {
  queryClientInstance?.clear();
  queryClientInstance = createQueryClient();
};

/**
 * Invalidate all cached queries
 */
export const invalidateAllQueries = async (): Promise<void> => {
  await queryClientInstance?.invalidateQueries();
};

/**
 * Prefetch critical data for offline use
 */
export const prefetchForOffline = async (
  queries: Array<{ queryKey: string[]; queryFn: () => Promise<any> }>
): Promise<void> => {
  const client = getQueryClient();
  
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      client.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: CACHE_STRATEGIES.DASHBOARD.staleTime,
      })
    )
  );
};

export default {
  createQueryClient,
  createPersister,
  persistOptions,
  getQueryClient,
  resetQueryClient,
  invalidateAllQueries,
  prefetchForOffline,
  CACHE_STRATEGIES,
};
