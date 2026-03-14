import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint, SEGMENT_TYPE_ICONS, SEGMENT_TYPE_LABELS, ExtendedWaypointStatus } from '../../../types';
import { getExtendedStatusColor, getExtendedStatusLabel, getExtendedStatusIcon } from '../../../types/waypointStatus';

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
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
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
      {/* Status Bar */}
      <View
        style={[
          styles.statusBar,
          { backgroundColor: statusColor },
          isDakar && styles.statusBarDakar,
          isBorderPoint && styles.statusBarBorder,
        ]}
      />

      <View style={styles.waypointContent}>
        {/* Header Row */}
        <View style={styles.waypointHeader}>
          <View style={[styles.waypointNumber, isDakar && styles.waypointNumberDakar]}>
            <Text style={[styles.waypointNumberText, isDakar && styles.waypointNumberTextDakar]}>
              {index + 1}
            </Text>
          </View>

          <View style={styles.waypointTitleContainer}>
            <Text style={[styles.waypointLocation, isDakar && styles.waypointLocationDakar]}>
              {waypoint.location?.city || waypoint.location?.toString() || 'Unknown'}
              {isDakar && ' 🚢'}
              {isBorderPoint && ' 🛂'}
              {isWarehousePoint && ' 📦'}
            </Text>
            <Text style={styles.waypointCode}>
              {waypoint.location?.portCode || waypoint.location?.countryCode || ''}
            </Text>
            {routeDisplay && (
              <View style={styles.routeDisplayBadge}>
                <Ionicons name={routeDisplay.icon as any} size={12} color="#FFF" />
                <Text style={styles.routeDisplayText}>{routeDisplay.label}</Text>
              </View>
            )}
          </View>

          <View style={styles.waypointBadges}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: `${statusColor}20` },
              ]}
            >
              <Ionicons
                name={getExtendedStatusIcon(waypoint.status as ExtendedWaypointStatus) as any}
                size={14}
                color={statusColor}
              />
              <Text style={[styles.statusBadgeText, { color: statusColor }]} numberOfLines={1}>
                {getExtendedStatusLabel(waypoint.status as ExtendedWaypointStatus)}
              </Text>
            </View>
          </View>
        </View>

        {/* Type & Transport Row */}
        <View style={styles.typeRow}>
          <View style={styles.typeBadge}>
            <Ionicons name={segmentIcon as any} size={12} color={Theme.neutral[500]} />
            <Text style={styles.typeBadgeText}>
              {SEGMENT_TYPE_LABELS[waypoint.segmentType]}
            </Text>
          </View>
          {locationCategory && (
            <View style={[styles.categoryBadge, { backgroundColor: locationCategory.color + '20' }]}>
              <Ionicons name={locationCategory.icon as any} size={10} color={locationCategory.color} />
              <Text style={[styles.categoryBadgeText, { color: locationCategory.color }]}>
                {locationCategory.label}
              </Text>
            </View>
          )}
          {isCurrent && (
            <View style={styles.currentIndicator}>
              <Text style={styles.currentIndicatorText}>POSITION ACTUELLE</Text>
            </View>
          )}
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfo}>
          {waypoint.actualArrival && (
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={12} color={Theme.status.success} />
              <Text style={styles.infoText}>
                Arrivé: {formatDate(waypoint.actualArrival)}
              </Text>
            </View>
          )}
          {!waypoint.actualArrival && waypoint.estimatedArrival && (
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={12} color={Theme.status.warning} />
              <Text style={styles.infoText}>
                Est. arrivée: {formatDate(waypoint.estimatedArrival)}
              </Text>
            </View>
          )}
        </View>

        {/* Expand Indicator */}
        <View style={styles.expandIndicator}>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Theme.neutral[400]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  waypointCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  waypointCardCurrent: {
    borderWidth: 2,
    borderColor: Theme.status.info,
    ...Theme.shadows.md,
  },
  waypointCardCompleted: {
    opacity: 0.9,
  },
  waypointCardDakar: {
    borderWidth: 2,
    borderColor: '#0EA5E9',
    ...Theme.shadows.md,
  },
  waypointCardBorder: {
    borderWidth: 2,
    borderColor: '#F59E0B',
    ...Theme.shadows.md,
  },
  waypointCardWarehouse: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    ...Theme.shadows.md,
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  statusBarDakar: {
    height: 6,
    backgroundColor: '#0EA5E9',
  },
  statusBarBorder: {
    height: 6,
    backgroundColor: '#F59E0B',
  },
  waypointContent: {
    padding: Theme.spacing.lg,
  },
  waypointHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  waypointNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  waypointNumberDakar: {
    backgroundColor: '#0EA5E9',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  waypointNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  waypointNumberTextDakar: {
    color: '#FFF',
    fontSize: 18,
  },
  waypointTitleContainer: {
    flex: 1,
  },
  waypointLocation: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  waypointLocationDakar: {
    fontSize: 18,
    color: '#0284C7',
  },
  waypointCode: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  waypointBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  routeDisplayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary[600],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    marginTop: Theme.spacing.xs,
    alignSelf: 'flex-start',
    gap: 4,
  },
  routeDisplayText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  typeBadgeText: {
    fontSize: 11,
    color: Theme.neutral[600],
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  currentIndicator: {
    backgroundColor: Theme.status.info,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
  },
  currentIndicatorText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: Theme.neutral[600],
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
});
