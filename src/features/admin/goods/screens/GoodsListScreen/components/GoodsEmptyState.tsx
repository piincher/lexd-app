/**
 * GoodsEmptyState - Empty list placeholder
 * SRP: Display empty state with optional action button
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface GoodsEmptyStateProps {
  hasFilters: boolean;
  onAddPress?: () => void;
}

export const GoodsEmptyState: React.FC<GoodsEmptyStateProps> = ({ 
  hasFilters, 
  onAddPress 
}) => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.container}>
    <View style={[styles.iconContainer, { backgroundColor: colors.primary[100] }]}>
      <Ionicons name="cube-outline" size={56} color={colors.primary.main} />
    </View>
    <Text style={[styles.title, { color: colors.text.primary }]}>Aucune marchandise</Text>
    <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
      {hasFilters
        ? 'Essayez de modifier vos filtres'
        : 'Commencez par recevoir une marchandise'}
    </Text>
    {!hasFilters && onAddPress && (
      <TouchableOpacity style={styles.button} onPress={onAddPress}>
        <LinearGradient colors={Theme.gradients.primary} style={styles.buttonGradient}>
          <Ionicons name="add" size={20} color={Theme.colors.text.inverse} />
          <Text style={styles.buttonText}>Nouvelle marchandise</Text>
        </LinearGradient>
      </TouchableOpacity>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: Theme.radius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
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
    color: Theme.colors.text.inverse,
    marginLeft: Theme.spacing.sm,
  },
});

export default GoodsEmptyState;
