import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ErrorStateProps {
  onBack: () => void;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onBack, onRetry }) => {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={Theme.gradients.primary} style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Theme.colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Erreur</Text>
      </LinearGradient>
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={Theme.status.error} />
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorSubtitle}>Impossible de charger les données. Veuillez réessayer.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  backButton: {
    padding: Theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.text.inverse,
    marginLeft: Theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.md,
  },
  errorSubtitle: {
    fontSize: 16,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  retryButton: {
    backgroundColor: Theme.primary[500],
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: 8,
    marginTop: Theme.spacing.xl,
  },
  retryButtonText: {
    color: Theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
