// Admin Feature - Public API
// Organized into sub-features for better maintainability

// Core hooks (kept for backward compatibility)
export { useGetCategory } from "./hooks/useCategory";
export { useGetOrders } from "./hooks/useOrder";

// Dashboard (explicit export to ensure availability)
export { AdminDashBoard as AdminDashBoardScreen } from "./dashboard";
export { UnassignedGoodsScreen } from "./dashboard";
export { OutstandingPaymentsListScreen } from "./dashboard";

// Sub-features
export * from "./orders";
export * from "./users";
export * from "./communications";
export * from "./shipping";
export * from "./tools";

// Consolidated Features (migrated from v2)
export * from "./consignees";
export * from "./containers";
export * from "./goods";
export * from "./routes/screens";

// Certificates
export * from "./certificates";

// Search Feature
export * from "./search";

// Announcements
export * from "./announcements";

// Support
export * from "./support";

// All Admin screens have been migrated to feature-based architecture.
// Import from: @src/features/admin
