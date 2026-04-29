import { useRoute } from '@react-navigation/native';

interface PaymentScreenParams {
  amount?: number;
  goodsIds?: string[];
  description?: string;
  returnScreen?: string;
}

export const usePaymentScreenData = () => {
  const route = useRoute();
  const params = route.params as PaymentScreenParams;

  return {
    amount: params?.amount,
    goodsIds: params?.goodsIds ?? [],
    description: params?.description,
    returnScreen: params?.returnScreen,
  };
};
