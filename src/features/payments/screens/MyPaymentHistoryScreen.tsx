import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { MyPaymentHistoryContent } from '../components/MyPaymentHistoryContent';
import { useMyPaymentHistoryScreen } from './hooks/useMyPaymentHistoryScreen';

export const MyPaymentHistoryScreen: React.FC = () => {
  const { handlers } = useMyPaymentHistoryScreen();

  return (
    <Screen
      header={{
        title: 'Historique des paiements',
        showBack: true,
        onBackPress: handlers.handleBack,
        showNotificationBell: true,
      }}
      scrollable={false}
    >
      <MyPaymentHistoryContent />
    </Screen>
  );
};

export default MyPaymentHistoryScreen;
