/**
 * AirwayBillListScreen Hook
 * Composes smaller hooks for the airway bill list screen
 */

import { useMemo, useCallback } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useGetAllAirwayBills } from '../../hooks/useAirwayBills';
import { AirwayBill, AirwayBillStatus } from '../../types';
import { useAirwayBillFilters } from './useAirwayBillFilters';
import { useAirwayBillListData } from './useAirwayBillListData';
import { useAirwayBillNavigation } from './useAirwayBillNavigation';

export type StatusFilter = AirwayBillStatus | 'ALL';

interface UseAirwayBillListScreenReturn {
  statusFilter: StatusFilter;
  searchQuery: string;
  airwayBills: AirwayBill[];
  stats: {
    totalAWBs: number;
    totalPackages: number;
    totalWeight: number;
  };
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  statusOptions: { label: string; value: StatusFilter }[];
  handlers: {
    handleRefresh: () => void;
    handleStatusFilterChange: (filter: StatusFilter) => void;
    handleSearchChange: (query: string) => void;
    handleCardPress: (id: string) => void;
    handleCreatePress: () => void;
  };
}

export const useAirwayBillListScreen = (
  navigation: NativeStackNavigationProp<RootStackParamList>
): UseAirwayBillListScreenReturn => {
  const { statusFilter, searchQuery, statusOptions, handleStatusFilterChange, handleSearchChange } =
    useAirwayBillFilters();

  const filters = useMemo(
    () => ({
      status: statusFilter === 'ALL' ? undefined : statusFilter,
      limit: 50,
    }),
    [statusFilter]
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useGetAllAirwayBills(filters);
  const allBills = data?.data?.airwayBills || [];

  const { airwayBills, stats } = useAirwayBillListData(allBills, searchQuery);
  const { handleCardPress, handleCreatePress } = useAirwayBillNavigation(navigation);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    statusFilter,
    searchQuery,
    airwayBills,
    stats,
    isLoading,
    isError,
    error,
    isFetching,
    statusOptions,
    handlers: {
      handleRefresh,
      handleStatusFilterChange,
      handleSearchChange,
      handleCardPress,
      handleCreatePress,
    },
  };
};
