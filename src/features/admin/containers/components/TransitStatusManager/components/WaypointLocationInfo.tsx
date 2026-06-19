import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { getWaypointDisplayTitle } from '@src/shared/lib/waypointDisplay';
import { ContainerWaypoint } from '../../../types/waypoints';
import { createStyles } from './TransitStatusCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WaypointLocationInfoProps {
  currentWaypoint?: ContainerWaypoint;
  segmentIcon: React.ComponentProps<typeof Ionicons>['name'];
}

export const WaypointLocationInfo: React.FC<WaypointLocationInfoProps> = ({
  currentWaypoint,
  segmentIcon,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const locationName = currentWaypoint ? getWaypointDisplayTitle(currentWaypoint) : 'Inconnu';
  const locationCountry = currentWaypoint?.location?.country || '';

  return (
    <View style={styles.locationContainer}>
      <View style={styles.locationHeader}>
        <Ionicons name={segmentIcon} size={16} color={colors.neutral[500]} />
        <Text style={styles.locationLabel}>Localisation actuelle</Text>
      </View>
      <Text style={styles.locationName}>{locationName}</Text>
      {locationCountry && <Text style={styles.locationCountry}>{locationCountry}</Text>}
      {currentWaypoint?.description && (
        <Text style={styles.locationDescription}>{currentWaypoint.description}</Text>
      )}
    </View>
  );
};
