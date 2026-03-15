/**
 * Client Order Detail Screen
 * Clean order view for customers - max 100 lines, composition only
 */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useClientOrder } from '../hooks/useClientOrder';
import { OrderHeader, OrderSummary, PackageList } from '../components';
import { Theme } from '@src/constants/Theme';
import { styles } from './ClientOrderDetailScreen.styles';

export const ClientOrderDetailScreen: React.FC = () => {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const { data, isLoading, isError } = useClientOrder(orderId);

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <EmptyState
          title="Erreur de chargement"
          message="Impossible de charger les détails de la commande"
        />
      </Screen>
    );
  }

  const { order, activePackages } = data;

  return (
    <Screen header={{ title: 'Détails de la Commande', showBack: true }}>
      <View style={styles.container}>
        <OrderHeader order={order} />
        <OrderSummary order={order} />
        {activePackages.length > 0 && <PackageList packages={activePackages} />}
      </View>
    </Screen>
  );
};

export default ClientOrderDetailScreen;
