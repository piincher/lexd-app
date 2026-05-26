import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@src/constants/queryKey';
import { useReceiveGoods as useReceiveGoodsMutation } from '../../../hooks';
import { useReceiveGoodsResponseHandler } from './useReceiveGoodsResponseHandler';
import { useDuplicateCandidates } from './useDuplicateCandidates';
import { confirmDuplicateCandidates } from './confirmDuplicateCandidates';
import type { useReceiveGoodsForm } from './useReceiveGoodsForm';
import type { ReceiveGoodsInput } from '../../../types';

type FormHook = ReturnType<typeof useReceiveGoodsForm>;

interface SubmitCallbacks {
  setIsSubmitted: (v: boolean) => void;
  setSuccessMessage: (v: string) => void;
  setShowSuccessDialog: (v: boolean) => void;
  setErrorMessage: (v: string | null) => void;
  onDuplicateWarning: (count: number) => void;
  onSaved: (result: unknown, input: ReceiveGoodsInput, mode: SubmitMode) => void | Promise<void>;
  onSavedAndNext: (message: string) => void;
}

type SubmitMode = 'finish' | 'next';

export const useReceiveGoodsSubmit = (formHook: FormHook, callbacks: SubmitCallbacks) => {
  const {
    setIsSubmitted,
    setSuccessMessage,
    setShowSuccessDialog,
    setErrorMessage,
    onDuplicateWarning,
    onSaved,
    onSavedAndNext,
  } = callbacks;

  const queryClient = useQueryClient();
  const receiveGoodsMutation = useReceiveGoodsMutation();
  const { handleResponse } = useReceiveGoodsResponseHandler(formHook);
  const { findCandidates } = useDuplicateCandidates();

  const runSubmit = useCallback(
    async (mode: SubmitMode) => {
      setIsSubmitted(true);

      const submitData = formHook.buildSubmitData();
      if (!submitData) {
        Alert.alert('Erreur', 'Sélectionnez un client ou marquez le colis comme client inconnu');
        return;
      }

      if (submitData.exceptionReasons?.includes('DAMAGED') && formHook.photoUris.length === 0) {
        setErrorMessage('Ajoutez au moins une photo pour une marchandise endommagée');
        return;
      }

      const candidates = await findCandidates(submitData);
      if (candidates.length > 0) {
        onDuplicateWarning(candidates.length);
        const proceed = await confirmDuplicateCandidates(candidates);
        if (!proceed) return;
      }

      try {
        const result = await receiveGoodsMutation.mutateAsync({
          data: submitData,
          photoUris: formHook.photoUris.length > 0 ? formHook.photoUris : undefined,
        });

        // Mint a fresh idempotency key the moment the mutation resolves — the next
        // parcel in a batch save (or a manual retry after this one) must NOT replay
        // the key we just committed, otherwise it would resolve to *this* goods.
        formHook.regenerateIdempotencyKey();
        // The draft on disk now represents a parcel that's been saved — wipe it so the
        // next mount doesn't auto-restore a stale draft on top of a fresh form.
        formHook.clearDraft().catch(() => {});

        const message = await handleResponse(result, submitData);

        formHook.persistLocation(submitData.location);
        await onSaved(result, submitData, mode);
        queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });

        if (mode === 'next') {
          onSavedAndNext(message);
        } else {
          setSuccessMessage(message);
          setShowSuccessDialog(true);
        }
      } catch (error: unknown) {
        const err = error as { message?: string; response?: { data?: { message?: string } } };
        console.error('[ReceiveGoods] Error:', err.response?.data || err.message || error);
        const serverMessage = err.message || err.response?.data?.message;
        setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
      }
    },
    [formHook, receiveGoodsMutation, handleResponse, findCandidates, onSaved, onDuplicateWarning, onSavedAndNext, setIsSubmitted, setSuccessMessage, setShowSuccessDialog, setErrorMessage, queryClient],
  );

  const onInvalid = useCallback(() => {
    setIsSubmitted(true);
    setErrorMessage('Veuillez corriger les champs en rouge avant de continuer');
  }, [setIsSubmitted, setErrorMessage]);

  const handleSubmit = useCallback(
    () => formHook.handleSubmit(() => runSubmit('finish'), onInvalid)(),
    [formHook, runSubmit, onInvalid],
  );

  const handleSubmitAndNext = useCallback(
    () => formHook.handleSubmit(() => runSubmit('next'), onInvalid)(),
    [formHook, runSubmit, onInvalid],
  );

  return { handleSubmit, handleSubmitAndNext, isSubmitting: receiveGoodsMutation.isPending };
};
