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

interface GoodsEmptyStateProps {
  hasFilters: boolean;
  onAddPress?: () => void;
}

export const GoodsEmptyState: React.FC<GoodsEmptyStateProps> = ({ 
  hasFilters, 
  onAddPress 
}) => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#F0FDF4', '#DCFCE7']}
      style={styles.iconContainer}
    >
      <Ionicons name="cube-outline" size={64} color={Theme.primary[500]} />
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
          <Ionicons name="add" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Nouvelle marchandise</Text>
        </LinearGradient>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
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
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
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
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
});

export default GoodsEmptyState;
