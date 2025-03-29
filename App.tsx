import "react-native-gesture-handler";

import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import * as Sentry from "@sentry/react-native";
import { initMixpanel } from "@src/config/Analytic";
import { chatClient } from "@src/config/ChatConfig";
import { ChatProvider } from "@src/context/ChatContext";
import { HomeTabParamList, RootStackParamList } from "@src/navigations/type";
import ActiveOrders from "@src/screens/Admin/screens/ActiveOrder/screens/ActiveOrders";
import UserActiveOrders from "@src/screens/Admin/screens/ActiveOrder/screens/UserActiveOrders";
import ActiveOrderdetails from "@src/screens/Admin/screens/ActiveOrderDetails/ActiveOrderdetails";
import AddOrder from "@src/screens/Admin/screens/AddOrder/AddOrder";
import AddUser from "@src/screens/Admin/screens/AddUser/AddUser";
import BatchUpdate from "@src/screens/Admin/screens/BatchUpdate/screens/BatchUpdate";
import EditOrder from "@src/screens/Admin/screens/EditOrder/EditOrder";
import AdminPastOrders from "@src/screens/Admin/screens/PastOrder/PastOrder";
import ScanQRCode from "@src/screens/Admin/screens/ScanCode/ScanCode";
import SelectUser from "@src/screens/Admin/screens/SelectUser/SelectUser";
import SendSms from "@src/screens/Admin/screens/SendSms/SendSms";
import Login from "@src/screens/Auth/Login/Login";
import Verification from "@src/screens/Auth/Verification/Verification";
import Chat from "@src/screens/Chat/screens/Chat";
import ChatRoom from "@src/screens/Chat/screens/ChatRoom";
import SelectAdminToChatWith from "@src/screens/Chat/screens/SelectAdmin";
import CheckRoute from "@src/screens/CheckRoute/CheckRoute";
import { useNotification } from "@src/screens/Home/hooks/useNotification";
import AdminDashBoard from "@src/screens/Admin/screens/AdminDashBoard/AdminDashBoard";
import HomeScreen from "@src/screens/Home/screens/HomeScreen";
import Notifications from "@src/screens/Home/screens/Notifications";
import OnBoarding from "@src/screens/OnBoardingScreen/OnBoardingScreen";
// import Map from "@src/screens/OrderDetail/Map";
import OrderDetails from "@src/screens/OrderDetail/OrderDetails";
import AboutUs from "@src/screens/Profile/screens/AboutUs";
import PastOrders from "@src/screens/Profile/screens/PastOrders";
import Profile from "@src/screens/Profile/screens/Profile";
import { initSentry } from "@src/services/sentry";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { useAuth } from "@src/store/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OverlayProvider, Chat as StreamChat, Streami18n } from "stream-chat-expo";
import ChooseShippingMethod from "@src/screens/Admin/screens/ChooseShippingMethod/ChooseShippingMethod";
import ShippingMethod from "@src/screens/Admin/screens/ShippingMethod/ShippingMethod";
import React from "react";
import SeaShippingOrderDetails from "@src/screens/OrderDetail/screens/SeaShippingOrderDetails";
import BatchUpdateDetail from "@src/screens/Admin/screens/BatchUpdate/screens/BatchUpdateDetail";
import { UpdateProvider } from "@src/context/UpdateProvider";
import * as Sentry from "@sentry/react-native";
import { COLORS } from "@src/constants/Colors";
import Orders from "@src/screens/orders/Orders";
import Faq from "@src/screens/Home/screens/FAQ";
registerTranslation("en-GB", en);

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

