/**
 * NotificationHeader
 * SRP: Screen header with title, unread count, and mark-all action
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface NotificationHeaderProps {
  unreadCount: number;
  hasUnread: boolean;
  isMarkingAll: boolean;
  onMarkAllAsRead: () => void;
  onBack: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  hasUnread,
  isMarkingAll,
  onMarkAllAsRead,
  onBack,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
        <MaterialCommunityIcons name="arrow-left" size={22} color={Theme.neutral[800]} />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <Animated.View entering={FadeIn.duration(300)}>
            <Text style={styles.subtitle}>
              {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
            </Text>
          </Animated.View>
        )}
      </View>
    </View>

    {hasUnread && (
      <TouchableOpacity
        onPress={onMarkAllAsRead}
        disabled={isMarkingAll}
        style={[styles.markAllButton, isMarkingAll && styles.markAllDisabled]}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="check-all"
          size={18}
          color={isMarkingAll ? Theme.neutral[400] : Theme.primary[500]}
        />
        <Text
          style={[
            styles.markAllText,
            isMarkingAll && { color: Theme.neutral[400] },
          ]}
        >
          Tout lu
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Theme.colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Theme.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Theme.primary[500],
    marginTop: 1,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Theme.primary[50],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  markAllDisabled: {
    backgroundColor: Theme.neutral[100],
  },
  markAllText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.primary[500],
  },
});
