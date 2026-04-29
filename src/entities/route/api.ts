/**
 * Route Entity API
 * Re-exports route-related API functions from feature layers.
 * TODO: Move API implementations here during full FSD migration.
 */

export { checkRoute } from "@src/features/routes/api/routeApi";

// Admin route operations are currently part of containerApi
export { containerApi as adminRouteContainerApi } from "@src/features/admin/containers/api/containerApi";
