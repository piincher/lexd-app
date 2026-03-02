// OrderDetail Feature - Public API

// Screens
export { default as OrderDetailsScreen } from "./screens/OrderDetails";
export { default as SeaShippingOrderDetailsScreen } from "./screens/SeaShippingOrderDetails";

// Hooks
export { useGetOrderDetails } from "./hooks/useOrderDetail";
export { useGetSeaRoutes } from "./hooks/useSeaRoutes";

// Types
export type {
   Coordinate,
   StatusDataItem,
   StatusTimelineProps,
   SeaRouteItem,
   SeaStatusTimelineProps,
   OrderProductType,
} from "./types";

// Re-export detailStyles for reuse
export { detailStyles } from "./screens/SeaShippingOrderDetails";
