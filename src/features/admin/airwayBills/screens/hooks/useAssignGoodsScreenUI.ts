/**
 * useAssignGoodsScreenUI - UI-specific hook for AssignGoodsScreen
 * Responsibility: Navigation and UI interactions only
 */

import { useCallback } from 'react';
import { useAssignGoodsScreen } from './useAssignGoodsScreen';

export const useAssignGoodsScreenUI = () => {
  const screenState = useAssignGoodsScreen();

  const {
    navigation,
    setCreateBagVisible,
    handleCreateBag,
  } = screenState;

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateBagPress = useCallback(() => {
    setCreateBagVisible(true);
  }, [setCreateBagVisible]);

  const handleDismissCreateBag = useCallback(() => {
    setCreateBagVisible(false);
  }, [setCreateBagVisible]);

  const handleSubmitCreateBag = useCallback((_: string, notes: string) => {
    handleCreateBag(notes);
  }, [handleCreateBag]);

  return {
    ...screenState,
    handlers: {
      handleBack,
      handleCreateBagPress,
      handleDismissCreateBag,
      handleSubmitCreateBag,
    },
  };
};
