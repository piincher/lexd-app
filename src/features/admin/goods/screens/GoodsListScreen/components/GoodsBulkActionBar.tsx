import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

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

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.selectAllButton} onPress={onToggleSelectAll}>
          <View style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}>
            {isAllSelected && <Ionicons name="checkmark" size={16} color={Theme.colors.text.inverse} />}
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
        <TouchableOpacity
          style={[styles.actionButton, (selectedCount === 0 || isPending) && styles.actionButtonDisabled]}
          onPress={onAssignContainer}
          disabled={selectedCount === 0 || isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
          ) : (
            <>
              <Ionicons name="cube-outline" size={16} color={Theme.colors.text.inverse} />
              <Text style={styles.actionButtonText}>Assigner</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, (selectedCount === 0 || isPending) && styles.actionButtonDisabled]}
          onPress={onChangeStatus}
          disabled={selectedCount === 0 || isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
          ) : (
            <>
              <Ionicons name="swap-vertical-outline" size={16} color={Theme.colors.text.inverse} />
              <Text style={styles.actionButtonText}>Statut</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButtonDanger, (selectedCount === 0 || isPending) && styles.actionButtonDisabled]}
          onPress={onVoid}
          disabled={selectedCount === 0 || isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
          ) : (
            <>
              <Ionicons name="trash-outline" size={16} color={Theme.colors.text.inverse} />
              <Text style={styles.actionButtonText}>Annuler</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
    padding: 12,
    paddingBottom: 28,
    ...Theme.shadows.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Theme.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: Theme.primary[600],
    borderColor: Theme.primary[600],
  },
  selectAllText: {
    fontSize: 14,
    color: Theme.neutral[700],
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 14,
    color: Theme.status.error,
    fontWeight: '600',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[900],
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary[600],
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonDanger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.status.error,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonDisabled: {
    backgroundColor: Theme.neutral[300],
  },
  actionButtonText: {
    color: Theme.colors.text.inverse,
    fontWeight: '600',
    fontSize: 13,
  },
});
