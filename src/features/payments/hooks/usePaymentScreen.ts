import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useBalanceDue } from './usePayments';
import { usePaymentScreenData } from './usePaymentScreenData';
import { usePaymentScreenForm } from './usePaymentScreenForm';
import { usePaymentSubmission } from './usePaymentSubmission';

export const usePaymentScreen = () => {
  const navigation = useNavigation();
  const { amount: paramAmount, goodsIds, description } = usePaymentScreenData();
  const { data: balanceData } = useBalanceDue();
  const form = usePaymentScreenForm();
  const submission = usePaymentSubmission();

  const amount = paramAmount || balanceData?.totalDue || 0;

  const handlePay = useCallback(async () => {
    if (!form.selectedProvider || !form.isStepValid()) return;

    submission.setShowStatusModal(true);
    submission.setStatusModalConfig({
      status: 'processing',
      title: 'Processing',
      message: 'Please complete the payment on your device',
    });

    try {
      const result = await submission.initializePayment({
        provider: form.selectedProvider,
        amount,
        goodsIds: goodsIds.length > 0 ? goodsIds : undefined,
        phoneNumber: form.phoneNumber || undefined,
        description,
        metadata: form.getPaymentDetails(),
      });

      if (form.selectedProvider === 'ORANGE_MONEY' || form.selectedProvider === 'WAVE') {
        submission.startPolling(form.selectedProvider, result.providerTransactionId);
      } else {
        submission.handleCardPayment(result);
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      submission.setStatusModalConfig({
        status: 'error',
        title: 'Payment Failed',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [amount, goodsIds, description, form, submission]);

  const handleModalClose = useCallback(() => {
    submission.setShowStatusModal(false);
    if (submission.statusModalConfig.status === 'success') {
      navigation.goBack();
    }
  }, [submission, navigation]);

  const handleModalRetry = useCallback(() => {
    submission.setShowStatusModal(false);
    handlePay();
  }, [submission, handlePay]);

  const handleBack = useCallback(() => {
    if (form.selectedProvider) {
      form.setSelectedProvider(null);
    } else {
      navigation.goBack();
    }
  }, [form, navigation]);

  return {
    amount,
    goodsIds,
    ...form,
    ...submission,
    handlePay,
    handleModalClose,
    handleModalRetry,
    handleBack,
  };
};
