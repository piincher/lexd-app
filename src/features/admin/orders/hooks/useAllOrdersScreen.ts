import { useState, useMemo, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import type { productType } from '@src/api/order';
import { useGetAllOrders, useSyncOrderStatuses } from './useOrderManagement';
import { useOrderBulkActions } from '../screens/hooks/useOrderBulkActions';
import { useAllOrdersAdvancedFilters } from './useAllOrdersAdvancedFilters';

interface SyncOrderResult {
  affectedOrders?: number;
  updatedCount?: number;
}

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : 'Failed to sync order statuses');

export const useAllOrdersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const hasCalledOnEnd = useRef(false);
  const advancedFilters = useAllOrdersAdvancedFilters();

  const { data, isLoading, isFetching, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllOrders(statusFilter, advancedFilters.apiFilters);

  const { mutate: syncOrderStatuses, isPending: isSyncing } = useSyncOrderStatuses();

  const handleSyncOrderStatuses = useCallback(() => {
    Alert.alert(
      'Sync Order Statuses',
      'This will sync all order statuses from their linked goods. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sync',
          onPress: () => {
            syncOrderStatuses(undefined, {
              onSuccess: (result: SyncOrderResult) => {
                Alert.alert('Sync Complete', `Processed ${result.affectedOrders ?? 0} orders\nUpdated ${result.updatedCount ?? 0} orders`);
                refetch();
              },
              onError: (error: unknown) => {
                Alert.alert('Sync Failed', getErrorMessage(error));
              },
            });
          },
        },
      ]
    );
  }, [syncOrderStatuses, refetch]);

  const orders = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page || []);
  }, [data]);

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    if (!searchQuery) return orders;
    const query = searchQuery.toLowerCase();
    return orders.filter((order: productType) => {
      if (!order) return false;
      return (
        order.clientName?.toLowerCase().includes(query) ||
        order.code?.toLowerCase().includes(query) ||
        order.clientPhone?.includes(searchQuery)
      );
    });
  }, [orders, searchQuery]);

  const handleMomentumScrollBegin = useCallback(() => {
    hasCalledOnEnd.current = false;
  }, []);

  const loadMore = useCallback(() => {
    if (hasCalledOnEnd.current) return;
    if (hasNextPage && !isFetchingNextPage) {
      hasCalledOnEnd.current = true;
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const {
    selectedOrderIds, isSelectionMode, setIsSelectionMode, toggleSelectOrder,
    toggleSelectAllOrders, exitSelectionMode, isBatchUpdating, handleChangeOrderStatus,
  } = useOrderBulkActions(filteredOrders, refetch);

  return {
    searchQuery, setSearchQuery, statusFilter, setStatusFilter,
    advancedFilters,
    data, isLoading, isFetching, error, refetch,
    orders, filteredOrders, isFetchingNextPage, loadMore, handleMomentumScrollBegin,
    isSelectionMode, setIsSelectionMode, exitSelectionMode,
    selectedOrderIds, toggleSelectOrder, toggleSelectAllOrders,
    isBatchUpdating, handleChangeOrderStatus,
    handleSyncOrderStatuses, isSyncing,
  };
};
