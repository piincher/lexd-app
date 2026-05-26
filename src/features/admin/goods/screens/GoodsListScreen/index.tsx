import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGoodsListScreen } from './hooks/useGoodsListScreen';
import {
  GoodsListHeader, GoodsListSearch, GoodsFilterChips, ActiveFilterChips,
  GoodsListContent, GoodsListFAB, GoodsBulkActionBar, GoodsFilterModal, OptionPickerModal,
} from './components';
import { GoodsListScannerModal } from './components/GoodsListScannerModal';
import { GoodsQuickFilterRow } from './components/GoodsQuickFilterRow';

export const GoodsListScreen: React.FC = () => {
  const s = useGoodsListScreen();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  // Header + search + filters scroll with the list (as the list header) so the whole screen scrolls.
  const listHeader = (
    <View>
      <GoodsListHeader total={s.total} pendingCount={s.pendingCount} loading={s.isLoading}
        mode={s.selectedMode} onChangeMode={s.setSelectedMode}
        onScanPress={s.handleScanPress}
        onExportPress={s.handleExportPress}
        isSelectionMode={s.isSelectionMode} onToggleSelectionMode={s.handleToggleSelectionMode} />
      <GoodsListSearch value={s.searchQuery} onChangeText={s.setSearchQuery}
        onClear={() => s.setSearchQuery('')} onFilterPress={() => s.setFilterModalVisible(true)}
        hasActiveFilters={s.hasFilters} />
      <ActiveFilterChips selectedClient={s.selectedClient} onClearClient={() => s.setSelectedClient(null)}
        dateRange={s.dateRange} onClearDateRange={() => s.setDateRange(null)} />
      <GoodsFilterChips selectedStatus={s.selectedStatus} onSelect={s.setSelectedStatus} />
      <GoodsQuickFilterRow
        quickFilter={s.quickFilter}
        onChangeQuickFilter={s.setQuickFilter}
        sortBy={s.sortBy}
        onChangeSort={s.setSortBy}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <GoodsListContent goods={s.goods} isLoading={s.isLoading} refreshing={s.isRefetching} error={s.error}
        hasFilters={s.hasFilters || s.selectedStatus !== 'all'} onRefresh={s.handleRefresh}
        onPressGoods={s.handleGoodsPress} onAddPress={s.handleAddPress} isSelectionMode={s.isSelectionMode}
        selectedIds={s.selectedGoodsIds} onToggleSelect={s.toggleSelectGoods} listHeader={listHeader} />
      {!s.isSelectionMode ? <GoodsListFAB onPress={s.handleAddPress} /> : (
        <GoodsBulkActionBar selectedCount={s.selectedGoodsIds.length} totalCount={s.goods.length}
          isPending={s.isBulkPending} onToggleSelectAll={s.toggleSelectAllGoods}
          onAssignContainer={() => s.setContainerPickerVisible(true)}
          onChangeStatus={() => s.setStatusPickerVisible(true)}
          onVoid={s.handleVoidGoods} onHardDelete={s.handleHardDeleteGoods}
          totals={s.selectionTotals}
          onCancel={s.exitSelectionMode} />
      )}
      {s.containerPickerVisible && (
        <OptionPickerModal visible title="Assigner au container" options={s.containerOptions}
          onSelect={s.handleAssignContainer} onDismiss={() => s.setContainerPickerVisible(false)} />
      )}
      {s.statusPickerVisible && (
        <OptionPickerModal visible title="Changer statut" options={s.statusOptions}
          onSelect={s.handleChangeStatus} onDismiss={() => s.setStatusPickerVisible(false)} />
      )}
      {s.filterModalVisible && (
        <GoodsFilterModal visible onDismiss={() => s.setFilterModalVisible(false)}
          selectedClient={s.selectedClient} onSelectClient={s.setSelectedClient}
          dateRange={s.dateRange} onDateRangeChange={s.setDateRange} onClear={s.clearAllFilters} />
      )}
      <Snackbar visible={!!s.errorMessage} onDismiss={() => s.setErrorMessage(null)}
        action={{ label: 'Réessayer', onPress: s.handleRefresh }} style={styles.snackbar}>
        {s.errorMessage}
      </Snackbar>
      {/* Full-screen QR scanner — opens from the scan button in the header, resolves the
          scanned goodsId to a detail-screen navigation in handleScannedCode. */}
      <GoodsListScannerModal
        visible={s.scannerVisible}
        onScan={s.handleScannedCode}
        onDismiss={s.handleScannerDismiss}
      />
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1 },
  snackbar: { backgroundColor: colors.neutral[800], borderRadius: Theme.radius.lg, marginBottom: Theme.spacing.lg },
});

export default GoodsListScreen;
