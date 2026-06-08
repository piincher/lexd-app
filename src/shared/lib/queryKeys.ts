export const persistedQueryRoots = [
  'dashboard',
  'stats',
  'analytics',
  'user',
  'profile',
  'users',
  'goods',
  'my-goods',
  'admin-goods',
  'containers',
  'customer-containers',
  'orders',
  'order',
  'reports',
  'announcements',
  'announcement',
  'expenses',
  'invoices',
  'routes',
  'consignees',
  'airway-bills',
  'cargo-bags',
  'tickets',
  'faqs',
  'reviews',
  'badges',
  'rewards',
  'referrals',
  'promos',
  'home-banners',
  'notification',
  'notifications',
] as const;

export type PersistedQueryRoot = (typeof persistedQueryRoots)[number];
export type AppQueryKey = readonly [string, ...unknown[]];

const persistedRootSet = new Set<string>(persistedQueryRoots);

export const getQueryRoot = (queryKey: readonly unknown[]): string | null => {
  const root = queryKey[0];
  return typeof root === 'string' ? root : null;
};

export const shouldPersistQueryKey = (queryKey: readonly unknown[]): boolean => {
  const root = getQueryRoot(queryKey);
  return root ? persistedRootSet.has(root) : false;
};

export const queryKeys = {
  dashboard: () => ['dashboard'] as const,
  users: {
    all: () => ['users'] as const,
    search: (query: string, limit?: number) => ['users', 'search', query, limit] as const,
  },
  goods: {
    all: () => ['goods'] as const,
    my: () => ['my-goods'] as const,
    detail: (goodsId: string) => ['goods', 'detail', goodsId] as const,
    admin: () => ['admin-goods'] as const,
  },
  containers: {
    all: () => ['containers'] as const,
    customer: () => ['customer-containers'] as const,
    detail: (containerId: string) => ['containers', 'detail', containerId] as const,
  },
  orders: {
    all: () => ['orders'] as const,
    detail: (orderId: string) => ['orders', 'detail', orderId] as const,
  },
  routes: {
    all: () => ['routes'] as const,
  },
};
