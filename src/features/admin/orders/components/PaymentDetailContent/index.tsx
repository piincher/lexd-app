import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PaymentInfoCard } from '../PaymentInfoCard';
import { ClientInfoCard } from '../ClientInfoCard';
import { OrderInfoCard } from '../OrderInfoCard';
import { ReceiptSection } from '../ReceiptSection';
import { ProofImagesSection } from '../ProofImagesSection';
import { usePaymentReceiptPolling } from '../../hooks';
import { PaymentDetailRouteParams } from '../../types';

interface PaymentDetailContentProps {
  params: PaymentDetailRouteParams;
}

export const PaymentDetailContent: React.FC<PaymentDetailContentProps> = ({ params }) => {
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
    receiptUrl: initialReceiptUrl,
    receiptNumber: initialReceiptNumber,
  } = params;

  const { receiptUrl, receiptNumber, receiptLoading } = usePaymentReceiptPolling(
    orderId,
    paymentId,
    initialReceiptUrl,
    initialReceiptNumber
  );

  return (
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

      <OrderInfoCard orderCode={orderCode} goodsIds={goodsIds} />

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});
