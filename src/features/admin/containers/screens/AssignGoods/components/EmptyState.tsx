import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

interface EmptyStateProps {
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F3F0FF', '#EDE9FE']} style={styles.iconContainer}>
        <Ionicons name="cube-outline" size={64} color={Theme.primary[400]} />
      </LinearGradient>
      <Text style={styles.title}>
        {searchQuery ? 'Aucun résultat' : 'Aucune marchandise disponible'}
      </Text>
      <Text style={styles.subtitle}>
        {searchQuery
          ? 'Essayez une autre recherche'
          : 'Toutes les marchandises sont déjà assignées à des containers'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
