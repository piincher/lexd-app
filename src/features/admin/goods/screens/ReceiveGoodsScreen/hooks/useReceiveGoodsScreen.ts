import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '@src/navigation/types';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';
import { useReceiveGoodsSubmit } from './useReceiveGoodsSubmit';
import { useReceiveAssistSession } from './useReceiveAssistSession';
import { useReceiveFeedbackState } from './useReceiveFeedbackState';
import { useReceivePricingRules } from './useReceivePricingRules';
import { useReceiveLabel } from './useReceiveLabel';
import { useRecentClients } from './useRecentClients';
import type { userData } from '@src/shared/types/user';
import type { ReceiveGoodsInput } from '../../../types';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useReceiveGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const feedback = useReceiveFeedbackState();
  const formHook = useReceiveGoodsForm({ initialQuantity: 1 });
  const session = useReceiveAssistSession();
  const pricing = useReceivePricingRules();
  const label = useReceiveLabel();
  const recents = useRecentClients();

  // Track recent clients on selection (not just on save) so the rail shows whoever the
  // operator picked from search even if they cancel the intake before submitting.
  const handleSelectClient = useCallback((client: userData | null) => {
    formHook.setSelectedClient(client);
    if (client) recents.addRecentClient(client);
  }, [formHook, recents]);
  const shippingMode = formHook.watch('shippingMode') || 'SEA';
  const unitPrice = formHook.watch('unitPrice');
  const exceptionReasons = formHook.watch('exceptionReasons') || [];

  useEffect(() => {
    if (unitPrice) return;
    const suggestion = pricing.getSuggestedPrice(shippingMode);
    if (suggestion) formHook.setValue('unitPrice', String(suggestion));
  }, [formHook, pricing, shippingMode, unitPrice]);

  const handleSaved = useCallback(async (result: unknown, input: ReceiveGoodsInput, mode: 'finish' | 'next') => {
    session.addSavedGoods(result, input, formHook.selectedClient);
    pricing.rememberPrice(input.shippingMode || 'SEA', input.unitPrice);
    await label.prepareLabel(result, mode === 'finish');
  }, [formHook.selectedClient, label, pricing, session]);

  const handleSavedAndNext = useCallback((message: string) => {
    feedback.setSessionCount((c) => c + 1);
    feedback.setInfoMessage(message);
    feedback.setIsSubmitted(false);
    formHook.resetForNext();
  }, [feedback, formHook]);

  const { handleSubmit, handleSubmitAndNext, isSubmitting } = useReceiveGoodsSubmit(formHook, {
    setIsSubmitted: feedback.setIsSubmitted,
    setSuccessMessage: feedback.setSuccessMessage,
    setShowSuccessDialog: feedback.setShowSuccessDialog,
    setErrorMessage: feedback.setErrorMessage,
    onDuplicateWarning: feedback.bumpDuplicateWarnings,
    onSaved: handleSaved,
    onSavedAndNext: handleSavedAndNext,
  });

  const dismissSuccess = useCallback(() => {
    feedback.setShowSuccessDialog(false);
    formHook.resetForm();
    feedback.resetFeedback();
    session.resetSession();
    setTimeout(() => {
      navigation.navigate('AdminGoodsList');
    }, 300);
  }, [feedback, formHook, navigation, session]);

  return {
    form: {
      control: formHook.control, errors: formHook.formState.errors, setValue: formHook.setValue,
      watch: formHook.watch, shippingMode, selectedClient: formHook.selectedClient,
      setSelectedClient: handleSelectClient, photoUris: formHook.photoUris,
      addPhotoUri: formHook.addPhotoUri, removePhotoUri: formHook.removePhotoUri,
      useDimensions: formHook.useDimensions, setUseDimensions: formHook.setUseDimensions,
      calculatedCBM: formHook.calculatedCBM, totalCost: formHook.totalCost,
      isSubmitted: feedback.isSubmitted, isClientUnknown: exceptionReasons.includes('CLIENT_UNKNOWN'),
      recentClients: recents.recentClients,
      priceWarning: pricing.getPriceWarning(shippingMode, unitPrice),
      notifyWhatsapp: formHook.notifyWhatsapp, setNotifyWhatsapp: formHook.setNotifyWhatsapp,
      onSubmit: handleSubmit, onSubmitAndNext: handleSubmitAndNext,
    },
    ui: {
      isSubmitting, errorMessage: feedback.errorMessage, infoMessage: feedback.infoMessage,
      showSuccessDialog: feedback.showSuccessDialog, successMessage: feedback.successMessage,
      sessionCount: feedback.sessionCount, sessionItems: session.items,
      sessionStats: session.stats, duplicateWarnings: feedback.duplicateWarnings,
      labelGoods: label.labelGoods, labelVisible: label.labelVisible,
    },
    actions: {
      dismissError: feedback.dismissError, dismissInfo: feedback.dismissInfo, dismissSuccess,
      removeSessionItem: session.removeItem, openLabel: label.openLabel, dismissLabel: label.dismissLabel,
    },
  };
};
