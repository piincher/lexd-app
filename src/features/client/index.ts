/**
 * Client Feature Module
 * Public API for client-facing order management and tracking
 */

// Navigator
export { ClientNavigator } from './screens/ClientNavigator';

// Order Screens
export {
  ClientOrderDetailScreen,
  ClientOrdersListScreen,
  TrackOrderScreen,
} from './orders/screens';

// Order Hooks
export {
  useClientOrder,
  useMyOrders,
  useTrackOrder,
} from './orders/hooks';

// Order Types
export type {
  Order,
  OrderFilters,
  OrderStatus,
} from './orders/types';
