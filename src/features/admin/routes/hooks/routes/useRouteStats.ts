/**
 * Route Statistics Hook - Derived data from route list
 */

import { Route } from '../../types';
import { useGetRoutes } from './useRouteQueries';

/**
 * Hook to get route statistics
 * Backend returns { data: { routes: [...], pagination: {...} } }
 */
export const useRouteStats = () => {
  const { data: routesData } = useGetRoutes();

  // Extract routes array from nested response
  const routes: Route[] = routesData?.data?.routes || [];

  return {
    total: routes.length,
    sea: routes.filter((r: Route) => r.shippingMode === 'SEA').length,
    air: routes.filter((r: Route) => r.shippingMode === 'AIR').length,
    active: routes.filter((r: Route) => r.isActive).length,
    inactive: routes.filter((r: Route) => !r.isActive).length,
  };
};
