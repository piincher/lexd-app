import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OrderDetailHeader } from '../../screens/components/OrderDetailHeader';
import { OrderImageGallery } from '../../screens/components/OrderImageGallery';
import { OrderQuickStats } from '../../screens/components/OrderQuickStats';
import { PaymentSection } from '../../screens/components/PaymentSection';
import { OrderInfoSection } from '../../screens/components/OrderInfoSection';
import { OrderShippingSection } from '../../screens/components/OrderShippingSection';
import { OrderGoodsSection } from '../../screens/components/OrderGoodsSection';
import { OrderStatusTimeline } from '../../screens/components/OrderStatusTimeline';
import { OrderActions } from '../../screens/components/OrderActions';
import { styles } from './OrderDetailContent.styles';
import type { productType } from '@src/api/order';

interface OrderDetailContentProps {
  order: productType;
  routes?: unknown[];
  isLoading: boolean;
  isUpdating: boolean;
  onRefresh: () => void;
  onUpdateStatus: () => void;
  onOpenGoods: (goodsId: string) => void;
}

export const OrderDetailContent: React.FC<OrderDetailContentProps> = ({
  order,
  routes,
  isLoading,
  isUpdating,
  onRefresh,
  onUpdateStatus,
  onOpenGoods,
}) => {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          colors={[colors.primary.main]}
          tintColor={colors.primary.main}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <OrderDetailHeader order={order} />
      <OrderImageGallery images={order.images} fallbackPhotos={order.goodsPhotos} />
      <OrderQuickStats
        quantity={order.quantity}
        weight={order.packageWeight}
        cbm={order.packageCBM}
        shippingMode={order.shippingMode}
      />
      <PaymentSection order={order} />
      <OrderInfoSection order={order} />
      <OrderShippingSection order={order} />
      <OrderGoodsSection goods={order.goodsIds || []} onOpenGoods={onOpenGoods} />
      <OrderStatusTimeline order={order} routeData={routes?.[0]} />
      <OrderActions
        order={order}
        onUpdateStatus={onUpdateStatus}
        isUpdating={isUpdating}
      />
    </ScrollView>
  );
};
