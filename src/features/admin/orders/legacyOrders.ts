/**
 * Legacy manual-order flow toggle (Stage 1 of retiring the old "commande" path).
 *
 * Orders are now created automatically from goods (see the v2 goods flow), so
 * the manual "Add Order" / "Edit Order" screens are being retired. Stage 1 hides
 * every entry point to those screens so no NEW manual orders are created, while
 * keeping the Order entity, goods-driven orders, payments, and tracking intact.
 *
 * Flip to `true` only to temporarily restore the manual flow. A later stage will
 * remove the manual screens + v1 createOrder/editOrder routes once confirmed no
 * manual orders are being made.
 */
export const LEGACY_MANUAL_ORDERS_ENABLED = false;
