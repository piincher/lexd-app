/**
 * TransitTimeline - Vertical timeline showing container waypoints
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../../../types/waypoints';
import { styles } from './TransitTimeline.styles';
import { TimelineItemRow } from './TimelineItemRow';

export interface TransitTimelineProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  completedWaypoints: number;
}

export const TransitTimeline: React.FC<TransitTimelineProps> = ({
  waypoints,
  currentWaypointIndex,
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

export default TransitTimeline;
