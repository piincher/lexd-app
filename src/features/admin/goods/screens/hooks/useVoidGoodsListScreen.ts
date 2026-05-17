/**
 * useVoidGoodsListScreen - Screen-level hook for VoidGoodsListScreen
 * Responsibility: Orchestrate data hook and navigation handlers
 */

import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '@src/navigation/types';
import { useVoidGoodsList } from '../../hooks/useVoidGoodsList';
import { Goods } from '../../types';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useVoidGoodsListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    goodsList,
    isLoading,
    refetch,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    menuVisible,
    setMenuVisible,
  } = useVoidGoodsList();

  const handleVoidPress = useCallback((goods: Goods) => {
    navigation.navigate('VoidGoods' as never, {
      goodsId: goods._id,
      goodsTrackingCode: goods.goodsId,
      cbm: goods.actualCBM,
    } as never);
  }, [navigation]);

  return {
    goodsList,
    isLoading,
    refetch,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    menuVisible,
    setMenuVisible,
    handlers: {
      handleVoidPress,
    },
  };
};
