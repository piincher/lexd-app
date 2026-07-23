import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { navigationProps } from '@src/navigations/type';
import { useAuth } from '@src/store/Auth';
import { useHomeScreen as useHomeScrollAnimation } from '../../hooks/useHomeScreen';
import { openWhatsApp } from '@src/shared/lib/openWhatsApp';

export const useHomeScreen = () => {
  const navigation = useNavigation<navigationProps>();
  const token = useAuth((state) => state.token);
  const { whatsappStyle, scrollHandler } = useHomeScrollAnimation();

  // Redirect authenticated users to dashboard — Home is for guests only
  useEffect(() => {
    if (token) {
      navigation.navigate('CustomerDashboard' as never);
    }
  }, [token, navigation]);

  const handlers = {
    handleTrackPress: () => navigation.navigate('CheckRoute'),
    handlePreviewPress: () => navigation.navigate('GuestPreview'),
    handleLoginPress: () => navigation.navigate('Login'),
    handleFreightPress: () => navigation.navigate('CheckRoute'),
    handleContactPress: (phone: string) => {
      void openWhatsApp(phone, "Bonjour LEXD, j'ai une demande d'accompagnement.");
    },
  };

  return {
    whatsappStyle,
    scrollHandler,
    handlers,
  };
};
