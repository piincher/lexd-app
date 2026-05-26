import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillWaypoint, AirwayBillWaypointStatus } from '../../types';
import {
  AIRWAY_BILL_SEGMENT_LABELS,
  AIRWAY_BILL_WAYPOINT_STATUS_LABELS,
  getAirwayBillWaypointIcon,
} from '../../constants';
import { AirwayBillWaypointActions } from './AirwayBillWaypointActions';
import { createStyles } from './AirwayBillWaypointTimeline.styles';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const formatDate = (date?: string | null) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

interface WaypointTimelineItemProps {
  waypoint: AirwayBillWaypoint;
  index: number;
  isCurrent: boolean;
  isLast: boolean;
  isUpdating?: boolean;
  onWaypointStatusChange?: (waypointIndex: number, status: AirwayBillWaypointStatus) => void;
}

export const WaypointTimelineItem: React.FC<WaypointTimelineItemProps> = ({
  waypoint,
  index,
  isCurrent,
  isLast,
  isUpdating,
  onWaypointStatusChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const statusColor = (status: AirwayBillWaypointStatus) =>
    ({
      PENDING: colors.neutral[400],
      IN_PROGRESS: colors.status.info,
      COMPLETED: colors.status.success,
      DELAYED: colors.status.warning,
      CANCELLED: colors.status.error,
    }[status]);

  const color = statusColor(waypoint.status);
  const icon = getAirwayBillWaypointIcon(waypoint) as MaterialIconName;
  const date = formatDate(waypoint.actualArrival || waypoint.estimatedArrival);

  return (
    <View key={waypoint._id || `${waypoint.order}-${index}`} style={styles.item}>
      <View style={[styles.iconWrap, { backgroundColor: `${color}18` }]}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      <View style={styles.itemBody}>
        <View style={styles.itemHeader}>
          <Text style={[styles.location, { color: colors.text.primary }]}>
            {waypoint.shortName || waypoint.location.city}
          </Text>
          <Text style={[styles.status, { color }]}>{AIRWAY_BILL_WAYPOINT_STATUS_LABELS[waypoint.status]}</Text>
        </View>
        <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={2}>
          {waypoint.description || waypoint.location.warehouse || waypoint.location.country}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: colors.text.muted }]}>
            {waypoint.location.portCode || AIRWAY_BILL_SEGMENT_LABELS[waypoint.segmentType]}
          </Text>
          {date && <Text style={[styles.meta, { color: colors.text.muted }]}>{date}</Text>}
          {!!waypoint.warehouseDetails?.contactPhone && (
            <Text style={[styles.meta, { color: colors.text.muted }]}>
              {waypoint.warehouseDetails.contactPhone}
            </Text>
          )}
          {isCurrent && <Text style={[styles.current, { color }]}>Position actuelle</Text>}
        </View>
        {!!onWaypointStatusChange && (
          <AirwayBillWaypointActions
            currentStatus={waypoint.status}
            disabled={isUpdating}
            onSelectStatus={(status) => onWaypointStatusChange(index, status)}
          />
        )}
      </View>
      {!isLast && <View style={[styles.connector, { backgroundColor: colors.neutral[200] }]} />}
    </View>
  );
};
