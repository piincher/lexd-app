/**
 * StatsStrip
 * Horizontal key metrics bar showing delivery times and support availability
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { HIGHLIGHTS } from '../../constants/homeData';

export const StatsStrip: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
      <View style={[styles.container, { backgroundColor: colors.background.card }]}>
        {HIGHLIGHTS.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            <View style={styles.item}>
              <Text style={[styles.value, { color: colors.primary.main }]}>{item.value}</Text>
              {item.unit !== '' && (
                <Text style={[styles.unit, { color: colors.text.secondary }]}>{item.unit}</Text>
              )}
              <Text style={[styles.label, { color: colors.text.disabled }]}>{item.label}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    ...Theme.shadows.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    letterSpacing: -0.5,
  },
  unit: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: -2,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 11,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 36,
  },
});
