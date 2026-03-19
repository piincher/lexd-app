/**
 * OrderDetailScreen - Production-ready order detail view
 * SRP: Layout composition ONLY (<100 lines)
 */

import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui';
import { COLORS } from '@src/constants/Colors';
import { useGetOrderDetail } from '@src/shared/hooks';
import { useGetRoutes } from '@src/shared/hooks';
import { useUpdateOrder, useUpdateStatusDelivery } from '../hooks/useOrderManagement';
import { OrderDetailHeader } from './components/OrderDetailHeader';
import { OrderInfoSection } from './components/OrderInfoSection';
import { PaymentSection } from './components/PaymentSection';
import { OrderStatusTimeline } from './components/OrderStatusTimeline';
import { OrderActions } from './components/OrderActions';
import { OrderGoodsSection } from './components/OrderGoodsSection';
import { OrderDetailSkeleton } from './components/OrderDetailSkeleton';
import { EmptyOrders } from './components/EmptyOrders';
import { styles } from './OrderDetailScreen.styles';

const OrderDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };

  const { data: order, isLoading, refetch } = useGetOrderDetail(id);
  const { data: routes } = useGetRoutes();
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder();
  const { mutate: markDelivered, isPending: isDelivering } = useUpdateStatusDelivery(id);

  const handleUpdateStatus = () => {
    navigation.navigate('EditOrder' as never, { 
      id: order?._id, 
      orderId: order?.code 
    } as never);
  };

  const handleMarkDelivered = () => {
    markDelivered({
      ...order,
      orderId: order?.code,
    });
  };

  if (isLoading) {
    return (
      <Screen header={{ title: 'Order Details' }}>
        <OrderDetailSkeleton />
      </Screen>
    );
  }

  if (!order) {
    return (
      <Screen header={{ title: 'Order Details' }}>
        <EmptyOrders />
      </Screen>
    );
  }

  return (
    <Screen 
      header={{ 
        title: 'Order Details', 
        subtitle: order?.code 
      }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading} 
            onRefresh={refetch}
            colors={[COLORS.blue]}
            tintColor={COLORS.blue}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Order Header Card */}
        <OrderDetailHeader order={order} />

        {/* Payment Section */}
        <PaymentSection order={order} />

        {/* Order Information */}
        <OrderInfoSection order={order} />

        {/* Goods Section - Shows goods attached to this order */}
        <OrderGoodsSection goods={order?.goodsIds || []} />

        {/* Status Timeline */}
        <OrderStatusTimeline 
          order={order} 
          routeData={routes?.[0]}
        />

        {/* Action Buttons */}
        <OrderActions 
          order={order}
          onUpdateStatus={handleUpdateStatus}
          onMarkDelivered={handleMarkDelivered}
          isUpdating={isUpdating || isDelivering}
        />
      </ScrollView>
    </Screen>
  );
};

export default OrderDetailScreen;
