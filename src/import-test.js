/**
 * IMPORT TEST FILE (JavaScript Version with Babel)
 * 
 * This file tests each import individually to identify which one is causing
 * the "undefined value" error.
 * 
 * Run with: node src/import-test.js
 */

// Register babel to transpile TypeScript/TSX files
require('@babel/register')({
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  cache: false,
  ignore: [/node_modules/],
  only: [/src/],
});

console.log('='.repeat(80));
console.log('IMPORT TEST - Identifying undefined value error source');
console.log('='.repeat(80));
console.log('');

const results = {
  passed: [],
  failed: [],
  undefinedExports: [],
};

function testImport(path, description) {
  try {
    const module = require(path);
    const keys = Object.keys(module);
    
    // Check if all exports are undefined
    const hasUndefinedExports = keys.some(key => module[key] === undefined);
    const allUndefined = keys.length > 0 && keys.every(key => module[key] === undefined);
    
    if (allUndefined) {
      console.log(`⚠️  ${description}`);
      console.log(`   Path: ${path}`);
      console.log(`   WARNING: All exports are undefined!`);
      console.log(`   Keys: ${keys.join(', ') || '(none)'}`);
      results.undefinedExports.push({ path, keys });
    } else if (hasUndefinedExports) {
      console.log(`⚠️  ${description}`);
      console.log(`   Path: ${path}`);
      console.log(`   WARNING: Some exports are undefined!`);
      console.log(`   Keys: ${keys.join(', ') || '(none)'}`);
      results.undefinedExports.push({ path, keys });
    } else {
      console.log(`✅ ${description}`);
      console.log(`   Path: ${path}`);
      console.log(`   Exports: ${keys.join(', ') || '(none)'}`);
    }
    results.passed.push(path);
    return module;
  } catch (e) {
    console.log(`❌ ${description}`);
    console.log(`   Path: ${path}`);
    console.log(`   ERROR: ${e.message}`);
    if (e.stack) {
      const relevantLine = e.stack.split('\n').find(line => line.includes('at') && !line.includes('import-test.js'));
      if (relevantLine) {
        console.log(`   Stack: ${relevantLine.trim()}`);
      }
    }
    results.failed.push({ path, error: e.message });
    return null;
  }
}

