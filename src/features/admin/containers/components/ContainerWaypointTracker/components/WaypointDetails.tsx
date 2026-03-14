import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../../types';

interface WaypointDetailsProps {
  waypoint: ContainerWaypoint;
  formatDateTime: (dateString?: string) => string;
}

export const WaypointDetails: React.FC<WaypointDetailsProps> = ({
  waypoint,
  formatDateTime,
}) => {
  return (
    <Animated.View entering={FadeIn} style={styles.expandedContent}>
      <View style={styles.divider} />

      {/* Times Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horaires</Text>
        <View style={styles.timesGrid}>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Arrivée Estimée</Text>
            <Text style={styles.timeValue}>
              {formatDateTime(waypoint.estimatedArrival)}
            </Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Arrivée Réelle</Text>
            <Text
              style={[
                styles.timeValue,
                !waypoint.actualArrival && styles.timePending,
              ]}
            >
              {waypoint.actualArrival
                ? formatDateTime(waypoint.actualArrival)
                : 'En attente'}
            </Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Départ Estimé</Text>
            <Text style={styles.timeValue}>
              {formatDateTime(waypoint.estimatedDeparture)}
            </Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Départ Réel</Text>
            <Text
              style={[
                styles.timeValue,
                !waypoint.actualDeparture && styles.timePending,
              ]}
            >
              {waypoint.actualDeparture
                ? formatDateTime(waypoint.actualDeparture)
                : 'En attente'}
            </Text>
          </View>
        </View>
      </View>

      {/* Sea Details */}
      {waypoint.seaDetails && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails Maritime</Text>
          {waypoint.seaDetails.vesselName && (
            <View style={styles.detailRow}>
              <Ionicons name="boat" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailLabel}>Navire:</Text>
              <Text style={styles.detailValue}>{waypoint.seaDetails.vesselName}</Text>
            </View>
          )}
          {waypoint.seaDetails.carrier && (
            <View style={styles.detailRow}>
              <Ionicons name="business" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailLabel}>Compagnie:</Text>
              <Text style={styles.detailValue}>{waypoint.seaDetails.carrier}</Text>
            </View>
          )}
          {waypoint.seaDetails.terminal && (
            <View style={styles.detailRow}>
              <Ionicons name="location" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailLabel}>Terminal:</Text>
              <Text style={styles.detailValue}>{waypoint.seaDetails.terminal}</Text>
            </View>
          )}
        </View>
      )}

      {/* Road Details */}
      {waypoint.roadDetails && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails Routier</Text>
          {waypoint.roadDetails.transporterName && (
            <View style={styles.detailRow}>
              <Ionicons name="car" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailLabel}>Transporteur:</Text>
              <Text style={styles.detailValue}>{waypoint.roadDetails.transporterName}</Text>
            </View>
          )}
          {waypoint.roadDetails.truckPlateNumber && (
            <View style={styles.detailRow}>
              <Ionicons name="card" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailLabel}>Plaque:</Text>
              <Text style={styles.detailValue}>{waypoint.roadDetails.truckPlateNumber}</Text>
            </View>
          )}
          {waypoint.roadDetails.borderCrossing && (
            <View style={styles.detailRow}>
              <Ionicons name="flag" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailLabel}>Frontière:</Text>
              <Text style={styles.detailValue}>{waypoint.roadDetails.borderCrossing}</Text>
            </View>
          )}
        </View>
      )}

      {/* Notes */}
      {waypoint.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={styles.notesContainer}>
            <Ionicons
              name="document-text-outline"
              size={16}
              color={Theme.neutral[500]}
            />
            <Text style={styles.notesText}>{waypoint.notes}</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  expandedContent: {
    marginTop: Theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  timeItem: {
    flex: 1,
    minWidth: '45%',
  },
  timeLabel: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  timePending: {
    color: Theme.neutral[400],
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[800],
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[700],
  },
});
