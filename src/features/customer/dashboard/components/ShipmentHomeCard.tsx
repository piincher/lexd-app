import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, RAIL_WIDTH, HAIRLINE } from '@src/shared/ui/designLanguage';
import type { useShipmentHome } from '../hooks/useShipmentHome';
import type { DashboardContainer } from '../api/types';

interface Props {
  shipmentHome: ReturnType<typeof useShipmentHome>;
  onPrimaryPress: (shipment?: DashboardContainer) => void;
  onViewContainers: () => void;
}

const formatMoney = (value: number) =>
  `${Math.round(value || 0).toLocaleString('fr-FR')} FCFA`;

export const ShipmentHomeCard: React.FC<Props> = ({
  shipmentHome,
  onPrimaryPress,
  onViewContainers,
}) => {
  const { colors } = useAppTheme();

  const { primary, copy, goodsPreview } = shipmentHome;
  const isAir = primary?.trackingType === 'AIRWAY_BILL' || primary?.shippingMode === 'AIR';
  // Air runs amber, sea runs brand green — matching the home service cards.
  const modeColor = isAir ? colors.accent.amber : colors.primary.main;

  const styles = StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 18 },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: RADIUS.card,
      padding: 16,
      paddingLeft: 16 + RAIL_WIDTH,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    rail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: RAIL_WIDTH },
    eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    eyebrowTick: { width: RAIL_WIDTH, height: 11, borderRadius: 1, backgroundColor: modeColor },
    eyebrow: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginTop: 8 },
    title: { flex: 1, fontSize: 20, fontWeight: '800', color: colors.text.primary },
    statusIcon: {
      width: 44,
      height: 44,
      borderRadius: RADIUS.control,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${modeColor}14`,
    },
    detail: { fontSize: 13, lineHeight: 19, color: colors.text.secondary, marginTop: 8 },
    // Manifest-style figures: bordered cells, not filled chips.
    metricRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
    metric: {
      flex: 1,
      borderRadius: RADIUS.control,
      padding: 10,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      backgroundColor: colors.background.default,
    },
    metricValue: { fontSize: 17, fontWeight: '800', color: colors.text.primary },
    metricLabel: {
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: colors.text.muted,
      marginTop: 3,
    },
    preview: { marginTop: 14, gap: 6 },
    previewText: { fontSize: 12, color: colors.text.secondary },
    // Outstanding balance is the one thing that earns the amber signal.
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 12,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: RADIUS.control,
      borderWidth: HAIRLINE,
      borderColor: colors.accent.amber,
      backgroundColor: colors.feedback.warningBg,
    },
    balanceLabel: {
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: colors.text.secondary,
    },
    balanceValue: { marginLeft: 'auto', fontSize: 13, fontWeight: '800', color: colors.text.primary },
    actionRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
    primaryAction: {
      flex: 1,
      minHeight: 48,
      borderRadius: RADIUS.control,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.main,
    },
    secondaryAction: {
      minHeight: 48,
      borderRadius: RADIUS.control,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      backgroundColor: colors.background.default,
    },
    primaryText: {
      color: colors.text.inverse,
      fontWeight: '800',
      fontSize: 12,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    secondaryText: {
      color: colors.primary.main,
      fontWeight: '800',
      fontSize: 12,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
  });

  if (!shipmentHome.hasShipments) {
    return null;
  }

  const previewLabel = goodsPreview
    .map((item) => item.description || item.goodsId)
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={[styles.rail, { backgroundColor: modeColor }]} pointerEvents="none" />

        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowTick} />
          <Text style={styles.eyebrow}>Mon expédition</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{copy?.label || 'Vos marchandises'}</Text>
          <View style={styles.statusIcon}>
            <Ionicons name={isAir ? 'airplane' : 'cube-outline'} size={22} color={modeColor} />
          </View>
        </View>
        <Text style={styles.detail}>{copy?.detail || 'Suivez vos marchandises et les prochaines étapes.'}</Text>

        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{shipmentHome.goodsCount}</Text>
            <Text style={styles.metricLabel}>Marchandises</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{shipmentHome.activeCount}</Text>
            <Text style={styles.metricLabel}>Expéditions actives</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{shipmentHome.readyCount}</Text>
            <Text style={styles.metricLabel}>Prêtes</Text>
          </View>
        </View>

        {!!previewLabel && (
          <View style={styles.preview}>
            <Text style={styles.previewText}>Dans cette expédition: {previewLabel}</Text>
          </View>
        )}
        {shipmentHome.balanceDue > 0 && (
          <View style={styles.balanceRow}>
            <Ionicons name="alert-circle-outline" size={15} color={colors.accent.amberDark} />
            <Text style={styles.balanceLabel}>Reste à payer</Text>
            <Text style={styles.balanceValue}>{formatMoney(shipmentHome.balanceDue)}</Text>
          </View>
        )}

        <View style={styles.actionRow}>
          <Pressable style={styles.primaryAction} onPress={() => onPrimaryPress(primary)}>
            <Text style={styles.primaryText}>{copy?.action || 'Voir le suivi'}</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={onViewContainers}>
            <Text style={styles.secondaryText}>Tous</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ShipmentHomeCard;
