/**
 * Deep Linking Configuration
 *
 * Maps URL patterns to React Navigation routes.
 * Supports both custom URL scheme (chinalinkexpress://) and universal links.
 *
 * URL Patterns:
 * - chinalinkexpress://home                  → Home tab
 * - chinalinkexpress://dashboard             → CustomerDashboard tab
 * - chinalinkexpress://containers            → MyContainers tab
 * - chinalinkexpress://goods                 → MyGoods tab
 * - chinalinkexpress://orders                → Orders tab
 * - chinalinkexpress://profile               → Profile tab
 * - chinalinkexpress://tracking/:id          → ContainerTrackingScreen
 * - chinalinkexpress://goods/:goodsId        → GoodsDetailScreen
 * - chinalinkexpress://order/:id             → OrderDetailScreen
 * - chinalinkexpress://ticket/:ticketId      → TicketDetailScreen
 * - chinalinkexpress://notifications         → NotificationsScreen
 * - chinalinkexpress://payments              → MyPaymentHistoryScreen
 * - chinalinkexpress://support               → TicketListScreen
 * - chinalinkexpress://faq                   → FAQScreen
 */

import type { LinkingOptions } from "@react-navigation/native";
import { Linking } from "react-native";
import type { RootStackParamList } from "@src/navigations/type";

/** Screens that require authentication to access via deep link */
const AUTH_REQUIRED_SCREENS = new Set<string>([
  "ContainerTracking",
  "GoodsDetail",
  "EditGoods",
  "OrderDetail",
  "TicketDetail",
  "TicketList",
  "CreateTicket",
  "AdminTicketDetail",
  "AdminTicketList",
  "Notifications",
  "NotificationDetail",
  "NotificationSettings",
  "MyPaymentHistory",
  "UserPaymentDetail",
  "MyReviews",
  "Badges",
  "CertificateDetail",
  "ActivityList",
  "ClientPackingList",
  "ClientLoadingList",
  "CustomerDashboard",
  "MyContainers",
  "MyGoods",
  "Profile",
  "Orders",
  "AddOrder",
  "ActiveOrder",
  "SelectUser",
  "PastOrders",
  "UserAdd",
  "AdmninPastOrders",
  "SendSms",
  "ActiveOrderDetails",
  "BatchUpdate",
  "BatchUpdateDetail",
  "EditOrder",
  "AdminDashBoard",
  "OutstandingPaymentsList",
  "UserActiveOrders",
  "ClientManagement",
  "ClientDetails",
  "IssueCertificate",
  "CertificateHistory",
  "CertificateDetailAdmin",
  "ChooseShippingMethod",
  "ShippingMethod",
  "UnassignedGoods",
  "ReceiveGoods",
  "AdminGoodsList",
  "AdminGoodsDetail",
  "AdminGoodsPdfExport",
  "ConsigneeList",
  "CreateConsignee",
  "ConsigneeDetail",
  "ContainerList",
  "CreateContainer",
  "ContainerDetail",
  "AssignGoods",
  "PackingList",
  "LoadingList",
  "RouteList",
  "RouteForm",
  "ScanQR",
  "VoidGoodsList",
  "VoidGoods",
  "OrderDetailWithGoods",
  "AllOrders",
  "OrderDetailScreen",
  "RecordPaymentScreen",
  "PaymentDetail",
  "OrderPaymentHistory",
  "PaymentScreen",
  "WhatsAppRequests",
  "AdminTicketList",
  "AdminTicketDetail",
  "CampaignList",
  "CreateCampaign",
  "CreateAnnouncement",
  "GlobalSearch",
  "ManagePromos",
  "AdminReviews",
]);

/** Check if a screen requires authentication */
export const isAuthRequiredScreen = (screenName: string): boolean => {
  return AUTH_REQUIRED_SCREENS.has(screenName);
};

type ScreensConfig = NonNullable<LinkingOptions<RootStackParamList>["config"]>["screens"];

