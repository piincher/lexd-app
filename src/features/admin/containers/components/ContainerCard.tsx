/**
 * ContainerCard - Stunning card component for containers
 * Visual representation of shipping containers with capacity indicators
 * Phase 3: Added route and shipping mode display
 */

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
} from 'react-native';
import { createStyles } from './ContainerCard.styles';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/components/ui/Badge/Badge';
import { Container, ContainerStatus, CONTAINER_STATUS_LABELS, getContainerStatusColors, SHIPPING_LINE_LABELS, SHIPPING_MODE_LABELS, SHIPPING_MODE_ICONS, getShippingModeColors } from '../types';
import { ContainerCapacityBar } from './ContainerCapacityBar';
import { ContainerTimeline } from './ContainerTimeline';

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
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const statusColor = getContainerStatusColors(colors)[container.status];
  const statusLabel = CONTAINER_STATUS_LABELS[container.status];
  // Phase 3: Get shipping mode info
  const shippingMode = container.shippingMode || 'SEA';
  const modeIcon = SHIPPING_MODE_ICONS[shippingMode];
  const modeColor = getShippingModeColors(colors)[shippingMode];
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
                <Ionicons name="add-circle" size={10} color={colors.status.success} />
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
              <Ionicons name="git-branch" size={12} color={colors.neutral[500]} />
              <Text style={styles.routeBadgeText} numberOfLines={1}>
                {routeName}
              </Text>
            </View>
          )}
        </View>

        {/* Shipping Line */}
        <View style={styles.shippingLine}>
          <Ionicons name="business" size={14} color={colors.neutral[400]} />
          <Text style={styles.shippingLineText}>
            {SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine}
          </Text>
        </View>

        {/* Consignee */}
        <View style={styles.consignee}>
          <Ionicons name="location" size={14} color={colors.neutral[400]} />
          <Text style={styles.consigneeText}>
            {typeof container.consigneeId === 'object' 
              ? container.consigneeId.name 
              : 'Chargement...'}
          </Text>
        </View>

        <ContainerCapacityBar container={container} maxCBM={maxCBM} />
        <ContainerTimeline timeline={container.timeline} />
      </View>
    </TouchableOpacity>
  );
};

export default ContainerCard;
