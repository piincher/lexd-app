import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useMyPaymentHistoryScreen = () => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    handlers: {
      handleBack,
    },
  };
};
