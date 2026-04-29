import { useState, useMemo, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useGetAllOrders, useSyncOrderStatuses } from './useOrderManagement';
import { useOrderBulkActions } from '../screens/hooks/useOrderBulkActions';

export const useAllOrdersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const hasCalledOnEnd = useRef(false);

  const { data, isLoading, isFetching, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllOrders(statusFilter);

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
              onSuccess: (result: any) => {
                Alert.alert('Sync Complete', `Processed ${result.affectedOrders} orders\nUpdated ${result.updatedCount} orders`);
                refetch();
              },
              onError: (error: any) => {
                Alert.alert('Sync Failed', error?.message || 'Failed to sync order statuses');
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
    return orders.filter((order: any) => {
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
    data, isLoading, isFetching, error, refetch,
    orders, filteredOrders, isFetchingNextPage, loadMore, handleMomentumScrollBegin,
    isSelectionMode, setIsSelectionMode, exitSelectionMode,
    selectedOrderIds, toggleSelectOrder, toggleSelectAllOrders,
    isBatchUpdating, handleChangeOrderStatus,
    handleSyncOrderStatuses, isSyncing,
  };
};
