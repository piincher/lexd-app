import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface ErrorDisplayProps {
  error: Error | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={20} color={Theme.status.error} />
      <Text style={styles.errorText}>
        {error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue. Veuillez réessayer.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: '#FEF2F2',
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  errorText: {
    fontSize: 14,
    color: Theme.status.error,
    fontWeight: '500',
  },
});
