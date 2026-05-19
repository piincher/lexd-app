import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@src/shared/ui/Card';
import { Badge } from '@src/shared/ui/Badge';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillWaypoint, AirwayBillWaypointStatus } from '../../types';
import { WaypointTimelineItem } from './WaypointTimelineItem';
import { createStyles } from './AirwayBillWaypointTimeline.styles';

interface Props {
  waypoints: AirwayBillWaypoint[];
  currentWaypointIndex?: number;
  progressPercentage?: number;
  isUpdating?: boolean;
  onWaypointStatusChange?: (waypointIndex: number, status: AirwayBillWaypointStatus) => void;
}

export const AirwayBillWaypointTimeline: React.FC<Props> = ({
  waypoints,
  currentWaypointIndex = -1,
  progressPercentage = 0,
  isUpdating = false,
  onWaypointStatusChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  if (!waypoints.length) {
    return (
      <Card style={styles.card} padding="large">
        <Text style={[styles.title, { color: colors.text.primary }]}>Itinéraire aérien</Text>
        <Text style={[styles.empty, { color: colors.text.secondary }]}>
          Les étapes seront générées automatiquement dès que la route AWB est disponible.
        </Text>
      </Card>
    );
  }

  return (
    <Card style={styles.card} padding="large">
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Itinéraire aérien</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            {progressPercentage}% complété · {waypoints.length} étapes
          </Text>
        </View>
        <Badge
          label={currentWaypointIndex >= 0 ? `Étape ${currentWaypointIndex + 1}` : 'Planifié'}
          variant="custom"
          backgroundColor={`${colors.primary.main}18`}
          textColor={colors.primary.main}
        />
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressPercentage}%`, backgroundColor: colors.primary.main },
          ]}
        />
      </View>
      {waypoints.map((waypoint, index) => (
        <WaypointTimelineItem
          key={waypoint._id || `${waypoint.order}-${index}`}
          waypoint={waypoint}
          index={index}
          isCurrent={index === currentWaypointIndex}
          isLast={index === waypoints.length - 1}
          isUpdating={isUpdating}
          onWaypointStatusChange={onWaypointStatusChange}
        />
      ))}
    </Card>
  );
};
