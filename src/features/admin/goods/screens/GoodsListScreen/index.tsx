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
import { useGoodsList } from '../../hooks';
import { GoodsListHeader } from './components/GoodsListHeader';
import { GoodsListSearch } from './components/GoodsListSearch';
import { GoodsFilterChips } from './components/GoodsFilterChips';
import { ActiveFilterChips } from './components/ActiveFilterChips';
import { GoodsFilterModal } from './components/GoodsFilterModal';
import { GoodsList } from './components/GoodsList';
import { GoodsListFAB } from './components/GoodsListFAB';
import { GoodsBulkActionBar } from './components/GoodsBulkActionBar';
import { OptionPickerModal } from './components/OptionPickerModal';
import { useGoodsBulkActions } from './hooks/useGoodsBulkActions';

type NavigationProp = NativeStackNavigationProp<{
  GoodsList: undefined;
  ReceiveGoods: undefined;
  AdminGoodsDetail: { goodsId: string };
  AdminGoodsPdfExport: { startDate?: string; endDate?: string } | undefined;
}>;

export const GoodsListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const {
    goods,
    total,
    isLoading,
    isRefetching,
    error,
    handleRefresh,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedClient,
    setSelectedClient,
    dateRange,
    setDateRange,
    clearAllFilters,
    hasFilters,
  } = useGoodsList({
    onError: (err: ApiClientError) => setErrorMessage(err.getUserMessage()),
  });

  const {
    selectedGoodsIds,
    isSelectionMode,
    containerPickerVisible,
    statusPickerVisible,
    toggleSelectGoods,
    toggleSelectAllGoods,
    exitSelectionMode,
    setIsSelectionMode,
    setContainerPickerVisible,
    setStatusPickerVisible,
    isBulkPending,
    handleAssignContainer,
    handleChangeStatus,
    handleVoidGoods,
    containerOptions,
    statusOptions,
  } = useGoodsBulkActions(goods, handleRefresh);

  const handleGoodsPress = useCallback((goodsId: string) => {
    navigation.navigate('AdminGoodsDetail', { goodsId });
  }, [navigation]);

  const handleAddPress = useCallback(() => navigation.navigate('ReceiveGoods'), [navigation]);
  const handleExportPress = useCallback(() => {
    navigation.navigate('AdminGoodsPdfExport', dateRange ? {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    } : undefined);
  }, [navigation, dateRange]);
  const pendingCount = goods.filter((g) => g.status === 'RECEIVED_AT_WAREHOUSE').length;

  return (
    <SafeAreaView style={styles.container}>
      <GoodsListHeader
        total={total}
        pendingCount={pendingCount}
        onExportPress={handleExportPress}
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={() => {
          if (isSelectionMode) exitSelectionMode();
          else setIsSelectionMode(true);
        }}
      />
      <GoodsListSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
        onFilterPress={() => setFilterModalVisible(true)}
        hasActiveFilters={hasFilters}
      />
      <ActiveFilterChips
        selectedClient={selectedClient}
        onClearClient={() => setSelectedClient(null)}
        dateRange={dateRange}
        onClearDateRange={() => setDateRange(null)}
      />
      <GoodsFilterChips selectedStatus={selectedStatus} onSelect={setSelectedStatus} />
      <GoodsList
        goods={goods}
        isLoading={isLoading}
        isRefetching={isRefetching}
        error={error}
        hasFilters={hasFilters || selectedStatus !== 'all'}
        onRefresh={handleRefresh}
        onGoodsPress={handleGoodsPress}
        onAddPress={handleAddPress}
        isSelectionMode={isSelectionMode}
        selectedIds={selectedGoodsIds}
        onToggleSelect={toggleSelectGoods}
      />
      {!isSelectionMode && <GoodsListFAB onPress={handleAddPress} />}
      {isSelectionMode && (
        <GoodsBulkActionBar
          selectedCount={selectedGoodsIds.length}
          totalCount={goods.length}
          isPending={isBulkPending}
          onToggleSelectAll={toggleSelectAllGoods}
          onAssignContainer={() => setContainerPickerVisible(true)}
          onChangeStatus={() => setStatusPickerVisible(true)}
          onVoid={handleVoidGoods}
          onCancel={exitSelectionMode}
        />
      )}
      <OptionPickerModal
        visible={containerPickerVisible}
        title="Assigner au container"
        options={containerOptions}
        onSelect={handleAssignContainer}
        onDismiss={() => setContainerPickerVisible(false)}
      />
      <OptionPickerModal
        visible={statusPickerVisible}
        title="Changer statut"
        options={statusOptions}
        onSelect={handleChangeStatus}
        onDismiss={() => setStatusPickerVisible(false)}
      />
      <GoodsFilterModal
        visible={filterModalVisible}
        onDismiss={() => setFilterModalVisible(false)}
        selectedClient={selectedClient}
        onSelectClient={setSelectedClient}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onClear={clearAllFilters}
      />
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        action={{ label: 'Réessayer', onPress: handleRefresh }}
        style={styles.snackbar}
      >
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
