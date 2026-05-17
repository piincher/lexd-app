/**
 * Route Hooks - React Query hooks for route management
 * Phase 3: Route Management System
 *
 * @deprecated Import from sub-modules directly for better tree-shaking
 */

export { routeQueryKeys } from './routes/routeQueryKeys';
export { useGetRoutes, useGetActiveRoutes, useGetRoute } from './routes/useRouteQueries';
export { useCreateRoute, useUpdateRoute, useDeleteRoute, useToggleRouteStatus } from './routes/useRouteMutations';
export { useRouteStats } from './routes/useRouteStats';
