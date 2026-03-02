/**
 * Offline Banner Component
 * Shows when device is offline or syncing
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useFormattedSyncStatus } from '../hooks/useSyncStatus';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface OfflineBannerProps {
  /** Whether to show sync status when online */
  showSyncStatus?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** Whether banner is dismissible */
  dismissible?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  showSyncStatus = true,
  backgroundColor,
  textColor = '#FFFFFF',
  onDismiss,
  dismissible = false,
}) => {
  const { isOnline, isWifi } = useNetworkStatus();
  const { statusText, statusColor, badgeCount } = useFormattedSyncStatus();
  const [dismissed, setDismissed] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  const isVisible = !isOnline || (showSyncStatus && badgeCount > 0);
  const shouldShow = isVisible && !dismissed;

  useEffect(() => {
    if (shouldShow) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [shouldShow, slideAnim]);

  // Reset dismissed state when going back offline
  useEffect(() => {
    if (!isOnline) {
      setDismissed(false);
    }
  }, [isOnline]);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (!shouldShow) return null;

  const getBannerStyle = () => {
    if (!isOnline) {
      return {
        backgroundColor: backgroundColor || '#F44336', // Red for offline
        icon: 'wifi-off',
        message: isWifi ? 'Mode hors ligne (WiFi)' : 'Mode hors ligne',
      };
    }

    if (badgeCount > 0) {
      return {
        backgroundColor: statusColor,
        icon: 'sync',
        message: statusText,
      };
    }

    return {
      backgroundColor: '#4CAF50',
      icon: 'check-circle',
      message: 'Synchronisé',
    };
  };

  const bannerStyle = getBannerStyle();

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: bannerStyle.backgroundColor, transform: [{ translateY }] },
      ]}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name={bannerStyle.icon as any}
          size={20}
          color={textColor}
          style={styles.icon}
        />
        <Text style={[styles.text, { color: textColor }]}>
          {bannerStyle.message}
        </Text>
      </View>
      
      {dismissible && (
        <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
          <MaterialCommunityIcons name="close" size={20} color={textColor} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 44, // Account for status bar
    minHeight: 72,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default OfflineBanner;
