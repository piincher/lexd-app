import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface OrderBulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  isPending: boolean;
  onToggleSelectAll: () => void;
  onChangeStatus: () => void;
  onCancel: () => void;
}

export const OrderBulkActionBar: React.FC<OrderBulkActionBarProps> = ({
  selectedCount,
  totalCount,
  isPending,
  onToggleSelectAll,
  onChangeStatus,
  onCancel,
}) => {
  if (totalCount === 0) return null;

  const isAllSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.selectAllButton} onPress={onToggleSelectAll}>
          <View style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}>
            {isAllSelected && <Ionicons name="checkmark" size={16} color="#FFF" />}
          </View>
          <Text style={styles.selectAllText}>
            {isAllSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.countText}>{selectedCount} sélectionné(s)</Text>
        <TouchableOpacity
          style={[styles.actionButton, (selectedCount === 0 || isPending) && styles.actionButtonDisabled]}
          onPress={onChangeStatus}
          disabled={selectedCount === 0 || isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.actionButtonText}>Changer statut</Text>
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
    backgroundColor: Theme.neutral.white,
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
    marginBottom: 12,
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[900],
  },
  actionButton: {
    backgroundColor: Theme.primary[600],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonDisabled: {
    backgroundColor: Theme.neutral[300],
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
