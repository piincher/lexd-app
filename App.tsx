import "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as Sentry from "@sentry/react-native";
import { initMixpanel } from "@src/config/Analytic";
import { HomeTabParamList, RootStackParamList } from "@src/navigations/type";
import { navigationRef } from "@src/navigations/navigationRef";

// Features - Auth
import { LoginScreen as Login, VerificationScreen as Verification } from "@src/features/auth";

// Features - Home
import { HomeScreen } from "@src/features/home";

// Features - Notifications
import { NotificationsScreen as Notifications } from "@src/features/notifications";

// Features - Support
import { FAQScreen as Faq } from "@src/features/support";

// Features - Notifications
import NotificationDetailScreen from "@src/features/notifications/screens/NotificationDetailScreen";

// Features - Customer Dashboard (V2)
import { CustomerDashboardScreen, ActivityListScreen } from "@src/features/customer/dashboard";

// Features - Onboarding
import { OnboardingScreen as OnBoarding } from "@src/features/onboarding";

// Features - Order Detail
import { NewOrderDetailScreen } from "@src/features/order-detail";

// Features - Payments
import {
   PaymentScreen,
   PaymentHistoryScreen,
   MyPaymentHistoryScreen,
} from "@src/features/payments";
import UserPaymentDetailScreen from "@src/features/payments/screens/UserPaymentDetailScreen";

// Features - Orders
import { OrdersScreen as Orders } from "@src/features/orders";

// Features - Profile
import {
   ProfileScreen as Profile,
   AboutUsScreen as AboutUs,
   PastOrdersScreen as PastOrders,
   NotificationSettingsScreen,
   BadgesScreen,
   MyReviewsScreen,
} from "@src/features/profile";

// Client Certificate Detail
import CertificateDetailScreen from "@src/features/profile/screens/CertificateDetail";

// Features - Goods (V2 Client)
import {
   MyGoodsScreen,
   GoodsDetailScreen,
   EditGoodsScreen,
   ScanQRScreen as GoodsScanQR,
} from "@src/features/goods";

// Features - Customer Containers (V2)
import {
   MyContainersScreen,
   ContainerTrackingScreen,
   ClientPackingListScreen,
   ClientLoadingListScreen,
} from "@src/features/customer/containers";

// Features - Stats
import { StatsScreen as Stats } from "@src/features/stats";

// Features - Routes
import { CheckRouteScreen as CheckRoute } from "@src/features/routes";

// Features - Support
import {
   TicketListScreen,
   TicketDetailScreen,
   CreateTicketScreen,
} from "@src/features/customer/support";

