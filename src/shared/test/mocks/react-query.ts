/**
 * React Query mocks for testing
 */

import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

// Default query client configuration for tests
export const createTestQueryClient = (config: QueryClientConfig = {}) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: false,
      },
    },
    ...config,
  });
};

// Mock query results
export const createMockQueryResult = <T = any>(overrides: Partial<any> = {}) => ({
  data: undefined as T | undefined,
  dataUpdatedAt: Date.now(),
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isError: false,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isLoading: false,
  isLoadingError: false,
  isInitialLoading: false,
  isPaused: false,
  isPending: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isRefetching: false,
  isStale: false,
  isSuccess: true,
  refetch: jest.fn(),
  status: 'success' as const,
  fetchStatus: 'idle' as const,
  ...overrides,
});

// Mock mutation results
export const createMockMutationResult = <T = any, V = any>(overrides: Partial<any> = {}) => ({
  data: undefined as T | undefined,
  error: null,
  isError: false,
  isIdle: true,
  isPending: false,
  isPaused: false,
  isSuccess: false,
  failureCount: 0,
  failureReason: null,
  submittedAt: 0,
  variables: undefined as V | undefined,
  mutate: jest.fn(),
  mutateAsync: jest.fn(),
  reset: jest.fn(),
  status: 'idle' as const,
  ...overrides,
});

// Mock infinite query results
export const createMockInfiniteQueryResult = <T = any>(overrides: Partial<any> = {}) => ({
  ...createMockQueryResult(),
  data: {
    pages: [] as T[],
    pageParams: [],
  },
  fetchNextPage: jest.fn(),
  fetchPreviousPage: jest.fn(),
  hasNextPage: false,
  hasPreviousPage: false,
  isFetchingNextPage: false,
  isFetchingPreviousPage: false,
  ...overrides,
});

// Query keys factory helpers
export const createQueryKeys = <T extends Record<string, any>>(domain: string) => ({
  all: [domain] as const,
  lists: () => [...([domain] as const), 'list'] as const,
  list: (filters: Record<string, any>) => [...([domain] as const), 'list', filters] as const,
  details: () => [...([domain] as const), 'detail'] as const,
  detail: (id: string) => [...([domain] as const), 'detail', id] as const,
});

// Mock useQuery hook
export const mockUseQuery = jest.fn(() => createMockQueryResult());

// Mock useMutation hook
export const mockUseMutation = jest.fn(() => createMockMutationResult());

// Mock useInfiniteQuery hook
export const mockUseInfiniteQuery = jest.fn(() => createMockInfiniteQueryResult());

// Mock useQueryClient hook
export const mockUseQueryClient = jest.fn(() => createTestQueryClient());

// Setup React Query mocks
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: mockUseQuery,
  useMutation: mockUseMutation,
  useInfiniteQuery: mockUseInfiniteQuery,
  useQueryClient: mockUseQueryClient,
  QueryClient: jest.fn().mockImplementation((config) => createTestQueryClient(config)),
}));

// Reset all query mocks
export const resetQueryMocks = () => {
  mockUseQuery.mockClear();
  mockUseMutation.mockClear();
  mockUseInfiniteQuery.mockClear();
  mockUseQueryClient.mockClear();
};
