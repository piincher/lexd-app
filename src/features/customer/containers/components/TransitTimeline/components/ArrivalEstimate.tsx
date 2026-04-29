/**
 * ArrivalEstimate - ETA display card
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ArrivalEstimateProps {
  eta: string;
  destination?: string;
  iconColor: string;
  styles: Record<string, any>;
}

export const ArrivalEstimate: React.FC<ArrivalEstimateProps> = ({
  eta,
  destination,
  iconColor,
  styles,
}) => (
  <Animated.View entering={FadeInUp.delay(400)} style={styles.arrivalCard}>
    <LinearGradient colors={['#FEF3C7', '#FFFBEB']} style={styles.arrivalGradient}>
      <View style={styles.arrivalIconContainer}>
        <Ionicons name="flag" size={28} color={iconColor} />
      </View>
      <View style={styles.arrivalContent}>
        <Text style={styles.arrivalLabel}>Arrivée Estimée</Text>
        <Text style={styles.arrivalValue}>{eta}</Text>
        {destination && <Text style={styles.arrivalDestination}>{destination}</Text>}
      </View>
    </LinearGradient>
  </Animated.View>
);