// Components & Others
import FadingAnnouncement from "@src/components/Announcement/Annoncement";
import { COLORS } from "@src/constants/Colors";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { useAuth } from "@src/store/Auth";
import { OfflineProvider } from "@src/shared/providers";
import { getQueryClient } from "@src/shared/lib/queryClient";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StatusBar as ThemeStatusBar } from "@src/components/StatusBar";
import React, { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, fr, registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { initSentry } from "@src/services/sentry";
import { UpdateProvider } from "@src/context/UpdateProvider";
import { NotificationProvider } from "@src/app/providers";
import { ThemeProvider, useAppTheme } from "@src/providers";

// Features - Admin
import ActiveOrders from "@src/features/admin/orders/screens/ActiveOrders";
import UserActiveOrders from "@src/features/admin/orders/screens/UserActiveOrders";
import ActiveOrderdetails from "@src/features/admin/orders/screens/ActiveOrderDetails";
import AddOrder from "@src/features/admin/orders/screens/AddOrder";
import AddUser from "@src/features/admin/users/screens/AddUser";
import AdminDashBoard from "@src/features/admin/dashboard/screens/AdminDashBoard";
import BatchUpdate from "@src/features/admin/orders/screens/BatchUpdate";
import EditOrder from "@src/features/admin/orders/screens/EditOrder";
import AdminPastOrders from "@src/features/admin/orders/screens/PastOrder";
import ScanQRCode from "@src/features/admin/tools/screens/ScanCode";
import SelectUser from "@src/features/admin/users/screens/SelectUser";
import SendSms from "@src/features/admin/communications/screens/SendSms";
import CampaignListScreen from "@src/features/admin/communications/screens/CampaignListScreen";
import CreateCampaignScreen from "@src/features/admin/communications/screens/CreateCampaignScreen";
import CreateAnnouncementScreen from "@src/features/admin/announcements/screens/CreateAnnouncementScreen";
import BatchUpdateDetail from "@src/features/admin/orders/screens/BatchUpdateDetail";
import ChooseShippingMethod from "@src/features/admin/shipping/screens/ChooseShippingMethod";
import ShippingMethod from "@src/features/admin/shipping/screens/ShippingMethod";
import ClientManagement from "@src/features/admin/users/screens/ClientManagement";
import ClientDetails from "@src/features/admin/users/screens/ClientDetail";
import ReceiveGoodsScreen from "@src/features/admin/goods/screens/ReceiveGoodsScreen/ReceiveGoodsScreen";
import AdminGoodsList from "@src/features/admin/goods/screens/GoodsListScreen";
import AdminGoodsDetailScreen from "@src/features/admin/goods/screens/GoodsDetailScreen/GoodsDetailScreen";
import ConsigneeListScreen from "@src/features/admin/consignees/screens/ConsigneeListScreen";
import CreateConsigneeScreen from "@src/features/admin/consignees/screens/CreateConsigneeScreen";
import ConsigneeDetailScreen from "@src/features/admin/consignees/screens/ConsigneeDetailScreen";
import ContainerListScreen from "@src/features/admin/containers/screens/ContainerListScreen";
import CreateContainerScreen from "@src/features/admin/containers/screens/CreateContainerScreen";
import ContainerDetailScreen from "@src/features/admin/containers/screens/ContainerDetailScreen";
import AssignGoodsScreen from "@src/features/admin/containers/screens/AssignGoods/AssignGoodsScreen";
import PackingListScreen from "@src/features/admin/containers/screens/PackingListScreen";
import LoadingListScreen from "@src/features/admin/containers/screens/LoadingListScreen";
import RouteListScreen from "@src/features/admin/routes/screens/RouteListScreen";
import RouteFormScreen from "@src/features/admin/routes/screens/RouteFormScreen";
import VoidGoodsListScreen from "@src/features/admin/goods/screens/VoidGoodsListScreen";
import VoidGoodsScreen from "@src/features/admin/goods/screens/VoidGoodsScreen/VoidGoodsScreen";
import OrderDetailWithGoodsScreen from "@src/features/admin/orders/screens/OrderDetailWithGoodsScreen";
import AllOrdersScreen from "@src/features/admin/orders/screens/AllOrdersScreen";
import OrderDetailScreen from "@src/features/admin/orders/screens/OrderDetailScreen";
import RecordPaymentScreen from "@src/features/admin/orders/screens/RecordPaymentScreen";
import PaymentDetailScreen from "@src/features/admin/orders/screens/PaymentDetailScreen";
import UnassignedGoodsScreen from "@src/features/admin/dashboard/screens/UnassignedGoodsScreen";
import OutstandingPaymentsListScreen from "@src/features/admin/dashboard/screens/OutstandingPaymentsListScreen";
import AdminPaymentHistoryScreen from "@src/features/admin/orders/screens/PaymentHistoryScreen";
import IssueCertificateScreen from "@src/features/admin/certificates/screens/IssueCertificateScreen";
import CertificateHistoryScreen from "@src/features/admin/certificates/screens/CertificateHistoryScreen";
import CertificateDetailAdminScreen from "@src/features/admin/certificates/screens/CertificateDetailAdminScreen";
import AdminReviewsScreen from "@src/features/admin/reviews/screens/AdminReviewsScreen";
import ManagePromosScreen from "@src/features/admin/promos/screens/ManagePromosScreen";
import AdminGoodsPdfExport from "@src/features/admin/export/screens/GoodsPdfExportScreen";
import WhatsAppRequestListScreen from "@src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen";
import GlobalSearchScreen from "@src/features/admin/search/screens/GlobalSearchScreen";
import SearchScreen from "@src/features/search/screens/SearchScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

registerTranslation("en", enGB);
registerTranslation("fr", fr);

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

AsyncStorage.removeItem("CHINALINK_QUERY_CACHE").then(() => {
   getQueryClient().clear();
});
initSentry();
initMixpanel();
function AppWrapper() {
   const [appIsLoaded, setAppIsLoaded] = useState(false);
   const navigation = useRef<any>(null);
   const appLaunch = useAppLaunchStore((state) => state.isAppLaunchFirst);
   const token = useAuth((state) => state.token);

   useEffect(() => {
      fetch("http://192.168.0.112:3000/health")
         .then((res) => res.json())
         .then((data) => console.log("✅ Connected:", data))
         .catch((err) => console.log("❌ Error:", err));
   }, []);
   useEffect(() => {
      const prepare = async () => {
         try {
            await Font.loadAsync({
               black: require("./assets/fonts//Roboto-Black.ttf"),
               blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
               bold: require("./assets/fonts/Roboto-Bold.ttf"),
               boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
               italic: require("./assets/fonts/Roboto-Italic.ttf"),
               light: require("./assets/fonts/Roboto-Light.ttf"),
               lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
               medium: require("./assets/fonts/Roboto-Medium.ttf"),
               mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
               regular: require("./assets/fonts/Roboto-Regular.ttf"),
               thin: require("./assets/fonts/Roboto-Thin.ttf"),
               thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
            });
         } catch (error) {
            console.log("error loading fonts", error);
         }
         // Moved from finally block - React Compiler doesn't support finally clauses
         setAppIsLoaded(true);
      };

      prepare();
   }, []);
   const onLayout = async () => {
      if (appIsLoaded) {
         await SplashScreen.hideAsync();
      }
   };

   // Hooks must be called before any conditional returns (Rules of Hooks)
   const { isDark, colors } = useAppTheme();

   if (!appIsLoaded) {
      return null;
   }

   return (
      <SafeAreaProvider onLayout={onLayout}>
         <ThemeStatusBar style={isDark ? "light" : "dark"} />
         <FadingAnnouncement />

         <Stack.Navigator screenOptions={{ headerShown: false }}>
            {appLaunch && <Stack.Screen name="OnBoarding" component={OnBoarding} />}

            <Stack.Screen name="HomeTab" component={HomeBottomTab} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="faq" component={Faq} />
            <Stack.Screen name="CertificateDetail" component={CertificateDetailScreen} />

            {token ? (
               <>
                  <Stack.Screen name="VoidGoodsList" component={VoidGoodsListScreen} />
                  <Stack.Screen name="VoidGoods" component={VoidGoodsScreen} />

                  <Stack.Screen
                     name="OrderDetailWithGoods"
                     component={OrderDetailWithGoodsScreen}
                  />
                  <Stack.Screen name="AllOrders" component={AllOrdersScreen} />
                  <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
                  <Stack.Screen name="RecordPaymentScreen" component={RecordPaymentScreen} />
                  <Stack.Screen name="PaymentDetail" component={PaymentDetailScreen} />
                  <Stack.Screen name="OrderPaymentHistory" component={AdminPaymentHistoryScreen} />
                  <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                  <Stack.Screen name="PaymentHistoryScreen" component={PaymentHistoryScreen} />
                  <Stack.Screen
                     name="MyPaymentHistory"
                     component={MyPaymentHistoryScreen}
                     options={{ title: "Historique des paiements" }}
                  />
                  <Stack.Screen name="UserPaymentDetail" component={UserPaymentDetailScreen} />
                  <Stack.Screen name="AddOrder" component={AddOrder} />
                  <Stack.Screen name="ActiveOrder" component={ActiveOrders} />
                  <Stack.Screen name="OrderDetail" component={NewOrderDetailScreen} />
                  <Stack.Screen name="SelectUser" component={SelectUser} />
                  <Stack.Screen name="PastOrders" component={PastOrders} />
                  <Stack.Screen name="UserAdd" component={AddUser} />
                  <Stack.Screen name="AdmninPastOrders" component={AdminPastOrders} />
                  <Stack.Screen name="SendSms" component={SendSms} />
                  <Stack.Screen name="ActiveOrderDetails" component={ActiveOrderdetails} />
                  <Stack.Screen name="ScanQRCode" component={ScanQRCode} />
                  <Stack.Screen name="Notifications" component={Notifications} />
                  <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
                  <Stack.Screen name="BatchUpdate" component={BatchUpdate} />
                  <Stack.Screen name="BatchUpdateDetail" component={BatchUpdateDetail} />
                  <Stack.Screen name="EditOrder" component={EditOrder} />
                  <Stack.Screen name="AdminDashBoard" component={AdminDashBoard} />
                  <Stack.Screen
                     name="OutstandingPaymentsList"
                     component={OutstandingPaymentsListScreen}
                  />
                  <Stack.Screen name="UserActiveOrders" component={UserActiveOrders} />
                  <Stack.Screen name="ClientManagement" component={ClientManagement} />
                  <Stack.Screen name="ClientDetails" component={ClientDetails} />
                  <Stack.Screen name="IssueCertificate" component={IssueCertificateScreen} />
                  <Stack.Screen name="CertificateHistory" component={CertificateHistoryScreen} />
                  <Stack.Screen
                     name="CertificateDetailAdmin"
                     component={CertificateDetailAdminScreen}
                  />
                  <Stack.Screen name="ChooseShippingMethod" component={ChooseShippingMethod} />
                  <Stack.Screen name="ShippingMethod" component={ShippingMethod} />
                  {/* Admin V2 Screens */}
                  <Stack.Screen name="UnassignedGoods" component={UnassignedGoodsScreen} />
                  <Stack.Screen name="ReceiveGoods" component={ReceiveGoodsScreen} />
                  <Stack.Screen name="AdminGoodsList" component={AdminGoodsList} />
                  <Stack.Screen name="AdminGoodsDetail" component={AdminGoodsDetailScreen} />
                  <Stack.Screen name="AdminGoodsPdfExport" component={AdminGoodsPdfExport} />
                  <Stack.Screen name="ConsigneeList" component={ConsigneeListScreen} />
                  <Stack.Screen name="CreateConsignee" component={CreateConsigneeScreen} />
                  <Stack.Screen name="ConsigneeDetail" component={ConsigneeDetailScreen} />
                  {/* Container V2 Screens */}
                  <Stack.Screen name="ContainerList" component={ContainerListScreen} />
                  <Stack.Screen name="CreateContainer" component={CreateContainerScreen} />
                  <Stack.Screen name="ContainerDetail" component={ContainerDetailScreen} />
                  <Stack.Screen name="AssignGoods" component={AssignGoodsScreen} />
                  <Stack.Screen name="PackingList" component={PackingListScreen} />
                  <Stack.Screen name="LoadingList" component={LoadingListScreen} />
                  {/* Route V2 Screens */}
                  <Stack.Screen name="RouteList" component={RouteListScreen} />
                  <Stack.Screen name="RouteForm" component={RouteFormScreen} />
                  {/* Client V2 Screens */}
                  <Stack.Screen name="MyGoods" component={MyGoodsScreen} />
                  <Stack.Screen name="GoodsDetail" component={GoodsDetailScreen} />
                  <Stack.Screen name="EditGoods" component={EditGoodsScreen} />
                  <Stack.Screen name="ScanQR" component={GoodsScanQR} />
                  {/* Customer Dashboard V2 */}
                  <Stack.Screen name="CustomerDashboard" component={CustomerDashboardScreen} />
                  <Stack.Screen name="ActivityList" component={ActivityListScreen} />
                  {/* Customer Container V2 Screens */}
                  <Stack.Screen name="MyContainers" component={MyContainersScreen} />
                  <Stack.Screen name="ContainerTracking" component={ContainerTrackingScreen} />
                  <Stack.Screen name="ClientPackingList" component={ClientPackingListScreen} />
                  <Stack.Screen name="ClientLoadingList" component={ClientLoadingListScreen} />
                  {/* WhatsApp Admin Screens */}
                  <Stack.Screen name="WhatsAppRequests" component={WhatsAppRequestListScreen} />
                  <Stack.Screen
                     name="WhatsAppRequestDetail"
                     component={WhatsAppRequestListScreen}
                  />
                  {/* Customer Support Screens */}
                  <Stack.Screen name="TicketList" component={TicketListScreen} />
                  <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
                  <Stack.Screen name="CreateTicket" component={CreateTicketScreen} />
                  <Stack.Screen
                     name="NotificationSettings"
                     component={NotificationSettingsScreen}
                  />
                  {/* Badges Screen */}
                  <Stack.Screen name="Badges" component={BadgesScreen} />
                  {/* Reviews Screens */}
                  <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
                  <Stack.Screen name="AdminReviews" component={AdminReviewsScreen} />
                  {/* Promos Screens */}
                  <Stack.Screen name="ManagePromos" component={ManagePromosScreen} />
                  {/* Campaign Screens */}
                  <Stack.Screen name="CampaignList" component={CampaignListScreen} />
                  <Stack.Screen name="CreateCampaign" component={CreateCampaignScreen} />
                  <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} />
                  {/* Search Screens */}
                  <Stack.Screen name="GlobalSearch" component={GlobalSearchScreen} />
                  <Stack.Screen name="Search" component={SearchScreen} />
               </>
            ) : (
               <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Verification" component={Verification} />
               </>
            )}
         </Stack.Navigator>
      </SafeAreaProvider>
   );
}

