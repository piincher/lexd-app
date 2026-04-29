import { useState, useCallback } from 'react';
import { Route } from '../../../types';

export const useCreateContainerRoute = (
  updateField: (field: 'routeId' | 'shippingLine', value: string) => void,
  clearError: (field: 'routeId') => void
) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showRouteMenu, setShowRouteMenu] = useState<boolean>(false);

  const handleSelectRoute = useCallback((route: Route) => {
    updateField('routeId', route._id);
    updateField('shippingLine', route.shippingLine);
    setSelectedRoute(route);
    setShowRouteMenu(false);
    clearError('routeId');
  }, [updateField, clearError]);

  const handleClearRoute = useCallback(() => {
    updateField('routeId', '');
    updateField('shippingLine', '');
    setSelectedRoute(null);
  }, [updateField]);

  return {
    selectedRoute,
    showRouteMenu,
    setShowRouteMenu,
    handleSelectRoute,
    handleClearRoute,
  };
};
