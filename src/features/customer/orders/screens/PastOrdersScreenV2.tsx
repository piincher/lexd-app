/**
 * Past Orders Screen V2
 * Decomposed version under 100 lines
 */

import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { Input } from '@src/shared/ui/Input';
import { Theme } from '@src/constants/Theme';
import { usePastOrders } from '../hooks/usePastOrders';
import { useOrderFilters } from '../hooks/useOrderFilters';
import { OrderStatusFilter } from '../components/OrderStatusFilter';
import { OrderDateFilter } from '../components/OrderDateFilter';
import { PastOrderList } from '../components/PastOrderList';
import { Order } from '../types';

export const PastOrdersScreenV2: React.FC = () => {
  const navigation = useNavigation();
  const { filters, setStatus, setDateRange, setSearchQuery } = useOrderFilters();
  const { data, isLoading, refetch, isRefetching } = usePastOrders(filters);

  const handleOrderPress = useCallback(
    (order: Order) => {
      navigation.navigate('OrderDetail' as never, { orderId: order._id } as never);
    },
    [navigation]
  );

  const orders = data?.orders ?? [];

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
        onOrderPress={handleOrderPress}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: Theme.spacing.md,
  },
});
