import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';

interface TransitStatusCardProps {
  containerNumber: string;
  currentWaypoint?: ContainerWaypoint;
  currentWaypointIndex: number;
  totalWaypoints: number;
  progressPercentage: number;
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

// Waypoint status colors
const WAYPOINT_STATUS_COLORS: Record<WaypointStatus, string> = {
  PENDING: '#9CA3AF',
  IN_PROGRESS: '#3B82F6',
  COMPLETED: '#10B981',
  DELAYED: '#EF4444',
  CANCELLED: '#6B7280',
};

// Waypoint status icons
const WAYPOINT_STATUS_ICONS: Record<WaypointStatus, string> = {
  PENDING: 'time-outline',
  IN_PROGRESS: 'navigate',
  COMPLETED: 'checkmark-circle',
  DELAYED: 'alert-circle',
  CANCELLED: 'close-circle',
};

// Segment type icons
const SEGMENT_TYPE_ICONS: Record<string, string> = {
  SEA: 'boat',
  ROAD: 'car',
  AIR: 'airplane',
  WAREHOUSE: 'warehouse',
};

export const TransitStatusCard: React.FC<TransitStatusCardProps> = ({
  containerNumber,
  currentWaypoint,
  currentWaypointIndex,
  totalWaypoints,
  progressPercentage,
  isLoading,
}) => {
  const currentStatus = (currentWaypoint?.status || 'IN_PROGRESS') as WaypointStatus;
  const currentStatusColor = WAYPOINT_STATUS_COLORS[currentStatus];
  const currentStatusLabel = WAYPOINT_STATUS_LABELS[currentStatus];
  const currentStatusIcon = WAYPOINT_STATUS_ICONS[currentStatus];
  
  // Get segment type icon
  const segmentType = currentWaypoint?.segmentType || 'SEA';
  const segmentIcon = SEGMENT_TYPE_ICONS[segmentType] || 'boat';

  const formatTimestamp = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  // Get location display name
  const locationName = currentWaypoint?.location?.city || currentWaypoint?.shortName || 'Inconnu';
  const locationCountry = currentWaypoint?.location?.country || '';

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Header with Container Number */}
        <View style={styles.header}>
          <Text style={styles.containerNumber}>{containerNumber}</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${progressPercentage}%`, backgroundColor: currentStatusColor }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Étape {currentWaypointIndex + 1} sur {totalWaypoints}
          </Text>
        </View>

        {/* Current Status Display */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIconContainer,
              { backgroundColor: `${currentStatusColor}20` },
            ]}
          >
            <Ionicons
              name={currentStatusIcon as any}
              size={28}
              color={currentStatusColor}
            />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>{currentStatusLabel}</Text>
            {currentWaypoint?.estimatedArrival && (
              <Text style={styles.timestamp}>
                Est: {formatTimestamp(currentWaypoint.estimatedArrival)}
              </Text>
            )}
          </View>
        </View>

        {/* Location Info */}
        <View style={styles.locationContainer}>
          <View style={styles.locationHeader}>
            <Ionicons name={segmentIcon as any} size={16} color={Theme.neutral[500]} />
            <Text style={styles.locationLabel}>Localisation actuelle</Text>
          </View>
          <Text style={styles.locationName}>{locationName}</Text>
          {locationCountry && <Text style={styles.locationCountry}>{locationCountry}</Text>}
          {currentWaypoint?.description && (
            <Text style={styles.locationDescription}>{currentWaypoint.description}</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.md,
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
  progressContainer: {
    marginBottom: Theme.spacing.lg,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Theme.neutral[200],
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    marginBottom: Theme.spacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  statusIconContainer: {
    width: 56,
    height: 56,
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
  timestamp: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  locationContainer: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.xs,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[500],
    textTransform: 'uppercase',
  },
  locationName: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  locationCountry: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[600],
    marginTop: 2,
  },
  locationDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: Theme.neutral[500],
    marginTop: Theme.spacing.sm,
    fontStyle: 'italic',
  },
  loadingContainer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
});

export default TransitStatusCard;
