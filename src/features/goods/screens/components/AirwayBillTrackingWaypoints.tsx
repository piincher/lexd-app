import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

type WaypointStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';

interface TrackingWaypoint {
  _id?: string;
  order: number;
  segmentType: 'AIR' | 'CUSTOMS' | 'WAREHOUSE' | 'ROAD' | 'CONTAINER';
  status: WaypointStatus;
  description?: string;
  shortName?: string;
  estimatedArrival?: string | null;
  actualArrival?: string | null;
  location: {
    city?: string;
    country?: string;
    portCode?: string;
    warehouse?: string;
  };
}

interface Props {
  waypoints: TrackingWaypoint[];
  currentWaypointIndex?: number;
  progressPercentage?: number;
}

const STATUS_LABELS: Record<WaypointStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En transit',
  COMPLETED: 'Terminé',
  DELAYED: 'Retardé',
  CANCELLED: 'Annulé',
};

const ICONS = {
  AIR: 'airplane',
  CUSTOMS: 'shield-check',
  WAREHOUSE: 'warehouse',
  ROAD: 'truck',
  CONTAINER: 'cube',
} as const;

const statusColor = (status: WaypointStatus) => ({
  PENDING: Theme.neutral[400],
  IN_PROGRESS: Theme.status.info,
  COMPLETED: Theme.status.success,
  DELAYED: Theme.status.warning,
  CANCELLED: Theme.status.error,
}[status]);

const formatDate = (date?: string | null) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

export const AirwayBillTrackingWaypoints: React.FC<Props> = ({
  waypoints,
  currentWaypointIndex = -1,
  progressPercentage = 0,
}) => (
  <>
    <View style={styles.titleRow}>
      <Text style={styles.sectionTitle}>Itinéraire détaillé</Text>
      <Text style={styles.progress}>{progressPercentage}%</Text>
    </View>
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        {waypoints.map((waypoint, index) => {
          const color = statusColor(waypoint.status);
          const date = formatDate(waypoint.actualArrival || waypoint.estimatedArrival);
          const isCurrent = index === currentWaypointIndex;

          return (
            <View key={waypoint._id || `${waypoint.order}-${index}`} style={styles.item}>
              <View style={[styles.iconWrap, { backgroundColor: `${color}20` }]}>
                <MaterialCommunityIcons
                  name={ICONS[waypoint.segmentType] as any}
                  size={20}
                  color={color}
                />
              </View>
              <View style={styles.body}>
                <View style={styles.row}>
                  <Text style={styles.location}>
                    {waypoint.shortName || waypoint.location.city || waypoint.location.warehouse}
                  </Text>
                  <Text style={[styles.status, { color }]}>{STATUS_LABELS[waypoint.status]}</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {waypoint.description || waypoint.location.country || 'Suivi en cours'}
                </Text>
                <View style={styles.metaRow}>
                  {!!waypoint.location.portCode && <Text style={styles.meta}>{waypoint.location.portCode}</Text>}
                  {!!date && <Text style={styles.meta}>{date}</Text>}
                  {isCurrent && <Text style={[styles.current, { color }]}>Position actuelle</Text>}
                </View>
              </View>
              {index < waypoints.length - 1 && <View style={styles.connector} />}
            </View>
          );
        })}
      </Card.Content>
    </Card>
  </>
);

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Theme.spacing.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Theme.neutral[800], marginBottom: Theme.spacing.md },
  progress: { fontSize: 13, fontWeight: '800', color: Theme.primary[500], marginBottom: Theme.spacing.md },
  card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
  progressTrack: { height: 6, borderRadius: 99, backgroundColor: Theme.neutral[200], overflow: 'hidden', marginBottom: Theme.spacing.md },
  progressFill: { height: '100%', borderRadius: 99, backgroundColor: Theme.primary[500] },
  item: { flexDirection: 'row', position: 'relative', paddingBottom: Theme.spacing.md },
  iconWrap: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  body: { flex: 1, marginLeft: Theme.spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  location: { fontSize: 14, fontWeight: '800', color: Theme.neutral[800], flex: 1 },
  status: { fontSize: 11, fontWeight: '800' },
  description: { fontSize: 12, color: Theme.neutral[500], marginTop: 3, lineHeight: 17 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  meta: { fontSize: 11, color: Theme.neutral[400], fontWeight: '600' },
  current: { fontSize: 11, fontWeight: '800' },
  connector: { position: 'absolute', left: 19, top: 40, bottom: 0, width: 2, backgroundColor: Theme.neutral[200] },
});
