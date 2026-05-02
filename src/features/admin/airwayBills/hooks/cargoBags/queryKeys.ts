export const cargoBagQueryKeys = {
  all: ['cargoBags'] as const,
  lists: () => [...cargoBagQueryKeys.all, 'list'] as const,
  list: (awbId: string | undefined) => [...cargoBagQueryKeys.lists(), awbId] as const,
  details: () => [...cargoBagQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...cargoBagQueryKeys.details(), id] as const,
  eligibleGoods: (id: string) => [...cargoBagQueryKeys.detail(id), 'eligible-goods'] as const,
  waypoints: (id: string) => [...cargoBagQueryKeys.detail(id), 'waypoints'] as const,
};
