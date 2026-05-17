/**
 * RouteListError - Error state component with retry
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { styles } from './RouteListError.styles';

interface RouteListErrorProps {
  onRetry: () => void;
}

export const RouteListError: React.FC<RouteListErrorProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.errorContainer}>
      <LinearGradient
        colors={[colors.feedback.errorBg, colors.feedback.errorBg]}
        style={styles.errorIconContainer}
      >
        <Ionicons name="alert-circle" size={64} color={colors.status.error} />
      </LinearGradient>
      <Text style={styles.errorTitle}>Erreur de chargement</Text>
      <Text style={styles.errorSubtitle}>
        Impossible de récupérer les routes
      </Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={onRetry}
      >
        <LinearGradient
          colors={Theme.gradients.primary}
          style={styles.retryButtonGradient}
        >
          <Ionicons name="refresh" size={20} color={colors.text.inverse} />
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default RouteListError;
