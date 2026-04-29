import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { NOTIFICATION_PRIORITY_CONFIG } from '../../types';
import type { InAppNotification } from '../../types';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface NotificationDetailContentCardProps {
  notification: InAppNotification;
  createdAt: string;
}

export const NotificationDetailContentCard: React.FC<NotificationDetailContentCardProps> = ({
  notification,
  createdAt,
}) => {
  const { colors } = useAppTheme();
  const priorityConfig = NOTIFICATION_PRIORITY_CONFIG[notification.priority];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        contentCard: {
          margin: 16,
          marginTop: 0,
          padding: 20,
          borderRadius: 16,
          backgroundColor: colors.background.card,
        },
        headerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
        },
        title: {
          fontFamily: Fonts.bold,
          fontSize: 20,
          color: colors.text.primary,
          flex: 1,
        },
        priorityBadge: {
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 4,
        },
        priorityText: {
          fontFamily: Fonts.bold,
          fontSize: 10,
          color: colors.text.inverse,
        },
        divider: {
          marginVertical: 16,
          backgroundColor: colors.border,
        },
        message: {
          fontFamily: Fonts.regular,
          fontSize: 16,
          color: colors.text.secondary,
          lineHeight: 24,
        },
        metaContainer: {
          gap: 12,
        },
        metaItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        metaText: {
          fontFamily: Fonts.regular,
          fontSize: 14,
          color: colors.text.secondary,
        },
      }),
    [colors]
  );

  return (
    <Animated.View entering={FadeInUp.delay(200)}>
      <Surface style={styles.contentCard} elevation={1}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{notification.title}</Text>
          {notification.priority === 'HIGH' && (
            <View style={[styles.priorityBadge, { backgroundColor: priorityConfig.color }]}>
              <Text style={styles.priorityText}>{priorityConfig.label}</Text>
            </View>
          )}
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.message}>{notification.message}</Text>

        <Divider style={styles.divider} />

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="clock-outline" size={18} color={colors.text.secondary} />
            <Text style={styles.metaText}>{createdAt}</Text>
          </View>

          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              name={(notification.isRead ? 'email-open-outline' : 'email-outline') as MaterialIconName}
              size={18}
              color={notification.isRead ? colors.status.success : colors.text.secondary}
            />
            <Text style={styles.metaText}>{notification.isRead ? 'Lue' : 'Non lue'}</Text>
          </View>
        </View>
      </Surface>
    </Animated.View>
  );
};
