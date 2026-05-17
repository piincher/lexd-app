/**
 * SectionHeader
 * Consistent section title with green accent bar and optional subtitle
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, align = 'left' }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, align === 'center' && styles.center]}>
      <View style={[styles.titleRow, align === 'center' && styles.titleRowCenter]}>
        <View style={styles.accentBar} />
        <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
      </View>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  center: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleRowCenter: {
    justifyContent: 'center',
  },
  accentBar: {
    width: 4,
    height: 22,
    borderRadius: 2,
    backgroundColor: Theme.colors.primary.main,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 19,
  },
});
