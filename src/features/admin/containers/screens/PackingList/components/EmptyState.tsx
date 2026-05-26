import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aucune marchandise',
  subtitle = 'Ce container ne contient aucune marchandise',
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons name="cube-outline" size={42} color={colors.text.secondary} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  emptyState: {
    padding: Theme.spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
  },
  emptyTitle: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: Theme.spacing.xs,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
