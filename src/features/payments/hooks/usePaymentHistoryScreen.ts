import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { usePaymentHistory } from './usePayments';
import type { PaymentStatus } from '../types';

export const usePaymentHistoryScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<PaymentStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const {
    payments,
    isLoading,
    error,
    refetch,
    loadMore,
    hasNextPage,
  } = usePaymentHistory({
    status: selectedFilter === 'ALL' ? undefined : selectedFilter,
    page,
    limit: 20,
  });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setPage((prev) => prev + 1);
      loadMore();
    }
  }, [hasNextPage, isLoading, loadMore]);

  const handleFilterChange = useCallback((filter: PaymentStatus | 'ALL') => {
    setSelectedFilter(filter);
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  return {
    payments,
    isLoading,
    error,
    refreshing,
    hasNextPage,
    selectedFilter,
    handlers: {
      handleRefresh,
      handleLoadMore,
      handleFilterChange,
      handleBackPress,
      handleNotificationPress,
    },
  };
};
