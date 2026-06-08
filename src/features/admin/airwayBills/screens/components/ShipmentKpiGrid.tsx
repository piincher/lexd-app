/**
 * ShipmentKpiGrid — compact KPI cards + optional capacity utilization bar.
 *
 * Rendered with a slight upward overlap onto the hero so the key numbers read
 * as one unit with the identity header (the validated "asymmetric KPI" style).
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export interface KpiItem {
  icon: MaterialIconName;
  value: string | number;
  label: string;
}

interface CapacityInfo {
  used: number;
  total: number;
  unit?: string;
}

interface ShipmentKpiGridProps {
  items: KpiItem[];
  capacity?: CapacityInfo;
  /** Pull the grid up over the hero's rounded bottom. */
  overlap?: boolean;
}

export const ShipmentKpiGrid: React.FC<ShipmentKpiGridProps> = ({ items, capacity, overlap = true }) => {
  const { colors } = useAppTheme();

  const capacityPct =
    capacity && capacity.total > 0 ? Math.min(100, Math.round((capacity.used / capacity.total) * 100)) : null;
  const capacityColor =
    capacityPct == null
      ? colors.primary.main
      : capacityPct >= 95
        ? colors.status.error
        : capacityPct >= 80
          ? colors.status.warning
          : colors.status.success;

  return (
    <View style={[styles.wrap, overlap && styles.overlap]}>
      <View style={styles.grid}>
        {items.map((item, i) => (
          <View
            key={`${item.label}-${i}`}
            style={[styles.cell, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}
          >
            <MaterialCommunityIcons name={item.icon} size={18} color={colors.primary.main} />
            <Text style={[styles.value, { color: colors.text.primary }]} numberOfLines={1}>
              {item.value}
            </Text>
            <Text style={[styles.label, { color: colors.text.secondary }]} numberOfLines={1}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {capacity && capacityPct != null && (
        <View style={[styles.capacityCard, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
          <View style={styles.capacityHeader}>
            <Text style={[styles.capacityLabel, { color: colors.text.secondary }]}>Capacité utilisée</Text>
            <Text style={[styles.capacityValue, { color: capacityColor }]}>
              {capacity.used.toFixed(1)} / {capacity.total.toFixed(1)} {capacity.unit || 'kg'} · {capacityPct}%
            </Text>
          </View>
          <View style={[styles.capacityTrack, { backgroundColor: colors.neutral[200] }]}>
            <View style={[styles.capacityFill, { width: `${capacityPct}%`, backgroundColor: capacityColor }]} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  overlap: { marginTop: -18 },
  grid: { flexDirection: 'row', gap: 10 },
  cell: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  value: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  label: { fontSize: 11, fontWeight: '600' },
  capacityCard: {
    borderRadius: 14,
    padding: 14,
    gap: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  capacityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  capacityLabel: { fontSize: 12, fontWeight: '600' },
  capacityValue: { fontSize: 12, fontWeight: '800' },
  capacityTrack: { height: 8, borderRadius: 999, overflow: 'hidden' },
  capacityFill: { height: '100%', borderRadius: 999 },
});

export default ShipmentKpiGrid;
