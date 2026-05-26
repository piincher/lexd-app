/* Hallmark · component: segmented-control · genre: modern-minimal · theme: brand-aligned app theme
 * states: default (inactive) · active (mode gradient) · pressed (activeOpacity)
 * Separates AIR / SEA so goods can't be mixed up; the active mode recolors the hero.
 * pre-emit critique: P4 H5 E4 S5 R4 V4
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import type { ShippingMode } from '../../../hooks/useGoodsListFilters';

interface GoodsModeTabsProps {
  mode: ShippingMode;
  onChange: (mode: ShippingMode) => void;
}

const TABS: { key: ShippingMode; label: string; icon: string }[] = [
  { key: 'SEA', label: 'Maritime', icon: 'boat' },
  { key: 'AIR', label: 'Aérien', icon: 'airplane' },
];

export const GoodsModeTabs: React.FC<GoodsModeTabsProps> = ({ mode, onChange }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = mode === tab.key;
        // Read gradients at render time so they stay theme-reactive (dark/light).
        const gradient = tab.key === 'AIR' ? Theme.gradients.purple : Theme.gradients.ocean;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.segment}
            activeOpacity={0.85}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            {active && (
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            )}
            <Ionicons
              name={tab.icon as any}
              size={18}
              color={active ? '#FFFFFF' : colors.text.secondary}
              style={styles.icon}
            />
            <Text style={[styles.label, { color: active ? '#FFFFFF' : colors.text.secondary }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 4,
      padding: 4,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      ...Theme.shadows.sm,
    },
    segment: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: Theme.radius.full,
      overflow: 'hidden',
    },
    icon: {
      marginRight: 6,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
    },
  });

export default GoodsModeTabs;
