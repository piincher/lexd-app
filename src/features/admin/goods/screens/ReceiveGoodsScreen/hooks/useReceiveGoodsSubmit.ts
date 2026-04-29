/**
 * useReceiveGoodsSubmit - Handles form submission and post-submit order assignment
 * Responsibility: Validate, mutate, parse response, and trigger auto-assign fallback.
 */

import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@src/constants/queryKey';
import { useReceiveGoods as useReceiveGoodsMutation } from '../../../hooks';
import { useAutoAssignToOrder } from './useAutoAssignToOrder';
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
  const { autoAssignToOrder } = useAutoAssignToOrder();

  const handleSubmit = useCallback(async () => {
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

      console.log('[ReceiveGoods] Full response:', JSON.stringify(result));

      const res = result as any;
      const resData = res?.data || res;
      const goodsObj = resData?.goods || resData;
      const orderObj = resData?.order;
      const orderAction = resData?.orderAction;
      const orderCode = orderObj?.code;
      const goodsId = goodsObj?._id || goodsObj?.goodsId;

      console.log('[ReceiveGoods] Parsed:', { orderAction, orderCode, goodsId, orderIsNull: orderObj === null });

      if (orderAction) {
        if (orderObj && orderCode) {
          if (orderAction === 'added_to_existing') {
            setSuccessMessage(`Marchandise ajoutée à la commande ${orderCode}`);
          } else {
            setSuccessMessage(`Nouvelle commande ${orderCode} créée avec la marchandise`);
          }
        } else {
          console.warn('[ReceiveGoods] Backend reported order action without order object:', orderAction);
          setSuccessMessage('Marchandise enregistrée, mais la commande automatique n\'a pas été retournée');
        }
      } else if (goodsId && formHook.selectedClient) {
        console.log('[ReceiveGoods] Order is null from backend, creating on frontend. GoodsId:', goodsId);
        console.log('[ReceiveGoods] No orderAction from backend, creating order on frontend...');
        const orderResult = await autoAssignToOrder(goodsId, formHook.selectedClient, {
          weight: submitData.weight,
          quantity: submitData.quantity,
          unitPrice: submitData.unitPrice,
          shippingMode: submitData.shippingMode,
          actualCBM: submitData.actualCBM,
          description: submitData.description,
        });

        if (orderResult) {
          if (orderResult.action === 'added_to_existing') {
            setSuccessMessage(`Marchandise ajoutée à la commande ${orderResult.code}`);
          } else {
            setSuccessMessage(`Nouvelle commande ${orderResult.code} créée avec la marchandise`);
          }
        } else {
          setSuccessMessage('Marchandise enregistrée mais la commande n\'a pas pu être créée automatiquement');
        }
      } else {
        setSuccessMessage('Marchandise enregistrée avec succès!');
      }

      queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('[ReceiveGoods] Error:', error?.response?.data || error?.message || error);
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
    }
  }, [formHook, receiveGoodsMutation, autoAssignToOrder, setIsSubmitted, setSuccessMessage, setShowSuccessDialog, setErrorMessage, queryClient]);

  return { handleSubmit, isSubmitting: receiveGoodsMutation.isPending };
};
