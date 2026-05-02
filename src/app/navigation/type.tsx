import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
   HomeTab: NavigatorScreenParams<HomeTabParamList>;
   OnBoarding: undefined;
   CheckRoute: undefined;
   AddOrder: {
      userId: string;
      clientName: string;
      phoneNumber: string;
      pushTokens: string[];
   };
   ActiveOrder: { type: "air" | "sea" };
   Login: undefined;
   Verification: { phoneNumber: string };
   GuestPreview: undefined;
   OrderDetail: { id: string };
   SelectUser: undefined;
   PastOrders: undefined;
   AboutUs: undefined;
   UserAdd: undefined;
   AdminPastOrders: undefined;
   SendSms: undefined;
   ActiveOrderDetails: { id: string };
   ScanQRCode: undefined;
   Notifications: undefined;
   BatchUpdate: undefined;
   EditOrder: { id: string; orderId: string };
   Orders: undefined;
   UserActiveOrders: { type: "air" | "sea" };
   AdminDashBoard: undefined;
   OutstandingPaymentsList: undefined;
   VoidGoodsList: undefined;
   VoidGoods: {
      goodsId: string;
      goodsTrackingCode: string;
      cbm?: number;
   };
   OrderDetailWithGoods: { orderId: string };
   AllOrders: undefined;
   OrderDetailScreen: { id: string };
   OrderTotalsBreakdown: { orderId: string };
   ChooseShippingMethod: undefined;
   ShippingMethod: undefined;
   BatchUpdateDetail: { data: string[] };
   FAQ: undefined;
   PublicTrackingResult: { trackingNumber: string; data: unknown };
   SharedShipment: { token: string };

   ClientManagement: undefined;
   ClientDetails: { id: string };
   // Goods Feature (V2 - Client)
   MyGoods: undefined;
   GoodsDetail: { goodsId: string };
   EditGoods: { goodsId: string };
   ScanQR: undefined;
   UnassignedGoods: undefined;
   // Admin V2 Features
   ReceiveGoods: undefined;
   AdminGoodsList: undefined;
   AdminGoodsDetail: { goodsId: string };
   AdminGoodsPdfExport: { startDate?: string; endDate?: string } | undefined;
   ConsigneeList: undefined;
   CreateConsignee: undefined;
   ConsigneeDetail: { consigneeId: string };
   // Container V2 Features
   ContainerList: undefined;
   CreateContainer: undefined;
   ContainerDetail: { containerId: string };
   AssignGoods: { containerId: string };
   PackingList: { containerId: string };
   // Route V2 Features
   RouteList: undefined;
   RouteForm: { routeId?: string };
   // Customer Dashboard
   CustomerDashboard: undefined;
   // Customer Container Features
   MyContainers: undefined;
   ContainerTracking: { containerId: string };
   ClientPackingList: { containerId: string };
   // Customer Support Features
   TicketList: undefined;
   TicketDetail: { ticketId: string };
   CreateTicket: undefined;
   // Admin Loading List
   LoadingList: { containerId: string };
   // Customer Loading List
   ClientLoadingList: { containerId: string };
   // Airway Bill Features
   AirwayBillList: undefined;
   AirwayBillDetail: { airwayBillId: string };
   CreateAirwayBill: undefined;
   AssignAirwayGoods: { airwayBillId: string; cargoBagId?: string };
   AirwayBillTracking: { airwayBillId: string };
   CargoBagDetail: { cargoBagId: string; airwayBillId: string };
   // WhatsApp Admin
   WhatsAppRequests: { requestId?: string } | undefined;
   // Customer Payment Features — TEMPORARILY DISABLED
   // MyPaymentHistory: undefined;
   NotificationDetail: {
      notification: import("@src/features/notifications/types").InAppNotification;
   };
   NotificationSettings: undefined;
   // Admin Announcements
   AnnouncementList: undefined;
   CreateAnnouncement: { announcementId?: string } | undefined;
   // Admin Operations
   AuditLogs: undefined;
   AuditLogDetail: { auditLogId: string };
   NotificationEvents: undefined;
   NotificationEventDetail: { notificationEventId: string };

   // Admin Certificate Issuance
   IssueCertificate: undefined;
   CertificateHistory: undefined;
   CertificateDetailAdmin: {
      certificate: {
         _id: string;
         certificateId: string;
         verificationCode: string;
         type: "AUTO" | "MANUAL";
         status: "ACTIVE" | "REVOKED";
         totalCBMAtIssuance: number;
         thresholdCBM: number;
         certificateUrl: string | null;
         customNote: string | null;
         issuedAt: string;
         userId: { _id: string; firstName: string; lastName: string; phoneNumber: string };
         issuedBy: { _id: string; firstName: string; lastName: string } | null;
      };
   };
   // PaymentHistoryScreen: undefined;
   // PaymentScreen: {
   //    orderId: string;
   //    orderCode: string;
   //    clientName: string;
   //    clientPhone?: string;
   //    currentBalance: number;
   //    totalAmount: number;
   // };

   // Badges Screen
   Badges: undefined;
   // Reviews Screens
   MyReviews: undefined;
   AdminReviews: undefined;
   // Admin Support
   AdminTicketList: undefined;
   AdminTicketDetail: { ticketId: string };
   // Promos Screen
   ManagePromos: undefined;
   // Campaign Screens
   CampaignList: undefined;
   CreateCampaign: undefined;
   // Data Export Screen
   DataExport: undefined;
   // Activity List
   ActivityList: undefined;
   // Search Screens
   GlobalSearch: undefined;
   // Client Certificate Detail
   CertificateDetail: {
      certificateId: string;
      verificationCode: string;
      issuedAt: string;
      certificateUrl: string | null;
      certificateMongoId?: string;
   };
   // Record Payment Screen (Admin)
   RecordPaymentScreen: {
      orderId: string;
      orderCode: string;
      clientName: string;
      clientPhone?: string;
      currentBalance: number;
      totalAmount: number;
   };
   // Order Payment History Screen (Admin)
   OrderPaymentHistory: {
      orderId: string;
      orderCode: string;
      clientName?: string;
      clientPhone?: string;
   };
   // Payment Detail Screen
   PaymentDetail: {
      paymentId: string;
      orderId?: string;
      orderCode: string;
      clientName: string;
      clientPhone?: string;
      amount: number;
      paymentMethod: string;
      status: string;
      paidAt: string;
      referenceNumber?: string;
      receiptNumber?: string;
      notes?: string;
      receiptUrl?: string;
      proofImages?: string[];
      goodsIds?: {
         goodsId: string;
         description: string;
      }[];
   };
   // User Payment Detail Screen — TEMPORARILY DISABLED
   // UserPaymentDetail: {
   //    payment: import("@src/features/payments/types").PaymentHistoryItem;
   // };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   T
>;

export type HomeTabParamList = {
   Home: undefined;
   GuestPreview: undefined;
   Profile: undefined;
   AdminDashBoard: undefined;
   Stats: undefined;
   MyGoods: undefined;
   MyContainers: undefined;
   CustomerDashboard: undefined;
   Orders: undefined;
   AdminGoodsList: undefined;
   ContainerList: undefined;
};

export type navigationProps = NativeStackNavigationProp<RootStackParamList>;

export type PublicNavigationProp = navigationProps;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
   BottomTabScreenProps<HomeTabParamList, T>,
   RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
   namespace ReactNavigation {
      // React Navigation uses this empty extension for global route type registration.
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface RootParamList extends RootStackParamList {}
   }
}
