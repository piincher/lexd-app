/**
 * TimelineWaypointCard - Individual waypoint card for customer view
 */

import React from 'react';
import { View } from 'react-native';
import { ContainerWaypoint } from '../../types';
import { useTimelineWaypointCardStyles } from './TimelineWaypointCard.styles';
import { WaypointCardContent } from './WaypointCardContent';

interface TimelineWaypointCardProps {
  waypoint: ContainerWaypoint;
  isCurrent?: boolean;
  isCompleted?: boolean;
}

export const TimelineWaypointCard: React.FC<TimelineWaypointCardProps> = ({
  waypoint,
  isCurrent = false,
  isCompleted = false,
}) => {
  const styles = useTimelineWaypointCardStyles();

  return (
    <View style={[styles.container, isCurrent && styles.containerCurrent, isCompleted && styles.containerCompleted]}>
      <WaypointCardContent waypoint={waypoint} isCurrent={isCurrent} isCompleted={isCompleted} />
    </View>
  );
};

export default TimelineWaypointCard;
