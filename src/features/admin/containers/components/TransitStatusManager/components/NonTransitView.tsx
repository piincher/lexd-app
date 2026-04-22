/**
 * NonTransitView - Simplified view when container is not in transit
 * Displays status information and helpful message about transit tracking availability
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {
  ContainerStatus,
  CONTAINER_STATUS_LABELS,
  CONTAINER_STATUS_COLORS,
} from '../../../types';
import { ContainerWaypoint } from '../../../types/waypoints';

export interface NonTransitViewProps {
  containerStatus: import('../../../types').ContainerStatus;
  containerNumber: string;
  waypoints?: import('../../../types/waypoints').ContainerWaypoint[];
}

/**
 * Get the appropriate icon name for each container status
 */
const getStatusIcon = (status: ContainerStatus): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<ContainerStatus, keyof typeof Ionicons.glyphMap> = {
    BOOKED: 'bookmark-outline',
    EMPTY_TO_WAREHOUSE: 'cube-outline',
    LOADING: 'hammer-outline',
    LOADED: 'cube',
    IN_TRANSIT: 'airplane',
    ARRIVED: 'flag-outline',
    READY_FOR_PICKUP: 'checkmark-done-outline',
  };
  return iconMap[status];
};

export const NonTransitView: React.FC<NonTransitViewProps> = ({
  containerStatus,
  containerNumber,
  waypoints,
}) => {
  const statusLabel = CONTAINER_STATUS_LABELS[containerStatus];
  const statusColor = CONTAINER_STATUS_COLORS[containerStatus];
  const statusIcon = getStatusIcon(containerStatus);
  const waypointCount = waypoints?.length || 0;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Container Number Header */}
          <View style={styles.header}>
            <Text style={styles.containerNumber}>{containerNumber}</Text>
          </View>

          {/* Status Information */}
          <View style={styles.statusSection}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${statusColor}20` },
              ]}
            >
              <Ionicons name={statusIcon} size={32} color={statusColor} />
            </View>

            <View style={styles.statusInfo}>
              <Text style={styles.statusLabel}>{statusLabel}</Text>
              <Text style={styles.currentStatusText}>Statut actuel</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Information Message */}
          <View style={styles.infoSection}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={Theme.primary[500]}
              />
            </View>
            <Text style={styles.infoText}>
              Le suivi détaillé du transit sera disponible lorsque le conteneur
              sera en route.
            </Text>
          </View>

          {/* Waypoint Preview Count */}
          {waypointCount > 0 && (
            <View style={styles.waypointPreviewSection}>
              <View style={styles.waypointPreviewHeader}>
                <Ionicons
                  name="map-outline"
                  size={18}
                  color={Theme.neutral[600]}
                />
                <Text style={styles.waypointPreviewTitle}>
                  Itinéraire prévu
                </Text>
              </View>
              <Text style={styles.waypointCountText}>
                {waypointCount} étape{waypointCount > 1 ? 's' : ''} prévue
                {waypointCount > 1 ? 's' : ''}
              </Text>
            </View>
          )}

          {/* Status Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionText}>
              Le suivi en temps réel des waypoints n&apos;est accessible que
              lorsque le statut du conteneur est &quot;En Transit&quot;.
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Helper Card */}
      <Card style={styles.helperCard}>
        <Card.Content>
          <View style={styles.helperHeader}>
            <Ionicons name="navigate-outline" size={20} color={Theme.neutral[500]} />
            <Text style={styles.helperTitle}>Prochaine étape</Text>
          </View>
          <Text style={styles.helperText}>
            Une fois le conteneur en transit, vous pourrez suivre sa progression
            à travers chaque waypoint et recevoir des mises à jour en temps réel.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  card: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  header: {
    marginBottom: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  containerNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: 0.5,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  currentStatusText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginBottom: Theme.spacing.lg,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  infoIconContainer: {
    marginRight: Theme.spacing.md,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Theme.primary[700],
    lineHeight: 22,
  },
  descriptionSection: {
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '400',
    color: Theme.neutral[500],
    lineHeight: 20,
    textAlign: 'center',
  },
  helperCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    ...Theme.shadows.sm,
  },
  helperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  helperTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  helperText: {
    fontSize: 14,
    fontWeight: '400',
    color: Theme.neutral[500],
    lineHeight: 20,
  },
  waypointPreviewSection: {
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  waypointPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  waypointPreviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  waypointCountText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[700],
    paddingLeft: Theme.spacing.lg + Theme.spacing.sm,
  },
});

export default NonTransitView;
