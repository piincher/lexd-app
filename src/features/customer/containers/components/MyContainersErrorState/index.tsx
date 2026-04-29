import React from 'react';
import { View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMyContainersErrorStateStyles } from './MyContainersErrorState.styles';

interface MyContainersErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const MyContainersErrorState: React.FC<MyContainersErrorStateProps> = ({
  message,
  onRetry,
}) => {
  const theme = useTheme();
  const styles = useMyContainersErrorStateStyles();

  return (
    <View style={styles.centerContainer}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={64}
        color={theme.colors.error}
      />
      <Text style={styles.errorTitle}>Erreur de chargement</Text>
      <Text style={styles.errorText}>
        {message || 'Une erreur est survenue lors du chargement de vos containers.'}
      </Text>
      <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
        Réessayer
      </Button>
    </View>
  );
};
