import React from 'react';
import { View, Button } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { OrderSummaryCard } from '../components/OrderSummaryCard';
import { ActiveGoodsSection } from '../components/ActiveGoodsSection';
import { VoidedGoodsSection } from '../components/VoidedGoodsSection';
import { VoidHistorySection } from '../components/VoidHistorySection';
import { RecalculateButton } from '../components/RecalculateButton';
import { OrderDetailSkeleton } from '../components/OrderDetailSkeleton';
import { useOrderDetailWithGoodsScreen } from './hooks/useOrderDetailWithGoodsScreen';
import { createStyles } from './OrderDetailWithGoodsScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const OrderDetailWithGoodsScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    orderId,
    data,
    isLoading,
    isRecalculating,
    handlers,
  } = useOrderDetailWithGoodsScreen();

  if (isLoading || !data) {
    return (
      <Screen header={{ title: 'Order Details', showNotificationBell: true }}>
        <OrderDetailSkeleton />
      </Screen>
    );
  }

  const { order, activeGoods, voidedGoods, voidHistory } = data;

  return (
    <Screen
      header={{ title: `Order ${order.code}`, showNotificationBell: true }}
      footer={
        <RecalculateButton
          onPress={handlers.handleRecalculate}
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
        <View style={styles.backButtonContainer}>
          <Button
            title="← Retour à la vue classique"
            onPress={handlers.handleBack}
          />
        </View>
      </View>
    </Screen>
  );
};

export default OrderDetailWithGoodsScreen;
