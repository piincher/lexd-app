/**
 * useReceiveGoodsScreen - Screen-level hook
 * Responsibility: Orchestrate form hook and UI state
 */

import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';
import { useReceiveGoods as useReceiveGoodsMutation } from '../../../hooks';
import { ApiClientError } from '@src/api/client';

type AdminV2StackParamList = {
  GoodsList: undefined;
  ReceiveGoods: undefined;
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useReceiveGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form hook
  const formHook = useReceiveGoodsForm({ initialQuantity: 1 });
  
  // Mutation hook
  const receiveGoodsMutation = useReceiveGoodsMutation();

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async () => {
    setIsSubmitted(true);

    // Validate client selection
    if (!formHook.selectedClient) {
      Alert.alert('Erreur', 'Veuillez sélectionner un client');
      return;
    }

    // Build submit data
    const submitData = formHook.buildSubmitData();
    if (!submitData) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }

    try {
      await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: formHook.photoUri || undefined,
      });
      setShowSuccessDialog(true);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(error.getUserMessage());
      } else {
        setErrorMessage('Une erreur inattendue est survenue');
      }
    }
  }, [formHook, receiveGoodsMutation]);

  /**
   * Dismiss error message
   */
  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  /**
   * Handle success dialog dismissal
   */
  const dismissSuccess = useCallback(() => {
    setShowSuccessDialog(false);
    formHook.resetForm();
    setIsSubmitted(false);
    navigation.navigate('GoodsList');
  }, [formHook, navigation]);

  return {
    // Form-related
    form: {
      control: formHook.control,
      errors: formHook.formState.errors,
      setValue: formHook.setValue,
      watch: formHook.watch,
      selectedClient: formHook.selectedClient,
      setSelectedClient: formHook.setSelectedClient,
      photoUri: formHook.photoUri,
      setPhotoUri: formHook.setPhotoUri,
      useDimensions: formHook.useDimensions,
      setUseDimensions: formHook.setUseDimensions,
      calculatedCBM: formHook.calculatedCBM,
      totalCost: formHook.totalCost,
      isSubmitted,
      onSubmit: handleSubmit,
    },
    // UI state
    ui: {
      isSubmitting: receiveGoodsMutation.isPending,
      errorMessage,
      showSuccessDialog,
    },
    // Actions
    actions: {
      dismissError,
      dismissSuccess,
    },
  };
};
