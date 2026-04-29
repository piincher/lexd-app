/**
 * UserPaymentDetailScreen
 * Shows the full detail of a payment recorded by admin on user's behalf.
 * Users can view and open their receipt PDF from this screen.
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useUserPaymentDetail } from '../hooks/useUserPaymentDetail';
import { UserPaymentDetailAmountCard } from '../components/UserPaymentDetailAmountCard';
import { UserPaymentDetailReceiptCard } from '../components/UserPaymentDetailReceiptCard';
import { UserPaymentDetailInfoCard } from '../components/UserPaymentDetailInfoCard';
import { UserPaymentDetailNotesCard } from '../components/UserPaymentDetailNotesCard';
import { UserPaymentDetailRecordedByCard } from '../components/UserPaymentDetailRecordedByCard';

const UserPaymentDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    payment,
    navigation,
    methodConfig,
    statusConfig,
    receiptUrl,
    formattedDate,
    handleOpenReceipt,
  } = useUserPaymentDetail();

  return (
    <Screen
      header={{
        title: 'Détail du paiement',
        showBack: true,
        onBackPress: () => navigation.goBack(),
        showNotificationBell: true,
      }}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background.paper }]}
        showsVerticalScrollIndicator={false}
      >
        <UserPaymentDetailAmountCard
          amount={payment.amountFCFA}
          methodConfig={methodConfig}
          statusConfig={statusConfig}
          formattedDate={formattedDate}
        />
        <UserPaymentDetailReceiptCard
          receiptUrl={receiptUrl}
          receiptNumber={payment.receiptNumber}
          onOpenReceipt={handleOpenReceipt}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default UserPaymentDetailScreen;
