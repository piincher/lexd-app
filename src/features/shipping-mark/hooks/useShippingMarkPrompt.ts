import { useCallback, useMemo } from 'react';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '@src/app/store/Auth';
import { navigationRef } from '@src/app/navigation/navigationRef';
import { useShippingMarkPopup } from './useShippingMarkPopup';
import { useShippingMarkPromptStore } from '@src/app/store/shippingMarkPromptStore';

const CUSTOMER_ROLE = 'user';

export const useShippingMarkPrompt = () => {
  const { data: config, isLoading } = useShippingMarkPopup();
  const user = useAuth((state) => state.user);
  const userId = user?._id;
  const role = user?.role;

  const userState = useShippingMarkPromptStore(
    useCallback((state) => (userId ? state.users[userId] : undefined), [userId]),
  );
  const dismissForever = useShippingMarkPromptStore((state) => state.dismissForever);
  const markAcknowledged = useShippingMarkPromptStore((state) => state.markAcknowledged);

  const visible = useMemo(() => {
    if (!userId || role !== CUSTOMER_ROLE) return false;
    if (isLoading || !config) return false;
    if (!config.enabled || !config.showOnLogin) return false;
    if (userState?.dismissedAt) return false;
    // Don't nag a client who has already downloaded or shared their mark.
    if (userState?.downloadedAt) return false;
    return true;
  }, [userId, role, isLoading, config, userState?.dismissedAt, userState?.downloadedAt]);

  const handleDismissForever = useCallback(() => {
    if (!userId) return;
    dismissForever(userId);
  }, [userId, dismissForever]);

  const navigateToShippingMark = useCallback(() => {
    if (!userId) return;
    markAcknowledged(userId);
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.navigate({ name: 'ShippingMark' }));
    }
  }, [userId, markAcknowledged]);

  return {
    visible,
    config,
    isLoading,
    dismissForever: handleDismissForever,
    navigateToShippingMark,
  };
};
