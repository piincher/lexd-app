/**
 * PackingListError Component
 * Error state for packing list screen
 * SRP: Display error state with retry option
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    errorTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 16,
    },
    errorText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    retryButton: {
      marginTop: 24,
    },
  }), [colors, isDark]);

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
