/**
 * OrderDetailScreen - Comprehensive admin order detail view
 * SRP: Layout composition only — each section is a dedicated component
 */

import React, { useMemo } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetOrderDetail } from '@src/shared/hooks/useOrderDetail';
import { useGetRoutes } from '@src/shared/hooks/useRoutes';
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


const OrderDetailScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    contentContainer: {
      paddingVertical: 4,
      paddingBottom: 100,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }), [colors, isDark]);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };

  const { data: order, isLoading, refetch } = useGetOrderDetail(id);
  const { data: routes } = useGetRoutes();
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder();

  // Helper to parse numeric values from string/number fields
  const parseNum = (val: any): number => {
    if (val === null || val === undefined || val === '') return 0;
    const num = parseFloat(String(val));
    return isNaN(num) ? 0 : num;
  };

  // Compute total from populated goodsIds as fallback when calculatedTotal is 0
  const computeTotalFromGoods = (): number => {
    if (!order?.goodsIds || !Array.isArray(order.goodsIds) || order.goodsIds.length === 0) return 0;
    // goodsIds are populated objects with totalCost, unitPrice, weight, actualCBM
    return order.goodsIds.reduce((sum: number, g: any) => {
      if (typeof g === 'object' && g !== null) {
        return sum + (parseNum(g.totalCost) || 0);
      }
      return sum;
    }, 0);
  };

  // Price resolution: calculatedTotal > priceTotal > sum from goods
  const resolvedTotal = parseNum(order?.calculatedTotal)
    || parseNum(order?.priceTotal)
    || computeTotalFromGoods();

  // Create a normalized order object that handles v1/v2 differences
  // Use calculatedTotal (from goods) as primary price source, fallback to priceTotal (manual)
  const normalizedOrder = order
    ? {
        ...order,
        // Ensure these fields exist for display
        quantity: order?.quantity || 1,
        packageWeight: order?.packageWeight || '0',
        packageCBM:
          order?.packageCBM || String(order?.calculatedCBM || '0'),
        unitPrice: parseNum(order?.unitPrice),
        priceTotal: resolvedTotal,
        calculatedTotal: resolvedTotal,
      }
    : null;

  const handleUpdateStatus = () => {
    navigation.navigate('EditOrder' as never, {
      id: order?._id,
      orderId: order?.code,
    } as never);
  };

  if (isLoading) {
    return (
      <Screen header={{ title: 'Détails commande', showNotificationBell: true }}>
        <OrderDetailSkeleton />
      </Screen>
    );
  }

  if (!order) {
    return (
      <Screen header={{ title: 'Détails commande', showNotificationBell: true }}>
        <EmptyOrders />
      </Screen>
    );
  }

  return (
    <Screen
      header={{
        title: 'Détails commande',
        subtitle: order?.code,
        showNotificationBell: true,
      }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[colors.primary.main]}
            tintColor={colors.primary.main}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header: client, status, shipping mode, price */}
        <OrderDetailHeader order={normalizedOrder!} />

        {/* 2. Product images */}
        <OrderImageGallery images={normalizedOrder?.images} />

        {/* 3. Quick stats: quantity, weight, CBM */}
        <OrderQuickStats
          quantity={normalizedOrder?.quantity}
          weight={normalizedOrder?.packageWeight}
          cbm={normalizedOrder?.packageCBM}
          shippingMode={normalizedOrder?.shippingMode}
        />

        {/* 4. Payment details with record/history */}
        <PaymentSection order={normalizedOrder!} />

        {/* 5. Client info, package details, dates */}
        <OrderInfoSection order={normalizedOrder!} />

        {/* 6. Shipping & logistics: route, container, transporter */}
        <OrderShippingSection order={normalizedOrder!} />

        {/* 7. Goods linked to this order */}
        <OrderGoodsSection goods={normalizedOrder?.goodsIds || []} />

        {/* 8. Status timeline with current location */}
        <OrderStatusTimeline
          order={normalizedOrder!}
          routeData={routes?.[0]}
        />

        {/* 9. Admin actions: edit, mark delivered */}
        <OrderActions
          order={normalizedOrder!}
          onUpdateStatus={handleUpdateStatus}
          isUpdating={isUpdating}
        />
      </ScrollView>
    </Screen>
  );
};

export default OrderDetailScreen;
