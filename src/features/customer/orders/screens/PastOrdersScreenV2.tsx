/**
 * Past Orders Screen V2
 * Decomposed version under 100 lines
 */

import React from 'react';
import { View } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { Input } from '@src/shared/ui/Input';
import { usePastOrdersScreenV2 } from './hooks/usePastOrdersScreenV2';
import { styles } from './PastOrdersScreenV2.styles';
import { OrderStatusFilter } from '../components/OrderStatusFilter';
import { OrderDateFilter } from '../components/OrderDateFilter';
import { PastOrderList } from '../components/PastOrderList';

export const PastOrdersScreenV2: React.FC = () => {
  const {
    orders,
    filters,
    setStatus,
    setDateRange,
    setSearchQuery,
    isLoading,
    refetch,
    isRefetching,
    handlers,
  } = usePastOrdersScreenV2();

  return (
    <Screen variant="plain" scrollable={false} header={{ title: 'Commandes Passées', showNotificationBell: true }}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Rechercher une commande..."
          value={filters.searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <OrderStatusFilter
        activeStatus={filters.status}
        onStatusChange={setStatus}
      />
      <OrderDateFilter
        activeRange={filters.dateRange}
        onRangeChange={setDateRange}
      />
      <PastOrderList
        orders={orders}
        isLoading={isLoading}
        isRefreshing={isRefetching}
        onRefresh={refetch}
        onOrderPress={handlers.handleOrderPress}
      />
    </Screen>
  );
};
