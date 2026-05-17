/**
 * useReceiveGoodsScreenUI - UI-specific hook for ReceiveGoodsScreen
 * Responsibility: Navigation and UI interactions only
 */

import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '@src/navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useReceiveGoodsScreenUI = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  return {
    handlers: {
      handleNotificationPress,
    },
  };
};
