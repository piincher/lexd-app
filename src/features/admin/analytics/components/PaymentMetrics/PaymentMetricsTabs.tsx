import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

export type ViewMode = 'overview' | 'methods' | 'aging';

interface PaymentMetricsTabsProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const TABS: Array<{ key: ViewMode; label: string; icon: string }> = [
  { key: 'overview', label: 'Vue d\'ensemble', icon: 'view-dashboard' },
  { key: 'methods', label: 'Méthodes', icon: 'credit-card' },
  { key: 'aging', label: 'Ancienneté', icon: 'clock-alert' },
];

export const PaymentMetricsTabs: React.FC<PaymentMetricsTabsProps> = ({ viewMode, onChange }) => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.tabsContainer}>
    {TABS.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[
          styles.tab,
          viewMode === tab.key && { backgroundColor: colors.primary.main },
        ]}
        onPress={() => onChange(tab.key)}
      >
        <MaterialCommunityIcons
          name={tab.icon as any}
          size={14}
          color={viewMode === tab.key ? colors.text.inverse : colors.text.secondary}
        />
        <Text
          style={[
            styles.tabText,
            viewMode === tab.key && { color: colors.text.inverse },
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
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Theme.colors.neutral[100],
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
});
