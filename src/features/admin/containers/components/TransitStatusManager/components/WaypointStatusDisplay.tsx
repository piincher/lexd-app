import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './TransitStatusCard.styles';

interface WaypointStatusDisplayProps {
  statusColor: string;
  statusLabel: string;
  statusIcon: React.ComponentProps<typeof Ionicons>['name'];
  isDark: boolean;
  estimatedArrival?: string;
  formatTimestamp: (dateString?: string) => string;
}

export const WaypointStatusDisplay: React.FC<WaypointStatusDisplayProps> = ({
  statusColor,
  statusLabel,
  statusIcon,
  isDark,
  estimatedArrival,
  formatTimestamp,
}) => {
  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusIconContainer,
          { backgroundColor: `${statusColor}${isDark ? '35' : '15'}` },
        ]}
      >
        <Ionicons name={statusIcon} size={28} color={statusColor} />
      </View>
      <View style={styles.statusInfo}>
        <Text style={styles.statusLabel}>{statusLabel}</Text>
        {estimatedArrival && (
          <Text style={styles.timestamp}>
            Est: {formatTimestamp(estimatedArrival)}
          </Text>
        )}
      </View>
    </View>
  );
};
