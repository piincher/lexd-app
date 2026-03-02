/**
 * WaypointCard - Individual waypoint card for customer view
 * Displays location info, status, dates, and transport mode in a clean design
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import {
  ContainerWaypoint,
  WAYPOINT_STATUS_COLORS,
  WAYPOINT_STATUS_LABELS,
  WAYPOINT_TYPE_ICONS,
  WAYPOINT_TYPE_LABELS,
  TRANSPORT_MODE_ICONS,
  TRANSPORT_MODE_LABELS,
  CUSTOMER_WAYPOINT_TYPE_COLORS,
} from '../types';

interface WaypointCardProps {
  waypoint: ContainerWaypoint;
  isCurrent?: boolean;
  isCompleted?: boolean;
}

export const WaypointCard: React.FC<WaypointCardProps> = ({
  waypoint,
  isCurrent = false,
  isCompleted = false,
}) => {
  const statusColor = WAYPOINT_STATUS_COLORS[waypoint.status];
  const typeIcon = WAYPOINT_TYPE_ICONS[waypoint.type];
  const transportIcon = TRANSPORT_MODE_ICONS[waypoint.transportMode];
  const typeColor = CUSTOMER_WAYPOINT_TYPE_COLORS[waypoint.type];

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd MMM', { locale: fr });
    } catch {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'HH:mm', { locale: fr });
    } catch {
      return '';
    }
  };

  // Get the most relevant date to display
  const getDisplayDate = (): { label: string; date: string; time: string } | null => {
    if (waypoint.actualArrival) {
      return {
        label: 'Arrivé',
        date: formatDate(waypoint.actualArrival),
        time: formatTime(waypoint.actualArrival),
      };
    }
    if (waypoint.estimatedArrival) {
      return {
        label: 'Est. arrivée',
        date: formatDate(waypoint.estimatedArrival),
        time: formatTime(waypoint.estimatedArrival),
      };
    }
    return null;
  };

  const displayDate = getDisplayDate();

  return (
    <View
      style={[
        styles.container,
        isCurrent && styles.containerCurrent,
        isCompleted && styles.containerCompleted,
      ]}
    >
      {/* Left Side - Type Icon with background */}
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${typeColor}20` },
          ]}
        >
          <Ionicons name={typeIcon as any} size={24} color={typeColor} />
        </View>
        {/* Connector line for timeline effect */}
        <View style={styles.connector} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationName} numberOfLines={1}>
              {waypoint.location}
            </Text>
            <Text style={styles.locationCode}>{waypoint.locationCode}</Text>
          </View>
          {displayDate && (
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>{displayDate.label}</Text>
              <Text style={styles.dateValue}>{displayDate.date}</Text>
              {displayDate.time && (
                <Text style={styles.timeValue}>{displayDate.time}</Text>
              )}
            </View>
          )}
        </View>

        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${statusColor}15` },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: statusColor },
            ]}
          />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {WAYPOINT_STATUS_LABELS[waypoint.status]}
          </Text>
        </View>

        {/* Type & Transport Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Ionicons name={typeIcon as any} size={12} color={Theme.neutral[500]} />
            <Text style={styles.infoBadgeText}>
              {WAYPOINT_TYPE_LABELS[waypoint.type]}
            </Text>
          </View>
          <View style={styles.transportBadge}>
            <Ionicons
              name={transportIcon as any}
              size={12}
              color={Theme.status.info}
            />
            <Text style={styles.transportBadgeText}>
              {TRANSPORT_MODE_LABELS[waypoint.transportMode]}
            </Text>
          </View>
        </View>

        {/* Transport Details - Brief */}
        {(waypoint.vesselName || waypoint.truckPlate) && (
          <View style={styles.detailsRow}>
            {waypoint.vesselName && (
              <View style={styles.detailItem}>
                <Ionicons name="boat" size={12} color={Theme.neutral[400]} />
                <Text style={styles.detailText} numberOfLines={1}>
                  {waypoint.vesselName}
                </Text>
              </View>
            )}
            {waypoint.truckPlate && (
              <View style={styles.detailItem}>
                <Ionicons name="car" size={12} color={Theme.neutral[400]} />
                <Text style={styles.detailText} numberOfLines={1}>
                  {waypoint.truckPlate}
                </Text>
              </View>
            )}
            {waypoint.carrier && (
              <View style={styles.detailItem}>
                <Ionicons name="business" size={12} color={Theme.neutral[400]} />
                <Text style={styles.detailText} numberOfLines={1}>
                  {waypoint.carrier}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Current Location Indicator */}
        {isCurrent && (
          <View style={styles.currentIndicator}>
            <LinearGradient
              colors={[Theme.status.info, '#0EA5E9']}
              style={styles.currentGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
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
          <View style={[styles.statusIcon, { backgroundColor: Theme.neutral[300] }]}>
            <Ionicons name="time-outline" size={16} color="#FFF" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  containerCurrent: {
    borderWidth: 2,
    borderColor: Theme.status.info,
    ...Theme.shadows.md,
  },
  containerCompleted: {
    opacity: 0.8,
  },
  leftSection: {
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.neutral[200],
    marginTop: Theme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  locationContainer: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  locationCode: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 10,
    color: Theme.neutral[400],
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  timeValue: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    marginBottom: Theme.spacing.sm,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flexWrap: 'wrap',
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  infoBadgeText: {
    fontSize: 11,
    color: Theme.neutral[600],
    fontWeight: '500',
  },
  transportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Theme.status.info}15`,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  transportBadgeText: {
    fontSize: 11,
    color: Theme.status.info,
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 11,
    color: Theme.neutral[500],
    maxWidth: 100,
  },
  currentIndicator: {
    marginTop: Theme.spacing.sm,
  },
  currentGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.xs,
  },
  currentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  rightSection: {
    justifyContent: 'center',
    marginLeft: Theme.spacing.sm,
  },
  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaypointCard;
