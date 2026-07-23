import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { Loading } from '@src/shared/ui/Loading';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useWarehouseAddresses } from '../hooks/useWarehouseAddresses';
import { WarehouseAddressIntro } from '../components/WarehouseAddressIntro';
import { WarehouseAddressList } from '../components/WarehouseAddressList';

const MODE_ORDER = { SEA: 0, AIR: 1 } as const;

export const WarehouseAddressScreen: React.FC = () => {
  const { data, isLoading, isError, refetch } = useWarehouseAddresses();

  if (isLoading) return <Loading message="Chargement des adresses…" fullScreen />;
  if (isError || !data) {
    return (
      <EmptyState
        title="Erreur de chargement"
        message="Impossible de charger les adresses d'entrepôt."
        actionLabel="Réessayer"
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  const addresses = [...data].sort((a, b) => MODE_ORDER[a.mode] - MODE_ORDER[b.mode]);

  return (
    <Screen header={{ title: "Adresses d'entrepôt" }}>
      <View style={styles.container}>
        <WarehouseAddressIntro />

        <WarehouseAddressList addresses={addresses} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { gap: 16, padding: 16 },
});

export default WarehouseAddressScreen;
