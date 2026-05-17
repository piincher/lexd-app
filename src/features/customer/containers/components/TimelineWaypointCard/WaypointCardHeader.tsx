import React from 'react';
import { View, Text } from 'react-native';
import { ContainerWaypoint } from '../../types';

interface WaypointCardHeaderProps {
  styles: any;
  waypoint: ContainerWaypoint;
  displayDate: { label: string; date: string; time: string } | null;
}

export const WaypointCardHeader: React.FC<WaypointCardHeaderProps> = ({
  styles,
  waypoint,
  displayDate,
}) => (
  <View style={styles.headerRow}>
    <View style={styles.locationContainer}>
      <Text style={styles.locationName} numberOfLines={1}>{waypoint.location}</Text>
      <Text style={styles.locationCode}>{waypoint.locationCode}</Text>
    </View>
    {displayDate && (
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>{displayDate.label}</Text>
        <Text style={styles.dateValue}>{displayDate.date}</Text>
        {displayDate.time && <Text style={styles.timeValue}>{displayDate.time}</Text>}
      </View>
    )}
  </View>
);
