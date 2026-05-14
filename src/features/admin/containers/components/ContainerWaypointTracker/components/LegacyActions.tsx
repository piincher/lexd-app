import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../../types';

interface LegacyActionsProps {
  waypoint: ContainerWaypoint;
  index: number;
  onMarkArrived?: (index: number) => void;
  onMarkDeparted?: (index: number) => void;
  onAddNotes?: (index: number) => void;
  onUpdateInfo?: (index: number) => void;
}

export const LegacyActions: React.FC<LegacyActionsProps> = ({
  waypoint,
  index,
  onMarkArrived,
  onMarkDeparted,
  onAddNotes,
  onUpdateInfo,
}) => {
  return (
    <View style={styles.actionButtons}>
      {(waypoint.status === 'PENDING' || waypoint.status === 'IN_PROGRESS') && onMarkArrived && (
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={() => onMarkArrived(index)}>
          <Ionicons name="checkmark-circle" size={18} color="#FFF" />
          <Text style={styles.actionButtonTextPrimary}>Marquer comme Arrivé</Text>
        </TouchableOpacity>
      )}
      {(waypoint.status === 'ARRIVED' || waypoint.status === 'ARRIVED_AT_PORT') && onMarkDeparted && (
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={() => onMarkDeparted(index)}>
          <Ionicons name="rocket" size={18} color="#FFF" />
          <Text style={styles.actionButtonTextPrimary}>Marquer comme Départ</Text>
        </TouchableOpacity>
      )}
      {onAddNotes && (
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]} onPress={() => onAddNotes(index)}>
          <Ionicons name="create" size={18} color={Theme.primary[600]} />
          <Text style={styles.actionButtonTextSecondary}>Ajouter des Notes</Text>
        </TouchableOpacity>
      )}
      {onUpdateInfo && (
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]} onPress={() => onUpdateInfo(index)}>
          <Ionicons name="refresh" size={18} color={Theme.primary[600]} />
          <Text style={styles.actionButtonTextSecondary}>Mettre à jour</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonPrimary: {
    backgroundColor: Theme.primary[600],
  },
  actionButtonSecondary: {
    backgroundColor: Theme.primary[50],
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  actionButtonTextPrimary: {
    color: 'Theme.colors.text.inverse',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    color: Theme.primary[600],
    fontSize: 13,
    fontWeight: '600',
  },
});
