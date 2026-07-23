/**
 * BenefitsGrid
 * "Why LEXD?" — 2-column vertical cards with large icons
 * and colored top borders for visual distinction.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { BENEFITS } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';

export const BenefitsGrid: React.FC = () => {
  const { colors } = useAppTheme();
  const benefitColors = [
    colors.status.info,
    colors.status.success,
    colors.status.warning,
    colors.primary.main,
    colors.status.error,
    colors.primary.main,
  ];

  return (
    <View style={styles.container}>
      <SectionHeader
        eyebrow="Garanties"
        title="Ce qui reste sous controle"
        subtitle="Les points qui reduisent les surprises pendant le transport."
      />

      <View style={styles.grid}>
        {BENEFITS.map((benefit, index) => {
          const accentColor = benefitColors[index] ?? colors.primary.main;

          return (
            <Animated.View
              key={benefit.label}
              entering={FadeInDown.delay(120 + index * 50).duration(300)}
              style={[
                styles.card,
                {
                  backgroundColor: colors.background.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={[styles.iconCircle, { backgroundColor: `${accentColor}12` }]}>
                <FontAwesome6 name={benefit.icon} size={18} color={accentColor} />
              </View>
              <Text style={[styles.label, { color: colors.text.primary }]}>{benefit.label}</Text>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
    paddingHorizontal: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    textAlign: 'left',
    lineHeight: 18,
  },
});
