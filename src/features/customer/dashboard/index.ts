/**
 * Customer Dashboard Feature
 * Premium dashboard for customers to view stats, actions, and activity
 */

// API
export { dashboardApi } from './api/dashboardApi';
export type {
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

export { useCustomerDashboard } from './hooks/useCustomerDashboard';

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
export {
  HeroSection,
  SmartActions,
  JourneyMap,
  ContainerStack,
  ActivityTimeline,
  DashboardSkeleton,
  DashboardErrorState,
} from './components';

// Screens
export { CustomerDashboardScreen, ActivityListScreen } from './screens';
