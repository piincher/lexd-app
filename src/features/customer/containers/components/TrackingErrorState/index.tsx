import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTrackingErrorStateStyles } from './TrackingErrorState.styles';

interface TrackingErrorStateProps {
  error?: Error | null;
  onRetry: () => void;
}

export const TrackingErrorState: React.FC<TrackingErrorStateProps> = ({
  error,
  onRetry,
}) => {
  const theme = useTheme();
  const styles = useTrackingErrorStateStyles();

  return (
    <View style={styles.centerContainer}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={64}
        color={theme.colors.error}
      />
      <Text style={styles.errorTitle}>Erreur de chargement</Text>
      <Text style={styles.errorText}>
        {error?.message || 'Impossible de charger les détails du container.'}
      </Text>
      <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
        Réessayer
      </Button>
    </View>
  );
};
