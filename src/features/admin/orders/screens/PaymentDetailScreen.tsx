/**
 * PaymentDetailScreen - Admin screen to view payment details and share receipt via WhatsApp
 * SRP: Layout composition only — composes payment info, client, order, receipt, and proof sections
 */

import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { PaymentDetailContent } from '../components/PaymentDetailContent';
import { usePaymentDetailScreen } from './hooks/usePaymentDetailScreen';

const PaymentDetailScreen: React.FC = () => {
  const { params, handlers } = usePaymentDetailScreen();

  return (
    <Screen
      header={{
        title: 'Détails du paiement',
        showBack: true,
        onBackPress: handlers.handleBack,
        showNotificationBell: true,
      }}
    >
      <PaymentDetailContent params={params} />
    </Screen>
  );
};

export default PaymentDetailScreen;