function testImportSilent(path) {
  try {
    const module = require(path);
    const keys = Object.keys(module);
    const allUndefined = keys.length > 0 && keys.every(key => module[key] === undefined);
    return { success: true, keys, error: allUndefined ? 'All exports undefined' : undefined };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ============================================================================
// SECTION 1: Test Main Feature Exports (index.ts files)
// ============================================================================
console.log('SECTION 1: Testing Main Feature Exports');
console.log('-'.repeat(80));

// Admin Features
const adminFeatures = [
  ['./features/admin', 'admin (main)'],
  ['./features/admin/analytics', 'admin/analytics'],
  ['./features/admin/communications', 'admin/communications'],
  ['./features/admin/consignees', 'admin/consignees'],
  ['./features/admin/containers', 'admin/containers'],
  ['./features/admin/export', 'admin/export'],
  ['./features/admin/goods', 'admin/goods'],
  ['./features/admin/orders', 'admin/orders'],
  ['./features/admin/routes', 'admin/routes'],
  ['./features/admin/search', 'admin/search'],
  ['./features/admin/shipping', 'admin/shipping'],
  ['./features/admin/tools', 'admin/tools'],
  ['./features/admin/users', 'admin/users'],
  ['./features/admin/whatsapp-requests', 'admin/whatsapp-requests'],
];

console.log('\n--- Admin Features ---');
adminFeatures.forEach(([path, desc]) => testImport(path, desc));

// Customer Features
const customerFeatures = [
  ['./features/customer', 'customer (main)'],
  ['./features/customer/containers', 'customer/containers'],
  ['./features/customer/dashboard', 'customer/dashboard'],
  ['./features/customer/orders', 'customer/orders'],
  ['./features/customer/payments', 'customer/payments'],
  ['./features/customer/support', 'customer/support'],
];

console.log('\n--- Customer Features ---');
customerFeatures.forEach(([path, desc]) => testImport(path, desc));

// Other Main Features
const otherFeatures = [
  ['./features/auth', 'auth'],
  ['./features/chat', 'chat'],
  ['./features/goods', 'goods'],
  ['./features/home', 'home'],
  ['./features/notifications', 'notifications'],
  ['./features/onboarding', 'onboarding'],
  ['./features/order-detail', 'order-detail'],
  ['./features/orders', 'orders'],
  ['./features/payments', 'payments'],
  ['./features/profile', 'profile'],
  ['./features/public', 'public'],
  ['./features/routes', 'routes'],
  ['./features/search', 'search'],
  ['./features/stats', 'stats'],
];

console.log('\n--- Other Features ---');
otherFeatures.forEach(([path, desc]) => testImport(path, desc));

// ============================================================================
// SECTION 2: Test Individual Screen Exports
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SECTION 2: Testing Screen Exports');
console.log('-'.repeat(80));

// Admin Screens
const adminScreens = [
  // Analytics
  ['./features/admin/analytics/screens/AnalyticsDashboardScreen', 'AnalyticsDashboardScreen'],
  
  // Consignees
  ['./features/admin/consignees/screens/ConsigneeDetailScreen', 'ConsigneeDetailScreen'],
  ['./features/admin/consignees/screens/ConsigneeListScreen', 'ConsigneeListScreen'],
  ['./features/admin/consignees/screens/CreateConsigneeScreen', 'CreateConsigneeScreen'],
  
  // Containers
  ['./features/admin/containers/screens/ContainerDetailScreen', 'ContainerDetailScreen'],
  ['./features/admin/containers/screens/ContainerListScreen', 'ContainerListScreen'],
  ['./features/admin/containers/screens/CreateContainerScreen', 'CreateContainerScreen'],
  ['./features/admin/containers/screens/LoadingListScreen', 'LoadingListScreen'],
  ['./features/admin/containers/screens/WaypointManagementScreen', 'WaypointManagementScreen'],
  ['./features/admin/containers/screens/AssignGoodsScreen', 'AssignGoodsScreen'],
  ['./features/admin/containers/screens/PackingListScreen', 'PackingListScreen'],
  
  // Export
  ['./features/admin/export/screens/DataExportScreen', 'DataExportScreen'],
  
  // Goods
  ['./features/admin/goods/screens/GoodsDetailScreen', 'AdminGoodsDetailScreen'],
  ['./features/admin/goods/screens/GoodsListScreen', 'GoodsListScreen'],
  ['./features/admin/goods/screens/ReceiveGoodsScreen', 'ReceiveGoodsScreen'],
  
  // Routes
  ['./features/admin/routes/screens/RouteFormScreen', 'RouteFormScreen'],
  ['./features/admin/routes/screens/RouteListScreen', 'RouteListScreen'],
  
  // Search
  ['./features/admin/search/screens/GlobalSearchScreen', 'GlobalSearchScreen'],
  
  // WhatsApp
  ['./features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen', 'WhatsAppRequestListScreen'],
  
  // Legacy Admin Screens
  ['./features/admin/communications/screens/SendSms', 'SendSms'],
  ['./features/admin/orders/screens/ActiveOrderDetails', 'ActiveOrderDetails'],
  ['./features/admin/orders/screens/ActiveOrders', 'ActiveOrders'],
  ['./features/admin/orders/screens/AddOrder', 'AddOrder'],
  ['./features/admin/orders/screens/BatchUpdate', 'BatchUpdate'],
  ['./features/admin/orders/screens/BatchUpdateDetail', 'BatchUpdateDetail'],
  ['./features/admin/orders/screens/EditOrder', 'EditOrder'],
  ['./features/admin/orders/screens/PastOrder', 'PastOrder'],
  ['./features/admin/orders/screens/UserActiveOrders', 'UserActiveOrders'],
  ['./features/admin/shipping/screens/ChooseShippingMethod', 'ChooseShippingMethod'],
  ['./features/admin/shipping/screens/ShippingMethod', 'ShippingMethod'],
  ['./features/admin/tools/screens/AdminDashBoard', 'AdminDashBoard'],
  ['./features/admin/tools/screens/ScanCode', 'ScanCode'],
  ['./features/admin/tools/screens/TopUpList', 'TopUpList'],
  ['./features/admin/users/screens/AddUser', 'AddUser'],
  ['./features/admin/users/screens/ClientDetail', 'ClientDetail'],
  ['./features/admin/users/screens/ClientManagement', 'ClientManagement'],
  ['./features/admin/users/screens/SelectUser', 'SelectUser'],
];

console.log('\n--- Admin Screens ---');
adminScreens.forEach(([path, desc]) => testImport(path, desc));

// Customer Screens
const customerScreens = [
  ['./features/customer/containers/screens/ClientLoadingListScreen', 'ClientLoadingListScreen'],
  ['./features/customer/containers/screens/ClientPackingListScreen', 'ClientPackingListScreen'],
  ['./features/customer/containers/screens/ContainerTrackingScreen', 'ContainerTrackingScreen'],
  ['./features/customer/containers/screens/MyContainersScreen', 'MyContainersScreen'],
  ['./features/customer/dashboard/screens/CustomerDashboardScreen', 'CustomerDashboardScreen'],
  ['./features/customer/orders/screens/PastOrdersScreenV2', 'PastOrdersScreenV2'],
  ['./features/customer/payments/screens/PaymentConfirmationScreen', 'PaymentConfirmationScreen'],
  ['./features/customer/payments/screens/PaymentConfirmationScreenV2', 'PaymentConfirmationScreenV2'],
  ['./features/customer/payments/screens/PaymentHistoryScreen', 'CustomerPaymentHistoryScreen'],
  ['./features/customer/payments/screens/PaymentPortalScreen', 'PaymentPortalScreen'],
  ['./features/customer/support/screens/CreateTicketScreen', 'CreateTicketScreen'],
  ['./features/customer/support/screens/TicketDetailScreen', 'TicketDetailScreen'],
  ['./features/customer/support/screens/TicketListScreen', 'TicketListScreen'],
];

console.log('\n--- Customer Screens ---');
customerScreens.forEach(([path, desc]) => testImport(path, desc));

// Other Screens
const otherScreens = [
  ['./features/auth/screens/LoginScreen', 'LoginScreen'],
  ['./features/auth/screens/Verification', 'VerificationScreen'],
  ['./features/chat/screens/Chat', 'ChatScreen'],
  ['./features/chat/screens/ChatRoom', 'ChatRoomScreen'],
  ['./features/chat/screens/SelectAdmin', 'SelectAdminScreen'],
  ['./features/goods/screens/GoodsDetailScreen', 'GoodsDetailScreen'],
  ['./features/goods/screens/MyGoodsScreen', 'MyGoodsScreen'],
  ['./features/goods/screens/ScanQRScreen', 'ScanQRScreen'],
  ['./features/home/screens/HomeScreen', 'HomeScreen'],
  ['./features/support/screens/FAQScreen', 'FAQScreen'],
  ['./features/notifications/screens/NotificationDetailScreen', 'NotificationDetailScreen'],
  ['./features/notifications/screens/NotificationsScreen', 'NotificationsScreen'],
  ['./features/notifications/screens/NotificationsScreenV2', 'NotificationsScreenV2'],
  ['./features/onboarding/screens/OnBoardingScreen', 'OnBoardingScreen'],
  ['./features/order-detail/screens/OrderDetails', 'OrderDetailsScreen'],
  ['./features/order-detail/screens/SeaShippingOrderDetails', 'SeaShippingOrderDetailsScreen'],
  ['./features/orders/screens/Orders', 'OrdersScreen'],
  ['./features/payments/screens/PaymentHistoryScreen', 'PaymentHistoryScreen'],
  ['./features/payments/screens/PaymentScreen', 'PaymentScreen'],
  ['./features/profile/screens/AboutUs', 'AboutUsScreen'],
  ['./features/profile/screens/NotificationSettingsScreen', 'NotificationSettingsScreen'],
  ['./features/profile/screens/PastOrders', 'PastOrdersScreen'],
  ['./features/profile/screens/Profile', 'ProfileScreen'],
  ['./features/profile/screens/TopUp', 'TopUpScreen'],
  ['./features/profile/screens/TopUpHistory', 'TopUpHistoryScreen'],
  ['./features/profile/screens/NotificationSettingsScreen', 'NotificationSettingsScreenV2'],
  ['./features/public/screens/PublicHomeScreen', 'PublicHomeScreen'],
  ['./features/public/screens/PublicTrackingResultScreen', 'PublicTrackingResultScreen'],
  ['./features/routes/screens/CheckRoute', 'CheckRouteScreen'],
  ['./features/stats/screens/Stats', 'StatsScreen'],
];

console.log('\n--- Other Screens ---');
otherScreens.forEach(([path, desc]) => testImport(path, desc));

// ============================================================================
// SECTION 3: Test Individual Hooks
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SECTION 3: Testing Hook Exports');
console.log('-'.repeat(80));

const hooks = [
  // Admin hooks
  ['./features/admin/analytics/hooks/useAnalytics', 'useAnalytics'],
  ['./features/admin/analytics/hooks/useAnalyticsDashboard', 'useAnalyticsDashboard'],
  ['./features/admin/consignees/hooks/useConsignees', 'useConsignees'],
  ['./features/admin/consignees/hooks/useConsigneeDetail', 'useConsigneeDetail'],
  ['./features/admin/containers/hooks/useContainers', 'useContainers'],
  ['./features/admin/containers/hooks/useContainerForm', 'useContainerForm'],
  ['./features/admin/containers/hooks/useGoodsAssignment', 'useGoodsAssignment'],
  ['./features/admin/containers/hooks/useLoadingList', 'useLoadingList'],
  ['./features/admin/containers/hooks/useWaypoints', 'useWaypoints'],
  ['./features/admin/containers/hooks/useWaypointManagement', 'useWaypointManagement'],
  ['./features/admin/export/hooks/useDataExport', 'useDataExport'],
  ['./features/admin/export/hooks/useExport', 'useExport'],
  ['./features/admin/goods/hooks/useGoods', 'useAdminGoods'],
  ['./features/admin/goods/hooks/useGoodsDetail', 'useAdminGoodsDetail'],
  ['./features/admin/goods/hooks/useReceiveGoods', 'useReceiveGoods'],
  ['./features/admin/routes/hooks/useRoutes', 'useRoutes'],
  ['./features/admin/routes/hooks/useRouteForm', 'useRouteForm'],
  ['./features/admin/search/hooks/useSearch', 'useAdminSearch'],
  ['./features/admin/search/hooks/useGlobalSearch', 'useGlobalSearch'],
  ['./features/admin/whatsapp-requests/hooks/useWhatsAppRequests', 'useWhatsAppRequests'],
  
  // Customer hooks
  ['./features/customer/containers/hooks/useCustomerContainers', 'useCustomerContainers'],
  ['./features/customer/containers/hooks/useContainerTracking', 'useContainerTracking'],
  ['./features/customer/dashboard/hooks/useDashboard', 'useDashboard'],
  ['./features/customer/dashboard/hooks/useCustomerDashboard', 'useCustomerDashboard'],
  ['./features/customer/orders/hooks/usePastOrders', 'usePastOrders'],
  ['./features/customer/payments/hooks/usePayments', 'useCustomerPayments'],
  ['./features/customer/payments/hooks/usePaymentHistory', 'useCustomerPaymentHistory'],
  ['./features/customer/support/hooks/useTickets', 'useTickets'],
  
  // Other hooks
  ['./features/auth/hooks/useLogin', 'useLogin'],
  ['./features/goods/hooks/useGoodsQueries', 'useGoodsQueries'],
  ['./features/goods/hooks/useGoodsMutations', 'useGoodsMutations'],
  ['./shared/hooks/useOrders', 'useSharedOrdersHooks'],
  ['./features/notifications/hooks/useNotifications', 'useNotifications'],
  ['./features/notifications/hooks/usePublicNotifications', 'usePublicNotifications'],
  ['./features/order-detail/hooks/useOrderDetail', 'useOrderDetailHook'],
  ['./features/orders/hooks/useOrderDetail', 'useOrderDetail'],
  ['./features/payments/hooks/useCardPayment', 'useCardPayment'],
  ['./features/payments/hooks/usePayments', 'usePayments'],
  ['./features/profile/hooks/useProfile', 'useProfile'],
];

console.log('');
hooks.forEach(([path, desc]) => testImport(path, desc));

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

console.log(`\n✅ PASSED: ${results.passed.length}`);
console.log(`❌ FAILED: ${results.failed.length}`);
console.log(`⚠️  UNDEFINED EXPORTS: ${results.undefinedExports.length}`);

if (results.failed.length > 0) {
  console.log('\n--- FAILED IMPORTS ---');
  results.failed.forEach(({ path, error }) => {
    console.log(`  ❌ ${path}`);
    console.log(`     Error: ${error}`);
  });
}

if (results.undefinedExports.length > 0) {
  console.log('\n--- UNDEFINED EXPORTS ---');
  results.undefinedExports.forEach(({ path, keys }) => {
    console.log(`  ⚠️  ${path}`);
    console.log(`     Keys: ${keys.join(', ')}`);
  });
}

// Final verdict
console.log('\n');
console.log('='.repeat(80));
if (results.failed.length === 0 && results.undefinedExports.length === 0) {
  console.log('✅ ALL IMPORTS PASSED - No undefined value errors detected!');
} else {
  console.log('❌ ISSUES DETECTED - Check the output above for details');
  
  // Suggest the most likely culprits
  if (results.failed.length > 0) {
    console.log('\nMost likely culprits for "undefined value" error:');
    results.failed.slice(0, 10).forEach(({ path, error }) => {
      if (error.includes('undefined') || error.includes('Cannot read') || error.includes('is not') || error.includes('Cannot access')) {
        console.log(`  - ${path}`);
        console.log(`    ${error}`);
      }
    });
  }
}
console.log('='.repeat(80));

// Export results for programmatic use
module.exports = { results };
