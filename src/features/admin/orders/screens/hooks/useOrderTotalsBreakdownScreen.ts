import { useRoute } from '@react-navigation/native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useOrderTotals } from '../../hooks/useOrderTotals';

export const useOrderTotalsBreakdownScreen = () => {
  const route = useRoute<RootStackScreenProps<'OrderTotalsBreakdown'>['route']>();
  const { orderId } = route.params;

  const { data, isLoading } = useOrderTotals(orderId);

  const hasVoidedGoods = data ? data.voidedGoods.length > 0 : false;

  return {
    orderId,
    data,
    isLoading,
    hasVoidedGoods,
  };
};
