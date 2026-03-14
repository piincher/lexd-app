/**
 * useQuickActions Hook
 * Handles navigation from quick action buttons
 */

import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { QuickAction } from '../types';

export interface UseQuickActionsReturn {
  handleActionPress: (action: QuickAction) => void;
  handleNavigate: (route: string) => void;
}

export const useQuickActions = (): UseQuickActionsReturn => {
  const navigation = useNavigation();

  const handleNavigate = useCallback((route: string): void => {
    navigation.navigate(route as never);
  }, [navigation]);

  const handleActionPress = useCallback((action: QuickAction): void => {
    if (action.route) {
      navigation.navigate(action.route as never);
    } else if (action.action) {
      action.action();
    }
  }, [navigation]);

  return {
    handleActionPress,
    handleNavigate,
  };
};

export default useQuickActions;
