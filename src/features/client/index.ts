/**
 * Client Feature Module
 * Client-facing features for order management and tracking
 */

// Navigation
export { ClientNavigator } from './navigation/ClientNavigator';

// Screens (from orders sub-feature)
export {
  ClientOrderDetailScreen,
  ClientOrdersListScreen,
  TrackOrderScreen,
} from './orders/screens';

// Hooks (from orders sub-feature)
export {
  useClientOrder,
  useMyOrders,
  useTrackOrder,
} from './orders/hooks';

// Types (from orders sub-feature)
export type {
  Order,
  OrderFilters,
  OrderStatus,
} from './orders/types';
