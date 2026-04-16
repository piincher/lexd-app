import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
   OrderDetail: { id: string };
   SelectUser: undefined;
   PastOrders: undefined;
   AboutUs: undefined;
   UserAdd: undefined;
   AdmninPastOrders: undefined;
   SendSms: undefined;
   Map: { id: string };
   ActiveOrderDetails: { id: string };
   ScanQRCode: undefined;
   Notifications: undefined;
   BatchUpdate: undefined;
   EditOrder: { id: string; orderId: string };
   Orders: undefined;
   UserActiveOrders: { type: "air" | "sea" };
   AdminDashBoard: undefined;
   OutstandingPaymentsList: undefined;
   ChooseShippingMethod: undefined;
   ShippingMethod: undefined;
   SeaShippingOrderDetails: { id: string };
   BatchUpdateDetail: { data: string[] };
   faq: undefined;

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
   // WhatsApp Admin
   WhatsAppRequests: undefined;
   WhatsAppRequestDetail: { requestId: string };
   // Customer Payment Features
   PaymentPortal: undefined;
   PaymentHistory: undefined;
   MyPaymentHistory: undefined;
   PaymentConfirmation: {
      paymentId: string;
      transactionReference: string;
      amount: number;
      currency: string;
      paymentMethod: string;
      goodsCount: number;
   };
   NotificationDetail: {
      notification: import("../features/notifications/types").InAppNotification;
   };
   NotificationSettings: undefined;
   // Admin Announcements
   CreateAnnouncement: undefined;

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
   PaymentHistoryScreen: undefined;
   // Admin Payment Management
   PaymentManagement: undefined;
   PaymentScreen: {
      orderId: string;
      orderCode: string;
      clientName: string;
      clientPhone?: string;
      currentBalance: number;
      totalAmount: number;
   };
   // Admin Order Payment History
   AdminOrderPaymentHistory: {
      orderId: string;
      orderCode: string;
      clientName?: string;
      clientPhone?: string;
   };

   // Badges Screen
   Badges: undefined;
   // Reviews Screens
   MyReviews: undefined;
   AdminReviews: undefined;
   // Promos Screen
   ManagePromos: undefined;
   // Campaign Screens
   CampaignList: undefined;
   CreateCampaign: undefined;
   // Activity List
   ActivityList: undefined;
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
      goodsIds?: Array<{
         goodsId: string;
         description: string;
      }>;
   };
   // User Payment Detail Screen (payments recorded by admin on user's behalf)
   UserPaymentDetail: {
      payment: import("../features/payments/types").PaymentHistoryItem;
   };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   T
>;

export type HomeTabParamList = {
   Home: undefined;
   Profile: undefined;
   AdminDashBoard: undefined;
   Stats: undefined;
   MyGoods: undefined;
   MyContainers: undefined;
   CustomerDashboard: undefined;
   Orders: undefined;
};

export type navigationProps = NativeStackNavigationProp<RootStackParamList>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
   BottomTabScreenProps<HomeTabParamList, T>,
   RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}
