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
  DEMO_QUICK_ACTIONS,
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

  const filteredGoods = useMemo(
    () => DEMO_GOODS.filter((g) => g.mode === selectedMode),
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

  const handleWhatsApp = useCallback(() => {
    const phone = GUEST_SUPPORT_PHONE.replace(/[^\d]/g, '');
    const text = encodeURIComponent("Bonjour ChinaLink, j'ai une question sur l'application.");
    Linking.openURL(`https://wa.me/${phone}?text=${text}`);
  }, []);

  const handleAction = useCallback((id: string) => {
    if (id === 'whatsapp' || id === 'support') {
      handleWhatsApp();
    } else if (id === 'login') {
      handleLogin();
    }
    // 'track' and 'documents' are demo-only actions (no-op in guest mode)
  }, [handleLogin, handleWhatsApp]);

  return {
    benefits: DEMO_BENEFITS,
    clientSteps: DEMO_CLIENT_STEPS,
    documents: DEMO_DOCUMENTS,
    faqs: DEMO_FAQS,
    goods: filteredGoods,
    allGoods: DEMO_GOODS,
    lockedFeatures: DEMO_LOCKED_FEATURES,
    metrics: DEMO_METRICS,
    notifications: DEMO_NOTIFICATIONS,
    quickActions: DEMO_QUICK_ACTIONS,
    shipments: DEMO_SHIPMENTS,
    selectedMode,
    selectedShipment,
    supportPhone: GUEST_SUPPORT_PHONE,
    setSelectedMode,
    handleLogin,
    handleContact,
    handleWhatsApp,
    handleAction,
  };
};
