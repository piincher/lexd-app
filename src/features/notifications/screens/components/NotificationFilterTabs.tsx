/**
 * NotificationFilterTabs
 * SRP: Filter tab bar for notification categories
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { FilterTab } from '../NotificationsScreen';

interface FilterTabConfig {
  key: FilterTab;
  label: string;
  icon: string;
}

const TABS: FilterTabConfig[] = [
  { key: 'all', label: 'Toutes', icon: 'notifications-outline' },
  { key: 'unread', label: 'Non lues', icon: 'mail-unread-outline' },
  { key: 'system', label: 'Système', icon: 'settings-outline' },
];

interface NotificationFilterTabsProps {
  activeFilter: FilterTab;
  unreadCount: number;
  onFilterChange: (filter: FilterTab) => void;
}

export const NotificationFilterTabs: React.FC<NotificationFilterTabsProps> = ({
  activeFilter,
  unreadCount,
  onFilterChange,
}) => (
  <View style={styles.container}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {TABS.map((tab) => {
        const isActive = activeFilter === tab.key;
        const showBadge = tab.key === 'unread' && unreadCount > 0;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onFilterChange(tab.key)}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon as any}
              size={16}
              color={isActive ? '#FFF' : Theme.neutral[500]}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>
            {showBadge && (
              <View style={[styles.badge, isActive && styles.activeBadge]}>
                <Text style={[styles.badgeText, isActive && styles.activeBadgeText]}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 24,
    backgroundColor: Theme.neutral[100],
  },
  activeTab: {
    backgroundColor: Theme.primary[500],
  },
  tabText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  activeTabText: {
    color: '#FFF',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FFF',
  },
  activeBadgeText: {
    color: '#FFF',
  },
});
