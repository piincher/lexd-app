// Admin - Orders Sub-Feature
export {
   usePlaceOrder,
   useEditOrder,
   useGetActiveOrdersAdmin,
   useMutateBetweenDate,
   useDeleteImage,
   useUpdateOrder,
   useDeleteOrder,
   useUpdateOrderStatus,
   useUpdateStatusDelivery,
   useGetOrderBaseonDate,
} from "./hooks/useOrderManagement";

// Screens
export { default as ActiveOrdersScreen } from "./screens/ActiveOrders";
export { default as ActiveOrderDetailsScreen } from "./screens/ActiveOrderDetails";
export { default as UserActiveOrdersScreen } from "./screens/UserActiveOrders";
export { default as AddOrderScreen } from "./screens/AddOrder";
export { default as EditOrderScreen } from "./screens/EditOrder";
export { default as PastOrderScreen } from "./screens/PastOrder";
export { default as BatchUpdateScreen } from "./screens/BatchUpdate";
export { default as BatchUpdateDetailScreen } from "./screens/BatchUpdateDetail";

// Components
export { Category } from "./components/Category";
export { default as Slider } from "./components/Slider";
export { default as AutoCalculateTotal } from "./components/AutoCalculateTotal";
