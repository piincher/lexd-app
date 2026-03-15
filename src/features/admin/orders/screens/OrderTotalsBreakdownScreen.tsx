/**
 * OrderTotalsBreakdownScreen
 * Shows detailed cost breakdown for an order including active and voided goods
 */

import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Screen } from '@src/shared/ui';
import { AuthenticatedStackScreenProps } from '@src/navigation/types';
import { useOrderTotals } from '../hooks';
import { styles } from './OrderTotalsBreakdownScreen.styles';
import {
  UnitPriceCard,
  ActiveGoodsBreakdown,
  VoidedGoodsBreakdown,
  SummaryCard,
} from './components';

export const OrderTotalsBreakdownScreen: React.FC<
  AuthenticatedStackScreenProps<'OrderTotalsBreakdown'>
> = () => {
  const route = useRoute<AuthenticatedStackScreenProps<'OrderTotalsBreakdown'>['route']>();
  const { orderId } = route.params;
  const { data, isLoading } = useOrderTotals(orderId);

  if (isLoading || !data) {
    return (
      <Screen header={{ title: 'Détail des Coûts' }}>
        <View style={styles.loadingContainer} />
      </Screen>
    );
  }

  const hasVoidedGoods = data.voidedGoods.length > 0;

  return (
    <Screen
      header={{ title: 'Détail des Coûts' }}
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