initSentry();
initMixpanel();
function AppWrapper() {
   const { expoPushToken } = useNotification();

   const [appIsLoaded, setAppIsLoaded] = useState(false);
   const navigation = useRef();
   const appLaunch = useAppLaunchStore((state) => state.isAppLaunchFirst);
   const token = useAuth((state) => state.token);
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
         } finally {
            setAppIsLoaded(true);
         }
      };

      prepare();
   }, []);
   const onLayout = useCallback(async () => {
      if (appIsLoaded) {
         await SplashScreen.hideAsync();
      }
   }, [appIsLoaded]);

   if (!appIsLoaded) {
      return null;
   }

   return (
      <SafeAreaProvider onLayout={onLayout}>
         <NavigationContainer
            onReady={() => {
               // routingInstrumentation.registerNavigationContainer(navigation);
            }}
            ref={navigation}
         >
            <StatusBar style="auto" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
               {appLaunch && <Stack.Screen name="OnBoarding" component={OnBoarding} />}
               <Stack.Screen name="HomeTab" component={HomeBottomTab} />
               <Stack.Screen name="AboutUs" component={AboutUs} />
               <Stack.Screen name="faq" component={Faq} />

               {token ? (
                  <>
                     <Stack.Screen name="CheckRoute" component={CheckRoute} />
                     <Stack.Screen name="AddOrder" component={AddOrder} />
                     <Stack.Screen name="ActiveOrder" component={ActiveOrders} />
                     <Stack.Screen name="OrderDetail" component={OrderDetails} />
                     <Stack.Screen name="ChatRoom" component={ChatRoom} />
                     <Stack.Screen name="SelectAdminToChatWith" component={SelectAdminToChatWith} />
                     <Stack.Screen name="SelectUser" component={SelectUser} />
                     <Stack.Screen name="PastOrders" component={PastOrders} />

                     <Stack.Screen name="UserAdd" component={AddUser} />
                     <Stack.Screen name="AdmninPastOrders" component={AdminPastOrders} />
                     <Stack.Screen name="SendSms" component={SendSms} />

                     <Stack.Screen name="ActiveOrderDetails" component={ActiveOrderdetails} />
                     <Stack.Screen name="ScanQRCode" component={ScanQRCode} />
                     <Stack.Screen name="Notifications" component={Notifications} />
                     <Stack.Screen name="BatchUpdate" component={BatchUpdate} />
                     <Stack.Screen name="BatchUpdateDetail" component={BatchUpdateDetail} />
                     <Stack.Screen name="EditOrder" component={EditOrder} />
                     <Stack.Screen name="AdminDashBoard" component={AdminDashBoard} />
                     <Stack.Screen name="UserActiveOrders" component={UserActiveOrders} />
                     <Stack.Screen name="ChooseShippingMethod" component={ChooseShippingMethod} />
                     <Stack.Screen name="ShippingMethod" component={ShippingMethod} />
                     <Stack.Screen
                        name="SeaShippingOrderDetails"
                        component={SeaShippingOrderDetails}
                     />
                  </>
               ) : (
                  <>
                     <Stack.Screen name="Login" component={Login} />
                     <Stack.Screen name="Verification" component={Verification} />
                  </>
               )}
            </Stack.Navigator>
         </NavigationContainer>
      </SafeAreaProvider>
   );
}

const HomeBottomTab = () => {
   const admin = useAuth((state) => state.user.role);

   const adminRole = admin === "admin" ? true : false;

   return (
      <BottomTab.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
         {!adminRole && (
            <BottomTab.Screen
               name="Home"
               component={HomeScreen}
               options={{
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
                     <AntDesign name="file1" focused={focused} color={color} size={size} />
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
                  tabBarActiveTintColor: COLORS.blue,
                  tabBarInactiveTintColor: COLORS.grey,
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
         <BottomTab.Screen
            name="Chat"
            component={Chat}
            options={{
               tabBarIcon: ({ focused, color, size }) => (
                  <Entypo name="chat" focused={focused} color={color} size={size} />
               ),
            }}
         />
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
const streami18n = new Streami18n({
   language: "fr",
});
const App = () => {
   return (
      <QueryClientProvider client={client}>
         <ChatProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
               <PaperProvider>
                  <MainWrapper />
               </PaperProvider>
            </GestureHandlerRootView>
         </ChatProvider>
      </QueryClientProvider>
   );
};

// dont forget to add the in app update provider
const MainWrapper = () => {
   return (
      <OverlayProvider>
         <StreamChat client={chatClient} i18nInstance={streami18n}>
            <>
               <AppWrapper />
            </>
         </StreamChat>
      </OverlayProvider>
   );
};

export default Sentry.wrap(App);
