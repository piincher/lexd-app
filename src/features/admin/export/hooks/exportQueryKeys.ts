type QueryFilters = Record<string, unknown> | undefined;

export const exportKeys = {
  all: ["exports"] as const,
  lists: () => [...exportKeys.all, "list"] as const,
  list: (filters: QueryFilters) => [...exportKeys.lists(), filters] as const,
  details: () => [...exportKeys.all, "detail"] as const,
  detail: (id: string) => [...exportKeys.details(), id] as const,
  backups: () => [...exportKeys.all, "backups"] as const,
  backupList: (filters: QueryFilters) => [...exportKeys.backups(), filters] as const,
  stats: () => [...exportKeys.all, "stats"] as const,
  scheduler: () => [...exportKeys.all, "scheduler"] as const,
};
