/**
 * WaypointCard - Individual waypoint card for container tracking journey
 */

import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '@src/shared/types/containerWaypoints';
import {
  getExtendedStatusColor,
  getLocationCategory,
  ExtendedWaypointStatus,
} from '@src/shared/types/waypointStatus';
import { useWaypointCardStyles } from './WaypointCard.styles';
import { WaypointCardHeader } from './WaypointCardHeader';
import { WaypointCardMeta } from './WaypointCardMeta';
import { WaypointCardDetails } from './WaypointCardDetails';

interface WaypointCardProps {
  waypoint: ContainerWaypoint;
  index: number;
  currentWaypointIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export const WaypointCard: React.FC<WaypointCardProps> = ({
  waypoint,
  index,
  currentWaypointIndex,
  isExpanded,
  onToggle,
}) => {
  const { colors } = useAppTheme();
  const styles = useWaypointCardStyles();
  const rotation = useSharedValue(isExpanded ? '180deg' : '0deg');

  useEffect(() => {
    rotation.value = withTiming(isExpanded ? '180deg' : '0deg', { duration: 200 });
  }, [isExpanded]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: rotation.value }],
  }));

  const isCurrent = index === currentWaypointIndex;
  const isCompleted = waypoint.status === 'COMPLETED';
  const rawStatusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
  const statusColor = typeof rawStatusColor === 'string' ? rawStatusColor : colors.text.disabled;
  const locationCode = waypoint.location?.portCode || waypoint.location?.countryCode || '';
  const category = getLocationCategory(locationCode);
  const isDakar = category === 'DISCHARGE_PORT';
  const isBorder = category === 'BORDER';
  const isWarehouse = category === 'WAREHOUSE';

  return (
    <View>
      {index > 0 && (
        <View style={styles.timelineConnector}>
          <View
            style={[
              styles.connectorLine,
              isCompleted || index <= currentWaypointIndex
                ? { backgroundColor: colors.status.success }
                : isCurrent
                ? { backgroundColor: colors.status.info }
                : { backgroundColor: colors.neutral[300] },
            ]}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.waypointCard,
          isCurrent && styles.waypointCardCurrent,
          isCompleted && styles.waypointCardCompleted,
          isDakar && styles.waypointCardDakar,
          isBorder && styles.waypointCardBorder,
          isWarehouse && styles.waypointCardWarehouse,
        ]}
        onPress={onToggle}
        activeOpacity={0.9}
      >
        <View style={[styles.wpStatusBar, { backgroundColor: statusColor }, (isDakar || isBorder) && { height: 6 }]} />

        <View style={styles.wpContent}>
          <WaypointCardHeader waypoint={waypoint} index={index} />
          <WaypointCardMeta waypoint={waypoint} isCurrent={isCurrent} />

          <View style={styles.wpExpandIndicator}>
            <Animated.View style={chevronStyle}>
              <Ionicons name="chevron-down" size={18} color={colors.text.secondary} />
            </Animated.View>
          </View>

          {isExpanded && <WaypointCardDetails waypoint={waypoint} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};
