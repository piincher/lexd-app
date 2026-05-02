/**
 * NonTransitView - Simplified view when container is not in transit
 * Displays status information and helpful message about transit tracking availability
 */

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  ContainerStatus,
  CONTAINER_STATUS_LABELS,
  CONTAINER_STATUS_COLORS,
} from '../../../types';
import { ContainerWaypoint } from '../../../types/waypoints';
import { StatusInfoCard } from './StatusInfoCard';
import { HelperCard } from './HelperCard';
import { styles } from './NonTransitView.styles';

export interface NonTransitViewProps {
  containerStatus: ContainerStatus;
  containerNumber: string;
  waypoints?: ContainerWaypoint[];
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
    GATE_IN_FULL: 'enter-outline',
    LOADED_ON_VESSEL: 'boat-outline',
    IN_TRANSIT: 'airplane',
    ARRIVED: 'flag-outline',
    DISCHARGED: 'archive-outline',
    READY_FOR_PICKUP: 'checkmark-done-outline',
    DELIVERED: 'checkmark-circle-outline',
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
      <StatusInfoCard
        containerNumber={containerNumber}
        statusLabel={statusLabel}
        statusColor={statusColor}
        statusIcon={statusIcon}
        waypointCount={waypointCount}
      />
      <HelperCard />
    </View>
  );
};

export default NonTransitView;
