import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';

interface ErrorStateProps {
  onRetry: () => void;
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, onBack }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <Ionicons name="alert-circle" size={64} color={colors.status.error} />
        <Text style={styles.errorText}>Impossible de charger la liste de colisage</Text>
        <Button mode="contained" onPress={onRetry} style={styles.actionButton}>
          Réessayer
        </Button>
        <Button mode="outlined" onPress={onBack} style={styles.actionButton}>
          Retour
        </Button>
      </View>
    </SafeAreaView>
  );
};
