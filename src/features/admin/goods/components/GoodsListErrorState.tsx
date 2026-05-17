import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './GoodsListContent.styles';

interface GoodsListErrorStateProps {
  onRetry: () => Promise<void>;
}

export const GoodsListErrorState: React.FC<GoodsListErrorStateProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.centerContainer}>
      <LinearGradient colors={[colors.feedback.errorBg, colors.background.paper]} style={styles.errorIcon}>
        <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
      </LinearGradient>
      <Text style={styles.errorTitle}>Erreur de chargement</Text>
      <Text style={styles.errorSubtitle}>Impossible de récupérer les marchandises</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <LinearGradient colors={Theme.gradients.primary} style={styles.retryGradient}>
          <Ionicons name="refresh" size={20} color={colors.text.inverse} />
          <Text style={styles.retryText}>Réessayer</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
