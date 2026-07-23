/**
 * ShipmentDetailScreen — the single shipment record.
 *
 * Replaces six tracking surfaces (order detail, goods detail, airway-bill
 * tracking, container tracking, transit view, packing list entry) with one
 * screen whose shape does not change with transport mode. Sea and air differ
 * only in iconography and carrier line.
 *
 * Section order answers the questions in the order customers ask them:
 * where is it → when does it land → what is inside → what can I do.
 */

import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE, RAIL_WIDTH } from '@src/shared/ui/designLanguage';
import { ShipmentTimeline, stageLabel } from '@src/entities/shipment';
import { useShipmentDetail, type ShipmentSource } from '../hooks/useShipmentDetail';
import { ShipmentContents } from '../components/ShipmentContents';

type Params = { shipmentId: string; source: ShipmentSource };

const formatDate = (iso?: string) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const ShipmentDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { shipmentId, source } = (route.params || {}) as Params;

  const { shipment, isLoading, isError, notFound, refetch, isRefetching } = useShipmentDetail(
    shipmentId,
    source,
  );

  const isAir = shipment?.mode === 'AIR';
  const modeColor = isAir ? colors.accent.amber : colors.primary.main;

  const s = useMemo(
    () =>
      StyleSheet.create({
        screen: { flex: 1, backgroundColor: colors.background.paper },
        appbar: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: colors.background.default,
          borderBottomWidth: HAIRLINE,
          borderBottomColor: colors.border,
        },
        iconBtn: {
          width: 40,
          height: 40,
          borderRadius: RADIUS.control,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
        appbarTitle: {
          flex: 1,
          fontSize: 15,
          fontWeight: '800',
          letterSpacing: 0.4,
          color: colors.text.primary,
        },
        content: { padding: 16, paddingBottom: 48, gap: 12 },

        card: {
          backgroundColor: colors.background.card,
          borderRadius: RADIUS.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          padding: 16,
          overflow: 'hidden',
        },
        railCard: { paddingLeft: 16 + RAIL_WIDTH },
        rail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: RAIL_WIDTH },

        sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
        tick: { width: RAIL_WIDTH, height: 11, borderRadius: 1, backgroundColor: colors.primary.main },
        sectionLabel: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: colors.text.secondary,
        },

        heroTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
        modeTile: {
          width: 44,
          height: 44,
          borderRadius: RADIUS.control,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${modeColor}14`,
        },
        reference: {
          fontSize: 19,
          fontWeight: '800',
          letterSpacing: 0.4,
          color: colors.text.primary,
        },
        carrier: { fontSize: 11.5, color: colors.text.secondary, marginTop: 2 },
        statusRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginTop: 14,
          paddingTop: 12,
          borderTopWidth: HAIRLINE,
          borderTopColor: colors.border,
        },
        statusText: { fontSize: 13, fontWeight: '700', color: colors.text.primary },
        routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
        routeText: { fontSize: 12, color: colors.text.secondary, flex: 1 },

        etaValue: { fontSize: 15, fontWeight: '800', color: colors.text.primary },
        etaLate: { color: colors.status.error },
        etaNote: { fontSize: 11.5, color: colors.text.secondary, marginTop: 3 },

        action: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 13,
          borderTopWidth: HAIRLINE,
          borderTopColor: colors.border,
        },
        actionText: { flex: 1, fontSize: 13.5, fontWeight: '600', color: colors.text.primary },

        state: { alignItems: 'center', paddingHorizontal: 32, paddingTop: 80, gap: 10 },
        stateIcon: {
          width: 56,
          height: 56,
          borderRadius: RADIUS.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          backgroundColor: colors.background.card,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        },
        stateTitle: { fontSize: 16, fontWeight: '700', color: colors.text.primary, textAlign: 'center' },
        stateBody: { fontSize: 13, lineHeight: 19, color: colors.text.secondary, textAlign: 'center' },
        skeleton: {
          height: 120,
          borderRadius: RADIUS.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          backgroundColor: colors.background.card,
        },
      }),
    [colors, modeColor],
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const renderState = (icon: any, title: string, body: string) => (
    <View style={s.state}>
      <View style={s.stateIcon}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.text.muted} />
      </View>
      <Text style={s.stateTitle}>{title}</Text>
      <Text style={s.stateBody}>{body}</Text>
    </View>
  );

  let body: React.ReactNode;

  if (isLoading) {
    body = (
      <View style={s.content}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={s.skeleton} />
        ))}
      </View>
    );
  } else if (isError) {
    body = renderState(
      'wifi-off',
      'Impossible de charger cet envoi',
      'Vérifiez votre connexion, puis tirez vers le bas pour réessayer.',
    );
  } else if (notFound || !shipment) {
    body = renderState(
      'file-search-outline',
      'Envoi introuvable',
      "Cet envoi n'existe plus ou n'est pas rattaché à votre compte.",
    );
  } else {
    const eta = formatDate(shipment.estimatedArrival);
    const departed = formatDate(shipment.departedAt);

    body = (
      <View style={s.content}>
        {/* --- identity + current status --- */}
        <View style={[s.card, s.railCard]}>
          <View style={[s.rail, { backgroundColor: modeColor }]} pointerEvents="none" />
          <View style={s.heroTop}>
            <View style={s.modeTile}>
              <MaterialCommunityIcons
                name={isAir ? 'airplane' : 'ferry'}
                size={22}
                color={modeColor}
              />
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={s.reference} numberOfLines={1}>
                {shipment.reference}
              </Text>
              <Text style={s.carrier} numberOfLines={1}>
                {shipment.carrier || (isAir ? 'Fret aérien' : 'Fret maritime')}
              </Text>
            </View>
          </View>

          <View style={s.statusRow}>
            <MaterialCommunityIcons
              name="progress-clock"
              size={16}
              color={colors.primary.main}
            />
            <Text style={s.statusText}>{stageLabel(shipment.stage)}</Text>
          </View>

          {shipment.origin || shipment.destination ? (
            <View style={s.routeRow}>
              <MaterialCommunityIcons name="map-marker-path" size={16} color={colors.text.muted} />
              <Text style={s.routeText} numberOfLines={1}>
                {shipment.origin || '—'} → {shipment.destination || '—'}
              </Text>
            </View>
          ) : null}
        </View>

        {/* --- arrival --- */}
        {eta || departed ? (
          <View style={s.card}>
            <View style={s.sectionHead}>
              <View style={s.tick} />
              <Text style={s.sectionLabel}>Arrivée estimée</Text>
            </View>
            <Text style={[s.etaValue, shipment.isDelayed && s.etaLate]}>{eta || '—'}</Text>
            <Text style={s.etaNote}>
              {shipment.isDelayed
                ? `Retard estimé de ${shipment.delayDays ?? 0} jour(s). Nous vous tenons informé.`
                : departed
                  ? `Départ effectué le ${departed}.`
                  : 'La date sera confirmée au départ.'}
            </Text>
          </View>
        ) : null}

        {/* --- the journey --- */}
        <View style={s.card}>
          <View style={s.sectionHead}>
            <View style={s.tick} />
            <Text style={s.sectionLabel}>Suivi</Text>
          </View>
          <ShipmentTimeline
            stage={shipment.stage}
            mode={shipment.mode}
            variant="detail"
            dates={{ DEPARTED: shipment.departedAt, ARRIVED: shipment.estimatedArrival }}
          />
        </View>

        {/* --- contents --- */}
        <View style={s.card}>
          <View style={s.sectionHead}>
            <View style={s.tick} />
            <Text style={s.sectionLabel}>Contenu</Text>
          </View>
          <ShipmentContents
            items={shipment.contents}
            totalWeightKg={shipment.totalWeightKg}
            totalCbm={shipment.totalCbm}
          />
        </View>

        {/* --- documents, only where one exists --- */}
        {shipment.source === 'container' && shipment.containerRef ? (
          <View style={s.card}>
            <View style={s.sectionHead}>
              <View style={s.tick} />
              <Text style={s.sectionLabel}>Documents</Text>
            </View>
            <Pressable
              style={s.action}
              onPress={() =>
                navigation.navigate('ClientPackingList', { containerId: shipment.sourceId })
              }
              accessibilityRole="button"
            >
              <MaterialCommunityIcons
                name="file-document-outline"
                size={19}
                color={colors.primary.main}
              />
              <Text style={s.actionText}>Liste de colisage</Text>
              <MaterialCommunityIcons name="chevron-right" size={19} color={colors.text.muted} />
            </Pressable>
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <View style={s.appbar}>
        <Pressable
          onPress={goBack}
          style={s.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Retour"
        >
          <MaterialCommunityIcons name="chevron-left" size={22} color={colors.text.primary} />
        </Pressable>
        <Text style={s.appbarTitle} numberOfLines={1}>
          {shipment?.reference || 'Envoi'}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary.main}
            colors={[colors.primary.main]}
          />
        }
      >
        {body}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShipmentDetailScreen;
