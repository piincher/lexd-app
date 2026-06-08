import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecordPayment } from '../../hooks/useOrderManagement';
import { hapticSuccess } from '@src/shared/lib/haptics';

interface UsePaymentSubmissionParams {
  orderId: string; orderCode: string; clientName: string; clientPhone?: string;
  currentBalance: number; amount: string; paymentMethod: string;
  referenceNumber: string; notes: string; proofImages: string[];
  proofSource?: 'camera' | 'gallery'; proofCapturedAt?: string;
  validate: () => boolean; errors: Record<string, string>;
}

export const usePaymentSubmission = (params: UsePaymentSubmissionParams) => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: recordPayment, isPending, error, isError } = useRecordPayment();

  const submitPayment = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const hasProof = params.proofImages.length > 0;
    const paymentData = {
      orderId: params.orderId,
      amount: parseFloat(params.amount),
      paymentMethod: params.paymentMethod,
      referenceNumber: params.referenceNumber || undefined,
      notes: params.notes || undefined,
      proofImages: hasProof ? params.proofImages : undefined,
      // Provenance for the proof-photo watermark/attestation (audit trail).
      source: hasProof ? params.proofSource : undefined,
      capturedAt: hasProof ? params.proofCapturedAt : undefined,
      recordedAt: new Date().toISOString(),
    };

    console.log('[RecordPaymentScreen] Submitting payment:', paymentData);

    recordPayment(paymentData, {
      onSuccess: (data) => {
        setIsSubmitting(false);
        console.log('[RecordPaymentScreen] Payment recorded:', data);

        const paymentV2Id = data.paymentV2Id || data.payment?.id;

        navigation.navigate('PaymentDetail', {
          paymentId: paymentV2Id || '', orderId: params.orderId, orderCode: params.orderCode,
          clientName: params.clientName, clientPhone: params.clientPhone,
          amount: parseFloat(params.amount), paymentMethod: params.paymentMethod,
          status: 'COMPLETED', paidAt: new Date().toISOString(),
          referenceNumber: params.referenceNumber, notes: params.notes,
          proofImages: params.proofImages, goodsIds: data.goodsIds || [],
        });
      },
      onError: (err) => {
        setIsSubmitting(false);
        console.error('[RecordPaymentScreen] Payment failed:', err);
        Alert.alert('Erreur', 'Échec de l\'enregistrement du paiement. Veuillez réessayer.');
      },
    });
  };

  const handleSubmit = () => {
    hapticSuccess();
    console.log('[RecordPaymentScreen] Submit clicked');

    if (!params.validate()) {
      console.log('[RecordPaymentScreen] Validation failed:', params.errors);
      return;
    }

    const parsedAmount = parseFloat(params.amount);

    if (parsedAmount > params.currentBalance) {
      const overage = parsedAmount - params.currentBalance;
      Alert.alert(
        'Overpayment Warning',
        `This amount exceeds the balance due by ${overage.toLocaleString()} FCFA.\n\nBalance due: ${params.currentBalance.toLocaleString()} FCFA\nPayment amount: ${parsedAmount.toLocaleString()} FCFA\n\nDo you want to proceed?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Proceed', style: 'destructive', onPress: () => submitPayment() },
        ]
      );
      return;
    }

    submitPayment();
  };

  return { handleSubmit, isSubmitting, isPending, isError, error };
};
