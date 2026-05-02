import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '@src/shared/ui/Card';
import { Badge } from '@src/shared/ui/Badge';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillWaypoint, AirwayBillWaypointStatus } from '../../types';
import {
  AIRWAY_BILL_SEGMENT_LABELS,
  AIRWAY_BILL_WAYPOINT_STATUS_LABELS,
  getAirwayBillWaypointIcon,
} from '../../constants';
import { AirwayBillWaypointActions } from './AirwayBillWaypointActions';

interface Props {
  waypoints: AirwayBillWaypoint[];
  currentWaypointIndex?: number;
  progressPercentage?: number;
  isUpdating?: boolean;
  onWaypointStatusChange?: (waypointIndex: number, status: AirwayBillWaypointStatus) => void;
}

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const formatDate = (date?: string | null) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

export const AirwayBillWaypointTimeline: React.FC<Props> = ({
  waypoints,
  currentWaypointIndex = -1,
  progressPercentage = 0,
  isUpdating = false,
  onWaypointStatusChange,
}) => {
  const { colors } = useAppTheme();

  if (!waypoints.length) {
    return (
      <Card style={styles.card} padding="large">
        <Text style={[styles.title, { color: colors.text.primary }]}>Itinéraire aérien</Text>
        <Text style={[styles.empty, { color: colors.text.secondary }]}>
          Les étapes seront générées automatiquement dès que la route AWB est disponible.
        </Text>
      </Card>
    );
  }

  const statusColor = (status: AirwayBillWaypointStatus) => ({
    PENDING: colors.neutral[400],
    IN_PROGRESS: colors.status.info,
    COMPLETED: colors.status.success,
    DELAYED: colors.status.warning,
    CANCELLED: colors.status.error,
  }[status]);

  return (
    <Card style={styles.card} padding="large">
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Itinéraire aérien</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            {progressPercentage}% complété · {waypoints.length} étapes
          </Text>
        </View>
        <Badge
          label={currentWaypointIndex >= 0 ? `Étape ${currentWaypointIndex + 1}` : 'Planifié'}
          variant="custom"
          backgroundColor={`${colors.primary.main}18`}
          textColor={colors.primary.main}
        />
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressPercentage}%`, backgroundColor: colors.primary.main },
          ]}
        />
      </View>
      {waypoints.map((waypoint, index) => {
        const color = statusColor(waypoint.status);
        const icon = getAirwayBillWaypointIcon(waypoint) as MaterialIconName;
        const date = formatDate(waypoint.actualArrival || waypoint.estimatedArrival);
        const isCurrent = index === currentWaypointIndex;

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
            {index < waypoints.length - 1 && (
              <View style={[styles.connector, { backgroundColor: colors.neutral[200] }]} />
            )}
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 14 },
  title: { fontSize: 16, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 3 },
  empty: { fontSize: 13, lineHeight: 19, marginTop: 8 },
  progressTrack: { height: 6, borderRadius: 99, backgroundColor: Theme.colors.neutral[200], overflow: 'hidden', marginBottom: 14 },
  progressFill: { height: '100%', borderRadius: 99 },
  item: { flexDirection: 'row', position: 'relative', paddingBottom: 16 },
  iconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  itemBody: { flex: 1, marginLeft: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  location: { fontSize: 14, fontWeight: '800', flex: 1 },
  status: { fontSize: 11, fontWeight: '800' },
  description: { fontSize: 12, lineHeight: 17, marginTop: 3 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  meta: { fontSize: 11, fontWeight: '600' },
  current: { fontSize: 11, fontWeight: '800' },
  connector: { position: 'absolute', left: 17, top: 36, bottom: 0, width: 2 },
});
