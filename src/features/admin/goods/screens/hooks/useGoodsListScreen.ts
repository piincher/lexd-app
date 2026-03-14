/**
 * useGoodsListScreen - Hook for GoodsListScreen logic
 * Handles filters, data fetching, navigation, and state management
 */

import { useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllGoods, goodsQueryKeys } from '../../hooks';
import { GoodsStatus } from '../../types';
import { ApiClientError } from '@src/api/client';

export type AdminV2StackParamList = {
  GoodsList: undefined;
  ReceiveGoods: undefined;
  AdminGoodsDetail: { goodsId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const STATUS_FILTERS: { key: GoodsStatus | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', icon: 'home' },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Container', icon: 'cube' },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag' },
];

export interface UseGoodsListScreenReturn {
  // Data
  goods: any[];
  total: number;
  isLoading: boolean;
  isRefetching: boolean;
  error: any;
  
  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: GoodsStatus | 'all';
  setSelectedStatus: (status: GoodsStatus | 'all') => void;
  
  // UI State
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  scrollY: Animated.Value;
  headerOpacity: Animated.AnimatedInterpolation<string | number>;
  
  // Actions
  handleGoodsPress: (goodsId: string) => void;
  handleRefresh: () => Promise<void>;
  navigateToReceiveGoods: () => void;
  clearSearch: () => void;
  
  // Constants
  statusFilters: typeof STATUS_FILTERS;
}

export const useGoodsListScreen = (): UseGoodsListScreenReturn => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GoodsStatus | 'all'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const filters = useMemo(() => ({
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    ...(searchQuery && { search: searchQuery }),
  }), [selectedStatus, searchQuery]);

  const { data, isLoading, isRefetching, error, refetch } = useGetAllGoods(filters, {
    onError: (err: ApiClientError) => {
      setErrorMessage(err.getUserMessage());
    },
  });

  const goods = data?.data?.goods || [];
  const total = data?.data?.pagination?.total || 0;

  // Animated header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleGoodsPress = useCallback((goodsId: string) => {
    navigation.navigate('AdminGoodsDetail', { goodsId });
  }, [navigation]);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
    await refetch();
  }, [queryClient, refetch]);

  const navigateToReceiveGoods = useCallback(() => {
    navigation.navigate('ReceiveGoods');
  }, [navigation]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    goods,
    total,
    isLoading,
    isRefetching,
    error,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    errorMessage,
    setErrorMessage,
    scrollY,
    headerOpacity,
    handleGoodsPress,
    handleRefresh,
    navigateToReceiveGoods,
    clearSearch,
    statusFilters: STATUS_FILTERS,
  };
};
