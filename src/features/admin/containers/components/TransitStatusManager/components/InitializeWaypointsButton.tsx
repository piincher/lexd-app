/**
 * InitializeWaypointsButton - Button to initialize waypoints for a container
 * Provides gradient-styled button with loading and error handling
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useInitializeWaypoints } from '../../../hooks/useWaypoints';
import { lightTheme } from '@src/constants/Theme';

interface InitializeWaypointsButtonProps {
  containerId: string;
  onInitialized?: () => void;
}

export const InitializeWaypointsButton: React.FC<InitializeWaypointsButtonProps> = ({
  containerId,
  onInitialized,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initializeMutation = useInitializeWaypoints();

  const handleInitialize = async () => {
    try {
      await initializeMutation.mutateAsync(containerId);
      onInitialized?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Erreur lors de l\'initialisation du suivi'
      );
    }
  };

  const handleDismissError = () => {
    setErrorMessage(null);
  };

  const isLoading = initializeMutation.isPending;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={lightTheme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <Button
          mode="contained"
          onPress={handleInitialize}
          disabled={isLoading}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          buttonColor="transparent"
          textColor={lightTheme.colors.text.inverse}
          icon={() =>
            isLoading ? (
              <ActivityIndicator size={18} color={lightTheme.colors.text.inverse} />
            ) : (
              <Ionicons
                name="map"
                size={18}
                color={lightTheme.colors.text.inverse}
              />
            )
          }
        >
          {isLoading ? 'Initialisation...' : 'Initialiser le Suivi'}
        </Button>
      </LinearGradient>

      <Snackbar
        visible={!!errorMessage}
        onDismiss={handleDismissError}
        action={{
          label: 'Fermer',
          onPress: handleDismissError,
        }}
        duration={5000}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gradientBackground: {
    borderRadius: lightTheme.borderRadius.md,
    overflow: 'hidden',
    ...lightTheme.shadows.colored,
  },
  button: {
    borderRadius: lightTheme.borderRadius.md,
    backgroundColor: 'transparent',
  },
  buttonContent: {
    height: 48,
    flexDirection: 'row-reverse',
  },
  buttonLabel: {
    fontSize: lightTheme.typography.button.fontSize,
    fontWeight: lightTheme.typography.button.fontWeight as '600',
    letterSpacing: lightTheme.typography.button.letterSpacing,
  },
  snackbar: {
    backgroundColor: lightTheme.colors.status.error,
  },
});

export default InitializeWaypointsButton;
