import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ContainerWaypoint } from '../../../types';
import { createStyles } from './WaypointDetails.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { WaypointTimesSection } from './WaypointTimesSection';
import { WaypointSeaDetails } from './WaypointSeaDetails';
import { WaypointRoadDetails } from './WaypointRoadDetails';
import { WaypointNotesSection } from './WaypointNotesSection';

interface WaypointDetailsProps {
  waypoint: ContainerWaypoint;
  formatDateTime: (dateString?: string) => string;
}

export const WaypointDetails: React.FC<WaypointDetailsProps> = ({ waypoint, formatDateTime }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Animated.View entering={FadeIn} style={styles.expandedContent}>
      <View style={styles.divider} />

      <WaypointTimesSection waypoint={waypoint} formatDateTime={formatDateTime} />

      {waypoint.seaDetails && <WaypointSeaDetails seaDetails={waypoint.seaDetails} />}

      {waypoint.roadDetails && <WaypointRoadDetails roadDetails={waypoint.roadDetails} />}

      {waypoint.notes && <WaypointNotesSection notes={waypoint.notes} />}
    </Animated.View>
  );
};
