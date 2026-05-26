import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const LoadingState: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
        <Text style={styles.loadingTitle}>Chargement de la liste</Text>
        <Text style={styles.loadingText}>Préparation des clients et des colis.</Text>
        <View style={styles.skeletonCard}>
          <View style={styles.skeletonLineLarge} />
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonGrid}>
            <View style={styles.skeletonPill} />
            <View style={styles.skeletonPill} />
            <View style={styles.skeletonPill} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  loadingTitle: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text.primary,
  },
  loadingText: {
    marginTop: Theme.spacing.xs,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    textAlign: 'center',
  },
  skeletonCard: {
    width: '100%',
    marginTop: Theme.spacing['2xl'],
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
  },
  skeletonLineLarge: {
    height: Theme.spacing.lg,
    width: '68%',
    borderRadius: Theme.radius.sm,
    backgroundColor: isDark ? colors.neutral[700] : colors.neutral[200],
  },
  skeletonLine: {
    height: Theme.spacing.md,
    width: '45%',
    marginTop: Theme.spacing.md,
    borderRadius: Theme.radius.sm,
    backgroundColor: isDark ? colors.neutral[700] : colors.neutral[200],
  },
  skeletonGrid: {
    flexDirection: 'row',
    marginTop: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  skeletonPill: {
    flex: 1,
    height: 44,
    borderRadius: Theme.radius.sm,
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
  },
});
