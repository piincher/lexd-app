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
  const { colors } = useAppTheme();
  const styles = useWaypointCardStyles();

  const rawStatusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
  const statusColor = typeof rawStatusColor === 'string' ? rawStatusColor : '#9CA3AF';
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
          isDakar && { backgroundColor: '#0EA5E9', width: 40, height: 40, borderRadius: 20 },
        ]}
      >
        <Text style={[styles.wpNumberText, isDakar && { color: 'Theme.colors.text.inverse', fontSize: 18 }]}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.wpTitleContainer}>
        <Text style={[styles.wpLocation, isDakar && { color: '#0284C7', fontSize: 18 }]}>
          {waypoint.location?.city || 'Unknown'}
          {getLocationSuffix()}
        </Text>
        <Text style={styles.wpCode}>{waypoint.location?.countryCode || ''}</Text>
      </View>

      <View style={[styles.wpStatusBadge, { backgroundColor: `${statusColor}${colors.background.card === '#1F2937' ? '35' : '15'}` }]}>
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
