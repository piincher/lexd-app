/**
 * ErrorState Component
 * Displays error message with retry option
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Button, useTheme } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    title: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 16,
    },
    message: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    button: {
      marginTop: 24,
    },
  }), [colors, isDark]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle" size={64} color={theme.colors.error} />
      <Text style={styles.title}>Erreur de chargement</Text>
      <Text style={styles.message}>{error || 'Ticket introuvable'}</Text>
      <Button mode="contained" onPress={onRetry} style={styles.button}>
        Réessayer
      </Button>
    </View>
  );
};
