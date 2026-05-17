/**
 * useCreateContainerScreenUI - UI-specific hook for CreateContainerScreen
 * Responsibility: Navigation and UI interactions only
 */

import { useCallback } from 'react';
import { useCreateContainerScreen } from '../CreateContainer/hooks';

export const useCreateContainerScreenUI = () => {
  const screenState = useCreateContainerScreen();

  const {
    navigation,
    updateField,
  } = screenState;

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateRoute = useCallback(() => {
    navigation.navigate('RouteForm' as never, {} as never);
  }, [navigation]);

  const handleContainerNumberChange = useCallback((text: string) => {
    updateField('actualContainerNumber', text);
  }, [updateField]);

  const handleBookingReferenceChange = useCallback((text: string) => {
    updateField('bookingReference', text);
  }, [updateField]);

  return {
    ...screenState,
    handlers: {
      handleBack,
      handleCreateRoute,
      handleContainerNumberChange,
      handleBookingReferenceChange,
    },
  };
};
