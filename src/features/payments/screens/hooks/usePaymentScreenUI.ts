import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePaymentScreen } from '../../hooks/usePaymentScreen';

export const usePaymentScreenUI = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const paymentData = usePaymentScreen();

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  return {
    ...paymentData,
    colors,
    handlers: {
      handleNotificationPress,
      handleBack: paymentData.handleBack,
      handlePay: paymentData.handlePay,
      handleModalClose: paymentData.handleModalClose,
      handleModalRetry: paymentData.handleModalRetry,
      handleProviderSelect: paymentData.handleProviderSelect,
    },
  };
};
