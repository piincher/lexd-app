/**
 * Customer Dashboard Feature
 * Main dashboard for customers to view stats, quick actions, and activity feed
 */

// API
export { dashboardApi } from './api/dashboardApi';
export type {
  ApiResponse,
  GetDashboardResponse,
  GetActivityResponse,
  GetActivityParams,
} from './api/types';

// Hooks
export {
  useGetDashboard,
  useGetActivity,
  useDashboardInvalidation,
} from './hooks/useDashboard';

// Types
export type {
  DashboardStats,
  ActivityItem,
  ActivityType,
  QuickAction,
  DashboardData,
} from './types';

export {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPE_COLORS,
  ACTIVITY_TYPE_ICONS,
} from './types';

// Components
export { StatCard, ActivityFeed, QuickActions } from './components';
export type {
  StatCardProps,
  ActivityFeedProps,
  QuickActionsProps,
} from './components';

// Screens
export { CustomerDashboardScreen } from './screens';
