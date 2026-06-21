import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/navigations/type";
import { useAuth } from "@src/store/Auth";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { HomeBottomTab } from "./HomeBottomTab";
import * as Screens from "./screenRegistry";
import { isAdminRole } from "@src/shared/lib/roles";
import {
  AdminDashboardTabRedirect,
  AdminGoodsListTabRedirect,
  ContainerListTabRedirect,
  CustomerDashboardTabRedirect,
  MyGoodsTabRedirect,
  MyContainersTabRedirect,
  OrdersTabRedirect,
} from "./tabRedirects";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const token = useAuth((state) => state.token);
  const role = useAuth((state) => state.user?.role);
  const appLaunch = useAppLaunchStore((state) => state.isAppLaunchFirst);
  const launchHydrated = useAppLaunchStore((state) => state.hasHydrated);
  const adminRole = isAdminRole(role);

  if (!launchHydrated) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={appLaunch ? "OnBoarding" : "HomeTab"}>
      <Stack.Screen name="OnBoarding" component={Screens.OnBoarding} />
      <Stack.Screen name="HomeTab" component={HomeBottomTab} />
      <Stack.Screen name="AboutUs" component={Screens.AboutUs} />
      <Stack.Screen name="FAQ" component={Screens.Faq} />
      <Stack.Screen name="CheckRoute" component={Screens.CheckRoute} />
      <Stack.Screen name="GuestPreview" component={Screens.GuestPreviewScreen} />
      <Stack.Screen name="SharedShipment" component={Screens.SharedShipmentScreen} />
      <Stack.Screen name="CertificateDetail" component={Screens.CertificateDetailScreen} />
      <Stack.Screen name="TrustProfile" component={Screens.TrustProfileScreen} />

      {token ? (
        <>
          <Stack.Screen name="Notifications" component={Screens.Notifications} />
          <Stack.Screen name="NotificationDetail" component={Screens.NotificationDetailScreen} />
          <Stack.Screen name="NotificationSettings" component={Screens.NotificationSettingsScreen} />
          <Stack.Screen name="Badges" component={Screens.BadgesScreen} />
          <Stack.Screen name="PastOrders" component={Screens.PastOrders} />
          <Stack.Screen name="Referral" component={Screens.ReferralScreen} />
          <Stack.Screen name="MyRewards" component={Screens.MyRewardsScreen} />
          <Stack.Screen name="RewardDetail" component={Screens.RewardDetailScreen} />
          <Stack.Screen name="PointsHistory" component={Screens.PointsHistoryScreen} />
          <Stack.Screen name="MyProductRedemptions" component={Screens.MyProductRedemptionsScreen} />
          <Stack.Screen name="MyReviews" component={Screens.MyReviewsScreen} />
          <Stack.Screen name="GoodsDetail" component={Screens.GoodsDetailScreen} />
          <Stack.Screen name="EditGoods" component={Screens.EditGoodsScreen} />
          <Stack.Screen name="ScanQR" component={Screens.GoodsScanQR} />
          {adminRole ? (
            <>
              <Stack.Screen name="VoidGoodsList" component={Screens.VoidGoodsListScreen} />
              <Stack.Screen name="VoidGoods" component={Screens.VoidGoodsScreen} />
              <Stack.Screen name="OrderDetailWithGoods" component={Screens.OrderDetailWithGoodsScreen} />
              <Stack.Screen name="AllOrders" component={Screens.AllOrdersScreen} />
              <Stack.Screen name="OrderDetailScreen" component={Screens.OrderDetailScreen} />
              <Stack.Screen name="RecordPaymentScreen" component={Screens.RecordPaymentScreen} />
              <Stack.Screen name="PaymentDetail" component={Screens.PaymentDetailScreen} />
              <Stack.Screen name="OrderPaymentHistory" component={Screens.AdminPaymentHistoryScreen} />
              <Stack.Screen name="OrderTotalsBreakdown" component={Screens.OrderTotalsBreakdownScreen} />
              <Stack.Screen name="AddOrder" component={Screens.AddOrder} />
              <Stack.Screen name="ActiveOrder" component={Screens.ActiveOrders} />
              <Stack.Screen name="OrderDetail" component={Screens.NewOrderDetailScreen} />
              <Stack.Screen name="SelectUser" component={Screens.SelectUser} />
              <Stack.Screen name="UserAdd" component={Screens.AddUser} />
              <Stack.Screen name="AdminPastOrders" component={Screens.AdminPastOrders} />
              <Stack.Screen name="SendSms" component={Screens.SendSms} />
              <Stack.Screen name="ActiveOrderDetails" component={Screens.ActiveOrderDetails} />
              <Stack.Screen name="ScanQRCode" component={Screens.ScanQRCode} />
              <Stack.Screen name="BatchUpdate" component={Screens.BatchUpdate} />
              <Stack.Screen name="BatchUpdateDetail" component={Screens.BatchUpdateDetail} />
              <Stack.Screen name="EditOrder" component={Screens.EditOrder} />
              <Stack.Screen name="AdminDashBoard" component={AdminDashboardTabRedirect} />
              <Stack.Screen name="AtRiskCustomers" component={Screens.AtRiskCustomersScreen} />
              <Stack.Screen name="OutstandingPaymentsList" component={Screens.OutstandingPaymentsListScreen} />
              <Stack.Screen name="UserActiveOrders" component={Screens.UserActiveOrders} />
              <Stack.Screen name="ClientManagement" component={Screens.ClientManagement} />
              <Stack.Screen name="ClientDetails" component={Screens.ClientDetails} />
              <Stack.Screen name="EditClient" component={Screens.EditClient} />
              <Stack.Screen name="IssueCertificate" component={Screens.IssueCertificateScreen} />
              <Stack.Screen name="CertificateHistory" component={Screens.CertificateHistoryScreen} />
              <Stack.Screen name="CertificateDetailAdmin" component={Screens.CertificateDetailAdminScreen} />
              <Stack.Screen name="ChooseShippingMethod" component={Screens.ChooseShippingMethod} />
              <Stack.Screen name="ShippingMethod" component={Screens.ShippingMethod} />
              <Stack.Screen name="UnassignedGoods" component={Screens.UnassignedGoodsScreen} />
              <Stack.Screen name="ReceiveGoods" component={Screens.ReceiveGoodsScreen} />
              <Stack.Screen name="AdminGoodsList" component={AdminGoodsListTabRedirect} />
              <Stack.Screen name="AdminGoodsDetail" component={Screens.AdminGoodsDetailScreen} />
              <Stack.Screen name="AdminGoodsPdfExport" component={Screens.AdminGoodsPdfExport} />
              <Stack.Screen name="DataExport" component={Screens.DataExportScreen} />
              <Stack.Screen name="SendWhatsApp" component={Screens.SendWhatsAppScreen} />
              <Stack.Screen name="ConsigneeList" component={Screens.ConsigneeListScreen} />
              <Stack.Screen name="CreateConsignee" component={Screens.CreateConsigneeScreen} />
              <Stack.Screen name="ConsigneeDetail" component={Screens.ConsigneeDetailScreen} />
              <Stack.Screen name="ContainerList" component={ContainerListTabRedirect} />
              <Stack.Screen name="CreateContainer" component={Screens.CreateContainerScreen} />
              <Stack.Screen name="ContainerDetail" component={Screens.ContainerDetailScreen} />
              <Stack.Screen name="ContainerAnalytics" component={Screens.ContainerAnalyticsScreen} />
              <Stack.Screen name="AssignGoods" component={Screens.AssignGoodsScreen} />
              <Stack.Screen name="PackingList" component={Screens.PackingListScreen} />
              <Stack.Screen name="LoadingList" component={Screens.LoadingListScreen} />
              <Stack.Screen name="AirwayBillList" component={Screens.AirwayBillListScreen} />
              <Stack.Screen name="AirwayBillDetail" component={Screens.AirwayBillDetailScreen} />
              <Stack.Screen name="CreateAirwayBill" component={Screens.CreateAirwayBillScreen} />
              <Stack.Screen name="AssignAirwayGoods" component={Screens.AssignAirwayGoodsScreen} />
              <Stack.Screen name="CargoBagDetail" component={Screens.CargoBagDetailScreen} />
              <Stack.Screen name="RouteList" component={Screens.RouteListScreen} />
              <Stack.Screen name="RouteForm" component={Screens.RouteFormScreen} />
              <Stack.Screen name="WhatsAppRequests" component={Screens.WhatsAppRequestListScreen} />
              <Stack.Screen name="AdminTicketList" component={Screens.AdminTicketListScreen} />
              <Stack.Screen name="AdminTicketDetail" component={Screens.AdminTicketDetailScreen} />
              <Stack.Screen name="AppVersionSettings" component={Screens.AppVersionSettingsScreen} />
              <Stack.Screen name="AdminRewardItems" component={Screens.AdminRewardItemsScreen} />
              <Stack.Screen name="AdminRewardItemForm" component={Screens.AdminRewardItemFormScreen} />
              <Stack.Screen name="AdminProductRedemptions" component={Screens.AdminProductRedemptionsScreen} />
              <Stack.Screen name="AdminPointsManagement" component={Screens.AdminPointsManagementScreen} />
              <Stack.Screen name="AdminRewardSettingsV2" component={Screens.AdminRewardSettingsScreenV2} />
              <Stack.Screen name="AdminReviews" component={Screens.AdminReviewsScreen} />
              <Stack.Screen name="ManagePromos" component={Screens.ManagePromosScreen} />
              <Stack.Screen name="WinBackDashboard" component={Screens.WinBackDashboardScreen} />
              <Stack.Screen name="CampaignList" component={Screens.CampaignListScreen} />
              <Stack.Screen name="CreateCampaign" component={Screens.CreateCampaignScreen} />
              <Stack.Screen name="EventList" component={Screens.EventListScreen} />
              <Stack.Screen name="EventForm" component={Screens.EventFormScreen} />
              <Stack.Screen name="PromoCampaignList" component={Screens.PromoCampaignListScreen} />
              <Stack.Screen name="PromoCampaignForm" component={Screens.PromoCampaignFormScreen} />
              <Stack.Screen name="AnnouncementList" component={Screens.AnnouncementListScreen} />
              <Stack.Screen name="CreateAnnouncement" component={Screens.CreateAnnouncementScreen} />
              <Stack.Screen name="AuditLogs" component={Screens.AuditLogListScreen} />
              <Stack.Screen name="AuditLogDetail" component={Screens.AuditLogDetailScreen} />
              <Stack.Screen name="NotificationEvents" component={Screens.NotificationEventListScreen} />
              <Stack.Screen name="NotificationEventDetail" component={Screens.NotificationEventDetailScreen} />
              <Stack.Screen name="GlobalSearch" component={Screens.GlobalSearchScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="OrderDetail" component={Screens.NewOrderDetailScreen} />
              <Stack.Screen name="MyGoods" component={MyGoodsTabRedirect} />
              <Stack.Screen name="CustomerDashboard" component={CustomerDashboardTabRedirect} />
              <Stack.Screen name="Orders" component={OrdersTabRedirect} />
              <Stack.Screen name="ActivityList" component={Screens.ActivityListScreen} />
              <Stack.Screen name="MyContainers" component={MyContainersTabRedirect} />
              <Stack.Screen name="ContainerTracking" component={Screens.ContainerTrackingScreen} />
              <Stack.Screen name="ClientPackingList" component={Screens.ClientPackingListScreen} />
              <Stack.Screen name="ClientLoadingList" component={Screens.ClientLoadingListScreen} />
              <Stack.Screen name="AirwayBillTracking" component={Screens.AirwayBillTrackingScreen} />
              <Stack.Screen name="MyPaymentHistory" component={Screens.MyPaymentHistoryScreen} />
              <Stack.Screen name="PaymentHistoryScreen" component={Screens.MyPaymentHistoryScreen} />
              <Stack.Screen name="UserPaymentDetail" component={Screens.UserPaymentDetailScreen} />
              <Stack.Screen name="TicketList" component={Screens.TicketListScreen} />
              <Stack.Screen name="TicketDetail" component={Screens.TicketDetailScreen} />
              <Stack.Screen name="CreateTicket" component={Screens.CreateTicketScreen} />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.Login} />
          <Stack.Screen name="Verification" component={Screens.Verification} />
        </>
      )}
    </Stack.Navigator>
  );
};
