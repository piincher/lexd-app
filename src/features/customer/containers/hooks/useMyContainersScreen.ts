/**
 * MyContainersScreen Hook
 * All business logic for MyContainersScreen
 */

import { useState, useCallback, useMemo } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigations/type';
import { useGetMyContainers } from './useCustomerContainers';
import { ShippingMode, CustomerContainer } from '../types';

export type FilterMode = 'ALL' | ShippingMode;

type UseMyContainersScreenReturn = {
  filter: FilterMode;
  searchQuery: string;
  containers: CustomerContainer[];
  filteredContainers: CustomerContainer[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  handlers: {
    handleRefresh: () => void;
    handleContainerPress: (shipment: CustomerContainer) => void;
    handleFilterChange: (filter: FilterMode) => void;
    handleSearchChange: (query: string) => void;
  };
};

export const useMyContainersScreen = (
  navigation: NavigationProp<RootStackParamList>
): UseMyContainersScreenReturn => {
  const [filter, setFilter] = useState<FilterMode>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = useMemo(
    () => (filter !== 'ALL' ? { shippingMode: filter } : undefined),
    [filter]
  );

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetMyContainers(filters);

  const containers = useMemo(() => data?.containers || [], [data?.containers]);

  const filteredContainers = useMemo(() => {
    if (!searchQuery.trim()) return containers;
    const q = searchQuery.toLowerCase();
    return containers.filter(
      (c) =>
        c.virtualContainerNumber?.toLowerCase().includes(q) ||
        c.awbNumber?.toLowerCase().includes(q) ||
        c.airline?.toLowerCase().includes(q) ||
        c.flightNumber?.toLowerCase().includes(q) ||
        c.shippingLine?.toLowerCase().includes(q) ||
        c.route?.name?.toLowerCase().includes(q)
    );
  }, [containers, searchQuery]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleContainerPress = useCallback(
    (shipment: CustomerContainer) => {
      if (shipment.trackingType === 'AIRWAY_BILL' || shipment.shippingMode === 'AIR') {
        navigation.navigate('AirwayBillTracking', { airwayBillId: shipment.airwayBillId || shipment._id });
        return;
      }
      navigation.navigate('ContainerTracking', { containerId: shipment.containerId || shipment._id });
    },
    [navigation]
  );

  const handleFilterChange = useCallback((newFilter: FilterMode) => {
    setFilter(newFilter);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    filter,
    searchQuery,
    containers,
    filteredContainers,
    isLoading,
    isError,
    error,
    isFetching,
    handlers: {
      handleRefresh,
      handleContainerPress,
      handleFilterChange,
      handleSearchChange,
    },
  };
};
