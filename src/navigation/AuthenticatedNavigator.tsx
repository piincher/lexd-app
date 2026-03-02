/**
 * AuthenticatedNavigator
 * 
 * Navigation stack for AUTHENTICATED users.
 * Contains all screens that require login.
 * Includes the main bottom tab navigator.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';

import { 
  AuthenticatedStackParamList, 
  MainTabParamList,
  TAB_CONFIG 
} from './types';
import { COLORS } from '@src/constants/Colors';
import { useAuth } from '@src/store/Auth';

// Customer Screens
import { CustomerDashboardScreen } from '@src/features/customer/dashboard';
import { MyGoodsScreen, GoodsDetailScreen, ScanQRScreen } from '@src/features/goods';
import { 
  MyContainersScreen, 
  ContainerTrackingScreen, 
  ClientPackingListScreen 
} from '@src/features/customer/containers';
import { 
  TicketListScreen, 
  TicketDetailScreen, 
  CreateTicketScreen 
} from '@src/features/customer/support';
import { 
  PaymentPortalScreen, 
  PaymentHistoryScreen, 
  PaymentConfirmationScreen 
} from '@src/features/customer/payments';
import { MyInvoicesScreen, InvoiceDetailScreen } from '@src/features/customer/invoices';

// Profile & Settings
import { 
  ProfileScreen, 
  AboutUsScreen, 
  PastOrdersScreen, 
  TopUpScreen, 
  TopUpHistoryScreen,
  NotificationSettingsScreen 
} from '@src/features/profile';

// Notifications
import { 
  NotificationsScreen, 
  NotificationDetailScreen 
} from '@src/features/notifications';

// Chat
import { ChatScreen, ChatRoomScreen, SelectAdminScreen } from '@src/features/chat';

// Admin Screens
import {
  ActiveOrdersScreen,
  UserActiveOrdersScreen,
  ActiveOrderDetailsScreen,
  AddOrderScreen,
  AddUserScreen,
  AdminDashBoardScreen,
  BatchUpdateScreen,
  EditOrderScreen,
  PastOrderScreen as AdminPastOrdersScreen,
  ScanCodeScreen,
  SelectUserScreen,
  SendSmsScreen,
  BatchUpdateDetailScreen,
  ChooseShippingMethodScreen,
  ShippingMethodScreen,
  TopUpListScreen as AdminTopUpListScreen,
  ClientManagementScreen,
  ClientDetailScreen,
  // Admin V2
  ReceiveGoodsScreen,
  GoodsListScreen as AdminGoodsListScreen,
  AdminGoodsDetailScreen,
  ConsigneeListScreen,
  CreateConsigneeScreen,
  ConsigneeDetailScreen,
  ContainerListScreen,
  CreateContainerScreen,
  ContainerDetailScreen,
  AssignGoodsScreen,
  PackingListScreen,
  RouteListScreen,
  RouteFormScreen,
  // Finance
  FinancialDashboardScreen,
  RevenueReportScreen,
  ContainerProfitScreen,
  CustomerAnalyticsScreen,
  ExpenseListScreen,
  ExpenseDetailScreen,
  CreateExpenseScreen,
  ExpenseSummaryScreen,
  InvoiceListScreen,
  CreateInvoiceScreen,
  InvoicePreviewScreen,
} from '@src/features/admin';

// Legacy Screens
import { HomeScreen } from '@src/features/home';
import { OrdersScreen } from '@src/features/orders';
import { OrderDetailsScreen, SeaShippingOrderDetailsScreen } from '@src/features/order-detail';
import { CheckRouteScreen } from '@src/features/routes';
import { StatsScreen } from '@src/features/stats';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();
const BottomTab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main Bottom Tab Navigator
 * Primary navigation for authenticated customers
 */
const MainTabNavigator: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
      initialRouteName={isAdmin ? 'AdminDashBoard' : 'Home'}
    >
      {isAdmin ? (
        // Admin Tabs
        <>
          <BottomTab.Screen
            name="AdminDashBoard"
            component={AdminDashBoardScreen}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="book" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Stats"
            component={StatsScreen}
            options={{
              tabBarLabel: 'Stats',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="pie-chart" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="chat" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profil',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="user" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : (
        // Customer Tabs
        <>
          <BottomTab.Screen
            name="Home"
            component={CustomerDashboardScreen}
            options={{
              tabBarLabel: 'Accueil',
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="MyGoods"
            component={MyGoodsScreen}
            options={{
              tabBarLabel: 'Marchandises',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="box" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Track"
            component={PlaceholderTrackScreen}
            options={{
              tabBarLabel: 'Suivi',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              ),
            }}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                // Prevent default tab behavior and open tracking modal
                e.preventDefault();
                navigation.navigate('MyContainers');
              },
            })}
          />
          <BottomTab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              tabBarLabel: 'Notifications',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="notifications-outline" color={color} size={size} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profil',
              tabBarIcon: ({ color, size }) => (
                <Entypo name="user" color={color} size={size} />
              ),
            }}
          />
        </>
      )}
    </BottomTab.Navigator>
  );
};

// Placeholder for Track tab (redirects to tracking)
const PlaceholderTrackScreen: React.FC = () => null;

/**
 * Authenticated Stack Navigator
 * Contains all screens available after login
 */
