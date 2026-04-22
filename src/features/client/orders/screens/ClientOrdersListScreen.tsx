/**
 * Client Orders List Screen
 * Displays list of customer's orders
 */

import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { useMyOrders } from '../hooks/useMyOrders';
import { ClientOrderList } from '../components/ClientOrderList';
import { Order } from '../types';
import styles from './ClientOrdersListScreen.styles';

export const ClientOrdersListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data: orders, isLoading, isRefetching, refetch } = useMyOrders();

  const handleOrderPress = useCallback(
    (order: Order) => {
      navigation.navigate('ClientOrderDetail' as never, { orderId: order._id } as never);
    },
    [navigation]
  );

  return (
    <Screen
      variant="default"
      header={{ title: 'Mes Commandes', showNotificationBell: true }}
      scrollable={false}
    >
      <ClientOrderList
        orders={orders ?? []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        onOrderPress={handleOrderPress}
        onRefresh={refetch}
      />
    </Screen>
  );
};

export default ClientOrdersListScreen;
