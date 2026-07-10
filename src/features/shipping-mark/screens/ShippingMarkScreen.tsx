import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { Loading } from '@src/shared/ui/Loading';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { ShippingMarkPreview } from '../components/ShippingMarkPreview';
import { ShippingMarkGuide } from '../components/ShippingMarkGuide';
import { ClientIdBadge } from '../components/ClientIdBadge';
import { ShippingMarkActions } from '../components/ShippingMarkActions';
import { useShippingMark } from '../hooks/useShippingMark';
import { useShippingMarkActions } from '../hooks/useShippingMarkActions';

export const ShippingMarkScreen: React.FC = () => {
  const { data, isLoading, isError, refetch } = useShippingMark();
  const { handleDownload, handleShare, isDownloading } = useShippingMarkActions(data);

  if (isLoading) return <Loading message="Chargement de votre marque..." fullScreen />;
  if (isError || !data) {
    return (
      <EmptyState
        title="Erreur de chargement"
        message="Impossible de charger la marque d'expédition."
        actionLabel="Réessayer"
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <Screen header={{ title: "Marque d'expédition" }}>
      <View style={styles.container}>
        <ShippingMarkGuide />
        <ShippingMarkPreview imageUrl={data.shippingMarkImageUrl} />
        <ClientIdBadge clientId={data.clientId} />
        <ShippingMarkActions
          onDownload={handleDownload}
          onShare={handleShare}
          isDownloading={isDownloading}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
});
