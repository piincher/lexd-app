import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTrackingErrorStateStyles } from './TrackingErrorState.styles';

interface TrackingErrorStateProps {
  error?: Error | null;
  onRetry: () => void;
}

// Backend ships English error messages with a stable `code` field. Map the codes
// the customer can actually hit on this screen to French copy so we don't leak
// raw server strings (e.g. "Container not found or access denied") into the UI.
const resolveFrenchMessage = (error?: Error | null): { title: string; body: string } => {
  const code = (error as { code?: string } | null | undefined)?.code;
  const statusCode = (error as { statusCode?: number } | null | undefined)?.statusCode;

  if (code === 'CONTAINER_NOT_FOUND' || statusCode === 404) {
    return {
      title: 'Container indisponible',
      body: "Vos colis ne sont plus dans ce container — il a peut-être été clôturé ou réassigné. Revenez à la liste pour voir vos envois en cours.",
    };
  }
  if (code === 'UNAUTHORIZED' || statusCode === 401) {
    return {
      title: 'Session expirée',
      body: 'Veuillez vous reconnecter pour continuer.',
    };
  }
  if (code === 'NETWORK_ERROR' || code === 'ECONNABORTED' || !statusCode) {
    return {
      title: 'Connexion impossible',
      body: 'Vérifiez votre connexion internet et réessayez.',
    };
  }
  return {
    title: 'Erreur de chargement',
    body: 'Impossible de charger les détails du container. Veuillez réessayer.',
  };
};

export const TrackingErrorState: React.FC<TrackingErrorStateProps> = ({
  error,
  onRetry,
}) => {
  const theme = useTheme();
  const styles = useTrackingErrorStateStyles();
  const { title, body } = resolveFrenchMessage(error);

  return (
    <View style={styles.centerContainer}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={64}
        color={theme.colors.error}
      />
      <Text style={styles.errorTitle}>{title}</Text>
      <Text style={styles.errorText}>{body}</Text>
      <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
        Réessayer
      </Button>
    </View>
  );
};
