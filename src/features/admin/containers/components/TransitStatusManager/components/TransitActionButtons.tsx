import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, ActivityIndicator, Portal, Dialog } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';
import { Theme } from '@src/constants/Theme';
import { WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';

export interface TransitActionButtonsProps {
  currentWaypoint?: ContainerWaypoint;
  onStatusUpdate: (status: WaypointStatus) => void;
  /** Record arrival at the current waypoint (stamps actualArrival, keeps status). */
  onMarkArrived?: () => void;
  isLoading?: boolean;
  /** True when the active waypoint is the last one (destination), so "completed"
   *  means "delivered/arrived" rather than "departed". */
  isFinalWaypoint?: boolean;
  /** True when an arrival can be recorded for the current waypoint. */
  canMarkArrived?: boolean;
}

// A non-status action (e.g. arrival) carried alongside status actions in one list.
type TransitAction =
  | { kind: 'status'; status: WaypointStatus; label: string; icon: string }
  | { kind: 'arrived'; label: string; icon: string };

// Waypoint status labels in French
const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};


// Available actions based on current status.
// The COMPLETED action is the confusing one: completing a waypoint means the
// container has LEFT it (intermediate) or been DELIVERED (final) — never just
// "arrived". The label is made explicit so admins know what clients will be told.
const getAvailableActions = (
  currentStatus: WaypointStatus,
  isFinalWaypoint: boolean,
): { status: WaypointStatus; label: string; icon: string }[] => {
  const completedAction = isFinalWaypoint
    ? { status: 'COMPLETED' as WaypointStatus, label: 'Marquer livré', icon: 'checkmark-done' }
    : { status: 'COMPLETED' as WaypointStatus, label: 'Marquer le départ', icon: 'navigate' };

  switch (currentStatus) {
    case 'PENDING':
      return [
        { status: 'IN_PROGRESS', label: 'Démarrer', icon: 'play' },
        { status: 'DELAYED', label: 'Marquer retardé', icon: 'time' },
      ];
    case 'IN_PROGRESS':
      return [
        completedAction,
        { status: 'DELAYED', label: 'Marquer retardé', icon: 'alert-circle' },
      ];
    case 'DELAYED':
      return [
        { status: 'IN_PROGRESS', label: 'Reprendre', icon: 'play' },
        completedAction,
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
  onMarkArrived,
  isLoading = false,
  isFinalWaypoint = false,
  canMarkArrived = false,
}) => {
  const [moreActionsVisible, setMoreActionsVisible] = useState(false);

  // Get current status from currentWaypoint
  const currentStatus = currentWaypoint?.status as WaypointStatus;

  // If no current status or waypoint, show nothing
  if (!currentStatus || !currentWaypoint) {
    return null;
  }

  // Arrival comes first in the real-world flow (arrive → then depart), so when
  // available it's the primary action and the status actions move below it.
  const availableActions: TransitAction[] = [
    ...(canMarkArrived && onMarkArrived
      ? [{ kind: 'arrived' as const, label: "Marquer l'arrivée", icon: 'location' }]
      : []),
    ...getAvailableActions(currentStatus, isFinalWaypoint).map(
      (a): TransitAction => ({ kind: 'status', ...a }),
    ),
  ];

  // If no actions available, show nothing
  if (availableActions.length === 0) {
    return null;
  }

  const primaryAction = availableActions[0];
  const secondaryActions = availableActions.slice(1);

  const actionColor = (action: TransitAction) =>
    action.kind === 'arrived'
      ? WAYPOINT_STATUS_COLORS.IN_PROGRESS
      : WAYPOINT_STATUS_COLORS[action.status];

  const runAction = (action: TransitAction) => {
    if (action.kind === 'arrived') {
      onMarkArrived?.();
    } else {
      onStatusUpdate(action.status);
    }
    setMoreActionsVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Primary Action */}
      <Button
        mode="contained"
        onPress={() => runAction(primaryAction)}
        disabled={isLoading}
        style={styles.primaryButton}
        buttonColor={actionColor(primaryAction)}
        textColor={Theme.colors.text.inverse}
        icon={() => (
          isLoading ? (
            <ActivityIndicator size={18} color={Theme.colors.text.inverse} />
          ) : (
            <Ionicons name={primaryAction.icon as any} size={18} color={Theme.colors.text.inverse} />
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
              key={action.kind === 'arrived' ? 'arrived' : action.status}
              mode="outlined"
              onPress={() => runAction(action)}
              disabled={isLoading}
              style={[styles.secondaryButton, { borderColor: actionColor(action) }]}
              textColor={actionColor(action)}
              icon={() => <Ionicons name={action.icon as any} size={16} color={actionColor(action)} />}
            >
              {action.label}
            </Button>
          ))}
        </View>
      )}

      {/* Always-visible reminder: "completed" = the container has left this point. */}
      <View style={styles.hintRow}>
        <Ionicons name="information-circle-outline" size={14} color={Theme.colors.text.secondary} />
        <Text style={styles.hintText}>
          {isFinalWaypoint
            ? '« Marquer livré » confirme que le conteneur est arrivé à destination. Le client en est notifié.'
            : '« Marquer le départ » indique que le conteneur a quitté ce point et passe à l’étape suivante. Le client en est notifié.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  primaryButton: {
    height: 48,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.sm,
  },
  secondaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    minWidth: 140,
    height: 40,
    borderRadius: Theme.radius.md,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.xs,
    marginTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: Theme.colors.text.secondary,
  },
});

export default TransitActionButtons;
