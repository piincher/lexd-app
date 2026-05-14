import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { Card } from '@src/shared/ui/Card';
import { CARGO_BAG_STATUS_CONFIG, CARGO_BAG_STATUS_LABELS } from '../../constants';
import type { CargoBag } from '../../types';

interface Props {
  cargoBag: CargoBag;
}

export const CargoBagDetailInfoCard: React.FC<Props> = ({ cargoBag }) => {
  const { colors } = useAppTheme();
  const statusConfig = CARGO_BAG_STATUS_CONFIG[cargoBag.status];
  const bagCardStyle = StyleSheet.flatten([
    styles.bagCard,
    { borderLeftColor: statusConfig.color },
  ]);

  return (
    <Card style={bagCardStyle} padding="large">
      <View style={styles.bagHeaderRow}>
        <View style={styles.bagInfo}>
          <MaterialCommunityIcons name="bag-personal-outline" size={22} color={colors.primary.main} />
          <Text style={[styles.bagNumber, { color: colors.text.primary }]}>{cargoBag.bagNumber}</Text>
        </View>
        <Badge
          label={CARGO_BAG_STATUS_LABELS[cargoBag.status]}
          variant="custom"
          backgroundColor={`${statusConfig.color}18`}
          textColor={statusConfig.color}
        />
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>{cargoBag.totalPackages}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Colis</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            {cargoBag.totalWeight?.toFixed?.(1) || cargoBag.totalWeight} kg
          </Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Poids</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>{cargoBag.goodsCount}</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Articles</Text>
        </View>
      </View>

      {cargoBag.routeName && (
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name="map-marker-path" size={14} color={colors.text.muted} />
          <Text style={[styles.routeText, { color: colors.text.secondary }]} numberOfLines={2}>
            {cargoBag.routeName}
          </Text>
        </View>
      )}

      {cargoBag.notes && (
        <View style={styles.notesRow}>
          <MaterialCommunityIcons name="text-box-outline" size={14} color={colors.text.muted} />
          <Text style={[styles.notesText, { color: colors.text.secondary }]}>{cargoBag.notes}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  bagCard: { marginBottom: 16, borderLeftWidth: 4 },
  bagHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  bagInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  bagNumber: { fontSize: 18, fontWeight: '800' },
  statsGrid: { flexDirection: 'row', gap: 16 },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  statValue: { fontSize: 16, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  routeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Theme.colors.divider },
  routeText: { fontSize: 13, fontWeight: '700', flex: 1, lineHeight: 18 },
  notesRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Theme.colors.divider },
  notesText: { fontSize: 13, fontWeight: '500', flex: 1, lineHeight: 18 },
});
