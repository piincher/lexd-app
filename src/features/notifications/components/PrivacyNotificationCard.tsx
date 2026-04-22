/**
 * PrivacyNotificationCard
 * Displays privacy-conscious arrival notifications
 * Shows masked user info (name/phone) with location and timestamp
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { PublicNotification } from '../types';

interface PrivacyNotificationCardProps {
  notification: PublicNotification;
  index?: number;
}

const PrivacyNotificationCard: React.FC<PrivacyNotificationCardProps> = ({
  notification,
  index = 0,
}) => {
  const { colors } = useAppTheme();
  const { type, maskedUserName, maskedPhone, location, containerNumber, destination, timeAgo } = notification;

  // Determine icon and colors based on notification type
  const getTypeConfig = () => {
    switch (type) {
      case 'GOODS_ARRIVED':
        return {
          icon: 'package-variant-closed' as const,
          iconColor: colors.status.success,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          label: 'Arrivée',
        };
      case 'GOODS_ASSIGNED':
        return {
          icon: 'truck-delivery' as const,
          iconColor: colors.primary.main,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          label: 'Assigné',
        };
      default:
        return {
          icon: 'bell' as const,
          iconColor: colors.text.secondary,
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          label: 'Info',
        };
    }
  };

  const typeConfig = getTypeConfig();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginVertical: 6,
    },
    surface: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.background.card,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    typeBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    typeText: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      textTransform: 'uppercase',
    },
    timeAgo: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    messageContainer: {
      marginBottom: 8,
    },
    message: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text.primary,
    },
    messageText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
    highlight: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.text.primary,
    },
    location: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.status.success,
    },
    container: {
      fontFamily: Fonts.semiBold,
      fontSize: 14,
      color: colors.primary.main,
    },
    destination: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
    },
    privacyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    privacyText: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
  }), [colors]);

  // Build the notification message
  const getNotificationMessage = () => {
    switch (type) {
      case 'GOODS_ARRIVED':
        return (
          <Text style={styles.message}>
            <Text style={styles.highlight}>{maskedUserName}'s</Text>
            <Text style={styles.messageText}> goods arrived at </Text>
            <Text style={styles.location}>Warehouse {location}</Text>
          </Text>
        );
      case 'GOODS_ASSIGNED':
        return (
          <Text style={styles.message}>
            <Text style={styles.highlight}>{maskedUserName}'s</Text>
            <Text style={styles.messageText}> goods assigned to </Text>
            <Text style={styles.container}>Container {containerNumber}</Text>
            {destination && (
              <>
                <Text style={styles.messageText}>{'\n'}Destination: </Text>
                <Text style={styles.destination}>{destination}</Text>
              </>
            )}
          </Text>
        );
      default:
        return <Text style={styles.message}>{maskedUserName} - {location}</Text>;
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 50)}
      style={styles.container}
    >
      <Surface style={styles.surface} elevation={1}>
        {/* Icon and Type Badge */}
        <View style={[styles.iconContainer, { backgroundColor: typeConfig.backgroundColor }]}>
          <MaterialCommunityIcons
            name={typeConfig.icon}
            size={24}
            color={typeConfig.iconColor}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Type Label */}
          <View style={styles.header}>
            <View style={[styles.typeBadge, { backgroundColor: typeConfig.backgroundColor }]}>
              <Text style={[styles.typeText, { color: typeConfig.iconColor }]}>
                {typeConfig.label}
              </Text>
            </View>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>

          {/* Message */}
          <View style={styles.messageContainer}>
            {getNotificationMessage()}
          </View>

          {/* Privacy Info */}
          <View style={styles.privacyContainer}>
            <MaterialCommunityIcons
              name="shield-check"
              size={12}
              color={colors.text.secondary}
            />
            <Text style={styles.privacyText}>Contact: {maskedPhone}</Text>
          </View>
        </View>
      </Surface>
    </Animated.View>
  );
};

export default PrivacyNotificationCard;
