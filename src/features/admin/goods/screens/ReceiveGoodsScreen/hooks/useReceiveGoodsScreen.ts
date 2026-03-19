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
import { AuthenticatedStackParamList } from '@src/navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useReceiveGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [createdGoodsId, setCreatedGoodsId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form hook
  const formHook = useReceiveGoodsForm({ initialQuantity: 1 });
  
  // Mutation hook
  const receiveGoodsMutation = useReceiveGoodsMutation();

  /**
   * Handle form submission - shows choice modal instead of directly submitting
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

    // Show choice modal instead of directly submitting
    setShowChoiceModal(true);
  }, [formHook]);

  /**
   * Handle creating new order (traditional flow)
   */
  const handleCreateNewOrder = useCallback(async () => {
    setShowChoiceModal(false);

    const submitData = formHook.buildSubmitData();
    if (!submitData) return;

    try {
      await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: formHook.photoUri || undefined,
      });
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('[ReceiveGoods] Error:', error);
      // ApiClientError has the message directly, or check response data
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
    }
  }, [formHook, receiveGoodsMutation]);

  /**
   * Handle assign to existing order - first create goods, then navigate
   */
  const handleAssignToExistingOrder = useCallback(async () => {
    setShowChoiceModal(false);

    const submitData = formHook.buildSubmitData();
    if (!submitData) return;

    try {
      const result = await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: formHook.photoUri || undefined,
      });
      
      // Extract goods ID from result and navigate to order selection
      // API returns { goods, order } in data
      const goodsId = result?.data?.goods?._id || result?.data?.goods?.id;
      if (goodsId) {
        navigation.navigate('SelectManualOrder', { goodsId });
      } else {
        setErrorMessage('Erreur: ID de marchandise non trouvé');
      }
    } catch (error: any) {
      console.error('[ReceiveGoods] Error:', error);
      // ApiClientError has the message directly, or check response data
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
    }
  }, [formHook, receiveGoodsMutation, navigation]);

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

  /**
   * Close choice modal
   */
  const closeChoiceModal = useCallback(() => {
    setShowChoiceModal(false);
  }, []);

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
      showChoiceModal,
    },
    // Actions
    actions: {
      dismissError,
      dismissSuccess,
      closeChoiceModal,
      createNewOrder: handleCreateNewOrder,
      assignToExistingOrder: handleAssignToExistingOrder,
    },
  };
};
