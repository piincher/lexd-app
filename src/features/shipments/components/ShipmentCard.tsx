/**
 * ShipmentCard — one row in the unified shipment list.
 *
 * Replaces three different cards the customer used to meet depending on
 * whether they entered via Commandes, Mes Marchandises, or Expéditions. One
 * shipment now reads the same wherever it appears.
 *
 * Reading order is deliberate: reference and route first (what is it), then
 * the progress rail (where is it), then contents and ETA (the detail). Status
 * is encoded in the rail color as well as the badge, so the state of a list
 * is legible in a glance down the leading edge without reading any text.
 */

import React, { memo, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, RAIL_WIDTH, HAIRLINE } from '@src/shared/ui/designLanguage';
import {
  ShipmentTimeline,
  stageLabel,
  type Shipment,
} from '@src/entities/shipment';

interface Props {
  shipment: Shipment;
  onPress: (shipment: Shipment) => void;
}

const formatDate = (iso?: string) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const ShipmentCardInner: React.FC<Props> = ({ shipment, onPress }) => {
  const { colors } = useAppTheme();

  const isAir = shipment.mode === 'AIR';
  const modeColor = isAir ? colors.accent.amber : colors.primary.main;

  // The rail carries state: amber when the customer must act, muted once
  // delivered, red on an exception, otherwise the transport mode's color.
  const railColor = shipment.exception
    ? colors.status.error
    : shipment.needsAction
      ? colors.accent.amber
      : shipment.stage === 'DELIVERED'
        ? colors.text.disabled
        : modeColor;

  const s = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.background.card,
          borderRadius: RADIUS.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          paddingVertical: 14,
          paddingRight: 14,
          paddingLeft: 14 + RAIL_WIDTH,
          marginBottom: 10,
          overflow: 'hidden',
        },
        rail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: RAIL_WIDTH },
        topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
        modeTile: {
          width: 36,
          height: 36,
          borderRadius: RADIUS.control,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${modeColor}14`,
        },
        headText: { flex: 1, minWidth: 0 },
        reference: {
          fontSize: 15,
          fontWeight: '800',
          letterSpacing: 0.4,
          color: colors.text.primary,
        },
        route: { fontSize: 11.5, color: colors.text.secondary, marginTop: 2 },
        badge: {
          paddingHorizontal: 7,
          paddingVertical: 3,
          borderRadius: RADIUS.badge,
          backgroundColor: `${railColor}1A`,
        },
        badgeText: {
          fontSize: 9.5,
          fontWeight: '700',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: railColor,
        },
        timelineWrap: { marginTop: 14, marginBottom: 2 },
        metaRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 12,
          paddingTop: 10,
          borderTopWidth: HAIRLINE,
          borderTopColor: colors.border,
        },
        meta: { fontSize: 10.5, color: colors.text.secondary },
        metaRule: { width: HAIRLINE, height: 9, backgroundColor: colors.border },
        eta: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4 },
        etaLabel: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: colors.text.muted,
        },
        etaValue: { fontSize: 11, fontWeight: '700', color: colors.text.primary },
        delayed: { color: colors.status.error },
      }),
    [colors, modeColor, railColor],
  );

  const eta = formatDate(shipment.estimatedArrival);
  // "colis" is invariable in French — no plural branch needed.
  const contentsLabel =
    shipment.itemCount > 0 ? `${shipment.itemCount} colis` : 'Contenu à confirmer';

  return (
    <Pressable
      onPress={() => onPress(shipment)}
      style={({ pressed }) => [s.card, pressed && { opacity: 0.9 }]}
      accessibilityRole="button"
      accessibilityLabel={`Envoi ${shipment.reference}, ${stageLabel(shipment.stage)}`}
    >
      <View style={[s.rail, { backgroundColor: railColor }]} pointerEvents="none" />

      <View style={s.topRow}>
        <View style={s.modeTile}>
          <MaterialCommunityIcons
            name={isAir ? 'airplane' : 'ferry'}
            size={19}
            color={modeColor}
          />
        </View>

        <View style={s.headText}>
          <Text style={s.reference} numberOfLines={1}>
            {shipment.reference}
          </Text>
          {shipment.origin || shipment.destination ? (
            <Text style={s.route} numberOfLines={1}>
              {shipment.origin || '—'} → {shipment.destination || '—'}
            </Text>
          ) : null}
        </View>

        <View style={s.badge}>
          <Text style={s.badgeText} numberOfLines={1}>
            {shipment.exception === 'CANCELLED' ? 'Annulé' : stageLabel(shipment.stage, 'À confirmer')}
          </Text>
        </View>
      </View>

      {/* Compact five-milestone rail — the same component the record screen
          renders at full depth, so progress reads identically in both. */}
      {!shipment.exception ? (
        <View style={s.timelineWrap}>
          <ShipmentTimeline stage={shipment.stage} mode={shipment.mode} variant="compact" />
        </View>
      ) : null}

      <View style={s.metaRow}>
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={12}
          color={colors.text.muted}
        />
        <Text style={s.meta}>{contentsLabel}</Text>

        {shipment.carrier ? (
          <>
            <View style={s.metaRule} />
            <Text style={s.meta} numberOfLines={1}>
              {shipment.carrier}
            </Text>
          </>
        ) : null}

        {eta ? (
          <View style={s.eta}>
            <Text style={s.etaLabel}>{shipment.isDelayed ? 'Retard' : 'Arrivée'}</Text>
            <Text style={[s.etaValue, shipment.isDelayed && s.delayed]}>{eta}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export const ShipmentCard = memo(ShipmentCardInner);
export default ShipmentCard;
