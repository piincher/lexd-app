/**
 * BenefitsGrid
 * "Why ChinaLink Express?" 2-column feature grid
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { BENEFITS } from '../../constants/homeData';

export const BenefitsGrid: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Pourquoi ChinaLink Express ?
      </Text>

      <View style={styles.grid}>
        {BENEFITS.map((benefit, index) => (
          <Animated.View
            key={benefit.label}
            entering={FadeInDown.delay(600 + index * 80).duration(400).springify()}
            style={[styles.card, { backgroundColor: colors.background.card }]}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${benefit.color}12` }]}>
              <FontAwesome6 name={benefit.icon} size={18} color={benefit.color} />
            </View>
            <Text style={[styles.label, { color: colors.text.primary }]}>{benefit.label}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    ...Theme.shadows.sm,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    flexShrink: 1,
  },
});
