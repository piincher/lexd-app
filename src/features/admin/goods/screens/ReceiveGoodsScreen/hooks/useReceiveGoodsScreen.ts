/**
 * useReceiveGoodsScreen - Screen-level hook
 * Responsibility: Orchestrate form hook and UI state
 * Auto-assigns goods to existing order (< 7 days) or creates new order
 */

import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';
import { useReceiveGoods as useReceiveGoodsMutation } from '../../../hooks';
import { AuthenticatedStackParamList } from '@src/navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useReceiveGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('Marchandise enregistrée avec succès!');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form hook
  const formHook = useReceiveGoodsForm({ initialQuantity: 1 });
  
  // Mutation hook
  const receiveGoodsMutation = useReceiveGoodsMutation();

  /**
   * Handle form submission - auto-assigns to order or creates new one
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
      const result = await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: formHook.photoUri || undefined,
      });
      
      // Set success message based on order action
      const orderAction = result?.data?.orderAction;
      const orderCode = result?.data?.order?.code;
      
      if (orderAction === 'added_to_existing' && orderCode) {
        setSuccessMessage(`Marchandise ajoutée à la commande ${orderCode}`);
      } else if (orderAction === 'created_new' && orderCode) {
        setSuccessMessage(`Nouvelle commande ${orderCode} créée avec la marchandise`);
      } else {
        setSuccessMessage('Marchandise enregistrée avec succès!');
      }
      
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('[ReceiveGoods] Error:', error);
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
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
    navigation.navigate('AdminGoodsList');
  }, [formHook, navigation]);

  // Watch shipping mode for UI display and validation
  const shippingMode = formHook.watch('shippingMode') || 'SEA';

  return {
    // Form-related
    form: {
      control: formHook.control,
      errors: formHook.formState.errors,
      setValue: formHook.setValue,
      watch: formHook.watch,
      shippingMode,
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
      successMessage,
    },
    // Actions
    actions: {
      dismissError,
      dismissSuccess,
    },
  };
};
