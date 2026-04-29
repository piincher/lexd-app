/**
 * Promos Feature - Public API
 */

// Screens
export { default as ManagePromosScreen } from "./screens/ManagePromosScreen";

// API
export * from "./api/promoAdminApi";

// Hooks (explicit to avoid FilterChip / FILTER_CHIPS collision with components)
export { useManagePromos } from "./hooks/useManagePromos";
export * from "./hooks/usePromoAdmin";
export * from "./hooks/usePromoForm";

// Components (explicit to avoid collision with hooks)
export {
  PromoCard,
  PromoFilters,
  PromoForm,
  PromoList,
  OptionPicker,
} from "./components";
