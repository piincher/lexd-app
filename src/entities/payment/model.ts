/**
 * Payment Entity Model
 * Core domain types for the Payment entity
 */

// ============================================
// PAYMENT PROVIDER
// ============================================

export type PaymentProvider = "ORANGE_MONEY" | "WAVE" | "STRIPE" | "CARD";

export type PaymentMethod = "ORANGE_MONEY" | "WAVE" | "CARD" | "CASH";

export interface PaymentProviderInfo {
  code: PaymentProvider;
  name: string;
  type: "mobile_money" | "card" | "cash";
  countries: string[];
  currencies: string[];
  requiresPhoneNumber: boolean;
  supportsQrCode: boolean;
  supportsDeepLink: boolean;
  processingFee: number;
  fixedFee?: number;
  icon: string;
  supportedCards?: string[];
  feeExample?: PaymentFeeBreakdown;
}

// ============================================
// FEE BREAKDOWN
// ============================================

export interface PaymentFeeBreakdown {
  provider: string;
  amount: number;
  amountFCFA: number;
  feeAmount: number;
  feeAmountFCFA: number;
  fixedFee: number;
  fixedFeeFCFA: number;
  totalFee: number;
  totalFeeFCFA: number;
  netAmount: number;
  netAmountFCFA: number;
  feePercentage: string;
}

// ============================================
// PAYMENT STATUS
// ============================================

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

// ============================================
// PAYMENT INITIALIZATION
// ============================================

export interface InitializePaymentRequest {
  provider: PaymentProvider;
  amount: number;
  currency?: string;
  goodsIds?: string[];
  phoneNumber?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface InitializePaymentResponse {
  success: boolean;
  provider: PaymentProvider;
  providerName: string;
  transactionRef: string;
  providerTransactionId: string;
  internalPaymentId?: string;
  topUpId?: string;
  paymentIntentId?: string;
  clientSecret?: string;
  publishableKey?: string;
  checkoutId?: string;
  paymentUrl?: string;
  waveLaunchUrl?: string;
  deepLink?: string;
  qrCode?: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  expiresAt: string;
  message: string;
  fees: PaymentFeeBreakdown;
  providerData: {
    phoneNumber?: string;
    amount: number;
    currency: string;
    paymentToken?: string;
    checkoutId?: string;
    customerId?: string;
    requiresAction?: boolean;
    nextAction?: any;
  };
  instructions?: {
    title: string;
    steps: string[];
  };
}

// ============================================
// PAYMENT VERIFICATION
// ============================================

export interface VerifyPaymentRequest {
  provider?: PaymentProvider;
  transactionId?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  provider: PaymentProvider;
  providerName: string;
  status: PaymentStatus;
  transactionRef: string;
  providerTransactionId: string;
  paymentIntentId?: string;
  checkoutId?: string;
  paidAt?: string;
  amount: number;
  currency: string;
  message: string;
  cardDetails?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    network?: string;
    threeDSecure?: boolean;
  };
  receiptUrl?: string;
  providerData: any;
}

// ============================================
// PAYMENT HISTORY
// ============================================

export interface PaymentHistoryItem {
  id: string;
  paymentId: string;
  userId: string;
  goodsIds?: string[];
  amount: number;
  amountFCFA: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionReference?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    phoneNumber?: string;
    cardLast4?: string;
    expiresAt?: string;
    failureReason?: string;
    receiptUrl?: string;
  };
  refund?: {
    amount: number;
    reason: string;
    refundedAt: string;
  };
  receiptUrl?: string | null;
  receiptNumber?: string | null;
  receiptGeneratedAt?: string | null;
  orderCode?: string | null;
  notes?: string | null;
  referenceNumber?: string | null;
  createdBy?: {
    id: string;
    name: string | null;
  } | null;
}

export interface PaymentHistoryFilters {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
  status?: string;
}

export interface PaymentHistoryResponse {
  payments: PaymentHistoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ============================================
// TOP-UP & REFUND
// ============================================

export interface TopUpRequest {
  amount: number;
  provider: PaymentProvider;
  phoneNumber?: string;
  currency?: string;
  metadata?: Record<string, any>;
}

export interface RefundRequest {
  provider: PaymentProvider;
  transactionId: string;
  amount?: number;
  reason?: string;
}

// ============================================
// BALANCE DUE
// ============================================

export interface BalanceDueItem {
  id: string;
  goodsId: string;
  description: string;
  totalCost: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: "UNPAID" | "PARTIAL" | "PAID";
}

export interface BalanceDueResponse {
  totalDue: number;
  totalDueFCFA: number;
  totalPaid: number;
  totalCost: number;
  currency: string;
  itemCount: number;
  unpaidCount: number;
  partialCount: number;
  goods: BalanceDueItem[];
}

// ============================================
// CARD DETAILS
// ============================================

export interface CardDetails {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
}

export interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}
