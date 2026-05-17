/**
 * useGoodsDetailScreenUI - UI-specific hook for GoodsDetailScreen
 * Responsibility: Navigation and UI interactions only
 */

import { useCallback } from 'react';
import { useGoodsDetailScreen } from './useGoodsDetailScreen';

export const useGoodsDetailScreenUI = () => {
  const screenState = useGoodsDetailScreen();

  const {
    dialogs,
  } = screenState;

  const handleDismissAssignDialog = useCallback(() => {
    dialogs.setAssignDialogVisible(false);
  }, [dialogs.setAssignDialogVisible]);

  return {
    ...screenState,
    handlers: {
      handleDismissAssignDialog,
    },
  };
};
