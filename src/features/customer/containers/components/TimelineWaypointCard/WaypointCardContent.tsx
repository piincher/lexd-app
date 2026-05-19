import React from 'react';
import { View } from 'react-native';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  ContainerWaypoint,
  WaypointStatus,
  WAYPOINT_TYPE_ICONS,
} from '../../types';
import { WAYPOINT_STATUS_COLORS as SHARED_WAYPOINT_STATUS_COLORS } from '@src/shared/types/containerWaypoints';
import { useTimelineWaypointCardStyles } from './TimelineWaypointCard.styles';
import { WaypointCardLeftSection } from './WaypointCardLeftSection';
import { WaypointCardHeader } from './WaypointCardHeader';
import { WaypointStatusBadge } from './WaypointStatusBadge';
import { WaypointCardMeta } from './WaypointCardMeta';
import { WaypointCurrentIndicator } from './WaypointCurrentIndicator';
import { WaypointCardRightSection } from './WaypointCardRightSection';

interface WaypointCardContentProps {
  waypoint: ContainerWaypoint;
  isCurrent: boolean;
  isCompleted: boolean;
}

const getWaypointStatusColor = (status: WaypointStatus, colors: any): string => {
  const statusColors: Record<WaypointStatus, string> = {
    PENDING: SHARED_WAYPOINT_STATUS_COLORS.PENDING,
    IN_TRANSIT: SHARED_WAYPOINT_STATUS_COLORS.IN_PROGRESS,
    ARRIVED: SHARED_WAYPOINT_STATUS_COLORS.COMPLETED,
    DEPARTED: colors.primary.main,
  };

  return statusColors[status];
};

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
  const statusColor = getWaypointStatusColor(waypoint.status, colors);
  const typeIcon = WAYPOINT_TYPE_ICONS[waypoint.type];

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
      <WaypointCardLeftSection styles={styles} statusColor={statusColor} isDark={isDark} typeIcon={typeIcon} />
      <View style={styles.content}>
        <WaypointCardHeader styles={styles} waypoint={waypoint} displayDate={displayDate} />
        <WaypointStatusBadge styles={styles} status={waypoint.status} statusColor={statusColor} isDark={isDark} />
        <WaypointCardMeta styles={styles} waypoint={waypoint} colors={colors} />
        {isCurrent && <WaypointCurrentIndicator styles={styles} colors={colors} />}
      </View>
      <WaypointCardRightSection styles={styles} colors={colors} isCompleted={isCompleted} isCurrent={isCurrent} />
    </>
  );
};
