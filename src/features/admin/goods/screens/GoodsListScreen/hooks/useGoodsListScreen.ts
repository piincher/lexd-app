import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApiClientError } from '@src/api/client';
import { useGoodsList } from '../../../hooks';
import { useGoodsBulkActions } from './useGoodsBulkActions';

type Nav = NativeStackNavigationProp<{
  GoodsList: undefined; ReceiveGoods: undefined;
  AdminGoodsDetail: { goodsId: string };
  AdminGoodsPdfExport: { startDate?: string; endDate?: string } | undefined;
}>;

export const useGoodsListScreen = () => {
  const nav = useNavigation<Nav>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const list = useGoodsList({
    onError: (err: ApiClientError) => setErrorMessage(err.getUserMessage()),
  });

  const bulk = useGoodsBulkActions(list.goods, list.handleRefresh);

  const handleGoodsPress = useCallback((goodsId: string) => {
    nav.navigate('AdminGoodsDetail', { goodsId });
  }, [nav]);

  const handleAddPress = useCallback(() => nav.navigate('ReceiveGoods'), [nav]);

  const handleExportPress = useCallback(() => {
    nav.navigate('AdminGoodsPdfExport', list.dateRange ? {
      startDate: list.dateRange.startDate,
      endDate: list.dateRange.endDate,
    } : undefined);
  }, [nav, list.dateRange]);

  const handleToggleSelectionMode = useCallback(() => {
    if (bulk.isSelectionMode) bulk.exitSelectionMode();
    else bulk.setIsSelectionMode(true);
  }, [bulk]);

  const pendingCount = list.goods.filter((g) => g.status === 'RECEIVED_AT_WAREHOUSE').length;

  return {
    ...list,
    ...bulk,
    errorMessage,
    setErrorMessage,
    filterModalVisible,
    setFilterModalVisible,
    handleGoodsPress,
    handleAddPress,
    handleExportPress,
    handleToggleSelectionMode,
    pendingCount,
  };
};
