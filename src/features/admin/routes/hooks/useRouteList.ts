/**
 * useRouteList Hook - Data logic for route list screen
 */

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useGetRoutes, routeQueryKeys } from './useRoutes';
import { Route, ShippingMode } from '../types';

type AdminV2StackParamList = {
  RouteList: undefined;
  RouteForm: { routeId?: string };
  RouteDetail: { routeId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useRouteList = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();

  const [selectedMode, setSelectedMode] = useState<ShippingMode | 'all'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filters = selectedMode !== 'all' ? { shippingMode: selectedMode } : undefined;

  const { data, isLoading, isRefetching, error, refetch } = useGetRoutes(filters);

  const routes: Route[] = (data?.data?.routes as Route[]) || [];

  const stats = {
    total: routes.length,
    sea: routes.filter((r: Route) => r.shippingMode === 'SEA').length,
    air: routes.filter((r: Route) => r.shippingMode === 'AIR').length,
    active: routes.filter((r: Route) => r.isActive).length,
  };

  const handleRoutePress = (routeId: string) => {
    navigation.navigate('RouteForm', { routeId });
  };

  const handleCreateRoute = () => {
    navigation.navigate('RouteForm', {});
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: routeQueryKeys.lists() });
    await refetch();
  };

  return {
    routes,
    stats,
    selectedMode,
    setSelectedMode,
    isLoading,
    isRefetching,
    error,
    errorMessage,
    setErrorMessage,
    handleRoutePress,
    handleCreateRoute,
    handleRefresh,
  };
};
