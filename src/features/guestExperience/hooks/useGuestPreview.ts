import { useCallback, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { DEMO_SHIPMENTS } from '../data/demoShipments';
import { DEMO_GOODS, DEMO_LOCKED_FEATURES, DEMO_METRICS } from '../data/demoDashboard';
import {
  DEMO_BENEFITS,
  DEMO_CLIENT_STEPS,
  DEMO_DOCUMENTS,
  DEMO_FAQS,
  DEMO_NOTIFICATIONS,
  GUEST_SUPPORT_PHONE,
} from '../data/demoContent';
import type { DemoShipmentMode } from '../types';

export const useGuestPreview = (
  navigation: NativeStackNavigationProp<RootStackParamList, 'GuestPreview'>
) => {
  const [selectedMode, setSelectedMode] = useState<DemoShipmentMode>('sea');

  const selectedShipment = useMemo(
    () => DEMO_SHIPMENTS.find((shipment) => shipment.mode === selectedMode) || DEMO_SHIPMENTS[0],
    [selectedMode]
  );

  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleContact = useCallback(() => {
    const phone = GUEST_SUPPORT_PHONE.replace(/[^\d]/g, '');
    const text = encodeURIComponent("Bonjour ChinaLink, j'ai téléchargé l'application et je veux devenir client.");
    Linking.openURL(`https://wa.me/${phone}?text=${text}`);
  }, []);

  return {
    benefits: DEMO_BENEFITS,
    clientSteps: DEMO_CLIENT_STEPS,
    documents: DEMO_DOCUMENTS,
    faqs: DEMO_FAQS,
    goods: DEMO_GOODS,
    lockedFeatures: DEMO_LOCKED_FEATURES,
    metrics: DEMO_METRICS,
    notifications: DEMO_NOTIFICATIONS,
    shipments: DEMO_SHIPMENTS,
    selectedMode,
    selectedShipment,
    supportPhone: GUEST_SUPPORT_PHONE,
    setSelectedMode,
    handleLogin,
    handleContact,
  };
};
