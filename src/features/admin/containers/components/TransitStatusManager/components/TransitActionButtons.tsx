import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActivityIndicator, Portal, Dialog } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';
import { lightTheme } from '@src/constants/Theme';
import { WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';

interface TransitActionButtonsProps {
  currentWaypoint?: ContainerWaypoint;
  onStatusUpdate: (status: WaypointStatus) => void;
  isLoading?: boolean;
}

// Waypoint status labels in French
const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};


// Available actions based on current status
const getAvailableActions = (currentStatus: WaypointStatus): { status: WaypointStatus; label: string; icon: string }[] => {
  switch (currentStatus) {
    case 'PENDING':
      return [
        { status: 'IN_PROGRESS', label: 'Démarrer', icon: 'play' },
        { status: 'DELAYED', label: 'Marquer retardé', icon: 'time' },
      ];
    case 'IN_PROGRESS':
      return [
        { status: 'COMPLETED', label: 'Marquer terminé', icon: 'checkmark-circle' },
        { status: 'DELAYED', label: 'Marquer retardé', icon: 'alert-circle' },
      ];
    case 'DELAYED':
      return [
        { status: 'IN_PROGRESS', label: 'Reprendre', icon: 'play' },
        { status: 'COMPLETED', label: 'Marquer terminé', icon: 'checkmark-circle' },
      ];
    case 'COMPLETED':
    case 'CANCELLED':
      return []; // No actions for terminal statuses
    default:
      return [];
  }
};

export const TransitActionButtons: React.FC<TransitActionButtonsProps> = ({
  currentWaypoint,
  onStatusUpdate,
  isLoading = false,
}) => {
  const [moreActionsVisible, setMoreActionsVisible] = useState(false);

  // Get current status from currentWaypoint
  const currentStatus = currentWaypoint?.status as WaypointStatus;

  // If no current status or waypoint, show nothing
  if (!currentStatus || !currentWaypoint) {
    return null;
  }

  // Get available actions based on current status
  const availableActions = getAvailableActions(currentStatus);

  // If no actions available, show nothing
  if (availableActions.length === 0) {
    return null;
  }

  const primaryAction = availableActions[0];
  const secondaryActions = availableActions.slice(1);

  const handleStatusSelect = (status: WaypointStatus) => {
    onStatusUpdate(status);
    setMoreActionsVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Primary Action */}
      <Button
        mode="contained"
        onPress={() => handleStatusSelect(primaryAction.status)}
        disabled={isLoading}
        style={styles.primaryButton}
        buttonColor={WAYPOINT_STATUS_COLORS[primaryAction.status]}
        textColor="#FFFFFF"
        icon={() => (
          isLoading ? (
            <ActivityIndicator size={18} color="#FFFFFF" />
          ) : (
            <Ionicons name={primaryAction.icon as any} size={18} color="#FFFFFF" />
          )
        )}
      >
        {isLoading ? 'Mise à jour...' : primaryAction.label}
      </Button>

      {/* Secondary Actions */}
      {secondaryActions.length > 0 && (
        <View style={styles.secondaryContainer}>
          {secondaryActions.map((action) => (
            <Button
              key={action.status}
              mode="outlined"
              onPress={() => handleStatusSelect(action.status)}
              disabled={isLoading}
              style={[styles.secondaryButton, { borderColor: WAYPOINT_STATUS_COLORS[action.status] }]}
              textColor={WAYPOINT_STATUS_COLORS[action.status]}
              icon={() => <Ionicons name={action.icon as any} size={16} color={WAYPOINT_STATUS_COLORS[action.status]} />}
            >
              {action.label}
            </Button>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: lightTheme.spacing.md,
    paddingVertical: lightTheme.spacing.sm,
  },
  primaryButton: {
    height: 48,
    borderRadius: lightTheme.borderRadius.md,
    marginBottom: lightTheme.spacing.sm,
  },
  secondaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: lightTheme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    minWidth: 140,
    height: 40,
    borderRadius: lightTheme.borderRadius.md,
  },
});

export default TransitActionButtons;
