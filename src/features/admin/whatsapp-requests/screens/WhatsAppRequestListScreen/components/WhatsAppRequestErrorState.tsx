/**
 * WhatsAppRequestErrorState - Error state component
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WhatsAppRequestErrorStateProps {
  onRetry: () => void;
}

export const WhatsAppRequestErrorState: React.FC<WhatsAppRequestErrorStateProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.errorContainer}>
      <LinearGradient colors={[colors.feedback.errorBg, colors.feedback.errorBg]} style={styles.errorIconContainer}>
        <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
      </LinearGradient>
      <Text style={styles.errorTitle}>Erreur de chargement</Text>
      <Text style={styles.errorSubtitle}>Impossible de récupérer les demandes</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <LinearGradient colors={Theme.gradients.primary} style={styles.retryButtonGradient}>
          <Ionicons name="refresh" size={20} color={colors.text.inverse} />
          <Text style={[styles.retryButtonText, { color: colors.text.inverse }]}>Réessayer</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
    paddingHorizontal: Theme.spacing.xl,
  },
  errorIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  errorSubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  retryButton: {
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: Theme.spacing.sm,
  },
});

export default WhatsAppRequestErrorState;
