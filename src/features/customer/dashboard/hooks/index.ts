/**
 * Customer Dashboard Hooks
 */

export { useGetDashboard, useGetActivity, useDashboardInvalidation } from './useDashboard';
export { useCustomerDashboard, type UseCustomerDashboardReturn } from './useCustomerDashboard';
export { useQuickActions, type UseQuickActionsReturn } from './useQuickActions';
export { DEFAULT_QUICK_ACTIONS, DEFAULT_STATS, getWelcomeMessage } from './dashboardConstants';
