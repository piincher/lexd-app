import { useRoute, useNavigation } from '@react-navigation/native';
import { useOrderWithGoods } from '../../hooks/useOrderWithGoods';
import { useRecalculateOrder } from '../../hooks/useRecalculateOrder';

interface RouteParams {
  orderId: string;
}

export const useOrderDetailWithGoodsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId } = route.params as RouteParams;

  const { data, isLoading } = useOrderWithGoods(orderId);
  const { mutate: recalculate, isPending: isRecalculating } = useRecalculateOrder();

  const handleRecalculate = () => {
    recalculate(orderId);
  };

  const handleBack = () => {
    navigation.navigate('ActiveOrderDetails', { id: orderId });
  };

  return {
    orderId,
    data,
    isLoading,
    isRecalculating,
    handlers: {
      handleRecalculate,
      handleBack,
    },
  };
};
