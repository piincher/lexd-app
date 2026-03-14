/**
 * usePublicHomeScreen Hook
 * 
 * Manages all logic for PublicHomeScreen including:
 * - Navigation handlers
 * - Animation configurations
 * - Tracking state management
 */

import { useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';

import { PublicNavigationProp } from '@src/navigations/type';
import { usePublicTracking } from '../../hooks/usePublicTracking';

export const usePublicHomeScreen = () => {
  const navigation = useNavigation<PublicNavigationProp>();
  const scrollY = useSharedValue(0);
  const [trackingNumber, setTrackingNumber] = useState('');
  const { track, isLoading } = usePublicTracking();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1], 'clamp'),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [-20, 0], 'clamp'),
      },
    ],
  }));

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    const result = await track(trackingNumber.trim());
    if (result) {
      navigation.navigate('PublicTrackingResult', {
        trackingNumber: trackingNumber.trim(),
        data: result,
      });
    }
  };

  const handleServicePress = () => {
    navigation.navigate('ShippingInfo');
  };

  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

  const handleFAQ = () => {
    navigation.navigate('FAQ');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/223XXXXXXXX');
  };

  return {
    // State
    trackingNumber,
    setTrackingNumber,
    isLoading,
    
    // Animation
    scrollHandler,
    headerStyle,
    
    // Handlers
    handleLogin,
    handleTrack,
    handleServicePress,
    handleAboutUs,
    handleContactUs,
    handleFAQ,
    handleWhatsApp,
  };
};
