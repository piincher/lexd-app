// Goods Feature - MyGoodsScreen Hook
// Handles all business logic for the MyGoodsScreen

import { useState, useCallback, useMemo } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@src/navigations/type';
import { useGetMyGoods } from '../../hooks';
import { GoodsStatus, Goods } from '../../api';

export type FilterTab = 'ALL' | GoodsStatus;

type UseMyGoodsScreenReturn = {
  activeFilter: FilterTab;
  goods: Goods[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  handlers: {
    handleRefresh: () => void;
    handleGoodsPress: (goodsId: string) => void;
    handleScanPress: () => void;
    handleFilterChange: (filter: FilterTab) => void;
  };
};

export const useMyGoodsScreen = (
  navigation: NavigationProp<RootStackParamList>
): UseMyGoodsScreenReturn => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');

  const filters = useMemo(
    () => (activeFilter === 'ALL' ? undefined : { status: activeFilter }),
    [activeFilter]
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useGetMyGoods(filters);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleGoodsPress = useCallback(
    (goodsId: string) => {
      navigation.navigate('GoodsDetail', { goodsId });
    },
    [navigation]
  );

  const handleScanPress = useCallback(() => {
    navigation.navigate('ScanQR');
  }, [navigation]);

  const handleFilterChange = useCallback((filter: FilterTab) => {
    setActiveFilter(filter);
  }, []);

  const goods = data?.goods || [];

  return {
    activeFilter,
    goods,
    isLoading,
    isError,
    error,
    isFetching,
    handlers: {
      handleRefresh,
      handleGoodsPress,
      handleScanPress,
      handleFilterChange,
    },
  };
};
