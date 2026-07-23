/**
 * NotificationFilterTabs
 * SRP: Filter tab bar for notification categories
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';
import type { FilterTab } from '../../types';

interface FilterTabConfig {
  key: FilterTab;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const TABS: FilterTabConfig[] = [
  { key: 'all', label: 'Toutes', icon: 'bell-outline' },
  { key: 'important', label: 'Important', icon: 'alert-circle-outline' },
  { key: 'shipments', label: 'Expéditions', icon: 'truck-delivery-outline' },
  { key: 'payments', label: 'Paiements', icon: 'cash-multiple' },
  { key: 'unread', label: 'Non lues', icon: 'email-outline' },
  { key: 'system', label: 'Système', icon: 'cog-outline' },
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
}) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background.default,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral[100],
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
          borderRadius: RADIUS.badge,
          backgroundColor: colors.neutral[100],
        },
        activeTab: {
          backgroundColor: colors.primary[500],
        },
        tabText: {
          fontSize: 13,
          fontFamily: Fonts.semiBold,
          fontWeight: '600',
          color: colors.neutral[500],
        },
        activeTabText: {
          color: colors.text.inverse,
        },
        badge: {
          minWidth: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors.primary[500],
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
        },
        activeBadge: {
          backgroundColor: hexToRgba(colors.text.inverse, 0.3),
        },
        badgeText: {
          fontSize: 11,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.inverse,
        },
        activeBadgeText: {
          color: colors.text.inverse,
        },
      }),
    [colors]
  );

  return (
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
              <MaterialCommunityIcons
                name={tab.icon}
                size={16}
                color={isActive ? colors.text.inverse : colors.neutral[500]}
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
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};
