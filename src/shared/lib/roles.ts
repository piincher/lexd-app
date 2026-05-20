export type AppRole = string | null | undefined;

export const normalizeRole = (role: AppRole): string =>
  String(role || '').trim().toLowerCase().replace(/[\s_-]/g, '');

export const isAdminRole = (role: AppRole): boolean =>
  ['admin', 'superadmin'].includes(normalizeRole(role));

export const isCustomerRole = (role: AppRole): boolean => !isAdminRole(role);

