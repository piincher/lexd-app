/**
 * UserPaymentDetailScreen
 * Shows the full detail of a payment recorded by admin on user's behalf.
 * Users can view and open their receipt PDF from this screen.
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { useUserPaymentDetailScreen } from './hooks/useUserPaymentDetailScreen';
import { useUserPaymentDetailScreenStyles } from './UserPaymentDetailScreen.styles';
import { UserPaymentDetailAmountCard } from '../components/UserPaymentDetailAmountCard';
import { UserPaymentDetailReceiptCard } from '../components/UserPaymentDetailReceiptCard';
import { UserPaymentDetailInfoCard } from '../components/UserPaymentDetailInfoCard';
import { UserPaymentDetailNotesCard } from '../components/UserPaymentDetailNotesCard';
import { UserPaymentDetailRecordedByCard } from '../components/UserPaymentDetailRecordedByCard';

const UserPaymentDetailScreen: React.FC = () => {
  const {
    payment,
    methodConfig,
    statusConfig,
    receiptUrl,
    formattedDate,
    handlers,
  } = useUserPaymentDetailScreen();

  const styles = useUserPaymentDetailScreenStyles();

  return (
    <Screen
      header={{
        title: 'Détail du paiement',
        showBack: true,
        onBackPress: handlers.handleBack,
        showNotificationBell: true,
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <UserPaymentDetailAmountCard
          amount={payment.amountFCFA}
          methodConfig={methodConfig}
          statusConfig={statusConfig}
          formattedDate={formattedDate}
        />
        <UserPaymentDetailReceiptCard
          receiptUrl={receiptUrl}
          receiptNumber={payment.receiptNumber}
          onOpenReceipt={handlers.handleOpenReceipt}
        />
        <UserPaymentDetailInfoCard
          payment={payment}
          methodConfig={methodConfig}
          formattedDate={formattedDate}
        />
        {payment.notes && <UserPaymentDetailNotesCard notes={payment.notes} />}
        {payment.createdBy && <UserPaymentDetailRecordedByCard createdBy={payment.createdBy} />}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
};

export default UserPaymentDetailScreen;
