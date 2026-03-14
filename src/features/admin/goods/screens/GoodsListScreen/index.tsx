/**
 * GoodsListScreen - Admin goods list
 * Composition: Thin screen composing feature components
 */

import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Theme } from '@src/constants/Theme';
import { ApiClientError } from '@src/api/client';
import { useGoodsList, useGoodsFilters } from '../../hooks';
import { GoodsListHeader, GoodsListSearch, GoodsFilterChips, GoodsList, GoodsListFAB } from './components';

type NavigationProp = NativeStackNavigationProp<{
  GoodsList: undefined;
  ReceiveGoods: undefined;
  AdminGoodsDetail: { goodsId: string };
}>;

export const GoodsListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { goods, total, isLoading, isRefetching, error, handleRefresh } = useGoodsList({
    onError: (err: ApiClientError) => setErrorMessage(err.getUserMessage()),
  });
  const { searchQuery, setSearchQuery, selectedStatus, setSelectedStatus, filters, clearSearch } = useGoodsFilters();
  const handleGoodsPress = useCallback((goodsId: string) => {
    navigation.navigate('AdminGoodsDetail', { goodsId });
  }, [navigation]);
  const handleAddPress = useCallback(() => navigation.navigate('ReceiveGoods'), [navigation]);
  const pendingCount = goods.filter((g) => g.status === 'RECEIVED_AT_WAREHOUSE').length;
  const hasFilters = !!searchQuery || selectedStatus !== 'all';

  return (
    <SafeAreaView style={styles.container}>
      <GoodsListHeader total={total} pendingCount={pendingCount} />
      <GoodsListSearch value={searchQuery} onChangeText={setSearchQuery} onClear={clearSearch} />
      <GoodsFilterChips filters={filters} selectedStatus={selectedStatus} onSelect={setSelectedStatus} />
      <GoodsList goods={goods} isLoading={isLoading} isRefetching={isRefetching} error={error}
        hasFilters={hasFilters} onRefresh={handleRefresh} onGoodsPress={handleGoodsPress} onAddPress={handleAddPress} />
      <GoodsListFAB onPress={handleAddPress} />
      <Snackbar visible={!!errorMessage} onDismiss={() => setErrorMessage(null)}
        action={{ label: 'Réessayer', onPress: handleRefresh }} style={styles.snackbar}>
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7FC' },
  snackbar: { backgroundColor: Theme.neutral[800], borderRadius: Theme.radius.lg, marginBottom: Theme.spacing.lg },
});

export default GoodsListScreen;
