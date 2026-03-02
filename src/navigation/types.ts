/**
 * Navigation Types - V2 Architecture
 * Clear separation between Public and Authenticated navigation
 */

import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// ============================================
// PUBLIC NAVIGATION (No Authentication Required)
// ============================================

/**
 * Public Stack Param List
 * Routes accessible WITHOUT logging in
 */
export type PublicStackParamList = {
  // Main public screens
  PublicHome: undefined;
  PublicTracking: { trackingNumber?: string };
  PublicTrackingResult: { trackingNumber: string; data: any };
  
  // Information screens
  AboutUs: undefined;
  ContactUs: undefined;
  FAQ: undefined;
  ShippingInfo: undefined;
  Services: undefined;
  
  // Authentication entry points
  Login: undefined;
  Verification: { phoneNumber: string };
  
  // Onboarding (first app launch)
  OnBoarding: undefined;
};

// ============================================
// AUTHENTICATED NAVIGATION (Login Required)
// ============================================

/**
 * Authenticated Stack Param List
 * Routes accessible ONLY after authentication
 */
export type AuthenticatedStackParamList = {
  // Main App Entry (Bottom Tab Navigator)
  MainTab: NavigatorScreenParams<MainTabParamList>;
  
  // Customer V2 Features - Goods
  MyGoods: undefined;
  GoodsDetail: { goodsId: string };
  ScanQR: undefined;
  
  // Customer V2 Features - Containers
  MyContainers: undefined;
  ContainerTracking: { containerId: string };
  ClientPackingList: { containerId: string };
  
  // Customer V2 Features - Dashboard
  CustomerDashboard: undefined;
  
  // Customer V2 Features - Support
  TicketList: undefined;
  TicketDetail: { ticketId: string };
  CreateTicket: undefined;
  
  // Customer V2 Features - Payments
  PaymentPortal: undefined;
  PaymentHistory: undefined;
  PaymentConfirmation: {
    paymentId: string;
    transactionReference: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    goodsCount: number;
  };
  TopUp: undefined;
  TopUpHistory: undefined;
  
  // Customer V2 Features - Invoices
  MyInvoices: undefined;
  InvoiceDetail: { invoiceId: string };
  
  // Notifications
  Notifications: undefined;
  NotificationDetail: { notification: import('../features/notifications/types').InAppNotification };
  NotificationSettings: undefined;
  
  // Chat
  ChatRoom: { id: string };
  SelectAdminToChatWith: undefined;
  
  // Legacy V1 Features (to be migrated)
  Orders: undefined;
  OrderDetail: { id: string };
  PastOrders: undefined;
  CheckRoute: undefined;
  Stats: undefined;
  
  // Admin Features
  AdminDashBoard: undefined;
  ActiveOrder: { type: "air" | "sea" };
  ActiveOrderDetails: { id: string };
  UserActiveOrders: { type: "air" | "sea" };
  AddOrder: {
    userId: string;
    clientName: string;
    phoneNumber: string;
    pushTokens: string[];
  };
  EditOrder: { id: string; orderId: string };
  BatchUpdate: undefined;
  BatchUpdateDetail: { data: string[] };
  AdminPastOrders: undefined;
  SelectUser: undefined;
  ClientManagement: undefined;
  ClientDetails: { id: string };
  UserAdd: undefined;
  SendSms: undefined;
  TopUpList: undefined;
  ScanQRCode: undefined;
  ChooseShippingMethod: undefined;
  ShippingMethod: undefined;
  SeaShippingOrderDetails: { id: string };
  Map: { id: string };
  
  // Admin V2 Features
  ReceiveGoods: undefined;
  AdminGoodsList: undefined;
  AdminGoodsDetail: { goodsId: string };
  ConsigneeList: undefined;
  CreateConsignee: undefined;
  ConsigneeDetail: { consigneeId: string };
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  AssignGoods: { containerId: string };
  PackingList: { containerId: string };
  RouteList: undefined;
  RouteForm: { routeId?: string };
  
  // Finance Features (Admin)
  FinancialDashboard: undefined;
  RevenueReport: undefined;
  ContainerProfit: undefined;
  CustomerAnalytics: undefined;
  ExpenseList: undefined;
  ExpenseDetail: { expenseId: string };
  CreateExpense: undefined;
  ExpenseSummary: undefined;
  InvoiceList: undefined;
  CreateInvoice: undefined;
  InvoicePreview: { invoiceId: string };
};

/**
 * Main Bottom Tab Param List
 * Primary navigation for authenticated users
 */
export type MainTabParamList = {
  // Home/Dashboard tab - overview of user's data
  Home: undefined;
  
  // My Goods tab - personal goods list
  MyGoods: undefined;
  
  // Track tab - quick tracking (public feature but accessible when auth)
  Track: undefined;
  
  // Notifications tab - user notifications
  Notifications: undefined;
  
  // Profile tab - settings, logout, etc.
  Profile: undefined;
  
  // Admin-only tabs
  AdminDashBoard: undefined;
  Stats: undefined;
  Chat: undefined;
  MyContainers: undefined;
  CustomerDashboard: undefined;
};

// ============================================
// ROOT NAVIGATION
// ============================================

/**
 * Root Stack Param List
 * Combines Public and Authenticated stacks
 */
export type RootStackParamList = {
  // Public flow
  Public: NavigatorScreenParams<PublicStackParamList>;
  
  // Authenticated flow
  Authenticated: NavigatorScreenParams<AuthenticatedStackParamList>;
};

// ============================================
// SCREEN PROPS TYPES
// ============================================

export type PublicStackScreenProps<T extends keyof PublicStackParamList> = 
  NativeStackScreenProps<PublicStackParamList, T>;

export type AuthenticatedStackScreenProps<T extends keyof AuthenticatedStackParamList> = 
  NativeStackScreenProps<AuthenticatedStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

// Navigation prop type for useNavigation hook
export type PublicNavigationProp = NativeStackNavigationProp<PublicStackParamList>;
export type AuthenticatedNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>;
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ============================================
// GLOBAL TYPE DECLARATION
// ============================================

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// ============================================
// ROLE-BASED NAVIGATION CONFIGURATION
// ============================================

/**
 * Tab configuration based on user role
 */
export const TAB_CONFIG = {
  customer: [
    { name: 'Home', label: 'Accueil', icon: 'home' },
    { name: 'MyGoods', label: 'Mes Marchandises', icon: 'box' },
    { name: 'Track', label: 'Suivi', icon: 'search' },
    { name: 'Notifications', label: 'Notifications', icon: 'bell' },
    { name: 'Profile', label: 'Profil', icon: 'user' },
  ] as const,
  
  admin: [
    { name: 'AdminDashBoard', label: 'Dashboard', icon: 'book' },
    { name: 'Stats', label: 'Stats', icon: 'pie-chart' },
    { name: 'Chat', label: 'Chat', icon: 'chat' },
    { name: 'Profile', label: 'Profil', icon: 'user' },
  ] as const,
};

/**
 * Check if a route requires authentication
 * Used for deep linking and navigation guards
 */
export const REQUIRES_AUTH: string[] = [
  'MyGoods',
  'MyContainers',
  'PaymentPortal',
  'PaymentHistory',
  'TicketList',
  'TicketDetail',
  'CustomerDashboard',
  'ChatRoom',
  'Notifications',
  'Profile',
];

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES: string[] = [
  'PublicHome',
  'PublicTracking',
  'AboutUs',
  'ContactUs',
  'FAQ',
  'ShippingInfo',
  'Services',
  'Login',
  'OnBoarding',
];
