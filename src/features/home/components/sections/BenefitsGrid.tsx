/**
 * BenefitsGrid
 * "Why ChinaLink Express?" — 2-column vertical cards with large icons
 * and colored top borders for visual distinction.
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
import { SectionHeader } from '../SectionHeader';

export const BenefitsGrid: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Pourquoi ChinaLink Express ?"
        subtitle="Les avantages qui font la difference"
      />

      <View style={styles.grid}>
        {BENEFITS.map((benefit, index) => (
          <Animated.View
            key={benefit.label}
            entering={FadeInDown.delay(200 + index * 80).duration(400).springify()}
            style={[styles.card, { backgroundColor: colors.background.card }]}
          >
            {/* Colored top accent */}
            <View style={[styles.topAccent, { backgroundColor: benefit.color }]} />

            <View style={[styles.iconCircle, { backgroundColor: `${benefit.color}12` }]}>
              <FontAwesome6 name={benefit.icon} size={22} color={benefit.color} />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 16,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 1.5,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    textAlign: 'center',
  },
});
