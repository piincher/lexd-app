import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface EmptyStateProps {
  searchQuery: string;
  shippingMode?: 'AIR' | 'SEA';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, shippingMode }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const modeLabel = shippingMode === 'AIR' ? 'aériennes' : shippingMode === 'SEA' ? 'maritimes' : '';
  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.background.paper, colors.background.default]} style={styles.iconContainer}>
        <Ionicons name="cube-outline" size={64} color={colors.primary[400]} />
      </LinearGradient>
      <Text style={styles.title}>
        {searchQuery ? 'Aucun résultat' : modeLabel ? `Aucune marchandise ${modeLabel} disponible` : 'Aucune marchandise disponible'}
      </Text>
      <Text style={styles.subtitle}>
        {searchQuery
          ? 'Essayez une autre recherche'
          : modeLabel
            ? `Toutes les marchandises ${modeLabel} sont déjà assignées ou aucune n'a été reçue à l'entrepôt`
            : 'Toutes les marchandises sont déjà assignées à des containers'}
      </Text>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
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
    color: colors.neutral[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
