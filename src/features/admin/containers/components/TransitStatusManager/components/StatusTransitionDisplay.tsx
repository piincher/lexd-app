import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { WaypointStatus } from '../../../types/waypoints';
import { WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';

const WAYPOINT_STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

interface StatusTransitionDisplayProps {
  currentStatus?: WaypointStatus;
  newStatus: WaypointStatus;
}

export const StatusTransitionDisplay: React.FC<StatusTransitionDisplayProps> = ({
  currentStatus,
  newStatus,
}) => {
  const currentStatusLabel = currentStatus ? WAYPOINT_STATUS_LABELS[currentStatus] : 'N/A';
  const newStatusLabel = WAYPOINT_STATUS_LABELS[newStatus];
  const currentStatusColor = currentStatus ? WAYPOINT_STATUS_COLORS[currentStatus] : Theme.neutral[400];
  const newStatusColor = WAYPOINT_STATUS_COLORS[newStatus];

  return (
    <View style={styles.statusTransition}>
      <View style={[styles.statusBox, { borderColor: currentStatusColor }]}>
        <View style={[styles.statusIndicator, { backgroundColor: currentStatusColor }]}>
          <Ionicons name="ellipse" size={12} color={Theme.colors.text.inverse} />
        </View>
        <View>
          <HelperText type="info" style={styles.statusLabel}>Actuel</HelperText>
          <Text style={styles.statusText}>{currentStatusLabel}</Text>
        </View>
      </View>

      <Ionicons name="arrow-forward" size={24} color={Theme.neutral[400]} />

      <View style={[styles.statusBox, { borderColor: newStatusColor }]}>
        <View style={[styles.statusIndicator, { backgroundColor: newStatusColor }]}>
          <Ionicons name="ellipse" size={12} color={Theme.colors.text.inverse} />
        </View>
        <View>
          <HelperText type="info" style={styles.statusLabel}>Nouveau</HelperText>
          <Text style={styles.statusText}>{newStatusLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusTransition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.sm,
  },
  statusBox: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    paddingHorizontal: 0,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
});