const HomeBottomTab = () => {
   const admin = useAuth((state) => state.user.role);
   const { colors } = useAppTheme();

   const adminRole = admin === "admin" ? true : false;

   return (
      <BottomTab.Navigator
         initialRouteName={"Home"}
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary.main,
            tabBarInactiveTintColor: colors.text.disabled,
            tabBarStyle: {
               backgroundColor: colors.background.card,
               borderTopColor: colors.border,
            },
         }}
      >
         {!adminRole && (
            <BottomTab.Screen
               name="Home"
               component={HomeScreen}
               options={{
                  tabBarLabel: "Accueil",
                  tabBarIcon: ({ focused, color, size }) => (
                     <AntDesign name="home" focused={focused} color={color} size={size} />
                  ),
               }}
            />
         )}
         {adminRole && (
            <BottomTab.Screen
               name="AdminDashBoard"
               component={AdminDashBoard}
               options={{
                  tabBarIcon: ({ focused, color, size }) => (
                     <AntDesign name="book" focused={focused} color={color} size={size} />
                  ),
               }}
            />
         )}
         {!adminRole && (
            <BottomTab.Screen
               name="Orders"
               options={{
                  tabBarLabel: "Commandes",
                  tabBarAccessibilityLabel: "Commandes",
                  tabBarIcon: ({ focused, color, size }) => (
                     <FontAwesome5
                        name="clipboard-list"
                        size={size}
                        color={color}
                        focused={focused}
                     />
                  ),
               }}
               component={Orders}
            />
         )}
         {!adminRole && (
            <BottomTab.Screen
               name="MyGoods"
               component={MyGoodsScreen}
               options={{
                  tabBarLabel: "Mes Marchandises",
                  tabBarAccessibilityLabel: "Mes Marchandises",
                  tabBarIcon: ({ focused, color, size }) => (
                     <FontAwesome5 name="box" size={size} color={color} focused={focused} />
                  ),
               }}
            />
         )}
         {adminRole && (
            <BottomTab.Screen
               name="Stats"
               component={Stats}
               options={{
                  tabBarIcon: ({ focused, color, size }) => (
                     <Entypo name="pie-chart" focused={focused} color={color} size={size} />
                  ),
               }}
            />
         )}
         <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
               tabBarIcon: ({ focused, color, size }) => (
                  <Entypo name="user" focused={focused} color={color} size={size} />
               ),
            }}
         />
      </BottomTab.Navigator>
   );
};

const ThemedApp = () => {
   const { paperTheme, navigationTheme } = useAppTheme();

   return (
      <PaperProvider theme={paperTheme}>
         <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            <MainWrapper />
         </NavigationContainer>
      </PaperProvider>
   );
};

const App = () => {
   return (
      <OfflineProvider queryClient={getQueryClient()}>
         <ThemeProvider>
            <NotificationProvider autoRequestPermission={true}>
               <GestureHandlerRootView style={{ flex: 1 }}>
                  <ThemedApp />
               </GestureHandlerRootView>
            </NotificationProvider>
         </ThemeProvider>
      </OfflineProvider>
   );
};

const MainWrapper = () => {
   return (
      <UpdateProvider>
         <AppWrapper />
      </UpdateProvider>
   );
};

export default Sentry.wrap(App);
