/**
 * RouteFilters - Mode filter pills component
 */

import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShippingMode } from '../../types';
import { createStyles } from './RouteFilters.styles';

const MODE_FILTERS: { key: ShippingMode | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'SEA', label: 'Maritime', icon: 'boat' },
  { key: 'AIR', label: 'Aérien', icon: 'airplane' },
];

interface RouteFiltersProps {
  selectedMode: ShippingMode | 'all';
  onSelectMode: (mode: ShippingMode | 'all') => void;
}

export const RouteFilters: React.FC<RouteFiltersProps> = ({ selectedMode, onSelectMode }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.filterWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
      >
        {MODE_FILTERS.map((filter) => {
          const isSelected = selectedMode === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterPill,
                isSelected && styles.filterPillActive,
              ]}
              onPress={() => onSelectMode(filter.key)}
            >
              {isSelected && (
                <LinearGradient
                  colors={Theme.gradients.primary}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              )}
              <Ionicons
                name={filter.icon as any}
                size={16}
                color={isSelected ? colors.text.inverse : colors.neutral[500]}
                style={styles.filterIcon}
              />
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RouteFilters;
