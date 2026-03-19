/**
 * TransitTimeline - Vertical timeline showing container waypoints
 * Displays completed/current/pending waypoints with smooth reanimated animations
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../../types/waypoints';

// ============================================
// TYPES
// ============================================

export interface TransitTimelineProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  completedWaypoints: number;
}

type WaypointItemStatus = 'completed' | 'current' | 'pending';

// ============================================
// CONSTANTS
// ============================================

const STATUS_COLORS = {
  completed: Theme.status.success,
  current: Theme.primary[500],
  pending: Theme.neutral[300],
};

const STATUS_LABELS: Record<WaypointItemStatus, string> = {
  completed: 'Terminé',
  current: 'En cours',
  pending: 'En attente',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getWaypointStatus = (
  index: number,
  currentIndex: number
): WaypointItemStatus => {
  if (index < currentIndex) return 'completed';
  if (index === currentIndex) return 'current';
  return 'pending';
};

const formatTimestamp = (timestamp?: string): string => {
  if (!timestamp) return '';
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return timestamp;
  }
};

const getSegmentIcon = (segmentType?: string): keyof typeof Ionicons.glyphMap => {
  switch (segmentType) {
    case 'SEA':
      return 'boat';
    case 'ROAD':
      return 'car';
    case 'AIR':
      return 'airplane';
    case 'WAREHOUSE':
      return 'business';
    default:
      return 'location';
  }
};

// ============================================
// SUB-COMPONENTS
// ============================================

interface TimelineDotProps {
  status: WaypointItemStatus;
  isLast: boolean;
}

const TimelineDot: React.FC<TimelineDotProps> = ({ status, isLast }) => {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  React.useEffect(() => {
    if (status === 'current') {
      pulseScale.value = withRepeat(
        withTiming(1.3, { duration: 1000 }),
        -1,
        true
      );
      pulseOpacity.value = withRepeat(
        withTiming(0.5, { duration: 1000 }),
        -1,
        true
      );
    }
  }, [status]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const dotStyles = [
    styles.timelineDot,
    status === 'completed' && styles.timelineDotCompleted,
    status === 'current' && styles.timelineDotCurrent,
    status === 'pending' && styles.timelineDotPending,
  ];

  return (
    <View style={styles.timelineDotContainer}>
      {status === 'current' && (
        <Animated.View style={[styles.timelineDotPulse, pulseStyle]} />
      )}
      <View style={dotStyles}>
        {status === 'completed' && (
          <Ionicons name="checkmark" size={14} color="#FFF" />
        )}
        {status === 'current' && (
          <View style={styles.currentDotInner} />
        )}
      </View>
      {!isLast && (
        <View
          style={[
            styles.timelineConnector,
            status === 'completed' && styles.timelineConnectorCompleted,
          ]}
        />
      )}
    </View>
  );
};

interface TimelineItemRowProps {
  waypoint: ContainerWaypoint;
  index: number;
  totalItems: number;
  currentWaypointIndex: number;
}

const TimelineItemRow: React.FC<TimelineItemRowProps> = ({
  waypoint,
  index,
  totalItems,
  currentWaypointIndex,
}) => {
  const status = getWaypointStatus(index, currentWaypointIndex);
  const entering = FadeInUp.delay(index * 100);
  const icon = getSegmentIcon(waypoint.segmentType);

  // Determine timestamp to display
  const timestamp = waypoint.actualArrival || waypoint.estimatedArrival;

  return (
    <Animated.View entering={entering} style={styles.timelineItemRow}>
      <TimelineDot status={status} isLast={index === totalItems - 1} />
      
      <View style={styles.statusContentContainer}>
        <View style={styles.statusHeader}>
          <View
            style={[
              styles.statusIconContainer,
              { backgroundColor: `${STATUS_COLORS[status]}20` },
            ]}
          >
            <Ionicons
              name={icon}
              size={16}
              color={STATUS_COLORS[status]}
            />
          </View>
          <View style={styles.statusTextContainer}>
            <Text
              style={[
                styles.statusLabel,
                status === 'completed' && styles.statusLabelCompleted,
                status === 'current' && styles.statusLabelCurrent,
                status === 'pending' && styles.statusLabelPending,
              ]}
            >
              {STATUS_LABELS[status]}
            </Text>
            <Text style={styles.waypointName}>
              {waypoint.location?.city || waypoint.shortName || '—'}
            </Text>
            {waypoint.location?.country && (
              <Text style={styles.countryName}>
                {waypoint.location.country}
              </Text>
            )}
          </View>
        </View>
        
        {timestamp && (
          <View style={styles.timestampContainer}>
            <Ionicons name="time-outline" size={12} color={Theme.neutral[400]} />
            <Text style={styles.timestamp}>
              {waypoint.actualArrival ? '' : 'Est: '}
              {formatTimestamp(timestamp)}
            </Text>
          </View>
        )}
        
        {waypoint.description && (
          <Text style={styles.description}>{waypoint.description}</Text>
        )}
      </View>
    </Animated.View>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const TransitTimeline: React.FC<TransitTimelineProps> = ({
  waypoints,
  currentWaypointIndex,
  completedWaypoints,
}) => {
  if (!waypoints || waypoints.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="map-outline" size={48} color={Theme.neutral[300]} />
        <Text style={styles.emptyText}>Aucun point de passage disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        {waypoints.map((waypoint, index) => (
          <TimelineItemRow
            key={waypoint._id || index}
            waypoint={waypoint}
            index={index}
            totalItems={waypoints.length}
            currentWaypointIndex={currentWaypointIndex}
          />
        ))}
      </View>
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
  },
  timelineContainer: {
    paddingVertical: Theme.spacing.sm,
  },
  timelineItemRow: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.lg,
  },
  // Timeline Dot
  timelineDotContainer: {
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineDotCompleted: {
    backgroundColor: STATUS_COLORS.completed,
  },
  timelineDotCurrent: {
    backgroundColor: STATUS_COLORS.current,
    borderWidth: 3,
    borderColor: `${STATUS_COLORS.current}40`,
  },
  timelineDotPending: {
    backgroundColor: Theme.neutral[100],
    borderWidth: 2,
    borderColor: Theme.neutral[300],
  },
  timelineDotPulse: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: STATUS_COLORS.current,
    zIndex: 1,
  },
  currentDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  // Timeline Connector
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.neutral[200],
    marginTop: 4,
    marginBottom: -Theme.spacing.lg,
    minHeight: 40,
  },
  timelineConnectorCompleted: {
    backgroundColor: STATUS_COLORS.completed,
  },
  // Status Content
  statusContentContainer: {
    flex: 1,
    paddingTop: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusIconContainer: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[500],
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusLabelCompleted: {
    color: STATUS_COLORS.completed,
  },
  statusLabelCurrent: {
    color: STATUS_COLORS.current,
    fontWeight: '700',
  },
  statusLabelPending: {
    color: Theme.neutral[400],
  },
  waypointName: {
    fontSize: 15,
    color: Theme.neutral[800],
    fontWeight: '600',
  },
  countryName: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.xs,
    fontStyle: 'italic',
  },
  // Timestamp
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
    gap: Theme.spacing.xs,
  },
  timestamp: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
  // Empty State
  emptyContainer: {
    padding: Theme.spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: Theme.spacing.md,
    fontSize: 14,
    color: Theme.neutral[400],
    textAlign: 'center',
  },
});

export default TransitTimeline;
