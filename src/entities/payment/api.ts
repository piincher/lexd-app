/**
 * Payment Entity API
 * Re-exports payment-related API functions from feature layers.
 * TODO: Move API implementations here during full FSD migration.
 */

export {
  getPaymentProviders,
  initializePayment,
  verifyPayment,
  getPaymentHistory,
  getPaymentDetails,
  topUpBalance,
  cancelPayment,
  getBalanceDue,
  calculateBalanceForGoods,
  refundPayment,
  pollPaymentStatus,
  initiatePayment,
  getMyPaymentHistory,
  generateReceipt,
  downloadReceipt,
} from "@src/features/payments/api/paymentApi";

// Legacy order payment APIs
export {
  recordPayment,
  getPaymentHistory as getOrderPaymentHistory,
} from "@src/api/order";
