import { useRoute, useNavigation } from '@react-navigation/native';
import { PaymentDetailRouteParams } from '../../types';

export const usePaymentDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = (route.params || {}) as PaymentDetailRouteParams;

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    params,
    handlers: {
      handleBack,
    },
  };
};
