/**
 * Shared query keys for offline goods hooks
 */

export const GOODS_KEYS = {
  all: ['goods'] as const,
  lists: () => [...GOODS_KEYS.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...GOODS_KEYS.lists(), filters] as const,
  details: () => [...GOODS_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...GOODS_KEYS.details(), id] as const,
};
