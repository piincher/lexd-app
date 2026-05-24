/**
 * StatsStrip
 * Compact route facts for delivery times and support.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HIGHLIGHTS } from '../../constants/homeData';

type FontAwesome6Name = React.ComponentProps<typeof FontAwesome6>['name'];

const ICON_MAP: Record<string, FontAwesome6Name> = {
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
            entering={FadeInDown.delay(120 + index * 70).duration(320)}
            style={[
              styles.card,
              {
                backgroundColor: colors.background.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${accentColor}12` }]}>
              <FontAwesome6 name={iconName} size={18} color={accentColor} />
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
    gap: 8,
    marginHorizontal: 12,
    marginTop: 12,
  },
  card: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },
  textBlock: {
    alignItems: 'flex-start',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    letterSpacing: -0.2,
  },
  unit: {
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 10.5,
    marginTop: 4,
    letterSpacing: 0,
    textAlign: 'left',
  },
});
