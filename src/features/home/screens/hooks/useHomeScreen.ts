import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { navigationProps } from '@src/navigations/type';
import { useAuth } from '@src/store/Auth';
import { useHomeScreen as useHomeScrollAnimation } from '../../hooks/useHomeScreen';

export const useHomeScreen = () => {
  const navigation = useNavigation<navigationProps>();
  const token = useAuth((state) => state.token);
  const firstName = useAuth((state) => state.user?.firstName);
  const { whatsappStyle, scrollHandler } = useHomeScrollAnimation();

  // Redirect authenticated users to dashboard — Home is for guests only
  useEffect(() => {
    if (token) {
      navigation.navigate('CustomerDashboard' as never);
    }
  }, [token, navigation]);

  const handlers = {
    handleServicePress: (route: string) => {
      if (route === 'ChooseShippingMethod') {
        navigation.navigate('CheckRoute');
      }
    },
    handleDashboardPress: () => navigation.navigate('CustomerDashboard'),
    handleCreateOrderPress: () => navigation.navigate('CreateTicket'),
  };

  return {
    token,
    firstName,
    whatsappStyle,
    scrollHandler,
    handlers,
  };
};
