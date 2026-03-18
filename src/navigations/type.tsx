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
   ChatRoom: { id: string };
   SelectAdminToChatWith: undefined;
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
   ScanQR: undefined;
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
   PaymentConfirmation: {
      paymentId: string;
      transactionReference: string;
      amount: number;
      currency: string;
      paymentMethod: string;
      goodsCount: number;
   };
   NotificationDetail: { notification: import('../features/notifications/types').InAppNotification };
   NotificationSettings: undefined;
   ManualOrder: undefined;
   SelectManualOrder: {
      goodsId: string; // The goods to assign to an order
   };
   ConfirmGoodsAssignment: {
      orderId: string;
      goodsId: string;
   };
   EditManualOrder: {
      order: {
         _id: string;
         clientName: string;
         clientPhone?: string;
         shippingMode: "air" | "sea";
         estimatedCbm?: number;
         note?: string;
      };
   };
   OrdersDashboard: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   T
>;

export type HomeTabParamList = {
   Home: undefined;
   Chat: undefined;
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
