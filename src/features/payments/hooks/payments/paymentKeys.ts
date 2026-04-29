export const PAYMENT_KEYS = {
  all: ['payments'] as const,
  history: (filters?: Record<string, any>) => [...PAYMENT_KEYS.all, 'history', filters] as const,
  providers: (country?: string, currency?: string) =>
    [...PAYMENT_KEYS.all, 'providers', country, currency] as const,
  balanceDue: () => [...PAYMENT_KEYS.all, 'balanceDue'] as const,
  details: (id: string) => [...PAYMENT_KEYS.all, 'details', id] as const,
};
