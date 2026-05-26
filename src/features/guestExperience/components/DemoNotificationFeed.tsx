import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoNotification } from '../types';

interface Props {
  notifications: DemoNotification[];
}

export const DemoNotificationFeed: React.FC<Props> = ({ notifications }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Notifications récentes</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {notifications.map((item, index) => (
        <Animated.View
          key={item.id}
          entering={FadeInDown.delay(index * 80).springify()}
          style={styles.card}
        >
          <View style={[styles.iconCircle, { backgroundColor: `${item.color}18` }]}>
            <FontAwesome6 name={item.icon as any} size={14} color={item.color} />
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.detail} numberOfLines={2}>
              {item.detail}
            </Text>
            <Text style={styles.meta}>
              {item.channel} · {item.time}
            </Text>
          </View>

          {!item.read && <View style={styles.unreadDot} />}
        </Animated.View>
      ))}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    badge: {
      backgroundColor: colors.status.error,
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 2,
      minWidth: 20,
      alignItems: 'center',
    },
    badgeText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 11,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    iconCircle: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBlock: {
      flex: 1,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 2,
    },
    meta: {
      color: colors.text.muted,
      fontFamily: Fonts.medium,
      fontSize: 11,
      marginTop: 4,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.status.error,
      marginLeft: 4,
    },
  });
