import React from 'react';
import { View, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { useOrderWithGoods } from '../hooks/useOrderWithGoods';
import { useRecalculateOrder } from '../hooks/useRecalculateOrder';
import { OrderSummaryCard } from '../components/OrderSummaryCard';
import { ActiveGoodsSection } from '../components/ActiveGoodsSection';
import { VoidedGoodsSection } from '../components/VoidedGoodsSection';
import { VoidHistorySection } from '../components/VoidHistorySection';
import { RecalculateButton } from '../components/RecalculateButton';
import { OrderDetailSkeleton } from '../components/OrderDetailSkeleton';
import { styles } from './OrderDetailWithGoodsScreen.styles';

interface RouteParams {
  orderId: string;
}

export const OrderDetailWithGoodsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId } = route.params as RouteParams;
  
  const { data, isLoading } = useOrderWithGoods(orderId);
  const { mutate: recalculate, isPending: isRecalculating } = useRecalculateOrder();

  if (isLoading || !data) {
    return (
      <Screen header={{ title: 'Order Details' }}>
        <OrderDetailSkeleton />
      </Screen>
    );
  }

  const { order, activeGoods, voidedGoods, voidHistory } = data;

  return (
    <Screen 
      header={{ title: `Order ${order.code}` }}
      footer={
        <RecalculateButton 
          onPress={() => recalculate(orderId)}
          isLoading={isRecalculating}
        />
      }
    >
      <View style={styles.container}>
        <OrderSummaryCard
          code={order.code}
          clientName={order.clientName}
          status={order.status}
          totalCBM={order.totalCBM}
          totalCost={order.totalCost}
          pricingSource={order.pricingSource}
        />

        <ActiveGoodsSection goods={activeGoods} />

        {voidedGoods.length > 0 && (
          <VoidedGoodsSection goods={voidedGoods} />
        )}

        {voidHistory.length > 0 && (
          <VoidHistorySection history={voidHistory} />
        )}

        {/* Navigate to Classic View */}
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <Button
            title="← Retour à la vue classique"
            onPress={() => navigation.navigate('ActiveOrderDetails', { id: orderId })}
            color="#666"
          />
        </View>
      </View>
    </Screen>
  );
};

export default OrderDetailWithGoodsScreen;
