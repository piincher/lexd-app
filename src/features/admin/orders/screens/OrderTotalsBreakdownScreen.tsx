/**
 * OrderTotalsBreakdownScreen
 * Shows detailed cost breakdown for an order including active and voided goods
 */

import React from 'react';
import { View } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { createStyles } from './OrderTotalsBreakdownScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { UnitPriceCard } from './components/UnitPriceCard';
import { ActiveGoodsBreakdown } from './components/ActiveGoodsBreakdown';
import { VoidedGoodsBreakdown } from './components/VoidedGoodsBreakdown';
import { SummaryCard } from './components/SummaryCard';
import { useOrderTotalsBreakdownScreen } from './hooks/useOrderTotalsBreakdownScreen';

export const OrderTotalsBreakdownScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { data, isLoading, hasVoidedGoods } = useOrderTotalsBreakdownScreen();

  if (isLoading || !data) {
    return (
      <Screen header={{ title: 'Détail des Coûts', showNotificationBell: true }}>
        <View style={styles.loadingContainer} />
      </Screen>
    );
  }

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
