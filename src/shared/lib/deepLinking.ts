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

import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "@src/navigations/type";

/** Screens that require authentication to access via deep link */
const AUTH_REQUIRED_SCREENS = new Set<string>([
  "ContainerTracking",
  "GoodsDetail",
  "EditGoods",
  "OrderDetail",
  "TicketDetail",
  "TicketList",
  "CreateTicket",
  "Notifications",
  "NotificationDetail",
  "NotificationSettings",
  "MyPaymentHistory",
  "PaymentHistory",
  "PaymentPortal",
  "PaymentConfirmation",
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
  "WhatsAppRequestDetail",
  "CampaignList",
  "CreateCampaign",
  "CreateAnnouncement",
  "GlobalSearch",
  "Search",
  "ManagePromos",
  "AdminReviews",
]);

/** Check if a screen requires authentication */
export const isAuthRequiredScreen = (screenName: string): boolean => {
  return AUTH_REQUIRED_SCREENS.has(screenName);
};

// Deep link path config — cast to any to avoid React Navigation's overly
// strict PathConfigMap typing with complex nested structures.
const screensConfig: any = {
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
  Notifications: "notifications",
  NotificationDetail: "notifications/detail",
  NotificationSettings: "notifications/settings",
  MyPaymentHistory: "payments",
  PaymentHistory: "payments/history",
  PaymentPortal: "payments/portal",
  PaymentConfirmation: "payments/confirmation",
  faq: "faq",
  AboutUs: "about",
  CheckRoute: "route-check",
  SeaShippingOrderDetails: "sea-order/:id",
  BatchUpdateDetail: "batch/:data",
  Map: "map/:id",
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
  WhatsAppRequestDetail: "whatsapp/:requestId",
  CampaignList: "campaigns",
  CreateCampaign: "campaigns/new",
  CreateAnnouncement: "announcements/new",
  GlobalSearch: "search",
  Search: "search/v2",
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
};

/** React Navigation linking configuration */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["chinalinkexpress://"],
  config: {
    screens: screensConfig,
  },
};
