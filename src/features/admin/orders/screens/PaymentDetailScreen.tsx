/**
 * PaymentDetailScreen - Admin screen to view payment details and share receipt via WhatsApp
 * SRP: Layout composition only — composes payment info, client, order, receipt, and proof sections
 */

import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { getPaymentHistory } from '@src/api/order';
import { Screen } from '@src/shared/ui';
import { PaymentInfoCard } from '../components/PaymentInfoCard';
import { ClientInfoCard } from '../components/ClientInfoCard';
import { OrderInfoCard } from '../components/OrderInfoCard';
import { ReceiptSection } from '../components/ReceiptSection';
import { ProofImagesSection } from '../components/ProofImagesSection';

interface PaymentDetailScreenProps {
  route: {
    params: {
      paymentId: string;
      orderId?: string;
      orderCode: string;
      clientName: string;
      clientPhone?: string;
      amount: number;
      paymentMethod: string;
      status: string;
      paidAt: string;
      referenceNumber?: string;
      receiptNumber?: string;
      notes?: string;
      receiptUrl?: string;
      proofImages?: string[];
      goodsIds?: Array<{
        goodsId: string;
        description: string;
      }>;
    };
  };
}

const PaymentDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const params = (route.params || {}) as PaymentDetailScreenProps['route']['params'];

  const {
    paymentId,
    orderId,
    orderCode,
    clientName,
    clientPhone,
    amount,
    paymentMethod,
    status,
    paidAt,
    referenceNumber,
    notes,
    proofImages,
    goodsIds,
  } = params;

  // Receipt data may arrive late (generated in background), so poll for it
  const [receiptUrl, setReceiptUrl] = useState(params.receiptUrl || '');
  const [receiptNumber, setReceiptNumber] = useState(params.receiptNumber || '');
  const [receiptLoading, setReceiptLoading] = useState(!params.receiptUrl && !!orderId);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollCountRef = useRef(0);

  useEffect(() => {
    // If we already have the receipt URL, no need to poll
    if (receiptUrl || !orderId) {
      setReceiptLoading(false);
      return;
    }

    const pollForReceipt = async () => {
      try {
        const payments = await getPaymentHistory(orderId);
        // Match by paymentV2Id (PaymentV2 _id) or subdocument _id, or fallback to most recent
        const match = payments?.find((p: any) =>
          p.paymentV2Id === paymentId || p._id === paymentId
        ) || (payments?.length ? payments[0] : null);
        if (match?.receiptUrl) {
          setReceiptUrl(match.receiptUrl);
          setReceiptNumber(match.receiptNumber || '');
          setReceiptLoading(false);
          // Invalidate payment history cache so list screen also updates
          queryClient.invalidateQueries({ queryKey: ['paymentHistory', orderId] });
          return;
        }
      } catch (err) {
        // Ignore poll errors
      }

      pollCountRef.current += 1;
      // Poll up to 6 times (30 seconds total), then stop
      if (pollCountRef.current < 6) {
        pollRef.current = setTimeout(pollForReceipt, 5000);
      } else {
        setReceiptLoading(false);
      }
    };

    // Start first poll after 3 seconds
    pollRef.current = setTimeout(pollForReceipt, 3000);

    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [orderId, paymentId, receiptUrl]);

  return (
    <Screen 
      header={{ 
        title: 'Détails du paiement',
        showBack: true, 
        onBackPress: () => navigation.goBack() 
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <PaymentInfoCard
          paymentId={paymentId}
          amount={amount}
          paymentMethod={paymentMethod}
          status={status}
          paidAt={paidAt}
          referenceNumber={referenceNumber}
          notes={notes}
        />

        <ClientInfoCard
          clientName={clientName}
          clientPhone={clientPhone}
          amount={amount}
          receiptUrl={receiptUrl}
        />

        <OrderInfoCard
          orderCode={orderCode}
          goodsIds={goodsIds}
        />

        <ReceiptSection
          receiptUrl={receiptUrl}
          clientName={clientName}
          clientPhone={clientPhone}
          amount={amount}
          orderCode={orderCode}
          paymentMethod={paymentMethod}
          referenceNumber={referenceNumber}
          receiptNumber={receiptNumber}
          paidAt={paidAt}
          loading={receiptLoading}
        />

        <ProofImagesSection proofImages={proofImages} />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  bottomSpacer: {
    height: 32,
  },
});

export default PaymentDetailScreen;
