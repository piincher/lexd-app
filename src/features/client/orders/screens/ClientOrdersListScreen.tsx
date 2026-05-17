/**
 * Client Orders List Screen
 * Displays list of customer's orders
 */

import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { useClientOrdersListScreen } from './hooks/useClientOrdersListScreen';
import { ClientOrderList } from '../components/ClientOrderList';
import styles from './ClientOrdersListScreen.styles';

export const ClientOrdersListScreen: React.FC = () => {
  const { orders, isLoading, isRefetching, refetch, handlers } = useClientOrdersListScreen();

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
        onOrderPress={handlers.handleOrderPress}
        onRefresh={refetch}
      />
    </Screen>
  );
};

export default ClientOrdersListScreen;
