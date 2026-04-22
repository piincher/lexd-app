/**
 * CargoBagCard - Card component for cargo bag list
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { CargoBag, CargoBagStatus } from '../../types';

interface CargoBagCardProps {
  item: CargoBag;
  onPress: (id: string) => void;
}

const STATUS_CONFIG: Record<
  CargoBagStatus,
  { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom'; color: string }
> = {
  PACKED: { label: 'Emballé', variant: 'custom', color: '#6B7280' },
  CHECKED_IN: { label: 'Enregistré', variant: 'info', color: '#3B82F6' },
  LOADED: { label: 'Chargé', variant: 'warning', color: '#D4AF37' },
  IN_TRANSIT: { label: 'En transit', variant: 'info', color: '#3B82F6' },
  ARRIVED: { label: 'Arrivé', variant: 'success', color: '#16A34A' },
  CLEARED: { label: 'Dédouané', variant: 'custom', color: '#4ECDC4' },
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const CargoBagCard: React.FC<CargoBagCardProps> = ({ item, onPress }) => {
  const { colors } = useAppTheme();
  const statusConfig = STATUS_CONFIG[item.status];
  const arrivedDate = formatDate(item.arrivedAt);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item._id)}
      style={[
        styles.container,
        {
          backgroundColor: colors.background.card,
          borderLeftColor: statusConfig.color,
          shadowColor: colors.neutral[900],
        },
      ]}
      accessibilityLabel={`Sac de cargo ${item.bagNumber}, statut ${statusConfig.label}`}
    >
      {/* Top Row: Bag Number + Status */}
      <View style={styles.headerRow}>
        <View style={styles.bagContainer}>
          <MaterialCommunityIcons name="bag-personal-outline" size={18} color={colors.primary.main} />
          <Text style={[styles.bagNumber, { color: colors.text.primary }]}>{item.bagNumber}</Text>
        </View>
        <Badge
          label={statusConfig.label}
          variant={statusConfig.variant}
          backgroundColor={`${statusConfig.color}18`}
          textColor={statusConfig.color}
        />
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
          <MaterialCommunityIcons name="package-variant" size={13} color={colors.primary.main} />
          <Text style={[styles.statPillText, { color: colors.text.secondary }]}>
            {item.totalPackages} colis
          </Text>
        </View>
        <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
          <MaterialCommunityIcons name="weight-kilogram" size={13} color={colors.primary.main} />
          <Text style={[styles.statPillText, { color: colors.text.secondary }]}>
            {item.totalWeight.toFixed(1)} kg
          </Text>
        </View>
        <View style={[styles.statPill, { backgroundColor: colors.background.paper }]}>
          <MaterialCommunityIcons name="cube-outline" size={13} color={colors.primary.main} />
          <Text style={[styles.statPillText, { color: colors.text.secondary }]}>
            {item.goodsCount} article{item.goodsCount > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Footer: Arrived date if present */}
      {arrivedDate && (
        <View style={styles.footerRow}>
          <MaterialCommunityIcons name="calendar-check" size={14} color={colors.status.success} />
          <Text style={[styles.footerText, { color: colors.text.secondary }]}>
            Arrivé le {arrivedDate}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 16, padding: 16, marginBottom: 12, borderLeftWidth: 4, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  bagContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  bagNumber: { fontSize: 16, fontWeight: '700', letterSpacing: -0.2 },
  statsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  statPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statPillText: { fontSize: 12, fontWeight: '600' },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)', paddingTop: 10 },
  footerText: { fontSize: 12, fontWeight: '500' },
});

export default CargoBagCard;
