/**
 * OrderDetailScreen - Admin order detail view
 * SRP: Layout composition only
 */

import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { useOrderDetailScreen } from '../hooks/useOrderDetailScreen';
import { OrderDetailContent } from '../components/OrderDetailContent';
import { OrderDetailSkeleton } from './components/OrderDetailSkeleton';
import { EmptyOrders } from './components/EmptyOrders';

const OrderDetailScreen: React.FC = () => {
  const {
    normalizedOrder,
    isLoading,
    isUpdating,
    refetch,
    routes,
    handleUpdateStatus,
    handleOpenGoods,
  } = useOrderDetailScreen();

  if (isLoading) {
    return (
      <Screen header={{ title: 'Détails commande', showNotificationBell: true }}>
        <OrderDetailSkeleton />
      </Screen>
    );
  }

  if (!normalizedOrder) {
    return (
      <Screen header={{ title: 'Détails commande', showNotificationBell: true }}>
        <EmptyOrders />
      </Screen>
    );
  }

  return (
    <Screen
      header={{
        title: normalizedOrder.code ? `Détails ${normalizedOrder.code}` : 'Détails commande',
        showNotificationBell: true,
      }}
    >
      <OrderDetailContent
        order={normalizedOrder}
        routes={routes}
        isLoading={isLoading}
        isUpdating={isUpdating}
        onRefresh={refetch}
        onUpdateStatus={handleUpdateStatus}
        onOpenGoods={handleOpenGoods}
      />
    </Screen>
  );
};

export default OrderDetailScreen;
