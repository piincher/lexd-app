/**
 * Goods Entity API
 * Re-exports goods-related API functions from feature layers.
 * TODO: Move API implementations here during full FSD migration.
 */

export { goodsApi } from "@src/features/goods/api/goodsApi";

export { adminGoodsApi } from "@src/features/admin/goods/api/goodsApi";

export { airwayBillApi } from "@src/features/goods/api/airwayBillApi";
