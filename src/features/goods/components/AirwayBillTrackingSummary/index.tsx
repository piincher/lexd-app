import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAirwayBillTrackingSummaryStyles } from './AirwayBillTrackingSummary.styles';
import type { TrackingWaypoint } from '../../api/types';

interface Props {
  status: string;
  progressPercentage: number;
  currentWaypoint?: TrackingWaypoint;
  estimatedArrival?: string | null;
  goodsCount: number;
}

const STATUS_LABELS: Record<string, string> = {
  CREATED: 'Expédition créée',
  PACKING: 'Préparation en cours',
  READY_FOR_DEPARTURE: 'Prêt au départ',
  IN_TRANSIT: 'En route',
  ARRIVED: 'Arrivé à Bamako',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
};

const STATUS_ICONS: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  CREATED: 'file-document-outline',
  PACKING: 'package-variant-closed',
  READY_FOR_DEPARTURE: 'clock-check-outline',
  IN_TRANSIT: 'airplane',
  ARRIVED: 'airplane-landing',
  READY_FOR_PICKUP: 'hand-coin-outline',
  DELIVERED: 'check-circle-outline',
};

const formatDate = (date?: string | null) => {
  if (!date) return 'A confirmer';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
};

const getWaypointLabel = (waypoint?: TrackingWaypoint) => {
  if (!waypoint) return 'Suivi en préparation';
  return waypoint.shortName || waypoint.location.city || waypoint.location.warehouse || 'Etape en cours';
};

export const AirwayBillTrackingSummary: React.FC<Props> = ({
  status,
  progressPercentage,
  currentWaypoint,
  estimatedArrival,
  goodsCount,
}) => {
  const { colors } = useAppTheme();
  const styles = useAirwayBillTrackingSummaryStyles();
  const icon = STATUS_ICONS[status] || 'airplane';
  const label = STATUS_LABELS[status] || status;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.topRow}>
          <View style={styles.statusIcon}>
            <MaterialCommunityIcons name={icon} size={24} color={colors.text.inverse} />
          </View>
          <View style={styles.statusCopy}>
            <Text style={styles.eyebrow}>Statut actuel</Text>
            <Text style={styles.statusLabel}>{label}</Text>
          </View>
          <Text style={styles.progressText}>{Math.max(0, Math.min(progressPercentage, 100))}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.max(0, Math.min(progressPercentage, 100))}%` }]} />
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{getWaypointLabel(currentWaypoint)}</Text>
            <Text style={styles.metricLabel}>Position</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{formatDate(estimatedArrival)}</Text>
            <Text style={styles.metricLabel}>Arrivée prévue</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <MaterialCommunityIcons name="package-variant" size={16} color={colors.status.success} />
          <Text style={styles.footerText}>
            {goodsCount} marchandise{goodsCount > 1 ? 's' : ''} dans cette expédition
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default AirwayBillTrackingSummary;
