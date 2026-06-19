import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getWaypointDisplayTitle } from '@src/shared/lib/waypointDisplay';
import { ContainerWaypoint } from '../../../../types/waypoints';
import { createStyles } from './TransitTimeline.styles';
import { TimelineDot, WaypointItemStatus } from './TimelineDot';
import { getCurrentLegLabel } from '../transitStatusUtils';

const STATUS_LABELS: Record<WaypointItemStatus, string> = {
  completed: 'Terminé',
  current: 'En cours',
  pending: 'En attente',
};

/**
 * The "current" leg is overloaded: the container may still be travelling toward
 * this waypoint, or already physically there. getCurrentLegLabel (shared with the
 * top card) disambiguates via actualArrival / origin so the label reflects the
 * real situation instead of a vague "En cours".
 */
const getStatusLabel = (
  status: WaypointItemStatus,
  waypoint: ContainerWaypoint,
  index: number,
): string => {
  if (status === 'current') return getCurrentLegLabel(waypoint, index);
  return STATUS_LABELS[status];
};

const getWaypointStatus = (index: number, currentIndex: number): WaypointItemStatus => {
  if (index < currentIndex) return 'completed';
  if (index === currentIndex) return 'current';
  return 'pending';
};

const getSegmentIcon = (segmentType?: string): keyof typeof Ionicons.glyphMap => {
  switch (segmentType) {
    case 'SEA': return 'boat';
    case 'ROAD': return 'car';
    case 'AIR': return 'airplane';
    case 'WAREHOUSE': return 'business';
    default: return 'location';
  }
};

const formatTimestamp = (timestamp?: string): string => {
  if (!timestamp) return '';
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return timestamp;
  }
};

interface TimelineItemRowProps {
  waypoint: ContainerWaypoint;
  index: number;
  totalItems: number;
  currentWaypointIndex: number;
}

export const TimelineItemRow: React.FC<TimelineItemRowProps> = ({
  waypoint,
  index,
  totalItems,
  currentWaypointIndex,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const status = getWaypointStatus(index, currentWaypointIndex);
  const entering = FadeInUp.delay(index * 100);
  const icon = getSegmentIcon(waypoint.segmentType);
  const timestamp = waypoint.actualArrival || waypoint.estimatedArrival;

  const getStatusColor = (s: WaypointItemStatus) => {
    switch (s) {
      case 'completed': return colors.status.success;
      case 'current': return colors.primary[500];
      case 'pending': return colors.neutral[300];
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <Animated.View entering={entering} style={styles.timelineItemRow}>
      <TimelineDot status={status} isLast={index === totalItems - 1} />

      <View style={styles.statusContentContainer}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusIconContainer, { backgroundColor: `${statusColor}20` }]}>
            <Ionicons name={icon} size={16} color={statusColor} />
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={[styles.statusLabel, status === 'completed' && styles.statusLabelCompleted, status === 'current' && styles.statusLabelCurrent, status === 'pending' && styles.statusLabelPending]}>
              {getStatusLabel(status, waypoint, index)}
            </Text>
            <Text style={styles.waypointName}>{getWaypointDisplayTitle(waypoint)}</Text>
            {waypoint.location?.country && <Text style={styles.countryName}>{waypoint.location.country}</Text>}
          </View>
        </View>

        {timestamp && (
          <View style={styles.timestampContainer}>
            <Ionicons name="time-outline" size={12} color={colors.neutral[400]} />
            <Text style={styles.timestamp}>{waypoint.actualArrival ? '' : 'Est: '}{formatTimestamp(timestamp)}</Text>
          </View>
        )}

        {waypoint.description && <Text style={styles.description}>{waypoint.description}</Text>}
      </View>
    </Animated.View>
  );
};
