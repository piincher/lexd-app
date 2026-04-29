/**
 * Order Entity API
 * Re-exports order-related API functions from feature layers.
 * TODO: Move API implementations here during full FSD migration.
 */

export {
  CheckRoute,
  placeOrder,
  updateOrder,
  batchUpdate,
  editOrder,
  getOrderBasedOnDate,
  getActiveOrders,
  fetchSmsBalance,
  getActiveOrdersAdmin,
  getOrderDetails,
  updateOrderToDelivered,
  getOrdersBetweenDate,
  deleteImage,
  deleteOrder,
  getOrdersBasedOnUserId,
  getAllOrders,
  recordPayment,
  getPaymentHistory,
  backfillPayments,
  syncOrderStatuses,
} from "@src/api/order";

export { clientOrdersApi } from "@src/features/client/orders/api/clientOrdersApi";
