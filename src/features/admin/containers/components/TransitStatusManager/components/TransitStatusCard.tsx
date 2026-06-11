import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { WAYPOINT_STATUS_COLORS, WAYPOINT_STATUS_LABELS, SEGMENT_TYPE_ICONS } from '@src/shared/types/containerWaypoints';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';
import { WaypointStatusDisplay } from './WaypointStatusDisplay';
import { WaypointLocationInfo } from './WaypointLocationInfo';
import { WAYPOINT_STATUS_ICONS, formatTimestamp, getCurrentLegLabel } from './transitStatusUtils';
import { createStyles } from './TransitStatusCard.styles';

export interface TransitStatusCardProps {
  containerNumber: string;
  currentWaypoint?: ContainerWaypoint;
  currentWaypointIndex: number;
  totalWaypoints: number;
  /** Number of waypoints already completed — used for the step counter so it
   *  matches the client notification ("Étape X sur N") instead of the leg index. */
  completedWaypoints: number;
  progressPercentage: number;
  isLoading?: boolean;
}

export const TransitStatusCard: React.FC<TransitStatusCardProps> = ({
  containerNumber,
  currentWaypoint,
  currentWaypointIndex,
  totalWaypoints,
  completedWaypoints,
  progressPercentage,
  isLoading,
}) => {
  const { colors, isDark } = useAppTheme();
  const currentStatus = (currentWaypoint?.status || 'IN_PROGRESS') as WaypointStatus;
  const currentStatusColor = WAYPOINT_STATUS_COLORS[currentStatus];
  // Match the timeline: the active leg uses the disambiguated label
  // ("En route vers" / "Sur place" / "Au point de départ"), not the bare "En cours".
  const currentStatusLabel =
    currentStatus === 'IN_PROGRESS'
      ? getCurrentLegLabel(currentWaypoint, currentWaypointIndex)
      : WAYPOINT_STATUS_LABELS[currentStatus];
  const currentStatusIcon = WAYPOINT_STATUS_ICONS[currentStatus];
  const segmentType = currentWaypoint?.segmentType || 'SEA';
  const segmentIcon = (SEGMENT_TYPE_ICONS[segmentType] || 'boat') as React.ComponentProps<typeof Ionicons>['name'];
  const styles = createStyles(colors, isDark);

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

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.containerNumber}>{containerNumber}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progressPercentage}%`, backgroundColor: currentStatusColor },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Étape {completedWaypoints} sur {totalWaypoints} ({progressPercentage}%)
          </Text>
        </View>

        <WaypointStatusDisplay
          statusColor={currentStatusColor}
          statusLabel={currentStatusLabel}
          statusIcon={currentStatusIcon}
          isDark={isDark}
          estimatedArrival={currentWaypoint?.estimatedArrival}
          formatTimestamp={formatTimestamp}
        />

        <WaypointLocationInfo currentWaypoint={currentWaypoint} segmentIcon={segmentIcon} />
      </Card.Content>
    </Card>
  );
};

export default TransitStatusCard;
