import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  getExtendedStatusLabel,
  getExtendedStatusColor,
  getExtendedStatusIcon,
  getLocationCategory,
  ExtendedWaypointStatus,
} from '@src/shared/types/waypointStatus';
import { ContainerWaypoint } from '@src/shared/types/containerWaypoints';
import { useWaypointCardStyles } from './WaypointCard.styles';
import { Theme } from '@src/constants/Theme';

interface WaypointCardHeaderProps {
  waypoint: ContainerWaypoint;
  index: number;
}

export const WaypointCardHeader: React.FC<WaypointCardHeaderProps> = ({ waypoint, index }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useWaypointCardStyles();

  const rawStatusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
  const statusColor = typeof rawStatusColor === 'string' ? rawStatusColor : colors.text.disabled;
  const locationCode = waypoint.location?.portCode || waypoint.location?.countryCode || '';
  const category = getLocationCategory(locationCode);
  const isDakar = category === 'DISCHARGE_PORT';
  const isBorder = category === 'BORDER';
  const isWarehouse = category === 'WAREHOUSE';

  const getLocationSuffix = () => {
    if (isDakar) return ' (Port de déchargement)';
    if (isBorder) return ' (Frontière)';
    if (isWarehouse) return ' (Entrepôt)';
    return '';
  };

  return (
    <View style={styles.wpHeader}>
      <View
        style={[
          styles.wpNumber,
          isDakar && { backgroundColor: colors.status.info, width: 40, height: 40, borderRadius: 20 },
        ]}
      >
        <Text style={[styles.wpNumberText, isDakar && { color: colors.text.inverse, fontSize: 18 }]}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.wpTitleContainer}>
        <Text style={[styles.wpLocation, isDakar && { color: colors.status.info, fontSize: 18 }]}>
          {waypoint.location?.city || 'Unknown'}
          {getLocationSuffix()}
        </Text>
        <Text style={styles.wpCode}>{waypoint.location?.countryCode || ''}</Text>
      </View>

      <View style={[styles.wpStatusBadge, { backgroundColor: `${statusColor}${isDark ? '35' : '15'}` }]}>
        <Ionicons
          name={getExtendedStatusIcon(waypoint.status as ExtendedWaypointStatus) as any}
          size={14}
          color={statusColor}
        />
        <Text style={[styles.wpStatusText, { color: statusColor }]} numberOfLines={1}>
          {getExtendedStatusLabel(waypoint.status as ExtendedWaypointStatus)}
        </Text>
      </View>
    </View>
  );
};