export const AuthenticatedNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainTab"
    >
      {/* Main Tab Navigator */}
      <Stack.Screen name="MainTab" component={MainTabNavigator} />

      {/* Customer V2 - Goods */}
      <Stack.Screen name="MyGoods" component={MyGoodsScreen} />
      <Stack.Screen name="GoodsDetail" component={GoodsDetailScreen} />
      <Stack.Screen name="ScanQR" component={ScanQRScreen} />

      {/* Customer V2 - Containers */}
      <Stack.Screen name="MyContainers" component={MyContainersScreen} />
      <Stack.Screen name="ContainerTracking" component={ContainerTrackingScreen} />
      <Stack.Screen name="ClientPackingList" component={ClientPackingListScreen} />

      {/* Customer V2 - Dashboard */}
      <Stack.Screen name="CustomerDashboard" component={CustomerDashboardScreen} />

      {/* Customer V2 - Support */}
      <Stack.Screen name="TicketList" component={TicketListScreen} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="CreateTicket" component={CreateTicketScreen} />

      {/* Customer V2 - Payments */}
      <Stack.Screen name="PaymentPortal" component={PaymentPortalScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
      <Stack.Screen name="TopUp" component={TopUpScreen} />
      <Stack.Screen name="TopUpHistory" component={TopUpHistoryScreen} />

      {/* Customer V2 - Invoices */}
      <Stack.Screen name="MyInvoices" component={MyInvoicesScreen} />
      <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />

      {/* Notifications */}
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />

      {/* Chat */}
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="SelectAdminToChatWith" component={SelectAdminScreen} />

      {/* Legacy V1 */}
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailsScreen} />
      <Stack.Screen name="PastOrders" component={PastOrdersScreen} />
      <Stack.Screen name="CheckRoute" component={CheckRouteScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />

      {/* Admin */}
      <Stack.Screen name="AdminDashBoard" component={AdminDashBoardScreen} />
      <Stack.Screen name="ActiveOrder" component={ActiveOrdersScreen} />
      <Stack.Screen name="ActiveOrderDetails" component={ActiveOrderDetailsScreen} />
      <Stack.Screen name="UserActiveOrders" component={UserActiveOrdersScreen} />
      <Stack.Screen name="AddOrder" component={AddOrderScreen} />
      <Stack.Screen name="EditOrder" component={EditOrderScreen} />
      <Stack.Screen name="BatchUpdate" component={BatchUpdateScreen} />
      <Stack.Screen name="BatchUpdateDetail" component={BatchUpdateDetailScreen} />
      <Stack.Screen name="AdmninPastOrders" component={AdminPastOrdersScreen} />
      <Stack.Screen name="SelectUser" component={SelectUserScreen} />
      <Stack.Screen name="ClientManagement" component={ClientManagementScreen} />
      <Stack.Screen name="ClientDetails" component={ClientDetailScreen} />
      <Stack.Screen name="UserAdd" component={AddUserScreen} />
      <Stack.Screen name="SendSms" component={SendSmsScreen} />
      <Stack.Screen name="TopUpList" component={AdminTopUpListScreen} />
      <Stack.Screen name="ScanQRCode" component={ScanCodeScreen} />
      <Stack.Screen name="ChooseShippingMethod" component={ChooseShippingMethodScreen} />
      <Stack.Screen name="ShippingMethod" component={ShippingMethodScreen} />
      <Stack.Screen name="SeaShippingOrderDetails" component={SeaShippingOrderDetailsScreen} />

      {/* Admin V2 */}
      <Stack.Screen name="ReceiveGoods" component={ReceiveGoodsScreen} />
      <Stack.Screen name="AdminGoodsList" component={AdminGoodsListScreen} />
      <Stack.Screen name="AdminGoodsDetail" component={AdminGoodsDetailScreen} />
      <Stack.Screen name="ConsigneeList" component={ConsigneeListScreen} />
      <Stack.Screen name="CreateConsignee" component={CreateConsigneeScreen} />
      <Stack.Screen name="ConsigneeDetail" component={ConsigneeDetailScreen} />
      <Stack.Screen name="ContainerList" component={ContainerListScreen} />
      <Stack.Screen name="CreateContainer" component={CreateContainerScreen} />
      <Stack.Screen name="ContainerDetail" component={ContainerDetailScreen} />
      <Stack.Screen name="AssignGoods" component={AssignGoodsScreen} />
      <Stack.Screen name="PackingList" component={PackingListScreen} />
      <Stack.Screen name="RouteList" component={RouteListScreen} />
      <Stack.Screen name="RouteForm" component={RouteFormScreen} />

      {/* Finance */}
      <Stack.Screen name="FinancialDashboard" component={FinancialDashboardScreen} />
      <Stack.Screen name="RevenueReport" component={RevenueReportScreen} />
      <Stack.Screen name="ContainerProfit" component={ContainerProfitScreen} />
      <Stack.Screen name="CustomerAnalytics" component={CustomerAnalyticsScreen} />
      <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
      <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} />
      <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} />
      <Stack.Screen name="ExpenseSummary" component={ExpenseSummaryScreen} />
      <Stack.Screen name="InvoiceList" component={InvoiceListScreen} />
      <Stack.Screen name="CreateInvoice" component={CreateInvoiceScreen} />
      <Stack.Screen name="InvoicePreview" component={InvoicePreviewScreen} />

      {/* Info Screens */}
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
