import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * FilterCategorySection - Filter section container
 * Wraps filter content with consistent styling
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface FilterCategorySectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterCategorySection: React.FC<FilterCategorySectionProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
});
