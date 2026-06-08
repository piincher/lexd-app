import { useState } from 'react';
import { usePaymentImagePicker } from './usePaymentImagePicker';
import { usePaymentSubmission } from './usePaymentSubmission';

interface UseRecordPaymentScreenParams {
  orderId: string;
  orderCode: string;
  clientName: string;
  clientPhone?: string;
  currentBalance: number;
  totalAmount: number;
}

export const useRecordPaymentScreen = (params: UseRecordPaymentScreenParams) => {
  const { currentBalance } = params;

  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { proofImages, showImageModal, setShowImageModal, pickImage, removeImage, source, capturedAt } = usePaymentImagePicker();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { handleSubmit, isSubmitting, isPending, isError, error } = usePaymentSubmission({
    ...params,
    amount,
    paymentMethod,
    referenceNumber,
    notes,
    proofImages,
    proofSource: source,
    proofCapturedAt: capturedAt,
    validate,
    errors,
  });

  const getNewBalance = () => {
    const paid = parseFloat(amount) || 0;
    return Math.max(0, currentBalance - paid);
  };

  const getPaymentStatus = () => {
    const paid = parseFloat(amount) || 0;
    const newBalance = currentBalance - paid;
    if (newBalance <= 0) return 'PAID';
    if (paid > 0) return 'PARTIAL';
    return 'UNPAID';
  };

  return {
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    referenceNumber,
    setReferenceNumber,
    notes,
    setNotes,
    proofImages,
    errors,
    showImageModal,
    setShowImageModal,
    isSubmitting,
    isPending,
    isError,
    error,
    handleSubmit,
    pickImage,
    removeImage,
    newBalance: getNewBalance(),
    paymentStatus: getPaymentStatus(),
  };
};
