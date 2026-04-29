/**
 * JourneySummary - Departure and arrival summary card
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';

interface JourneySummaryProps {
  origin: string | undefined;
  destination: string | undefined;
  styles: Record<string, any>;
  secondaryTextColor: string;
}

export const JourneySummary: React.FC<JourneySummaryProps> = ({
  origin,
  destination,
  styles,
  secondaryTextColor,
}) => (
  <Animated.View entering={FadeInUp.delay(300)} style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>Résumé du Voyage</Text>
    <View style={styles.summaryRow}>
      <View style={styles.summaryItem}>
        <Ionicons name="navigate-outline" size={20} color={Theme.primary[500]} />
        <Text style={styles.summaryLabel}>Départ</Text>
        <Text style={styles.summaryValue}>{origin || 'N/A'}</Text>
      </View>
      <Ionicons name="arrow-forward" size={20} color={secondaryTextColor} />
      <View style={styles.summaryItem}>
        <Ionicons name="flag-outline" size={20} color={Theme.status.success} />
        <Text style={styles.summaryLabel}>Arrivée</Text>
        <Text style={styles.summaryValue}>{destination || 'N/A'}</Text>
      </View>
    </View>
  </Animated.View>
);
