/**
 * Admin Shared API
 * Cross-sub-feature API utilities that admin modules depend on.
 * Import from here instead of directly from sibling sub-features or external features.
 */

export {
  assignGoodsToOrder,
  type AssignGoodsToOrderRequest,
  type AssignGoodsToOrderResponse,
} from "@src/shared/api/order";
