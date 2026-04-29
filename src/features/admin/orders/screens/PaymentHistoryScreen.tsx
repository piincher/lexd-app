/**
 * PaymentHistoryScreen - Admin view of payment history for a specific order
 * Includes receipt viewing and WhatsApp sharing capabilities
 */

import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Screen } from '@src/shared/ui/Screen';
import { usePaymentHistory } from '../hooks/usePaymentHistory';
import { PaymentStats } from '../components/PaymentStats';
import { PaymentCard } from '../components/PaymentCard';
import { PaymentImageModal } from '../components/PaymentImageModal';
import { PaymentHistoryLoading } from '../components/PaymentHistoryLoading';
import { PaymentHistoryError } from '../components/PaymentHistoryError';
import { PaymentHistoryEmpty } from '../components/PaymentHistoryEmpty';
import { createPaymentHistoryScreenStyles } from './PaymentHistoryScreen.styles';

const PaymentHistoryScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createPaymentHistoryScreenStyles(colors), [colors]);
  const {
    orderCode,
    clientPhone,
    payments,
    isLoading,
    error,
    refetch,
    runBackfill,
    isBackfilling,
    hasMissingReceipts,
    totalPaid,
    selectedImage,
    setSelectedImage,
    sharingPaymentId,
    handleViewReceipt,
    handleShareOnWhatsApp,
  } = usePaymentHistory();

  if (isLoading) {
    return (
      <Screen header={{ title: 'Historique des paiements', showNotificationBell: true }}>
        <PaymentHistoryLoading />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen header={{ title: 'Historique des paiements', showNotificationBell: true }}>
        <PaymentHistoryError error={error as Error} onRetry={refetch} />
      </Screen>
    );
  }

  return (
    <Screen header={{ title: 'Historique des paiements', subtitle: orderCode, showNotificationBell: true }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {payments && payments.length > 0 ? (
          <>
            <PaymentStats
              paymentsCount={payments.length}
              totalPaid={totalPaid}
              hasMissingReceipts={hasMissingReceipts}
              isBackfilling={isBackfilling}
              onBackfill={runBackfill}
            />
            {payments.map((payment: any, index: number) => (
              <PaymentCard
                key={payment._id || index}
                payment={payment}
                clientPhone={clientPhone}
                sharingPaymentId={sharingPaymentId}
                onViewReceipt={handleViewReceipt}
                onShareWhatsApp={handleShareOnWhatsApp}
                onImagePress={setSelectedImage}
              />
            ))}
          </>
        ) : (
          <PaymentHistoryEmpty />
        )}
      </ScrollView>
      <PaymentImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </Screen>
  );
};

export default PaymentHistoryScreen;
