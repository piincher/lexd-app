/**
 * AllOrdersScreen - Professional logistics orders view
 * SRP: Layout composition ONLY
 */

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAllOrdersScreen } from '../hooks/useAllOrdersScreen';
import { OrdersStats } from './components/OrdersStats';
import { AddOrderButton } from './components/AddOrderButton';
import { OrderBulkActionBar } from './components/OrderBulkActionBar';
import { AllOrdersHeaderActions } from '../components/AllOrdersHeaderActions';
import { AllOrdersSearchBar } from '../components/AllOrdersSearchBar';
import { AllOrdersStatusTabs } from '../components/AllOrdersStatusTabs';
import { AllOrdersList } from '../components/AllOrdersList';
import { AllOrdersErrorState } from '../components/AllOrdersErrorState';
import { createStyles } from './AllOrdersScreen.styles';

const AllOrdersScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    searchQuery, setSearchQuery, statusFilter, setStatusFilter,
    data, isLoading, isFetching, error, refetch,
    orders, filteredOrders, isFetchingNextPage, loadMore, handleMomentumScrollBegin,
    isSelectionMode, setIsSelectionMode, exitSelectionMode,
    selectedOrderIds, toggleSelectOrder, toggleSelectAllOrders,
    isBatchUpdating, handleChangeOrderStatus,
    handleSyncOrderStatuses, isSyncing,
  } = useAllOrdersScreen();

  if (error) {
    return (
      <Screen header={{ title: 'Orders' }}>
        <AllOrdersErrorState error={error} />
      </Screen>
    );
  }

  return (
    <Screen
      header={{
        title: 'Orders',
        rightAction: (
          <AllOrdersHeaderActions
            isSelectionMode={isSelectionMode}
            isSyncing={isSyncing}
            onToggleSelectionMode={() => {
              if (isSelectionMode) exitSelectionMode();
              else setIsSelectionMode(true);
            }}
            onSync={handleSyncOrderStatuses}
          />
        ),
      }}
      scrollable={false}
    >
      <View style={styles.container}>
        <OrdersStats orders={orders} />
        <AllOrdersSearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <AllOrdersStatusTabs activeFilter={statusFilter} onChangeFilter={setStatusFilter} />
        <AllOrdersList
          data={data}
          filteredOrders={filteredOrders}
          isLoading={isLoading}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
          loadMore={loadMore}
          onMomentumScrollBegin={handleMomentumScrollBegin}
          isSelectionMode={isSelectionMode}
          selectedOrderIds={selectedOrderIds}
          onToggleSelect={toggleSelectOrder}
        />
        {!isSelectionMode && <AddOrderButton />}
        {isSelectionMode && (
          <OrderBulkActionBar
            selectedCount={selectedOrderIds.length}
            totalCount={filteredOrders.length}
            isPending={isBatchUpdating}
            onToggleSelectAll={toggleSelectAllOrders}
            onChangeStatus={handleChangeOrderStatus}
            onCancel={exitSelectionMode}
          />
        )}
      </View>
    </Screen>
  );
};

export default AllOrdersScreen;
