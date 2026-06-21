/**
 * Screen registry - centralizes all screen imports for AppNavigator
 */

// Auth & Public
export { LoginScreen as Login, VerificationScreen as Verification } from "@src/features/auth";
export { HomeScreen } from "@src/features/home";
export { GuestPreviewScreen } from "@src/features/guestExperience";
export { OnboardingScreen as OnBoarding } from "@src/features/onboarding";
export { HelpCenterScreen as Faq } from "@src/features/support";
export { CheckRouteScreen as CheckRoute } from "@src/features/routes";
export { NotificationsScreen as Notifications } from "@src/features/notifications";
export { default as NotificationDetailScreen } from "@src/features/notifications/screens/NotificationDetailScreen";

// Customer Dashboard
export { CustomerDashboardScreen, ActivityListScreen } from "@src/features/customer/dashboard";

// Orders
export { NewOrderDetailScreen } from "@src/features/order-detail";
export { OrdersScreen as Orders } from "@src/features/orders";

// Profile
export { ProfileScreen as Profile, AboutUsScreen as AboutUs, PastOrdersScreen as PastOrders, NotificationSettingsScreen, BadgesScreen, MyReviewsScreen } from "@src/features/profile";
export { default as CertificateDetailScreen } from "@src/features/profile/screens/CertificateDetail";
export { default as TrustProfileScreen } from "@src/features/profile/screens/TrustProfileScreen";
export { MyRewardsScreen, ReferralScreen, MemberPointsScreen, RewardDetailScreen, PointsHistoryScreen, MyProductRedemptionsScreen } from "@src/features/referrals";

// Goods
export { default as MyGoodsScreen } from "@src/features/goods/screens/MyGoodsScreen";
export { default as GoodsDetailScreen } from "@src/features/goods/screens/GoodsDetailScreen";
export { default as EditGoodsScreen } from "@src/features/goods/screens/EditGoodsScreen";
export { ScanQRScreen as GoodsScanQR } from "@src/features/goods/screens/ScanQRScreen";
export { default as AirwayBillTrackingScreen } from "@src/features/goods/screens/AirwayBillTrackingScreen";

// Customer Containers
export { MyContainersScreen, ContainerTrackingScreen, ClientPackingListScreen, ClientLoadingListScreen } from "@src/features/customer/containers";

// Customer Payments
export { MyPaymentHistoryScreen } from "@src/features/payments";
export { default as UserPaymentDetailScreen } from "@src/features/payments/screens/UserPaymentDetailScreen";

// Stats & Support
export { StatsScreen as Stats } from "@src/features/stats";
export { TicketListScreen, TicketDetailScreen, CreateTicketScreen } from "@src/features/customer/support";

// Admin Orders
export { default as ActiveOrders } from "@src/features/admin/orders/screens/ActiveOrders";
export { default as UserActiveOrders } from "@src/features/admin/orders/screens/UserActiveOrders";
export { default as ActiveOrderDetails } from "@src/features/admin/orders/screens/ActiveOrderDetails";
export { default as AddOrder } from "@src/features/admin/orders/screens/AddOrder";
export { default as BatchUpdate } from "@src/features/admin/orders/screens/BatchUpdate";
export { default as BatchUpdateDetail } from "@src/features/admin/orders/screens/BatchUpdateDetail";
export { default as EditOrder } from "@src/features/admin/orders/screens/EditOrder";
export { default as AdminPastOrders } from "@src/features/admin/orders/screens/PastOrder";
export { default as OrderDetailWithGoodsScreen } from "@src/features/admin/orders/screens/OrderDetailWithGoodsScreen";
export { default as AllOrdersScreen } from "@src/features/admin/orders/screens/AllOrdersScreen";
export { default as OrderDetailScreen } from "@src/features/admin/orders/screens/OrderDetailScreen";
export { default as RecordPaymentScreen } from "@src/features/admin/orders/screens/RecordPaymentScreen";
export { default as PaymentDetailScreen } from "@src/features/admin/orders/screens/PaymentDetailScreen";
export { default as AdminPaymentHistoryScreen } from "@src/features/admin/orders/screens/PaymentHistoryScreen";
export { default as OrderTotalsBreakdownScreen } from "@src/features/admin/orders/screens/OrderTotalsBreakdownScreen";

// Admin Users
export { default as AddUser } from "@src/features/admin/users/screens/AddUser";
export { default as SelectUser } from "@src/features/admin/users/screens/SelectUser";
export { default as ClientManagement } from "@src/features/admin/users/screens/ClientManagement";
export { default as ClientDetails } from "@src/features/admin/users/screens/ClientDetail";
export { default as EditClient } from "@src/features/admin/users/screens/EditClient";

// Admin Dashboard
export { default as AdminDashBoard } from "@src/features/admin/dashboard/screens/AdminDashBoard";
export { default as UnassignedGoodsScreen } from "@src/features/admin/dashboard/screens/UnassignedGoodsScreen";
export { default as OutstandingPaymentsListScreen } from "@src/features/admin/dashboard/screens/OutstandingPaymentsListScreen";

// Admin Analytics
export { default as AtRiskCustomersScreen } from "@src/features/admin/analytics/screens/AtRiskCustomersScreen";

// Admin Communications
export { default as SendSms } from "@src/features/admin/communications/screens/SendSms";
export { default as SendWhatsAppScreen } from "@src/features/admin/communications/screens/SendWhatsApp";
export { default as CampaignListScreen } from "@src/features/admin/communications/screens/CampaignListScreen";
export { default as CreateCampaignScreen } from "@src/features/admin/communications/screens/CreateCampaignScreen";

