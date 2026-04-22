/**
 * ContainerCard - Stunning card component for containers
 * Visual representation of shipping containers with capacity indicators
 * Phase 3: Added route and shipping mode display
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Badge } from '@src/components/ui/Badge/Badge';
import { Container, ContainerStatus, CONTAINER_STATUS_LABELS, CONTAINER_STATUS_COLORS, SHIPPING_LINE_LABELS, SHIPPING_MODE_LABELS, SHIPPING_MODE_ICONS, SHIPPING_MODE_COLORS } from '../types';

// Statuses that can receive goods (assignable)
const ASSIGNABLE_STATUSES: ContainerStatus[] = ['BOOKED', 'EMPTY_TO_WAREHOUSE', 'LOADING'];

const canReceiveGoods = (status: ContainerStatus): boolean => 
  ASSIGNABLE_STATUSES.includes(status);

interface ContainerCardProps {
  container: Container;
  onPress?: () => void;
  maxCBM?: number;
}

export const ContainerCard: React.FC<ContainerCardProps> = ({ 
  container, 
  onPress,
  maxCBM = 67, // Default 40ft container
}) => {
  const statusColor = CONTAINER_STATUS_COLORS[container.status];
  const statusLabel = CONTAINER_STATUS_LABELS[container.status];
  const fillPercentage = Math.min(((container.totalCBM || 0) / maxCBM) * 100, 100);
  
  const isFull = fillPercentage >= 90;
  const isNearFull = fillPercentage >= 70 && fillPercentage < 90;

  const getFillColor = () => {
    if (isFull) return Theme.status.error;
    if (isNearFull) return Theme.status.warning;
    return Theme.status.success;
  };

  // Phase 3: Get shipping mode info
  const shippingMode = container.shippingMode || 'SEA';
  const modeIcon = SHIPPING_MODE_ICONS[shippingMode];
  const modeColor = SHIPPING_MODE_COLORS[shippingMode];
  const modeLabel = SHIPPING_MODE_LABELS[shippingMode];

  // Phase 3: Get route info
  const routeName = container.route?.name;
  const isAssignable = canReceiveGoods(container.status);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Status Color Bar */}
      <View style={[styles.statusBar, { backgroundColor: statusColor }]} />

      <View style={styles.content}>
        {/* Header: Container Number and Status */}
        <View style={styles.header}>
          <View style={styles.numberContainer}>
            <Ionicons name={modeIcon as any} size={20} color={modeColor} />
            <Text style={styles.containerNumber}>
              {container.virtualContainerNumber}
            </Text>
          </View>
          <View style={styles.badgeContainer}>
            {isAssignable && (
              <View style={styles.assignableBadge}>
                <Ionicons name="add-circle" size={10} color="#10B981" />
                <Text style={styles.assignableBadgeText}>Peut recevoir</Text>
              </View>
            )}
            <Badge 
              label={statusLabel}
              variant="neutral"
              size="small"
            />
          </View>
        </View>

        {/* Phase 3: Shipping Mode Badge */}
        <View style={styles.modeBadgeContainer}>
          <View style={[styles.modeBadge, { backgroundColor: `${modeColor}15` }]}>
            <Ionicons name={modeIcon as any} size={12} color={modeColor} />
            <Text style={[styles.modeBadgeText, { color: modeColor }]}>
              {shippingMode === 'SEA' ? 'Maritime' : 'Aérien'}
            </Text>
          </View>
          
          {/* Route Name */}
          {routeName && (
            <View style={styles.routeBadge}>
              <Ionicons name="git-branch" size={12} color={Theme.neutral[500]} />
              <Text style={styles.routeBadgeText} numberOfLines={1}>
                {routeName}
              </Text>
            </View>
          )}
        </View>

        {/* Shipping Line */}
        <View style={styles.shippingLine}>
          <Ionicons name="business" size={14} color={Theme.neutral[400]} />
          <Text style={styles.shippingLineText}>
            {SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine}
          </Text>
        </View>

        {/* Consignee */}
        <View style={styles.consignee}>
          <Ionicons name="location" size={14} color={Theme.neutral[400]} />
          <Text style={styles.consigneeText}>
            {typeof container.consigneeId === 'object' 
              ? container.consigneeId.name 
              : 'Chargement...'}
          </Text>
        </View>

        {/* Capacity Bar */}
        <View style={styles.capacitySection}>
          <View style={styles.capacityHeader}>
            <Text style={styles.capacityLabel}>Capacité utilisée</Text>
            <Text style={[styles.capacityValue, { color: getFillColor() }]}>
              {(fillPercentage || 0).toFixed(1)}%
            </Text>
          </View>
          
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={[getFillColor(), `${getFillColor()}80`]}
              style={[styles.progressBarFill, { width: `${fillPercentage}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          
          <View style={styles.capacityStats}>
            <Text style={styles.capacityStatsText}>
              {(container.totalCBM || 0).toFixed(2)} m³ / {maxCBM} m³
            </Text>
            <Text style={styles.goodsCount}>
              {container.goodsCount || container.goodsIds.length} marchandise
              {(container.goodsCount || container.goodsIds.length) > 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Timeline Preview */}
        {container.timeline && (
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { 
                backgroundColor: container.timeline.bookedAt ? Theme.status.success : Theme.neutral[300] 
              }]} />
              <Text style={styles.timelineLabel}>Réservé</Text>
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { 
                backgroundColor: container.timeline.departedAt ? Theme.status.success : Theme.neutral[300] 
              }]} />
              <Text style={styles.timelineLabel}>Expédié</Text>
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { 
                backgroundColor: container.timeline.arrivedAt ? Theme.status.success : Theme.neutral[300] 
              }]} />
              <Text style={styles.timelineLabel}>Arrivé</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.sm,
    ...Theme.shadows.md,
    overflow: 'hidden',
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  assignableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    gap: 2,
  },
  assignableBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  content: {
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  containerNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  // Phase 3: Mode Badge Styles
  modeBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    flexWrap: 'wrap',
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: Theme.spacing.xs,
  },
  modeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral[100],
    gap: Theme.spacing.xs,
    flex: 1,
    maxWidth: '60%',
  },
  routeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  shippingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  shippingLineText: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginLeft: Theme.spacing.sm,
    fontWeight: '500',
  },
  consignee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  consigneeText: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginLeft: Theme.spacing.sm,
    fontWeight: '500',
  },
  capacitySection: {
    marginBottom: Theme.spacing.lg,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  capacityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  capacityValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Theme.neutral[100],
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  capacityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.sm,
  },
  capacityStatsText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  goodsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.primary[600],
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  timelineItem: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  timelineLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[400],
  },
  timelineLine: {
    flex: 1,
    height: 2,
    backgroundColor: Theme.neutral[200],
    marginHorizontal: 8,
    marginBottom: 16,
  },
});

export default ContainerCard;
