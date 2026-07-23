import React, { useCallback } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { Loading } from '@src/shared/ui/Loading';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShippingMarkPreview } from '../components/ShippingMarkPreview';
import { ShippingMarkGuide } from '../components/ShippingMarkGuide';
import { ClientIdBadge } from '../components/ClientIdBadge';
import { ShippingMarkActions } from '../components/ShippingMarkActions';
import { useShippingMark } from '../hooks/useShippingMark';
import { useShippingMarkActions } from '../hooks/useShippingMarkActions';

export const ShippingMarkScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<{ navigate: (screen: string) => void }>();
  const { data, isLoading, isError, refetch } = useShippingMark();
  const { handleDownload, handleShare, isDownloading } = useShippingMarkActions(data);

  // Re-fetch each time the screen gains focus so a client picks up a mark the
  // admin regenerated (new design → new image URL) without restarting the app.
  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [refetch]),
  );

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
        <Pressable
          onPress={() => navigation.navigate('WarehouseAddress')}
          style={({ pressed }) => [
            styles.link,
            { backgroundColor: colors.background.card, borderColor: colors.border },
            pressed && { opacity: 0.8 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Voir les adresses d'entrepôt"
        >
          <MaterialCommunityIcons name="warehouse" size={22} color={colors.status.info} />
          <View style={styles.linkText}>
            <Text style={[styles.linkTitle, { color: colors.text.primary }]}>Adresses d&apos;entrepôt</Text>
            <Text style={[styles.linkSub, { color: colors.text.secondary }]}>
              Adresse de réception en Chine à envoyer au fournisseur
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
        </Pressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  linkText: { flex: 1, minWidth: 0 },
  linkTitle: { fontSize: 15, fontWeight: '700' },
  linkSub: { fontSize: 12, marginTop: 2, lineHeight: 17 },
});
