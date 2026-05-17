import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WaypointCardLeftSectionProps {
  styles: any;
  statusColor: string;
  isDark: boolean;
  typeIcon: string;
}

export const WaypointCardLeftSection: React.FC<WaypointCardLeftSectionProps> = ({
  styles,
  statusColor,
  isDark,
  typeIcon,
}) => (
  <View style={styles.leftSection}>
    <View style={[styles.iconContainer, { backgroundColor: `${statusColor}${isDark ? '35' : '15'}` }]}>
      <Ionicons name={typeIcon as any} size={24} color={statusColor} />
    </View>
    <View style={styles.connector} />
  </View>
);
