/**
 * Offline Indicator Component
 * Small indicator for offline status (badge, dot, or icon)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useHasUnsyncedChanges } from '../hooks/useSyncStatus';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface OfflineIndicatorProps {
  /** Type of indicator */
  variant?: 'dot' | 'badge' | 'icon' | 'pill';
  /** Size of the indicator */
  size?: 'small' | 'medium' | 'large';
  /** Custom color */
  color?: string;
  /** Show only when offline */
  offlineOnly?: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  variant = 'dot',
  size = 'medium',
  color,
  offlineOnly = false,
}) => {
  const { isOnline } = useNetworkStatus();
  const hasUnsynced = useHasUnsyncedChanges();

  const shouldShow = offlineOnly ? !isOnline : !isOnline || hasUnsynced;

  if (!shouldShow) return null;

  const getSize = () => {
    switch (size) {
      case 'small':
        return { dot: 6, icon: 12, fontSize: 10, padding: 4 };
      case 'large':
        return { dot: 14, icon: 24, fontSize: 14, padding: 10 };
      case 'medium':
      default:
        return { dot: 10, icon: 18, fontSize: 12, padding: 6 };
    }
  };

  const getColor = () => {
    if (color) return color;
    if (!isOnline) return '#F44336'; // Red for offline
    if (hasUnsynced) return '#FF9800'; // Orange for unsynced
    return '#4CAF50'; // Green for synced
  };

  const sizes = getSize();
  const indicatorColor = getColor();

  switch (variant) {
    case 'dot':
      return (
        <View
          style={[
            styles.dot,
            {
              width: sizes.dot,
              height: sizes.dot,
              backgroundColor: indicatorColor,
            },
          ]}
        />
      );

    case 'badge':
      return (
        <View style={[styles.badge, { backgroundColor: indicatorColor, padding: sizes.padding }]}>
          <MaterialCommunityIcons name={isOnline ? 'sync' : 'wifi-off'} size={sizes.icon} color="#FFF" />
        </View>
      );

    case 'icon':
      return (
        <MaterialCommunityIcons
          name={isOnline ? 'sync' : 'wifi-off'}
          size={sizes.icon}
          color={indicatorColor}
        />
      );

    case 'pill':
      return (
        <View style={[styles.pill, { backgroundColor: `${indicatorColor}20`, paddingHorizontal: sizes.padding + 4 }]}>
          <MaterialCommunityIcons
            name={isOnline ? 'sync' : 'wifi-off'}
            size={sizes.icon}
            color={indicatorColor}
            style={styles.pillIcon}
          />
          <Text style={[styles.pillText, { color: indicatorColor, fontSize: sizes.fontSize }]}>
            {!isOnline ? 'Hors ligne' : hasUnsynced ? 'Sync requise' : 'Synchronisé'}
          </Text>
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
  },
  badge: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: 4,
  },
  pillIcon: {
    marginRight: 4,
  },
  pillText: {
    fontWeight: '600',
  },
});

export default OfflineIndicator;
