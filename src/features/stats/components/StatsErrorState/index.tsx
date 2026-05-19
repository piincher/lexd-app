/**
 * StatsErrorState
 * SRP: Error state UI for stats screen
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles as getStyles } from './StatsErrorState.styles';

interface StatsErrorStateProps {
  onRetry: () => void;
}

export const StatsErrorState: React.FC<StatsErrorStateProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.errorContainer}>
      <Ionicons name="cloud-offline-outline" size={48} color={colors.neutral[300]} />
      <Text style={styles.errorTitle}>Impossible de charger les donnees</Text>
      <Text style={styles.errorSubtitle}>Verifiez votre connexion et reessayez</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.7}>
        <Ionicons name="refresh" size={18} color={colors.text.inverse} />
        <Text style={styles.retryText}>Reessayer</Text>
      </TouchableOpacity>
    </View>
  );
};