// Deep link path config. The cast below keeps compatibility with legacy route
// names that are still registered in App.tsx but not fully modeled in the root
// navigation type yet.
const screensConfig = {
  HomeTab: {
    screens: {
      Home: "home",
      CustomerDashboard: "dashboard",
      MyContainers: "containers",
      MyGoods: "goods-list",
      Orders: "orders",
      Profile: "profile",
      AdminDashBoard: "admin-tab",
      Stats: "stats",
    },
  },
  OnBoarding: "onboarding",
  Login: "login",
  Verification: "verify",
  ContainerTracking: "tracking/:containerId",
  GoodsDetail: "goods/:goodsId",
  EditGoods: "goods/:goodsId/edit",
  OrderDetail: "order/:id",
  TicketDetail: "ticket/:ticketId",
  TicketList: "support",
  CreateTicket: "support/new",
  AdminTicketList: "admin/support",
  AdminTicketDetail: "admin/support/:ticketId",
  Notifications: "notifications",
  NotificationDetail: "notifications/detail",
  NotificationSettings: "notifications/settings",
  MyPaymentHistory: "payments",
  faq: "faq",
  AboutUs: "about",
  CheckRoute: "route-check",
  SharedShipment: "s/:token",
  BatchUpdateDetail: "batch/:data",
  ScanQRCode: "scan",
  ActiveOrderDetails: "active-order/:id",
  UserActiveOrders: "user-orders/:type",
  AdminDashBoard: "admin",
  OutstandingPaymentsList: "outstanding",
  ChooseShippingMethod: "shipping",
  ShippingMethod: "shipping/method",
  ClientManagement: "clients",
  ClientDetails: "clients/:id",
  ReceiveGoods: "receive",
  AdminGoodsList: "admin-goods",
  AdminGoodsDetail: "admin-goods/:goodsId",
  AdminGoodsPdfExport: "admin-goods/export",
  ConsigneeList: "consignees",
  CreateConsignee: "consignees/new",
  ConsigneeDetail: "consignees/:consigneeId",
  ContainerList: "admin-containers",
  CreateContainer: "containers/new",
  ContainerDetail: "admin-containers/:containerId",
  AssignGoods: "containers/:containerId/assign",
  PackingList: "containers/:containerId/packing",
  LoadingList: "containers/:containerId/loading",
  RouteList: "routes",
  RouteForm: "routes/form",
  ScanQR: "scan-qr",
  UnassignedGoods: "unassigned",
  WhatsAppRequests: "whatsapp",
  CampaignList: "campaigns",
  CreateCampaign: "campaigns/new",
  CreateAnnouncement: "announcements/new",
  GlobalSearch: "search",
  Badges: "badges",
  MyReviews: "reviews",
  ManagePromos: "promos",
  AdminReviews: "admin-reviews",
  ActivityList: "activity",
  ClientPackingList: "packing/:containerId",
  ClientLoadingList: "loading/:containerId",
  CertificateDetail: "certificate",
  IssueCertificate: "admin/certificates/issue",
  CertificateHistory: "admin/certificates",
  CertificateDetailAdmin: "admin/certificates/:certificateId",
  AllOrders: "admin/orders",
  OrderDetailScreen: "admin/order/:id",
  RecordPaymentScreen: "admin/payments/record",
  PaymentDetail: "admin/payments/:paymentId",
  OrderPaymentHistory: "admin/payments/history/:orderId",
  PaymentScreen: "admin/payment/:orderId",
  UserPaymentDetail: "payments/:paymentId",
  AddOrder: "admin/order/new",
  ActiveOrder: "admin/orders/active/:type",
  SelectUser: "admin/select-user",
  PastOrders: "past-orders",
  UserAdd: "admin/user/new",
  AdmninPastOrders: "admin/past-orders",
  SendSms: "admin/sms",
  BatchUpdate: "admin/batch",
  EditOrder: "admin/order/:id/edit",
  VoidGoodsList: "admin/void-goods",
  VoidGoods: "admin/void-goods/:id",
} as ScreensConfig;

/** React Navigation linking configuration */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    "chinalinkexpress://",
    "https://chinalinkexpress.com",
    "https://www.chinalinkexpress.com",
    "http://chinalinkexpress.com",
    "http://www.chinalinkexpress.com",
  ],
  config: {
    screens: screensConfig,
  },
  // Custom getInitialURL to handle universal links that may come through
  // with query parameters or fragments that need cleaning
  getInitialURL: async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      // Remove any tracking/query params that might interfere with path matching
      return cleanUniversalLink(url);
    }
    return null;
  },
  // Custom subscribe to handle universal link events while app is running
  subscribe: (listener) => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      listener(cleanUniversalLink(url));
    });
    return () => subscription.remove();
  },
};

/**
 * Clean a universal link URL by removing query parameters and fragments
 * that might interfere with React Navigation path matching.
 * Preserves the path structure needed for deep linking.
 */
function cleanUniversalLink(url: string): string {
  try {
    const parsed = new URL(url);
    // Reconstruct URL with just scheme, host, and pathname
    // This removes ?query=params and #fragments
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return url;
  }
}
