// Goods Feature - Query Keys
// Centralized query keys for TanStack Query cache management

export const goodsQueryKeys = {
	all: ['goods'] as const,
	lists: () => [...goodsQueryKeys.all, 'list'] as const,
	list: (filters: unknown) => [...goodsQueryKeys.lists(), filters] as const,
	details: () => [...goodsQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...goodsQueryKeys.details(), id] as const,
	customerDetail: (id: string) => [...goodsQueryKeys.detail(id), 'customer'] as const,
	myGoods: (filters: unknown) => [...goodsQueryKeys.all, 'my-goods', filters] as const,
} as const;
