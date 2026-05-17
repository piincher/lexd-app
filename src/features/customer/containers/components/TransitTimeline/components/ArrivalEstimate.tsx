/**
 * ArrivalEstimate - ETA display card
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ArrivalEstimateProps {
  eta: string;
  destination?: string;
  destinationCode?: string;
  iconColor: string;
  styles: Record<string, any>;
}

export const ArrivalEstimate: React.FC<ArrivalEstimateProps> = ({
  eta,
  destination,
  destinationCode,
  iconColor,
  styles,
}) => {
  const { colors } = useAppTheme();
  return (
  <Animated.View entering={FadeInUp.delay(600)} style={styles.arrivalCard}>
    <LinearGradient colors={[colors.feedback.warningBg, colors.background.paper]} style={styles.arrivalGradient}>
      <View style={styles.arrivalIconContainer}>
        <Ionicons name="flag" size={28} color={iconColor} />
      </View>
      <View style={styles.arrivalContent}>
        <Text style={styles.arrivalLabel}>Arrivée Estimée à Destination</Text>
        <Text style={styles.arrivalValue}>{eta}</Text>
        {destination && (
          <Text style={styles.arrivalDestination}>
            {destination} ({destinationCode})
          </Text>
        )}
      </View>
    </LinearGradient>
  </Animated.View>
  );
};
