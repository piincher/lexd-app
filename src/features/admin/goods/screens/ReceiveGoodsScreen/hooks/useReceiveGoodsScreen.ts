/**
 * useReceiveGoodsScreen - Screen-level hook
 * Responsibility: Orchestrate sub-hooks and assemble public API
 */

import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '@src/navigation/types';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';
import { useReceiveGoodsSubmit } from './useReceiveGoodsSubmit';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useReceiveGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Marchandise enregistrée avec succès!');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formHook = useReceiveGoodsForm({ initialQuantity: 1 });
  const { handleSubmit, isSubmitting } = useReceiveGoodsSubmit(
    formHook,
    setIsSubmitted,
    setSuccessMessage,
    setShowSuccessDialog,
    setErrorMessage,
  );

  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const dismissSuccess = useCallback(() => {
    setShowSuccessDialog(false);
    formHook.resetForm();
    setIsSubmitted(false);
    navigation.navigate('AdminGoodsList');
  }, [formHook, navigation]);

  const shippingMode = formHook.watch('shippingMode') || 'SEA';

  return {
    form: {
      control: formHook.control,
      errors: formHook.formState.errors,
      setValue: formHook.setValue,
      watch: formHook.watch,
      shippingMode,
      selectedClient: formHook.selectedClient,
      setSelectedClient: formHook.setSelectedClient,
      photoUris: formHook.photoUris,
      addPhotoUri: formHook.addPhotoUri,
      removePhotoUri: formHook.removePhotoUri,
      useDimensions: formHook.useDimensions,
      setUseDimensions: formHook.setUseDimensions,
      calculatedCBM: formHook.calculatedCBM,
      totalCost: formHook.totalCost,
      isSubmitted,
      onSubmit: handleSubmit,
    },
    ui: {
      isSubmitting,
      errorMessage,
      showSuccessDialog,
      successMessage,
    },
    actions: {
      dismissError,
      dismissSuccess,
    },
  };
};
