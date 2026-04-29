/**
 * PaymentDetailScreen - Admin screen to view payment details and share receipt via WhatsApp
 * SRP: Layout composition only — composes payment info, client, order, receipt, and proof sections
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { PaymentDetailContent } from '../components/PaymentDetailContent';
import { PaymentDetailRouteParams } from '../types';

const PaymentDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = (route.params || {}) as PaymentDetailRouteParams;

  return (
    <Screen
      header={{
        title: 'Détails du paiement',
        showBack: true,
        onBackPress: () => navigation.goBack(),
        showNotificationBell: true,
      }}
    >
      <PaymentDetailContent params={params} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default PaymentDetailScreen;
