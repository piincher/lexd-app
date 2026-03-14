import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface TabNavigationProps {
  activeTab: 'waypoints' | 'sea' | 'road';
  onTabChange: (tab: 'waypoints' | 'sea' | 'road') => void;
}

const TABS = [
  { key: 'waypoints', icon: 'map', label: 'Waypoints' },
  { key: 'sea', icon: 'boat', label: 'Maritime' },
  { key: 'road', icon: 'car', label: 'Routier' },
] as const;

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.tabContainer}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          onPress={() => onTabChange(tab.key)}
        >
          <Ionicons
            name={tab.icon}
            size={18}
            color={activeTab === tab.key ? Theme.primary[600] : Theme.neutral[500]}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.tabTextActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Theme.neutral[50],
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Theme.neutral[100],
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: Theme.primary[50],
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  tabTextActive: {
    color: Theme.primary[600],
    fontWeight: '600',
  },
});
