/**
 * DashboardErrorState
 * Error state view for dashboard loading failures
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

export interface DashboardErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const DashboardErrorState: React.FC<DashboardErrorStateProps> = ({
  message = 'Impossible de charger le tableau de bord',
  onRetry,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Tableau de Bord" />
      </Appbar.Header>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={64}
          color={theme.colors.error}
        />
        <Text style={styles.title}>Erreur de chargement</Text>
        <Text style={[styles.message, { color: Theme.neutral[500] }]}>
          {message}
        </Text>
        <Button mode="contained" onPress={onRetry} style={styles.button}>
          Réessayer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing['3xl'],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  button: {
    marginTop: Theme.spacing.xl,
  },
});

export default DashboardErrorState;
