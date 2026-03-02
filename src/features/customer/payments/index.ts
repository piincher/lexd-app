/**
 * Customer Payments Feature
 * Payment portal for customers to pay online
 */

// API
export { paymentApi } from './api/paymentApi';
export type {
  ApiResponse,
  GetBalanceDueResponse,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  VerifyPaymentResponse,
  GetPaymentHistoryParams,
  GetPaymentHistoryResponse,
  DownloadReceiptResponse,
} from './api/types';

// Hooks
export {
  useGetBalanceDue,
  useGetPaymentHistory,
  useVerifyPayment,
  useInitiatePayment,
  useRetryPayment,
  useDownloadReceipt,
  usePaymentInvalidation,
  usePaymentPolling,
  paymentQueryKeys,
} from './hooks/usePayments';

// Types
export type {
  PaymentMethod,
  PaymentMethodConfig,
  PaymentStatus,
  Payment,
  PaymentGoods,
  UnpaidGoods,
  PaymentIntent,
  BalanceDueResponse,
  InitiatePaymentRequest as PaymentInitiateRequest,
  InitiatePaymentResponse as PaymentInitiateResponse,
  VerifyPaymentResponse as PaymentVerifyResponse,
  PaymentHistoryResponse,
  PaymentFormState,
  PaymentFilters,
} from './types';

export {
  PAYMENT_METHODS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLORS,
  PAYMENT_STATUS_BG_COLORS,
} from './types';

// Components
export {
  PaymentMethodSelector,
  UnpaidGoodsList,
  PaymentStatusBadge,
  PaymentStatusIndicator,
} from './components';

// Screens
export {
  PaymentPortalScreen,
  PaymentConfirmationScreen,
  PaymentHistoryScreen,
} from './screens';
