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

// Features - Admin
import {
   ActiveOrdersScreen as ActiveOrders,
   UserActiveOrdersScreen as UserActiveOrders,
   ActiveOrderDetailsScreen as ActiveOrderdetails,
   AddOrderScreen as AddOrder,
   AddUserScreen as AddUser,
   AdminDashBoardScreen as AdminDashBoard,
   BatchUpdateScreen as BatchUpdate,
   EditOrderScreen as EditOrder,
   PastOrderScreen as AdminPastOrders,
   ScanCodeScreen as ScanQRCode,
   SelectUserScreen as SelectUser,
   SendSmsScreen as SendSms,
   BatchUpdateDetailScreen as BatchUpdateDetail,
   ChooseShippingMethodScreen as ChooseShippingMethod,
   ShippingMethodScreen as ShippingMethod,
   ClientManagementScreen as ClientManagement,
   ClientDetailScreen as ClientDetails,
   // Admin V2 Features
   ReceiveGoodsScreen,
   GoodsListScreen as AdminGoodsList,
   AdminGoodsDetailScreen,
   ConsigneeListScreen,
   CreateConsigneeScreen,
   ConsigneeDetailScreen,
   // Container V2 Features
   ContainerListScreen,
   CreateContainerScreen,
   ContainerDetailScreen,
   AssignGoodsScreen,
   PackingListScreen,
   LoadingListScreen,
   // Route V2 Features
   RouteListScreen,
   RouteFormScreen,
   // Admin Phase 3 - Void Pattern
   VoidGoodsListScreen,
   VoidGoodsScreen,
   OrderDetailWithGoodsScreen,
   // Admin Phase 4 - All Orders
   AllOrdersScreen,
   OrderDetailScreen,
   RecordPaymentScreen,
   PaymentDetailScreen,
   UnassignedGoodsScreen,
} from "@src/features/admin";

// Admin Payment History Screen (aliased to avoid conflict with payments feature)
import AdminPaymentHistoryScreen from "@src/features/admin/orders/screens/PaymentHistoryScreen";

// Admin Certificates
import IssueCertificateScreen from "@src/features/admin/certificates/screens/IssueCertificateScreen";
import CertificateHistoryScreen from "@src/features/admin/certificates/screens/CertificateHistoryScreen";
import CertificateDetailAdminScreen from "@src/features/admin/certificates/screens/CertificateDetailAdminScreen";

// Admin Reviews
import AdminReviewsScreen from "@src/features/admin/reviews/screens/AdminReviewsScreen";

// Admin Promos
import ManagePromosScreen from "@src/features/admin/promos/screens/ManagePromosScreen";

// Features - Auth
import { LoginScreen as Login, VerificationScreen as Verification } from "@src/features/auth";

// Features - Home
import {
   HomeScreen,
   NotificationsScreen as Notifications,
   FAQScreen as Faq,
   useNotification,
} from "@src/features/home";

// Features - Notifications
import NotificationDetailScreen from "@src/features/notifications/screens/NotificationDetailScreen";

// Features - Customer Dashboard (V2)
import { CustomerDashboardScreen, ActivityListScreen } from "@src/features/customer/dashboard";

// Features - Onboarding
import { OnBoardingScreen as OnBoarding } from "@src/features/onboarding";

// Features - Order Detail
import { NewOrderDetailScreen } from "@src/features/order-detail";

// Features - Payments
import { PaymentScreen, PaymentHistoryScreen, MyPaymentHistoryScreen } from "@src/features/payments";
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
import { MyGoodsScreen, GoodsDetailScreen, EditGoodsScreen, ScanQRScreen as GoodsScanQR } from "@src/features/goods";

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

// WhatsApp Admin Features
import { WhatsAppRequestListScreen } from "@src/features/admin/whatsapp-requests";

// Components & Others
import FadingAnnouncement from "@src/components/Announcement/Annoncement";
import { COLORS } from "@src/constants/Colors";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { useAuth } from "@src/store/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { ManualOrderScreen } from "@src/features/orders/screens/ManualOrderScreen";

registerTranslation("en", enGB);
registerTranslation("fr", fr);

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

initSentry();
initMixpanel();
function AppWrapper() {
   const { expoPushToken } = useNotification();

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
                  <Stack.Screen name="CheckRoute" component={CheckRoute} />
                  <Stack.Screen name="VoidGoodsList" component={VoidGoodsListScreen} />
                  <Stack.Screen name="VoidGoods" component={VoidGoodsScreen} />

                  <Stack.Screen
                     name="OrderDetailWithGoods"
                     component={OrderDetailWithGoodsScreen}
                  />
                  <Stack.Screen name="SelectManualOrder" component={ManualOrderScreen} />
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
                     options={{ title: 'Historique des paiements' }}
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
                  <Stack.Screen name="UserActiveOrders" component={UserActiveOrders} />
                  <Stack.Screen name="ClientManagement" component={ClientManagement} />
                  <Stack.Screen name="ClientDetails" component={ClientDetails} />
                  <Stack.Screen name="IssueCertificate" component={IssueCertificateScreen} />
                  <Stack.Screen name="CertificateHistory" component={CertificateHistoryScreen} />
                  <Stack.Screen name="CertificateDetailAdmin" component={CertificateDetailAdminScreen} />
                  <Stack.Screen name="ChooseShippingMethod" component={ChooseShippingMethod} />
                  <Stack.Screen name="ShippingMethod" component={ShippingMethod} />
                  {/* Admin V2 Screens */}
                  <Stack.Screen name="UnassignedGoods" component={UnassignedGoodsScreen} />
                  <Stack.Screen name="ReceiveGoods" component={ReceiveGoodsScreen} />
                  <Stack.Screen name="AdminGoodsList" component={AdminGoodsList} />
                  <Stack.Screen name="AdminGoodsDetail" component={AdminGoodsDetailScreen} />
                  <Stack.Screen name="ConsigneeList" component={ConsigneeListScreen} />
                  <Stack.Screen name="CreateConsignee" component={CreateConsigneeScreen} />
                  <Stack.Screen name="ConsigneeDetail" component={ConsigneeDetailScreen} />
                  <Stack.Screen name="ManualOrder" component={ManualOrderScreen} />
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

const client = new QueryClient();
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
      <QueryClientProvider client={client}>
         <ThemeProvider>
            <NotificationProvider>
               <GestureHandlerRootView style={{ flex: 1 }}>
                  <ThemedApp />
               </GestureHandlerRootView>
            </NotificationProvider>
         </ThemeProvider>
      </QueryClientProvider>
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
