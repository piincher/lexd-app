/**
 * ShipmentsScreen — "Envois".
 *
 * The single answer to "where is my stuff?", replacing three peer tabs
 * (Commandes, Mes Marchandises, Expéditions) that split one shipment across
 * the operational entities the back office uses. Goods are no longer a
 * destination; they are the contents of a shipment.
 */

import React, { useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE, RAIL_WIDTH } from '@src/shared/ui/designLanguage';
import type { Shipment } from '@src/entities/shipment';
import { useShipments } from '../hooks/useShipments';
import { ShipmentCard } from '../components/ShipmentCard';
import { ShipmentFilterBar } from '../components/ShipmentFilterBar';

export const ShipmentsScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const {
    shipments,
    counts,
    filter,
    setFilter,
    isLoading,
    isError,
    refreshing,
    refresh,
  } = useShipments();

  const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background.paper },
    header: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 12,
      backgroundColor: colors.background.default,
      borderBottomWidth: HAIRLINE,
      borderBottomColor: colors.border,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    tick: { width: RAIL_WIDTH, height: 15, backgroundColor: colors.primary.main, borderRadius: 1 },
    title: { fontSize: 22, fontWeight: '800', letterSpacing: -0.3, color: colors.text.primary },
    subtitle: { fontSize: 12, color: colors.text.secondary, marginTop: 3, marginLeft: RAIL_WIDTH + 7 },
    filters: { paddingVertical: 10, backgroundColor: colors.background.default },
    list: { padding: 16, paddingTop: 14, paddingBottom: 40 },

    state: { alignItems: 'center', paddingHorizontal: 32, paddingTop: 72, gap: 10 },
    stateIcon: {
      width: 56,
      height: 56,
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.card,
      marginBottom: 4,
    },
    stateTitle: { fontSize: 16, fontWeight: '700', color: colors.text.primary, textAlign: 'center' },
    stateBody: { fontSize: 13, lineHeight: 19, color: colors.text.secondary, textAlign: 'center' },

    skeleton: {
      height: 132,
      borderRadius: RADIUS.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      backgroundColor: colors.background.card,
      marginBottom: 10,
    },
  });

  const openShipment = useCallback(
    (shipment: Shipment) => {
      navigation.navigate('ShipmentDetail', {
        shipmentId: shipment.sourceId,
        source: shipment.source,
      });
    },
    [navigation],
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.skeleton} />
          ))}
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.state}>
          <View style={styles.stateIcon}>
            <MaterialCommunityIcons name="wifi-off" size={24} color={colors.status.error} />
          </View>
          <Text style={styles.stateTitle}>Impossible de charger vos envois</Text>
          <Text style={styles.stateBody}>
            Vérifiez votre connexion, puis tirez vers le bas pour réessayer.
          </Text>
        </View>
      );
    }

    // An empty filter is a different situation from having no shipments at
    // all, and saying so avoids implying the customer has nothing shipping.
    const filtered = filter !== 'all';
    return (
      <View style={styles.state}>
        <View style={styles.stateIcon}>
          <MaterialCommunityIcons
            name={filtered ? 'filter-remove-outline' : 'package-variant'}
            size={24}
            color={colors.text.muted}
          />
        </View>
        <Text style={styles.stateTitle}>
          {filtered ? 'Aucun envoi dans cette vue' : 'Aucun envoi pour le moment'}
        </Text>
        <Text style={styles.stateBody}>
          {filtered
            ? 'Essayez un autre filtre pour voir vos autres envois.'
            : "Dès que vos colis arriveront à notre entrepôt en Chine, vous les suivrez ici."}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.tick} />
          <Text style={styles.title}>Envois</Text>
        </View>
        <Text style={styles.subtitle}>
          {counts.action > 0
            ? `${counts.action} prêt${counts.action > 1 ? 's' : ''} à retirer`
            : `${counts.active} en cours`}
        </Text>
      </View>

      <View style={styles.filters}>
        <ShipmentFilterBar value={filter} onChange={setFilter} counts={counts} />
      </View>

      <FlatList
        data={shipments}
        keyExtractor={(item) => `${item.source}:${item.id}`}
        renderItem={({ item }) => <ShipmentCard shipment={item} onPress={openShipment} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default ShipmentsScreen;
