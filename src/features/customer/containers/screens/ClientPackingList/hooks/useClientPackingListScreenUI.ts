import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useClientPackingListScreen } from './useClientPackingListScreen';

export const useClientPackingListScreenUI = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const containerId = (route.params as any)?.containerId as string;

  const screen = useClientPackingListScreen(containerId);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleShowContactDialog = useCallback(() => {
    screen.setContactDialogVisible(true);
  }, [screen.setContactDialogVisible]);

  const handleDismissContactDialog = useCallback(() => {
    screen.setContactDialogVisible(false);
  }, [screen.setContactDialogVisible]);

  const handleDismissSnackbar = useCallback(() => {
    screen.setSnackbarVisible(false);
  }, [screen.setSnackbarVisible]);

  return {
    ...screen,
    handlers: {
      handleBack,
      handleShowContactDialog,
      handleDismissContactDialog,
      handleDismissSnackbar,
    },
  };
};
