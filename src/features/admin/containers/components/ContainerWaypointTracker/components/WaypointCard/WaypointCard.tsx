import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  ContainerWaypoint,
  SEGMENT_TYPE_ICONS,
  SEGMENT_TYPE_LABELS,
  ExtendedWaypointStatus,
} from '../../../../types';
import { getExtendedStatusColor, getExtendedStatusLabel, getExtendedStatusIcon } from '../../../../types/waypointStatus';
import { createStyles } from './WaypointCard.styles';

interface WaypointCardProps {
  waypoint: ContainerWaypoint;
  index: number;
  isExpanded: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  isDakar: boolean;
  isBorderPoint: boolean;
  isWarehousePoint: boolean;
  locationCategory: { label: string; color: string; icon: string } | null;
  routeDisplay: { icon: string; label: string } | null;
  onPress: () => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return '-';
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateString;
  }
};

export const WaypointCard: React.FC<WaypointCardProps> = ({
  waypoint,
  index,
  isExpanded,
  isCurrent,
  isCompleted,
  isDakar,
  isBorderPoint,
  isWarehousePoint,
  locationCategory,
  routeDisplay,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const statusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
  const segmentIcon = SEGMENT_TYPE_ICONS[waypoint.segmentType];

  return (
    <TouchableOpacity
      style={[
        styles.waypointCard,
        isCurrent && styles.waypointCardCurrent,
        isCompleted && styles.waypointCardCompleted,
        isDakar && styles.waypointCardDakar,
        isBorderPoint && styles.waypointCardBorder,
        isWarehousePoint && styles.waypointCardWarehouse,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.statusBar, { backgroundColor: statusColor }, isDakar && styles.statusBarDakar, isBorderPoint && styles.statusBarBorder]} />

      <View style={styles.waypointContent}>
        <View style={styles.waypointHeader}>
          <View style={[styles.waypointNumber, isDakar && styles.waypointNumberDakar]}>
            <Text style={[styles.waypointNumberText, isDakar && styles.waypointNumberTextDakar]}>{index + 1}</Text>
          </View>

          <View style={styles.waypointTitleContainer}>
            <Text style={[styles.waypointLocation, isDakar && styles.waypointLocationDakar]}>
              {waypoint.location?.city || waypoint.location?.toString() || 'Unknown'}
              {isDakar && ' 🚢'}{isBorderPoint && ' 🛂'}{isWarehousePoint && ' 📦'}
            </Text>
            <Text style={styles.waypointCode}>{waypoint.location?.portCode || waypoint.location?.countryCode || ''}</Text>
            {routeDisplay && (
              <View style={styles.routeDisplayBadge}>
                <Ionicons name={routeDisplay.icon as any} size={12} color={colors.text.inverse} />
                <Text style={styles.routeDisplayText}>{routeDisplay.label}</Text>
              </View>
            )}
          </View>

          <View style={styles.waypointBadges}>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <Ionicons name={getExtendedStatusIcon(waypoint.status as ExtendedWaypointStatus) as any} size={14} color={statusColor} />
              <Text style={[styles.statusBadgeText, { color: statusColor }]} numberOfLines={1}>
                {getExtendedStatusLabel(waypoint.status as ExtendedWaypointStatus)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.typeRow}>
          <View style={styles.typeBadge}>
            <Ionicons name={(segmentIcon || 'help-circle') as any} size={12} color={colors.neutral[500]} />
            <Text style={styles.typeBadgeText}>{SEGMENT_TYPE_LABELS[waypoint.segmentType]}</Text>
          </View>
          {locationCategory && (
            <View style={[styles.categoryBadge, { backgroundColor: locationCategory.color + '20' }]}>
              <Ionicons name={locationCategory.icon as any} size={10} color={locationCategory.color} />
              <Text style={[styles.categoryBadgeText, { color: locationCategory.color }]}>{locationCategory.label}</Text>
            </View>
          )}
          {isCurrent && (
            <View style={styles.currentIndicator}>
              <Text style={styles.currentIndicatorText}>POSITION ACTUELLE</Text>
            </View>
          )}
        </View>

        <View style={styles.quickInfo}>
          {waypoint.actualArrival && (
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={12} color={colors.status.success} />
              <Text style={styles.infoText}>Arrivé: {formatDate(waypoint.actualArrival)}</Text>
            </View>
          )}
          {!waypoint.actualArrival && waypoint.estimatedArrival && (
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={12} color={colors.status.warning} />
              <Text style={styles.infoText}>Est. arrivée: {formatDate(waypoint.estimatedArrival)}</Text>
            </View>
          )}
        </View>

        <View style={styles.expandIndicator}>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.neutral[400]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WaypointCard;
