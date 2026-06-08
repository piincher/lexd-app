/**
 * React Query Client Configuration with Offline Persistence
 * Configures React Query with AsyncStorage persister for offline support
 */

import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import * as EncryptedStorage from './encryptedStorage';
import {
  ANNOUNCEMENTS_STALE_TIME,
  CHAT_CACHE_TIME,
  DASHBOARD_STALE_TIME,
  DEFAULT_CACHE_TIME,
  DEFAULT_STALE_TIME,
  EXPENSES_STALE_TIME,
  PROFILE_STALE_TIME,
  REPORTS_CACHE_TIME,
  REPORTS_STALE_TIME,
  SHORT_CACHE_TIME,
  USERS_CACHE_TIME,
} from '@src/shared/constants/queryConfig';
import { getQueryRoot, shouldPersistQueryKey } from './queryKeys';

// Cache strategies for different data types
export const CACHE_STRATEGIES = {
  // Critical data - always available offline
  DASHBOARD: { staleTime: DASHBOARD_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
  USER_PROFILE: { staleTime: PROFILE_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
  GOODS_LIST: { staleTime: DEFAULT_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
  CONTAINER_LIST: { staleTime: DEFAULT_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
  ORDER_LIST: { staleTime: DEFAULT_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
  
  // Data that can be stale
  REPORTS: { staleTime: REPORTS_STALE_TIME, gcTime: REPORTS_CACHE_TIME },
  ANNOUNCEMENTS: { staleTime: ANNOUNCEMENTS_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
  
  // Real-time data - don't cache
  NOTIFICATIONS: { staleTime: 0, gcTime: SHORT_CACHE_TIME },
  CHAT_MESSAGES: { staleTime: 0, gcTime: CHAT_CACHE_TIME },
  
  // Admin data
  USERS_LIST: { staleTime: PROFILE_STALE_TIME, gcTime: USERS_CACHE_TIME },
  EXPENSES: { staleTime: EXPENSES_STALE_TIME, gcTime: DEFAULT_CACHE_TIME },
} as const;

const getCacheStrategyForQueryKey = (queryKey: readonly unknown[]) => {
  const root = getQueryRoot(queryKey);
  if (root === 'dashboard' || root === 'stats' || root === 'analytics') return CACHE_STRATEGIES.DASHBOARD;
  if (root === 'user' || root === 'profile' || root === 'users') return CACHE_STRATEGIES.USER_PROFILE;
  if (root === 'goods' || root === 'my-goods' || root === 'admin-goods') return CACHE_STRATEGIES.GOODS_LIST;
  if (root === 'containers' || root === 'customer-containers') return CACHE_STRATEGIES.CONTAINER_LIST;
  if (root === 'orders' || root === 'order') return CACHE_STRATEGIES.ORDER_LIST;
  if (root === 'reports') return CACHE_STRATEGIES.REPORTS;
  if (root === 'announcements' || root === 'announcement') return CACHE_STRATEGIES.ANNOUNCEMENTS;
  if (root === 'notification' || root === 'notifications') return CACHE_STRATEGIES.NOTIFICATIONS;
  if (root === 'expenses') return CACHE_STRATEGIES.EXPENSES;
  return { staleTime: DEFAULT_STALE_TIME, gcTime: DEFAULT_CACHE_TIME };
};

const getHttpStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== 'object') return undefined;
  const response = 'response' in error ? (error as { response?: { status?: number } }).response : undefined;
  if (typeof response?.status === 'number') return response.status;
  return 'status' in error && typeof (error as { status?: unknown }).status === 'number'
    ? (error as { status: number }).status
    : undefined;
};

const isNetworkError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const message = 'message' in error ? (error as { message?: unknown }).message : undefined;
  return message === 'Network Error' || !('response' in error);
};

/**
 * Create the React Query client with offline support
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data stays fresh for 5 minutes
        staleTime: DEFAULT_STALE_TIME,
        // Keep cached data for 24 hours
        gcTime: DEFAULT_CACHE_TIME,
        // Retry failed queries only once, and not on network errors
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          const status = getHttpStatus(error);
          if (status && status >= 400 && status < 500) {
            return false;
          }
          // Don't retry network errors (backend down / no connection)
          if (isNetworkError(error)) {
            return false;
          }
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Mobile apps don't need window focus refetching
        refetchOnWindowFocus: false,
        // Refetch on reconnect only if data is stale
        refetchOnReconnect: true,
        // Only refetch on mount if data is stale
        refetchOnMount: true,
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
  maxAge: REPORTS_CACHE_TIME,
  buster: 'v4', // Invalidate old persisted caches that used infinite stale times
  dehydrateOptions: {
    // Only persist these query keys
    shouldDehydrateQuery: (query) => {
      if (query.state.status === 'pending') return false;
      return shouldPersistQueryKey(query.queryKey);
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
  queries: { queryKey: readonly unknown[]; queryFn: () => Promise<unknown>; staleTime?: number; gcTime?: number }[]
): Promise<void> => {
  const client = getQueryClient();
  
  await Promise.all(
    queries.map(({ queryKey, queryFn, staleTime, gcTime }) => {
      const strategy = getCacheStrategyForQueryKey(queryKey);
      return client.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: staleTime ?? strategy.staleTime,
        gcTime: gcTime ?? strategy.gcTime,
      });
    })
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
