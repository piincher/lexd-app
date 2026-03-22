/**
 * OrderDetailScreen - Comprehensive admin order detail view
 * SRP: Layout composition only — each section is a dedicated component
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui';
import { COLORS } from '@src/constants/Colors';
import { useGetOrderDetail } from '@src/shared/hooks';
import { useGetRoutes } from '@src/shared/hooks';
import { useUpdateOrder } from '../hooks/useOrderManagement';
import { OrderDetailHeader } from './components/OrderDetailHeader';
import { OrderImageGallery } from './components/OrderImageGallery';
import { OrderQuickStats } from './components/OrderQuickStats';
import { OrderInfoSection } from './components/OrderInfoSection';
import { OrderShippingSection } from './components/OrderShippingSection';
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

  const handleUpdateStatus = () => {
    navigation.navigate('EditOrder' as never, {
      id: order?._id,
      orderId: order?.code,
    } as never);
  };

  if (isLoading) {
    return (
      <Screen header={{ title: 'Détails commande' }}>
        <OrderDetailSkeleton />
      </Screen>
    );
  }

  if (!order) {
    return (
      <Screen header={{ title: 'Détails commande' }}>
        <EmptyOrders />
      </Screen>
    );
  }

  return (
    <Screen
      header={{
        title: 'Détails commande',
        subtitle: order?.code,
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
        {/* 1. Header: client, status, shipping mode, price */}
        <OrderDetailHeader order={order} />

        {/* 2. Product images */}
        <OrderImageGallery images={order?.images} />

        {/* 3. Quick stats: quantity, weight, CBM */}
        <OrderQuickStats
          quantity={order?.quantity}
          weight={order?.packageWeight}
          cbm={order?.packageCBM || (order as any)?.calculatedCBM}
          shippingMode={order?.shippingMode}
        />

        {/* 4. Payment details with record/history */}
        <PaymentSection order={order} />

        {/* 5. Client info, package details, dates */}
        <OrderInfoSection order={order} />

        {/* 6. Shipping & logistics: route, container, transporter */}
        <OrderShippingSection order={order} />

        {/* 7. Goods linked to this order */}
        <OrderGoodsSection goods={order?.goodsIds || []} />

        {/* 8. Status timeline with current location */}
        <OrderStatusTimeline
          order={order}
          routeData={routes?.[0]}
        />

        {/* 9. Admin actions: edit, mark delivered */}
        <OrderActions
          order={order}
          onUpdateStatus={handleUpdateStatus}
          isUpdating={isUpdating}
        />
      </ScrollView>
    </Screen>
  );
};

export default OrderDetailScreen;
