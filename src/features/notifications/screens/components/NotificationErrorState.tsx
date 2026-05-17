import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { useNotificationEmptyStyles } from './NotificationEmpty.styles';

interface NotificationErrorStateProps {
  onRetry: () => void;
}

export const NotificationErrorState: React.FC<NotificationErrorStateProps> = ({ onRetry }) => {
  const { colors } = useAppTheme();
  const styles = useNotificationEmptyStyles();

  return (
    <Animated.View entering={FadeInUp.springify()} style={styles.container}>
      <View style={styles.errorCircle}>
        <MaterialCommunityIcons name="cloud-off-outline" size={48} color={colors.status.error} />
      </View>
      <Text style={styles.title}>Erreur de chargement</Text>
      <Text style={styles.subtitle}>
        Impossible de recuperer vos notifications
      </Text>
      <TouchableOpacity onPress={onRetry} style={styles.retryButton} activeOpacity={0.8}>
        <LinearGradient
          colors={['#22C55E', '#16A34A', '#15803D']}
          style={styles.retryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name="refresh" size={18} color={colors.text.inverse} />
          <Text style={styles.retryText}>Reessayer</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};
