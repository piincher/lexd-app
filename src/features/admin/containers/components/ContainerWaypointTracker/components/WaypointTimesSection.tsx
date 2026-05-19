import React from 'react';
import { View, Text } from 'react-native';
import { ContainerWaypoint } from '../../../types';
import { createStyles } from './WaypointDetails.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WaypointTimesSectionProps {
  waypoint: ContainerWaypoint;
  formatDateTime: (dateString?: string) => string;
}

export const WaypointTimesSection: React.FC<WaypointTimesSectionProps> = ({
  waypoint,
  formatDateTime,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Horaires</Text>
      <View style={styles.timesGrid}>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Arrivée Estimée</Text>
          <Text style={styles.timeValue}>{formatDateTime(waypoint.estimatedArrival)}</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Arrivée Réelle</Text>
          <Text style={[styles.timeValue, !waypoint.actualArrival && styles.timePending]}>
            {waypoint.actualArrival ? formatDateTime(waypoint.actualArrival) : 'En attente'}
          </Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Départ Estimé</Text>
          <Text style={styles.timeValue}>{formatDateTime(waypoint.estimatedDeparture)}</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Départ Réel</Text>
          <Text style={[styles.timeValue, !waypoint.actualDeparture && styles.timePending]}>
            {waypoint.actualDeparture ? formatDateTime(waypoint.actualDeparture) : 'En attente'}
          </Text>
        </View>
      </View>
    </View>
  );
};
