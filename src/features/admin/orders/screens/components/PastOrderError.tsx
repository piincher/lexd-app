import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '@src/components/AppButton/AppButton';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PastOrderError.styles';

interface PastOrderErrorProps {
  onRetry: () => void;
}

export const PastOrderError: React.FC<PastOrderErrorProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, styles.errorContainer]}>
      <View style={styles.errorContent}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.status.error} />
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorDescription}>
          Impossible de charger les commandes. Veuillez réessayer.
        </Text>
        <AppButton title="Réessayer" onPress={onRetry} style={styles.retryButton} />
      </View>
    </View>
  );
};
