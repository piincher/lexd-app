/**
 * Payment Types
 * TypeScript type definitions for the payment system
 */

// Payment Provider Types
export type PaymentProvider = 'ORANGE_MONEY' | 'WAVE' | 'STRIPE' | 'CARD';

export interface PaymentProviderInfo {
  code: PaymentProvider;
  name: string;
  type: 'mobile_money' | 'card' | 'cash';
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

// Payment Status
export type PaymentStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'CANCELLED' 
  | 'REFUNDED';

// Payment Method
export type PaymentMethod = 'ORANGE_MONEY' | 'WAVE' | 'CARD' | 'CASH';

// Payment Initialization
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

// Payment Verification
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

// Payment History
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

// Top-up Request
export interface TopUpRequest {
  amount: number;
  provider: PaymentProvider;
  phoneNumber?: string;
  currency?: string;
  metadata?: Record<string, any>;
}

// Refund Request
export interface RefundRequest {
  provider: PaymentProvider;
  transactionId: string;
  amount?: number;
  reason?: string;
}

// Balance Due
export interface BalanceDueItem {
  id: string;
  goodsId: string;
  description: string;
  totalCost: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
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

// Card Input
export interface CardDetails {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
}

// Payment Status Modal Props
export interface PaymentStatusModalProps {
  visible: boolean;
  status: 'idle' | 'processing' | 'success' | 'error';
  title?: string;
  message?: string;
  provider?: PaymentProvider;
  qrCode?: string;
  instructions?: string[];
  onRetry?: () => void;
  onClose?: () => void;
  onComplete?: () => void;
}

// Payment Method Selector Props
export interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentProvider;
  onSelect: (method: PaymentProvider) => void;
  amount?: number;
  disabled?: boolean;
  showFees?: boolean;
}

// Form Props
export interface OrangeMoneyFormProps {
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  countryCode?: string;
  error?: string;
  disabled?: boolean;
}

export interface WavePaymentFormProps {
  phoneNumber?: string;
  onPhoneNumberChange?: (phone: string) => void;
  qrCode?: string;
  deepLink?: string;
  onOpenWaveApp?: () => void;
  disabled?: boolean;
}

export interface CardPaymentFormProps {
  onCardChange: (card: CardDetails, isValid: boolean) => void;
  disabled?: boolean;
  showSavedCards?: boolean;
  savedCards?: SavedCard[];
  onUseSavedCard?: (cardId: string) => void;
}

export interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

// Hook Return Types
export interface UseInitializePaymentReturn {
  initializePayment: (data: InitializePaymentRequest) => Promise<InitializePaymentResponse>;
  isLoading: boolean;
  error: Error | null;
  data: InitializePaymentResponse | null;
}

export interface UseVerifyPaymentReturn {
  verifyPayment: (data: VerifyPaymentRequest) => Promise<VerifyPaymentResponse>;
  isLoading: boolean;
  error: Error | null;
  data: VerifyPaymentResponse | null;
}

export interface UsePaymentHistoryReturn {
  payments: PaymentHistoryItem[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
}

export interface UseTopUpBalanceReturn {
  topUp: (data: TopUpRequest) => Promise<InitializePaymentResponse>;
  isLoading: boolean;
  error: Error | null;
  data: InitializePaymentResponse | null;
}

// Webhook Event Types
export interface WebhookEvent {
  eventType: string;
  transactionRef: string;
  status: PaymentStatus;
  amount?: number;
  currency?: string;
  rawPayload: any;
}

// Constants
export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  PENDING: '#F59E0B',    // Amber
  PROCESSING: '#3B82F6', // Blue
  COMPLETED: '#10B981',  // Green
  FAILED: '#EF4444',     // Red
  CANCELLED: '#6B7280',  // Gray
  REFUNDED: '#8B5CF6',   // Purple
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

export const PROVIDER_ICONS: Record<PaymentProvider, string> = {
  ORANGE_MONEY: 'phone',
  WAVE: 'wave-square',
  STRIPE: 'credit-card',
  CARD: 'credit-card',
};

export const PROVIDER_LABELS: Record<PaymentProvider, string> = {
  ORANGE_MONEY: 'Orange Money',
  WAVE: 'Wave',
  STRIPE: 'Card',
  CARD: 'Card',
};
