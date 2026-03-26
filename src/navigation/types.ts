/**
 * Navigation Types
 * 
 * Type definitions for all navigation routes in the app.
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Authenticated Stack Parameters
 * Routes available to logged-in users
 */
export interface AuthenticatedStackParamList {
  // Client Screens
  ClientOrdersList: undefined;
  ClientOrderDetail: undefined;
  TrackOrder: undefined;
  
  // Payment History
  MyPaymentHistory: undefined;
  
  // Admin Screens
  AllOrders: undefined;
  AddOrder: undefined;
  OrderTotalsBreakdown: undefined;
  
  // Goods Screens
  ReceiveGoods: undefined;
  
  // Order Screens
  SelectManualOrder: { goodsId: string };
  OrdersDashboard: undefined;
  ManualOrder: undefined;
  EditManualOrder: {
    order: {
      _id: string;
      clientName: string;
      clientPhone?: string;
      shippingMode: 'air' | 'sea';
      estimatedCbm?: number;
      note?: string;
    };
  };
  ConfirmGoodsAssignment: {
    orderId: string;
    goodsId: string;
  };
  
  // Payment Detail Screen
  PaymentDetail: {
    paymentId: string;
    orderCode: string;
    clientName: string;
    clientPhone?: string;
    amount: number;
    paymentMethod: string;
    status: string;
    paidAt: string;
    referenceNumber?: string;
    notes?: string;
    receiptUrl?: string;
    proofImages?: string[];
    goodsIds?: Array<{
      goodsId: string;
      description: string;
    }>;
  };
}

/**
 * Public Stack Parameters
 * Routes available without authentication
 */
export interface PublicStackParamList {
  PublicTracking: undefined;
  PublicTrackingResult: undefined;
}

/**
 * Screen props type helper for authenticated screens
 */
export type AuthenticatedStackScreenProps<T extends keyof AuthenticatedStackParamList> = 
  NativeStackScreenProps<AuthenticatedStackParamList, T>;

/**
 * Screen props type helper for public screens
 */
export type PublicStackScreenProps<T extends keyof PublicStackParamList> = 
  NativeStackScreenProps<PublicStackParamList, T>;

/**
 * Routes that require authentication
 * These routes will redirect to login if user is not authenticated
 */
export const REQUIRES_AUTH: Array<keyof AuthenticatedStackParamList> = [
  'ClientOrdersList',
  'ClientOrderDetail',
  'TrackOrder',
  'MyPaymentHistory',
  'AllOrders',
  'AddOrder',
  'OrderTotalsBreakdown',
  'ReceiveGoods',
  'SelectManualOrder',
  'OrdersDashboard',
  'ManualOrder',
  'EditManualOrder',
  'ConfirmGoodsAssignment',
  'PaymentDetail',
];
