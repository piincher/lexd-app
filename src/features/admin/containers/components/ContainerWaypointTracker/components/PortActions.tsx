import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint, ExtendedWaypointStatus } from '../../../types';
import { getQuickActions, getExtendedStatusLabel, isValidStatusTransition } from '../../../types/waypointStatus';

interface PortActionsProps {
  waypoint: ContainerWaypoint;
  index: number;
  onQuickAction: (waypointIndex: number, actionStatus: ExtendedWaypointStatus) => void;
}

export const PortActions: React.FC<PortActionsProps> = ({
  waypoint,
  index,
  onQuickAction,
}) => {
  const portCode = waypoint.location?.portCode || '';
  const currentStatus = waypoint.status as ExtendedWaypointStatus;
  const quickActions = getQuickActions(portCode, currentStatus);

  if (quickActions.length === 0) return null;

  const handleActionPress = (actionStatus: ExtendedWaypointStatus) => {
    const statusLabel = getExtendedStatusLabel(actionStatus);
    
    Alert.alert(
      'Confirmer l\'action',
      `Voulez-vous marquer cette étape comme "${statusLabel}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            if (isValidStatusTransition(currentStatus, actionStatus)) {
              onQuickAction(index, actionStatus);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.portActionsContainer}>
      <Text style={styles.portActionsTitle}>Actions disponibles:</Text>
      <View style={styles.portActionsGrid}>
        {quickActions.slice(0, 3).map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.portActionButton, { backgroundColor: action.color }]}
            onPress={() => handleActionPress(action.status)}
          >
            <Ionicons name={action.icon as any} size={16} color="#FFF" />
            <Text style={styles.portActionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  portActionsContainer: {
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  portActionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[500],
    marginBottom: Theme.spacing.xs,
  },
  portActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  portActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.sm,
    gap: Theme.spacing.xs,
  },
  portActionText: {
    color: Theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '500',
  },
});
