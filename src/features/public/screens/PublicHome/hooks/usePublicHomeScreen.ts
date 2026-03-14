import { useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { usePublicTracking } from '../../../hooks/usePublicTracking';

export const usePublicHomeScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const scrollY = useSharedValue(0);
  
  const [trackingNumber, setTrackingNumber] = useState('');
  const { track, isLoading } = usePublicTracking();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleTrack = useCallback(async () => {
    if (!trackingNumber.trim()) return;
    
    const result = await track(trackingNumber.trim());
    if (result) {
      navigation.navigate('PublicTrackingResult', {
        trackingNumber: trackingNumber.trim(),
        data: result,
      });
    }
  }, [trackingNumber, track, navigation]);

  const handleServicePress = useCallback((serviceId: string) => {
    navigation.navigate('ShippingInfo');
  }, [navigation]);

  const handleAboutUs = useCallback(() => {
    navigation.navigate('AboutUs');
  }, [navigation]);

  const handleContactUs = useCallback(() => {
    navigation.navigate('ContactUs');
  }, [navigation]);

  const handleFAQ = useCallback(() => {
    navigation.navigate('FAQ');
  }, [navigation]);

  const handleWhatsApp = useCallback(() => {
    Linking.openURL('https://wa.me/223XXXXXXXX');
  }, []);

  return {
    navigation,
    theme,
    scrollY,
    scrollHandler,
    trackingNumber,
    setTrackingNumber,
    isLoading,
    handleLogin,
    handleTrack,
    handleServicePress,
    handleAboutUs,
    handleContactUs,
    handleFAQ,
    handleWhatsApp,
  };
};
