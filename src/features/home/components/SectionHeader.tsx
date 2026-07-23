/**
 * SectionHeader
 * Compact section title with a quiet route-console rhythm.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RAIL_WIDTH } from '@src/shared/ui/designLanguage';
import type { AppTheme } from '@src/constants/Theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  eyebrow?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'left',
  eyebrow,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, align === 'center' && styles.center]}>
      {eyebrow && (
        // The eyebrow carries a short rail tick so section headers and card
        // rails read as the same system.
        <View style={[styles.eyebrowRow, align === 'center' && styles.center]}>
          <View style={[styles.eyebrowTick, { backgroundColor: colors.primary.main }]} />
          <Text style={[styles.eyebrow, { color: colors.primary.main }]}>{eyebrow}</Text>
        </View>
      )}
      <Text style={[styles.title, { color: colors.text.primary }, align === 'center' && styles.centerText]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.text.secondary }, align === 'center' && styles.centerText]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const createStyles = (colors: AppTheme['colors']) => StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  center: {
    alignItems: 'center',
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  eyebrowTick: {
    width: RAIL_WIDTH,
    height: 11,
    borderRadius: 1,
  },
  eyebrow: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 21,
    letterSpacing: -0.2,
    lineHeight: 27,
    textAlign: 'left',
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
    maxWidth: 330,
  },
  centerText: {
    textAlign: 'center',
  },
});
