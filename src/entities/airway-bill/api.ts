/**
 * Airway Bill Entity API
 * Re-exports airway-bill-related API functions from feature layers.
 * TODO: Move API implementations here during full FSD migration.
 */

export { airwayBillApi } from "@src/features/goods/api/airwayBillApi";

export { airwayBillService } from "@src/features/admin/airwayBills/services/AirwayBillService";

export { cargoBagService } from "@src/features/admin/airwayBills/services/CargoBagService";
