import React from 'react';
import { View } from 'react-native';
import { Appbar, Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './DashboardErrorState.styles';

interface DashboardErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

export const DashboardErrorState: React.FC<DashboardErrorStateProps> = ({ error, onRetry }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Tableau de Bord Analytics" />
      </Appbar.Header>
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="chart-line-variant"
          size={64}
          color={theme.colors.error}
        />
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorText}>
          {error?.message || 'Impossible de charger les données analytiques'}
        </Text>
        <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
          Réessayer
        </Button>
      </View>
    </SafeAreaView>
  );
};
