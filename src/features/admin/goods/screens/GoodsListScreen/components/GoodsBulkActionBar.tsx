import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsBulkActionBar.styles';
import { BulkActionButton } from './BulkActionButton';

export interface BulkSelectionTotals {
  count: number;
  weight: number;
  cbm: number;
  cost: number;
}

interface GoodsBulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  isPending: boolean;
  onToggleSelectAll: () => void;
  onAssignContainer: () => void;
  onChangeStatus: () => void;
  onVoid: () => void;
  /** Optional — export the current selection to PDF. */
  onExportPdf?: () => void;
  /** Optional — when provided, renders a separated permanent-delete row. */
  onHardDelete?: () => void;
  onCancel: () => void;
  /** Optional — when provided, replaces the "X sélectionné(s)" line with a 4-metric
   *  strip (count · weight · CBM · cost) so the operator sees the shape of the batch
   *  before acting on it. */
  totals?: BulkSelectionTotals | null;
}

export const GoodsBulkActionBar: React.FC<GoodsBulkActionBarProps> = ({
  selectedCount,
  totalCount,
  isPending,
  onToggleSelectAll,
  onAssignContainer,
  onChangeStatus,
  onVoid,
  onExportPdf,
  onHardDelete,
  onCancel,
  totals,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  if (totalCount === 0) return null;

  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isDisabled = selectedCount === 0 || isPending;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.selectAllButton} onPress={onToggleSelectAll}>
          <View style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}>
            {isAllSelected && <Ionicons name="checkmark" size={16} color={colors.text.inverse} />}
          </View>
          <Text style={styles.selectAllText}>
            {isAllSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      </View>
      {totals && totals.count > 0 ? (
        <View style={styles.totalsStrip}>
          <View style={styles.totalsCell}>
            <Text style={styles.totalsLabel}>SÉLECTION</Text>
            <Text style={styles.totalsValue}>{totals.count}</Text>
          </View>
          <View style={styles.totalsDivider} />
          <View style={styles.totalsCell}>
            <Text style={styles.totalsLabel}>POIDS</Text>
            <Text style={styles.totalsValue} numberOfLines={1}>{`${totals.weight.toFixed(1)} kg`}</Text>
          </View>
          <View style={styles.totalsDivider} />
          <View style={styles.totalsCell}>
            <Text style={styles.totalsLabel}>CBM</Text>
            <Text style={styles.totalsValue} numberOfLines={1}>{`${totals.cbm.toFixed(2)} m³`}</Text>
          </View>
          <View style={styles.totalsDivider} />
          <View style={styles.totalsCell}>
            <Text style={styles.totalsLabel}>COÛT</Text>
            <Text style={styles.totalsValue} numberOfLines={1}>{`${Math.round(totals.cost).toLocaleString('fr-FR')}`}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.countText}>{selectedCount} sélectionné(s)</Text>
      )}
      <View style={styles.actionsRow}>
        <BulkActionButton
          icon="cube-outline"
          label="Assigner"
          isPending={isPending}
          disabled={isDisabled}
          onPress={onAssignContainer}
        />
        <BulkActionButton
          icon="swap-vertical-outline"
          label="Statut"
          isPending={isPending}
          disabled={isDisabled}
          onPress={onChangeStatus}
        />
        {onExportPdf && (
          <BulkActionButton
            icon="document-text-outline"
            label="PDF"
            isPending={false}
            disabled={selectedCount === 0}
            onPress={onExportPdf}
          />
        )}
        <BulkActionButton
          icon="trash-outline"
          label="Annuler"
          isPending={isPending}
          disabled={isDisabled}
          variant="danger"
          onPress={onVoid}
        />
      </View>

      {/* Permanent removal sits on its own row, outlined (not solid red) so it can't be
          confused with the "Annuler" void above and isn't reachable by mis-tap. */}
      {onHardDelete && (
        <TouchableOpacity
          style={[styles.hardDeleteButton, isDisabled && styles.hardDeleteButtonDisabled]}
          onPress={onHardDelete}
          disabled={isDisabled}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-bin" size={16} color={isDisabled ? colors.text.disabled : colors.status.error} />
          <Text style={[styles.hardDeleteText, isDisabled && { color: colors.text.disabled }]}>
            Supprimer définitivement
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
