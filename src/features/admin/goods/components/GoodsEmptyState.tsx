/**
 * GoodsEmptyState - Empty list placeholder
 * SRP: Display empty state with optional action button
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsEmptyStateProps {
  hasFilters: boolean;
  onAddPress?: () => void;
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
  button: {
    marginTop: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text.inverse,
    marginLeft: Theme.spacing.sm,
  },
});

export const GoodsEmptyState: React.FC<GoodsEmptyStateProps> = ({ 
  hasFilters, 
  onAddPress 
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
  <View style={styles.container}>
    <LinearGradient
      colors={[colors.background.paper, colors.background.default]}
      style={styles.iconContainer}
    >
      <Ionicons name="cube-outline" size={64} color={colors.primary.main} />
    </LinearGradient>
    <Text style={styles.title}>Aucune marchandise</Text>
    <Text style={styles.subtitle}>
      {hasFilters
        ? 'Essayez de modifier vos filtres'
        : 'Commencez par recevoir une marchandise'}
    </Text>
    {!hasFilters && onAddPress && (
      <TouchableOpacity style={styles.button} onPress={onAddPress}>
        <LinearGradient colors={Theme.gradients.primary} style={styles.buttonGradient}>
          <Ionicons name="add" size={20} color={colors.text.inverse} />
          <Text style={styles.buttonText}>Nouvelle marchandise</Text>
        </LinearGradient>
      </TouchableOpacity>
    )}
  </View>
);}
