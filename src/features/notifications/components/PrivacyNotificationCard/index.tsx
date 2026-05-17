/**
 * PrivacyNotificationCard
 * Displays privacy-conscious arrival notifications
 */
import React from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PrivacyNotificationCard.styles';
import { PrivacyNotificationHeader } from './PrivacyNotificationHeader';
import { PrivacyNotificationMessage } from './PrivacyNotificationMessage';
import { PrivacyNotificationPrivacyInfo } from './PrivacyNotificationPrivacyInfo';
import type { PublicNotification } from '../../types';

interface PrivacyNotificationCardProps {
  notification: PublicNotification;
  index?: number;
}

const PrivacyNotificationCard: React.FC<PrivacyNotificationCardProps> = ({
  notification,
  index = 0,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { type, maskedUserName, maskedPhone, location, containerNumber, destination, timeAgo } =
    notification;

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

  return (
    <Animated.View entering={FadeInUp.delay(index * 50)} style={styles.wrapper}>
      <Surface style={styles.surface} elevation={1}>
        <View style={[styles.iconContainer, { backgroundColor: typeConfig.backgroundColor }]}>
          <MaterialCommunityIcons name={typeConfig.icon} size={24} color={typeConfig.iconColor} />
        </View>
        <View style={styles.content}>
          <PrivacyNotificationHeader typeConfig={typeConfig} timeAgo={timeAgo} />
          <View style={styles.messageContainer}>
            <PrivacyNotificationMessage
              type={type}
              maskedUserName={maskedUserName}
              location={location}
              containerNumber={containerNumber}
              destination={destination}
            />
          </View>
          <PrivacyNotificationPrivacyInfo maskedPhone={maskedPhone} />
        </View>
      </Surface>
    </Animated.View>
  );
};

export default PrivacyNotificationCard;
