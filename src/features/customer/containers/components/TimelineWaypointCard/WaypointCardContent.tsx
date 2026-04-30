import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  ContainerWaypoint,
  WaypointStatus,
  WAYPOINT_STATUS_LABELS,
  WAYPOINT_TYPE_ICONS,
  WAYPOINT_TYPE_LABELS,
  TRANSPORT_MODE_ICONS,
  TRANSPORT_MODE_LABELS,
  CUSTOMER_WAYPOINT_TYPE_COLORS,
} from '../../types';
import { WAYPOINT_STATUS_COLORS as SHARED_WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';
import { useTimelineWaypointCardStyles } from './TimelineWaypointCard.styles';

const WAYPOINT_STATUS_COLORS: Record<WaypointStatus, string> = {
  PENDING: SHARED_WAYPOINT_STATUS_COLORS.PENDING,
  IN_TRANSIT: SHARED_WAYPOINT_STATUS_COLORS.IN_PROGRESS,
  ARRIVED: SHARED_WAYPOINT_STATUS_COLORS.COMPLETED,
  DEPARTED: '#8B5CF6',
};

interface WaypointCardContentProps {
  waypoint: ContainerWaypoint;
  isCurrent: boolean;
  isCompleted: boolean;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'dd MMM', { locale: fr });
  } catch {
    return dateString;
  }
};

const formatTime = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'HH:mm', { locale: fr });
  } catch {
    return '';
  }
};

export const WaypointCardContent: React.FC<WaypointCardContentProps> = ({
  waypoint,
  isCurrent,
  isCompleted,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useTimelineWaypointCardStyles();
  const statusColor = WAYPOINT_STATUS_COLORS[waypoint.status];
  const typeIcon = WAYPOINT_TYPE_ICONS[waypoint.type];
  const transportIcon = TRANSPORT_MODE_ICONS[waypoint.transportMode];

  const getDisplayDate = (): { label: string; date: string; time: string } | null => {
    if (waypoint.actualArrival) {
      return { label: 'Arrivé', date: formatDate(waypoint.actualArrival), time: formatTime(waypoint.actualArrival) };
    }
    if (waypoint.estimatedArrival) {
      return { label: 'Est. arrivée', date: formatDate(waypoint.estimatedArrival), time: formatTime(waypoint.estimatedArrival) };
    }
    return null;
  };

  const displayDate = getDisplayDate();

  return (
    <>
      {/* Left Side - Type Icon with background */}
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: `${statusColor}${isDark ? '35' : '15'}` }]}>
          <Ionicons name={typeIcon as any} size={24} color={statusColor} />
        </View>
        <View style={styles.connector} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
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

        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}${isDark ? '28' : '12'}` }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{WAYPOINT_STATUS_LABELS[waypoint.status]}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Ionicons name={typeIcon as any} size={12} color={colors.text.secondary} />
            <Text style={styles.infoBadgeText}>{WAYPOINT_TYPE_LABELS[waypoint.type]}</Text>
          </View>
          <View style={styles.transportBadge}>
            <Ionicons name={transportIcon as any} size={12} color={Theme.status.info} />
            <Text style={styles.transportBadgeText}>{TRANSPORT_MODE_LABELS[waypoint.transportMode]}</Text>
          </View>
        </View>

        {(waypoint.vesselName || waypoint.truckPlate) && (
          <View style={styles.detailsRow}>
            {waypoint.vesselName && (
              <View style={styles.detailItem}>
                <Ionicons name="boat" size={12} color={colors.text.secondary} />
                <Text style={styles.detailText} numberOfLines={1}>{waypoint.vesselName}</Text>
              </View>
            )}
            {waypoint.truckPlate && (
              <View style={styles.detailItem}>
                <Ionicons name="car" size={12} color={colors.text.secondary} />
                <Text style={styles.detailText} numberOfLines={1}>{waypoint.truckPlate}</Text>
              </View>
            )}
            {waypoint.carrier && (
              <View style={styles.detailItem}>
                <Ionicons name="business" size={12} color={colors.text.secondary} />
                <Text style={styles.detailText} numberOfLines={1}>{waypoint.carrier}</Text>
              </View>
            )}
          </View>
        )}

        {isCurrent && (
          <View style={styles.currentIndicator}>
            <LinearGradient colors={[Theme.status.info, '#0EA5E9']} style={styles.currentGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Ionicons name="navigate" size={12} color="#FFF" />
              <Text style={styles.currentText}>Votre container est ici</Text>
            </LinearGradient>
          </View>
        )}
      </View>

      {/* Right Side - Status Indicator */}
      <View style={styles.rightSection}>
        {isCompleted ? (
          <View style={[styles.statusIcon, { backgroundColor: Theme.status.success }]}>
            <Ionicons name="checkmark" size={16} color="#FFF" />
          </View>
        ) : isCurrent ? (
          <View style={[styles.statusIcon, { backgroundColor: Theme.status.info }]}>
            <Ionicons name="navigate" size={16} color="#FFF" />
          </View>
        ) : (
          <View style={[styles.statusIcon, { backgroundColor: colors.neutral[300] }]}>
            <Ionicons name="time-outline" size={16} color="#FFF" />
          </View>
        )}
      </View>
    </>
  );
};
