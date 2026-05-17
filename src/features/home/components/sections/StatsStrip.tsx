/**
 * StatsStrip
 * Three icon-rich stat cards showing delivery times and support
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { HIGHLIGHTS } from '../../constants/homeData';

const ICON_MAP: Record<string, string> = {
  airplane: 'plane-up',
  ship: 'ship',
  headset: 'headset',
};

export const StatsStrip: React.FC = () => {
  const { colors } = useAppTheme();

  const COLOR_MAP: Record<string, string> = {
    airplane: colors.status.info,
    ship: colors.primary.main,
    headset: colors.status.success,
  };

  return (
    <View style={styles.container}>
      {HIGHLIGHTS.map((item, index) => {
        const iconName = ICON_MAP[item.icon] || 'circle';
        const accentColor = COLOR_MAP[item.icon] || colors.primary.main;

        return (
          <Animated.View
            key={item.label}
            entering={FadeInDown.delay(200 + index * 100).duration(500).springify()}
            style={[styles.card, { backgroundColor: colors.background.card }]}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${accentColor}14` }]}>
              <FontAwesome6 name={iconName as any} size={18} color={accentColor} />
            </View>
            <View style={styles.textBlock}>
              <View style={styles.valueRow}>
                <Text style={[styles.value, { color: colors.text.primary }]}>{item.value}</Text>
                {item.unit !== '' && (
                  <Text style={[styles.unit, { color: colors.text.secondary }]}>{item.unit}</Text>
                )}
              </View>
              <Text style={[styles.label, { color: colors.text.disabled }]}>{item.label}</Text>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    ...Theme.shadows.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textBlock: {
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    letterSpacing: -0.5,
  },
  unit: {
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 10,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
});
