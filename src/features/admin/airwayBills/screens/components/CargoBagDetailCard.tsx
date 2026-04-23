/**
 * CargoBagDetailCard - Expanded detail view of a cargo bag
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { Card } from '@src/shared/ui/Card';
import { Button } from '@src/shared/ui/Button';
import { CargoBag, CargoBagStatus } from '../../types';

interface GoodsMiniItem {
  _id: string;
  goodsId: string;
  description?: string;
  weight: number;
}

interface CargoBagDetailCardProps {
  cargoBag: CargoBag;
  goods: GoodsMiniItem[];
  onChangeStatus: () => void;
  onAddGoods: () => void;
  onRemoveGoods: () => void;
  onDelete: () => void;
}

const STATUS_CONFIG: Record<CargoBagStatus, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom'; color: string }> = {
  PACKED: { label: 'Emballé', variant: 'custom', color: Theme.colors.text.secondary },
  CHECKED_IN: { label: 'Enregistré', variant: 'info', color: '#3B82F6' },
  LOADED: { label: 'Chargé', variant: 'warning', color: '#D4AF37' },
  IN_TRANSIT: { label: 'En transit', variant: 'info', color: '#3B82F6' },
  ARRIVED: { label: 'Arrivé', variant: 'success', color: '#16A34A' },
  CLEARED: { label: 'Dédouané', variant: 'custom', color: '#4ECDC4' },
};

export const CargoBagDetailCard: React.FC<CargoBagDetailCardProps> = ({
  cargoBag,
  goods,
  onChangeStatus,
  onAddGoods,
  onRemoveGoods,
  onDelete,
}) => {
  const { colors } = useAppTheme();
  const statusConfig = STATUS_CONFIG[cargoBag.status];
  const isEmpty = goods.length === 0;

  return (
    <View>
      {/* Main Info Card */}
      <Card style={{ ...styles.card, borderLeftColor: statusConfig.color }} padding="large">
        <View style={styles.headerRow}>
          <View style={styles.bagInfo}>
            <MaterialCommunityIcons name="bag-personal-outline" size={22} color={colors.primary.main} />
            <Text style={[styles.bagNumber, { color: colors.text.primary }]}>{cargoBag.bagNumber}</Text>
          </View>
          <Badge
            label={statusConfig.label}
            variant={statusConfig.variant}
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
              {cargoBag.totalWeight.toFixed(1)} kg
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Poids</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text.primary }]}>{cargoBag.goodsCount}</Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Articles</Text>
          </View>
        </View>

        {cargoBag.notes && (
          <View style={styles.notesRow}>
            <MaterialCommunityIcons name="text-box-outline" size={14} color={colors.text.muted} />
            <Text style={[styles.notesText, { color: colors.text.secondary }]}>{cargoBag.notes}</Text>
          </View>
        )}
      </Card>

      {/* Goods List */}
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Marchandises ({goods.length})
      </Text>
      {goods.map((g) => (
        <Card key={g._id} style={styles.goodsCard} padding="medium">
          <View style={styles.goodsRow}>
            <MaterialCommunityIcons name="cube-outline" size={18} color={colors.primary.main} />
            <View style={styles.goodsInfo}>
              <Text style={[styles.goodsId, { color: colors.text.primary }]}>{g.goodsId}</Text>
              {g.description && (
                <Text style={[styles.goodsDesc, { color: colors.text.secondary }]} numberOfLines={1}>
                  {g.description}
                </Text>
              )}
            </View>
            <Text style={[styles.goodsWeight, { color: colors.text.muted }]}>{g.weight.toFixed(1)} kg</Text>
          </View>
        </Card>
      ))}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button title="Changer statut" onPress={onChangeStatus} variant="secondary" fullWidth />
        <Button title="+ Ajouter marchandises" onPress={onAddGoods} variant="outline" fullWidth />
        {!isEmpty && (
          <Button title="Retirer marchandises" onPress={onRemoveGoods} variant="outline" fullWidth />
        )}
        {isEmpty && <Button title="Supprimer le sac" onPress={onDelete} variant="danger" fullWidth />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16, borderLeftWidth: 4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  bagInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  bagNumber: { fontSize: 18, fontWeight: '800' },
  statsGrid: { flexDirection: 'row', gap: 16 },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  statValue: { fontSize: 16, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  notesRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)' },
  notesText: { fontSize: 13, fontWeight: '500', flex: 1, lineHeight: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  goodsCard: { marginBottom: 8 },
  goodsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  goodsInfo: { flex: 1 },
  goodsId: { fontSize: 14, fontWeight: '700' },
  goodsDesc: { fontSize: 13, marginTop: 2 },
  goodsWeight: { fontSize: 12, fontWeight: '600' },
  actions: { marginTop: 16, gap: 10 },
});

export default CargoBagDetailCard;
