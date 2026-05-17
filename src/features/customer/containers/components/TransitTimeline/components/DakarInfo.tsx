/**
 * DakarInfo - Dakar port arrival information card
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '../../../types';
import { formatTimestamp } from './TimelineDateMarker';

interface DakarInfoProps {
  dakarWaypoint: ContainerWaypoint;
  styles: Record<string, any>;
}

export const DakarInfo: React.FC<DakarInfoProps> = ({ dakarWaypoint, styles }) => {
  const { colors } = useAppTheme();
  return (
  <Animated.View entering={FadeInUp.delay(750)} style={styles.dakarInfoCard}>
    <LinearGradient colors={[colors.feedback.successBg, colors.background.paper]} style={styles.dakarInfoGradient}>
      <View style={styles.dakarInfoHeader}>
        <Ionicons name="boat" size={24} color={colors.status.success} />
        <Text style={styles.dakarInfoTitle}>Port d'Arrivée Principal</Text>
      </View>
      <Text style={styles.dakarInfoText}>
        Votre conteneur arrive à <Text style={styles.dakarInfoHighlight}>Dakar, Sénégal</Text>. 
        Après le dédouanement, il continuera par route vers le Mali.
      </Text>
      {dakarWaypoint.estimatedArrival && (
        <Text style={styles.dakarInfoETA}>
          Arrivée estimée à Dakar: {formatTimestamp(dakarWaypoint.estimatedArrival)}
        </Text>
      )}
    </LinearGradient>
  </Animated.View>
  );
};
