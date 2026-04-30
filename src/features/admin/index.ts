/**
 * Admin Feature - Public API
 * Following Feature-Sliced Design (FSD) architecture
 *
 * Sub-features are exposed as namespaces to avoid export-name collisions.
 * Consumers may also deep-import directly from sub-feature paths.
 */

// ───────────────────────────────────────────────
// Root-level shared hooks (backward compatibility)
// ───────────────────────────────────────────────
export { useGetCategory } from "./hooks/useCategory";
export { useGetOrders } from "./hooks/useOrder";
export { useGetUsers } from "./hooks/useGetUsers";

// ───────────────────────────────────────────────
// Sub-features (namespaced to prevent collisions)
// ───────────────────────────────────────────────
export * as airwayBills from "./airwayBills";
export * as analytics from "./analytics";
export * as announcements from "./announcements";
export * as audit from "./audit";
export * as certificates from "./certificates";
export * as communications from "./communications";
export * as consignees from "./consignees";
export * as containers from "./containers";
export * as dashboard from "./dashboard";
export * as exportFeature from "./export";
export * as goods from "./goods";
export * as orders from "./orders";
export * as notificationEvents from "./notification-events";
export * as promos from "./promos";
export * as reviews from "./reviews";
export * as routes from "./routes";
export * as search from "./search";
export * as shipping from "./shipping";
export * as support from "./support";
export * as tools from "./tools";
export * as users from "./users";
export * as whatsappRequests from "./whatsapp-requests";

// ───────────────────────────────────────────────
// Convenience re-exports (commonly used screens)
// ───────────────────────────────────────────────
export { AdminDashBoard as AdminDashBoardScreen } from "./dashboard/screens";
export { UnassignedGoodsScreen } from "./dashboard/screens";
export { OutstandingPaymentsListScreen } from "./dashboard/screens";
