import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './GoodsBulkActionBar.styles';
import { BulkActionButton } from './BulkActionButton';

interface GoodsBulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  isPending: boolean;
  onToggleSelectAll: () => void;
  onAssignContainer: () => void;
  onChangeStatus: () => void;
  onVoid: () => void;
  onCancel: () => void;
}

export const GoodsBulkActionBar: React.FC<GoodsBulkActionBarProps> = ({
  selectedCount,
  totalCount,
  isPending,
  onToggleSelectAll,
  onAssignContainer,
  onChangeStatus,
  onVoid,
  onCancel,
}) => {
  const { colors } = useAppTheme();
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
      <Text style={styles.countText}>{selectedCount} sélectionné(s)</Text>
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
        <BulkActionButton
          icon="trash-outline"
          label="Annuler"
          isPending={isPending}
          disabled={isDisabled}
          variant="danger"
          onPress={onVoid}
        />
      </View>
    </View>
  );
};
