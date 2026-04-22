/**
 * OrderTotalsBreakdownScreen
 * Shows detailed cost breakdown for an order including active and voided goods
 */

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import type { AuthenticatedStackScreenProps } from '@src/navigation/types';
import { useOrderTotals } from '../hooks/useOrderTotals';
import { createStyles } from './OrderTotalsBreakdownScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { UnitPriceCard } from './components/UnitPriceCard';
import { ActiveGoodsBreakdown } from './components/ActiveGoodsBreakdown';
import { VoidedGoodsBreakdown } from './components/VoidedGoodsBreakdown';
import { SummaryCard } from './components/SummaryCard';

export const OrderTotalsBreakdownScreen: React.FC<
  AuthenticatedStackScreenProps<'OrderTotalsBreakdown'>
> = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const route = useRoute<AuthenticatedStackScreenProps<'OrderTotalsBreakdown'>['route']>();
  const { orderId } = route.params;
  const { data, isLoading } = useOrderTotals(orderId);

  if (isLoading || !data) {
    return (
      <Screen header={{ title: 'Détail des Coûts', showNotificationBell: true }}>
        <View style={styles.loadingContainer} />
      </Screen>
    );
  }

  const hasVoidedGoods = data.voidedGoods.length > 0;

  return (
    <Screen
      header={{ title: 'Détail des Coûts', showNotificationBell: true }}
      variant="card"
      scrollable
    >
      <UnitPriceCard unitPrice={data.unitPrice} />
      
      <ActiveGoodsBreakdown goods={data.activeGoods} />
      
      {hasVoidedGoods && (
        <VoidedGoodsBreakdown goods={data.voidedGoods} />
      )}
      
      <SummaryCard summary={data.summary} />
    </Screen>
  );
};

export default OrderTotalsBreakdownScreen;
