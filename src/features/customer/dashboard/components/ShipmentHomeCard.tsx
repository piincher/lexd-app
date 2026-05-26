import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { useShipmentHome } from '../hooks/useShipmentHome';
import type { DashboardContainer } from '../api/types';
import { Theme } from '@src/constants/Theme';

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
  const { colors, isDark } = useAppTheme();
  const styles = StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 18 },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    eyebrow: { fontSize: 12, fontWeight: '700', color: colors.text.secondary },
    titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginTop: 8 },
    title: { flex: 1, fontSize: 20, fontWeight: '800', color: colors.text.primary },
    statusIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${colors.status.info}12`,
    },
    detail: { fontSize: 13, lineHeight: 19, color: colors.text.secondary, marginTop: 8 },
    metricRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
    metric: {
      flex: 1,
      borderRadius: 12,
      padding: 10,
      backgroundColor: colors.background.paper,
    },
    metricValue: { fontSize: 16, fontWeight: '800', color: colors.text.primary },
    metricLabel: { fontSize: 11, fontWeight: '600', color: colors.text.secondary, marginTop: 2 },
    preview: { marginTop: 14, gap: 6 },
    previewText: { fontSize: 12, color: colors.text.secondary },
    actionRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
    primaryAction: {
      flex: 1,
      minHeight: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.main,
    },
    secondaryAction: {
      minHeight: 48,
      borderRadius: 12,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
    },
    primaryText: { color: colors.text.inverse, fontWeight: '800', fontSize: 13 },
    secondaryText: { color: colors.primary.main, fontWeight: '800', fontSize: 13 },
  });

  if (!shipmentHome.hasShipments) {
    return null;
  }

  const { primary, copy, goodsPreview } = shipmentHome;
  const isAir = primary?.trackingType === 'AIRWAY_BILL' || primary?.shippingMode === 'AIR';
  const previewLabel = goodsPreview
    .map((item) => item.description || item.goodsId)
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Mon expédition</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{copy?.label || 'Vos marchandises'}</Text>
          <View style={styles.statusIcon}>
            <Ionicons name={isAir ? 'airplane' : 'cube-outline'} size={22} color={colors.status.info} />
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
          <Text style={[styles.previewText, { marginTop: 10 }]}>
            Reste à payer: {formatMoney(shipmentHome.balanceDue)}
          </Text>
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
