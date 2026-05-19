import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AirwayBillTrackingWaypoints.styles';
import type { TrackingWaypoint } from '../../api/types';
import {
  formatDate,
  getCustomerEtaLabel,
  getWaypointIcon,
  SEGMENT_LABELS,
  statusColor,
  STATUS_LABELS,
  translateDescription,
  type MaterialIconName,
} from './AirwayBillTrackingWaypoints.utils';

interface Props {
  waypoints: TrackingWaypoint[];
  currentWaypointIndex?: number;
  progressPercentage?: number;
}

export const AirwayBillTrackingWaypoints: React.FC<Props> = ({
  waypoints,
  currentWaypointIndex = -1,
  progressPercentage = 0,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
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
            const icon = getWaypointIcon(waypoint) as MaterialIconName;
            const customerEta = getCustomerEtaLabel(waypoint);
            const description = translateDescription(
              waypoint.description,
              waypoint.location.country || 'Suivi en cours',
            );

            return (
              <View key={waypoint._id || `${waypoint.order}-${index}`} style={styles.item}>
                <View style={[styles.iconWrap, { backgroundColor: `${color}20` }]}>
                  <MaterialCommunityIcons
                    name={icon}
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
                    {description}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.meta}>{waypoint.location.portCode || SEGMENT_LABELS[waypoint.segmentType]}</Text>
                    {!!date && <Text style={styles.meta}>{date}</Text>}
                    {!!waypoint.warehouseDetails?.contactPhone && (
                      <Text style={styles.meta}>{waypoint.warehouseDetails.contactPhone}</Text>
                    )}
                    {!!customerEta && <Text style={styles.etaMeta}>{customerEta}</Text>}
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
};
