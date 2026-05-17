import React from 'react';
import { View, Text } from 'react-native';
import { WaypointStatus, WAYPOINT_STATUS_LABELS } from '../../types';

interface WaypointStatusBadgeProps {
  styles: any;
  status: WaypointStatus;
  statusColor: string;
  isDark: boolean;
}

export const WaypointStatusBadge: React.FC<WaypointStatusBadgeProps> = ({
  styles,
  status,
  statusColor,
  isDark,
}) => (
  <View style={[styles.statusBadge, { backgroundColor: `${statusColor}${isDark ? '28' : '12'}` }]}>
    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
    <Text style={[styles.statusText, { color: statusColor }]}>{WAYPOINT_STATUS_LABELS[status]}</Text>
  </View>
);
