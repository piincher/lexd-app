import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { MyPaymentHistoryContent } from '../components/MyPaymentHistoryContent';

export const MyPaymentHistoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <Screen
      header={{
        title: 'Historique des paiements',
        showBack: true,
        onBackPress: () => navigation.goBack(),
        showNotificationBell: true,
      }}
      scrollable={false}
    >
      <MyPaymentHistoryContent />
    </Screen>
  );
};

export default MyPaymentHistoryScreen;
