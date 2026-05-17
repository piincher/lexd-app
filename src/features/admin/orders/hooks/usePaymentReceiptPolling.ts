import { useState, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getPaymentHistory } from '@src/api/payment';

export const usePaymentReceiptPolling = (
  orderId: string | undefined,
  paymentId: string,
  initialReceiptUrl?: string,
  initialReceiptNumber?: string
) => {
  const queryClient = useQueryClient();
  const [receiptUrl, setReceiptUrl] = useState(initialReceiptUrl || '');
  const [receiptNumber, setReceiptNumber] = useState(initialReceiptNumber || '');
  const [receiptLoading, setReceiptLoading] = useState(!initialReceiptUrl && !!orderId);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollCountRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (receiptUrl || !orderId) {
      setReceiptLoading(false);
      return;
    }

    const pollForReceipt = async () => {
      try {
        const payments = (await getPaymentHistory(orderId)) as any[];
        const match =
          payments?.find((p: any) => p.paymentV2Id === paymentId || p._id === paymentId) ||
          (payments?.length ? payments[0] : null);
        if (match?.receiptUrl) {
          setReceiptUrl(match.receiptUrl as string);
          setReceiptNumber((match.receiptNumber as string) || '');
          setReceiptLoading(false);
          queryClient.invalidateQueries({ queryKey: ['paymentHistory', orderId] });
          return;
        }
      } catch (err) {
        // Ignore poll errors
      }

      pollCountRef.current += 1;
      if (pollCountRef.current < 6) {
        if (isMountedRef.current) {
          pollRef.current = setTimeout(pollForReceipt, 5000);
        }
      } else {
        setReceiptLoading(false);
      }
    };

    pollRef.current = setTimeout(pollForReceipt, 3000);

    return () => {
      isMountedRef.current = false;
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [orderId, paymentId, receiptUrl]);

  return { receiptUrl, receiptNumber, receiptLoading };
};