// Admin Event Engine
export { EventListScreen, EventFormScreen } from "@src/features/admin/events";

// Admin Promo Campaigns
export { default as PromoCampaignListScreen } from "@src/features/promoCampaigns/screens/PromoCampaignListScreen";
export { default as PromoCampaignFormScreen } from "@src/features/promoCampaigns/screens/PromoCampaignFormScreen";

// Admin Announcements & Audit
export { default as CreateAnnouncementScreen } from "@src/features/admin/announcements/screens/CreateAnnouncementScreen";
export { default as AnnouncementListScreen } from "@src/features/admin/announcements/screens/AnnouncementListScreen";
export { AuditLogDetailScreen, AuditLogListScreen } from "@src/features/admin/audit";
export { NotificationEventDetailScreen, NotificationEventListScreen } from "@src/features/admin/notification-events";

// Admin Shipping
export { default as ChooseShippingMethod } from "@src/features/admin/shipping/screens/ChooseShippingMethod";
export { default as ShippingMethod } from "@src/features/admin/shipping/screens/ShippingMethod";

// Admin Goods & Export
export { default as ReceiveGoodsScreen } from "@src/features/admin/goods/screens/ReceiveGoodsScreen/ReceiveGoodsScreen";
export { default as AdminGoodsList } from "@src/features/admin/goods/screens/GoodsListScreen";
export { default as AdminGoodsDetailScreen } from "@src/features/admin/goods/screens/GoodsDetailScreen/GoodsDetailScreen";
export { default as VoidGoodsListScreen } from "@src/features/admin/goods/screens/VoidGoodsListScreen";
export { default as VoidGoodsScreen } from "@src/features/admin/goods/screens/VoidGoodsScreen/VoidGoodsScreen";
export { default as AdminGoodsPdfExport } from "@src/features/admin/export/screens/GoodsPdfExportScreen";
export { DataExportScreen } from "@src/features/admin/export";

// Admin Consignees
export { default as ConsigneeListScreen } from "@src/features/admin/consignees/screens/ConsigneeListScreen";
export { default as CreateConsigneeScreen } from "@src/features/admin/consignees/screens/CreateConsigneeScreen";
export { default as ConsigneeDetailScreen } from "@src/features/admin/consignees/screens/ConsigneeDetailScreen";

// Admin Containers
export { default as ContainerListScreen } from "@src/features/admin/containers/screens/ContainerListScreen";
export { default as CreateContainerScreen } from "@src/features/admin/containers/screens/CreateContainerScreen";
export { default as ContainerDetailScreen } from "@src/features/admin/containers/screens/ContainerDetailScreen";
export { default as ContainerAnalyticsScreen } from "@src/features/admin/containers/screens/ContainerAnalyticsScreen";
export { default as AssignGoodsScreen } from "@src/features/admin/containers/screens/AssignGoods/AssignGoodsScreen";
export { default as PackingListScreen } from "@src/features/admin/containers/screens/PackingListScreen";
export { default as LoadingListScreen } from "@src/features/admin/containers/screens/LoadingListScreen";

// Admin Airway Bills
export { default as AirwayBillListScreen } from "@src/features/admin/airwayBills/screens/AirwayBillListScreen";
export { default as AirwayBillDetailScreen } from "@src/features/admin/airwayBills/screens/AirwayBillDetailScreen";
export { default as CreateAirwayBillScreen } from "@src/features/admin/airwayBills/screens/CreateAirwayBillScreen";
export { default as AssignAirwayGoodsScreen } from "@src/features/admin/airwayBills/screens/AssignGoodsScreen";
export { default as CargoBagDetailScreen } from "@src/features/admin/airwayBills/screens/CargoBagDetailScreen";

// Admin Routes
export { default as RouteListScreen } from "@src/features/admin/routes/screens/RouteListScreen";
export { default as RouteFormScreen } from "@src/features/admin/routes/screens/RouteFormScreen";

// Admin Certificates
export { default as IssueCertificateScreen } from "@src/features/admin/certificates/screens/IssueCertificateScreen";
export { default as CertificateHistoryScreen } from "@src/features/admin/certificates/screens/CertificateHistoryScreen";
export { default as CertificateDetailAdminScreen } from "@src/features/admin/certificates/screens/CertificateDetailAdminScreen";

// Admin Reviews / Promos / WhatsApp / Support / Search
export { default as AdminReviewsScreen } from "@src/features/admin/reviews/screens/AdminReviewsScreen";
export { default as ManagePromosScreen } from "@src/features/admin/promos/screens/ManagePromosScreen";
export { default as WinBackDashboardScreen } from "@src/features/admin/winback/screens/WinBackDashboardScreen";
export { default as WhatsAppRequestListScreen } from "@src/features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen";
export { AdminTicketDetailScreen, AdminTicketListScreen } from "@src/features/admin/support";
export { default as GlobalSearchScreen } from "@src/features/admin/search/screens/GlobalSearchScreen";
export { default as AppVersionSettingsScreen } from "@src/features/admin/version/screens/AppVersionSettingsScreen";

// Admin Rewards
export { AdminRewardItemsScreen, AdminRewardItemFormScreen, AdminProductRedemptionsScreen, AdminPointsManagementScreen, AdminRewardSettingsScreenV2 } from "@src/features/admin/rewards";

// Public / Tools
export { default as SharedShipmentScreen } from "@src/features/public/screens/SharedShipmentScreen";
export { default as ScanQRCode } from "@src/features/admin/tools/screens/ScanCode";
