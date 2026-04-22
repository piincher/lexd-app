/**
 * AirwayBillListScreen Hook
 * All business logic for the airway bill list screen
 */

import { useState, useCallback, useMemo } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useGetAllAirwayBills } from '../../hooks/useAirwayBills';
import { AirwayBill, AirwayBillStatus } from '../../types';

export type StatusFilter = AirwayBillStatus | 'ALL';

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: 'Tous', value: 'ALL' },
  { label: 'Créé', value: 'CREATED' },
  { label: 'Préparation', value: 'PACKING' },
  { label: 'Prêt', value: 'READY_FOR_DEPARTURE' },
  { label: 'En transit', value: 'IN_TRANSIT' },
  { label: 'Arrivé', value: 'ARRIVED' },
];

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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = useMemo(
    () => ({
      status: statusFilter === 'ALL' ? undefined : statusFilter,
      limit: 50,
    }),
    [statusFilter]
  );

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllAirwayBills(filters);

  const allBills = data?.data?.airwayBills || [];

  const airwayBills = useMemo(() => {
    if (!searchQuery.trim()) return allBills;
    const query = searchQuery.toLowerCase().trim();
    return allBills.filter(
      (bill: AirwayBill) =>
        bill.awbNumber.toLowerCase().includes(query) ||
        (bill.airline || '').toLowerCase().includes(query) ||
        (bill.flightNumber || '').toLowerCase().includes(query) ||
        (bill.departureAirport || '').toLowerCase().includes(query) ||
        (bill.arrivalAirport || '').toLowerCase().includes(query)
    );
  }, [allBills, searchQuery]);

  const stats = useMemo(() => {
    return airwayBills.reduce(
      (acc: { totalAWBs: number; totalPackages: number; totalWeight: number }, bill: AirwayBill) => ({
        totalAWBs: acc.totalAWBs + 1,
        totalPackages: acc.totalPackages + (bill.totalPackages || 0),
        totalWeight: acc.totalWeight + (bill.totalWeight || 0),
      }),
      { totalAWBs: 0, totalPackages: 0, totalWeight: 0 }
    );
  }, [airwayBills]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleStatusFilterChange = useCallback((filter: StatusFilter) => {
    setStatusFilter(filter);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCardPress = useCallback(
    (id: string) => {
      navigation.navigate('AirwayBillDetail', { airwayBillId: id });
    },
    [navigation]
  );

  const handleCreatePress = useCallback(() => {
    navigation.navigate('CreateAirwayBill');
  }, [navigation]);

  return {
    statusFilter,
    searchQuery,
    airwayBills,
    stats,
    isLoading,
    isError,
    error,
    isFetching,
    statusOptions: STATUS_OPTIONS,
    handlers: {
      handleRefresh,
      handleStatusFilterChange,
      handleSearchChange,
      handleCardPress,
      handleCreatePress,
    },
  };
};
