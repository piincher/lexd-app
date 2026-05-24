/**
 * useReceiveGoodsSubmit - Handles form submission and post-submit order assignment
 * Responsibility: Validate, mutate, parse response, and trigger auto-assign fallback.
 */

import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@src/constants/queryKey';
import { useReceiveGoods as useReceiveGoodsMutation } from '../../../hooks';
import { useReceiveGoodsResponseHandler } from './useReceiveGoodsResponseHandler';
import type { useReceiveGoodsForm } from './useReceiveGoodsForm';

type FormHook = ReturnType<typeof useReceiveGoodsForm>;

export const useReceiveGoodsSubmit = (
  formHook: FormHook,
  setIsSubmitted: (v: boolean) => void,
  setSuccessMessage: (v: string) => void,
  setShowSuccessDialog: (v: boolean) => void,
  setErrorMessage: (v: string | null) => void,
) => {
  const queryClient = useQueryClient();
  const receiveGoodsMutation = useReceiveGoodsMutation();
  const { handleResponse } = useReceiveGoodsResponseHandler(formHook, setSuccessMessage);

  const submitValid = useCallback(async () => {
    setIsSubmitted(true);

    if (!formHook.selectedClient) {
      Alert.alert('Erreur', 'Veuillez sélectionner un client');
      return;
    }

    const submitData = formHook.buildSubmitData();
    if (!submitData) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }

    try {
      console.log('[ReceiveGoods] Submitting goods...');
      const result = await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUris: formHook.photoUris.length > 0 ? formHook.photoUris : undefined,
      });

      await handleResponse(result, submitData);

      queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('[ReceiveGoods] Error:', error?.response?.data || error?.message || error);
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
    }
  }, [formHook, receiveGoodsMutation, handleResponse, setIsSubmitted, setShowSuccessDialog, setErrorMessage, queryClient]);

  const onInvalid = useCallback(() => {
    setIsSubmitted(true);
    setErrorMessage('Veuillez corriger les champs en rouge avant de continuer');
  }, [setIsSubmitted, setErrorMessage]);

  // Run RHF/zod validation first so incomplete forms can't submit NaN values.
  const handleSubmit = useCallback(
    () => formHook.handleSubmit(submitValid, onInvalid)(),
    [formHook, submitValid, onInvalid],
  );

  return { handleSubmit, isSubmitting: receiveGoodsMutation.isPending };
};
