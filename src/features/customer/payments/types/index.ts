/**
 * Payment Feature Types
 * TypeScript type definitions for the payment portal
 */

// ============================================
// PAYMENT METHODS
// ============================================

export type PaymentMethod = 'ORANGE_MONEY' | 'WAVE' | 'CARD';

export interface PaymentMethodConfig {
  id: PaymentMethod;
  label: string;
  icon: string;
  color: string;
  requiresPhone: boolean;
}

// ============================================
// PAYMENT STATUS
// ============================================

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

// ============================================
// PAYMENT ENTITY
// ============================================

export interface PaymentGoods {
  goodsId: string;
  description: string;
}

export interface Payment {
  _id: string;
  paymentId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paidAt?: string;
  goods: PaymentGoods[];
  transactionReference?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// UNPAID GOODS
// ============================================

export interface UnpaidGoods {
  _id: string;
  goodsId: string;
  description: string;
  balanceDue: number;
  totalCost: number;
  currency: string;
}

// ============================================
// PAYMENT INTENT
// ============================================

export interface PaymentIntent {
  paymentId: string;
  transactionReference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentUrl?: string;
  expiresAt: string;
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface BalanceDueResponse {
  totalBalanceDue: number;
  currency: string;
  unpaidGoods: UnpaidGoods[];
}

export interface InitiatePaymentRequest {
  goodsIds: string[];
  paymentMethod: PaymentMethod;
  phoneNumber?: string;
}

export interface InitiatePaymentResponse {
  success: boolean;
  data: PaymentIntent;
  message: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  data: {
    payment: Payment;
    status: PaymentStatus;
  };
  message: string;
}

export interface PaymentHistoryResponse {
  success: boolean;
  data: Payment[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// ============================================
// UI STATE TYPES
// ============================================

export interface PaymentFormState {
  selectedGoodsIds: string[];
  paymentMethod: PaymentMethod | null;
  phoneNumber: string;
  isProcessing: boolean;
}

export interface PaymentFilters {
  status?: PaymentStatus;
  startDate?: string;
  endDate?: string;
}

// ============================================
// CONSTANTS
// ============================================

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'ORANGE_MONEY',
    label: 'Orange Money',
    icon: 'cellphone',
    color: '#FF6600',
    requiresPhone: true,
  },
  {
    id: 'WAVE',
    label: 'Wave',
    icon: 'wave',
    color: '#1E90FF',
    requiresPhone: true,
  },
  {
    id: 'CARD',
    label: 'Carte Bancaire',
    icon: 'credit-card',
    color: '#6D28D9',
    requiresPhone: false,
  },
];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: 'En attente',
  COMPLETED: 'Payé',
  FAILED: 'Échoué',
};

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  PENDING: '#F59E0B',
  COMPLETED: '#10B981',
  FAILED: '#EF4444',
};

export const PAYMENT_STATUS_BG_COLORS: Record<PaymentStatus, string> = {
  PENDING: '#FEF3C7',
  COMPLETED: '#D1FAE5',
  FAILED: '#FEE2E2',
};
