/**
 * PackingListError Component
 * Error state for packing list screen
 * SRP: Display error state with retry option
 */

import React from 'react';
import { View } from 'react-native';
import { Appbar, Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListError.styles';

interface PackingListErrorProps {
  onBack: () => void;
  onRetry: () => void;
  message?: string;
}

export const PackingListError: React.FC<PackingListErrorProps> = ({
  onBack,
  onRetry,
  message,
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Liste de Colisage" />
      </Appbar.Header>
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="file-document-remove"
          size={64}
          color={theme.colors.error}
        />
        <Text style={styles.errorTitle}>Liste non disponible</Text>
        <Text style={styles.errorText}>
          {message || 'Impossible de charger votre liste de colisage.'}
        </Text>
        <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
          Réessayer
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PackingListError;
