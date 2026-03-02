// Admin Feature - Public API
// Organized into sub-features for better maintainability

// Core hooks (kept for backward compatibility)
export { useGetCategory } from "./hooks/useCategory";
export { useGetOrders } from "./hooks/useOrder";
export { useTopUpHistory } from "./hooks/useTopUp";

// Sub-features
export * from "./orders";
export * from "./users";
export * from "./communications";
export * from "./shipping";
export * from "./finance";
export * from "./tools";

// Phase 1 V2 Features
export * from "./v2";

// Search Feature
export * from "./search";

// All Admin screens have been migrated to feature-based architecture.
// Import from: @src/features/admin
