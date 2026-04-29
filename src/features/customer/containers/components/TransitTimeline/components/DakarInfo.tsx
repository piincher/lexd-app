/**
 * DakarInfo - Dakar port arrival information card
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ContainerWaypoint } from '../../../types';
import { formatTimestamp } from './TimelineDateMarker';

interface DakarInfoProps {
  dakarWaypoint: ContainerWaypoint;
  styles: Record<string, any>;
}

export const DakarInfo: React.FC<DakarInfoProps> = ({ dakarWaypoint, styles }) => (
  <Animated.View entering={FadeInUp.delay(500)} style={styles.dakarInfoCard}>
    <LinearGradient colors={['#D1FAE5', '#ECFDF5']} style={styles.dakarInfoGradient}>
      <View style={styles.dakarInfoHeader}>
        <Ionicons name="boat" size={24} color="#059669" />
        <Text style={styles.dakarInfoTitle}>Port d'Arrivée Principal</Text>
      </View>
      <Text style={styles.dakarInfoText}>
        Votre conteneur arrive à <Text style={styles.dakarInfoHighlight}>Dakar, Sénégal</Text>.
      </Text>
      {dakarWaypoint.estimatedArrival && (
        <Text style={styles.dakarInfoETA}>
          Arrivée estimée: {formatTimestamp(dakarWaypoint.estimatedArrival)}
        </Text>
      )}
    </LinearGradient>
  </Animated.View>
);
