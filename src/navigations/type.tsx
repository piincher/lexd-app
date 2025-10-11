import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
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
   TopUp: undefined;
   TopUpList: undefined;
   TopUpHistory: undefined;
   ClientManagement: undefined;
   ClientDetails: { id: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
   RootStackParamList,
   T
>;

export type HomeTabParamList = {
   Home: undefined;
   Chat: undefined;
   Profile: undefined;
   AdminDashBoard: undefined;
   Stats: undefined;
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
