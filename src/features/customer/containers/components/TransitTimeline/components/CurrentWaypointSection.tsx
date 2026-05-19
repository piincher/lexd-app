import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * CurrentWaypointSection - Displays current waypoint with badge
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../../types';
import { TimelineWaypointCard } from '../../TimelineWaypointCard';

interface CurrentWaypointSectionProps {
  currentWaypoint: ContainerWaypoint;
  styles: Record<string, any>;
}

export const CurrentWaypointSection: React.FC<CurrentWaypointSectionProps> = ({
  currentWaypoint,
  styles,
}) => {
  const { colors } = useAppTheme();
  return (
  <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.currentLocationBadge}>
        <Ionicons name="radio-button-on" size={16} color={colors.status.info} />
        <Text style={styles.currentLocationText}>POSITION ACTUELLE</Text>
      </View>
    </View>
    <TimelineWaypointCard waypoint={currentWaypoint} isCurrent={true} isCompleted={false} />
  </Animated.View>
  );
};
