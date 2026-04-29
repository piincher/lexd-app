/**
 * TimelineHeader - Header card for TransitTimeline
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { formatTimestamp } from './TimelineDateMarker';

interface TimelineHeaderProps {
  containerNumber: string;
  completedCount: number;
  totalWaypoints: number;
  lastUpdateTimestamp?: string;
  styles: Record<string, any>;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  containerNumber,
  completedCount,
  totalWaypoints,
  lastUpdateTimestamp,
  styles,
}) => (
  <Animated.View entering={FadeInUp.delay(100)} style={styles.headerCard}>
    <LinearGradient colors={[Theme.primary[600], Theme.primary[800]]} style={styles.headerGradient}>
      <View style={styles.headerTop}>
        <View style={styles.headerIcon}>
          <Ionicons name="navigate" size={24} color={Theme.primary[600]} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>Container</Text>
          <Text style={styles.headerTitle}>{containerNumber}</Text>
        </View>
      </View>
      <View style={styles.journeyStats}>
        <View style={styles.statItem}>
          <Ionicons name="location" size={16} color="rgba(255,255,255,0.8)" />
          <Text style={styles.statText}>{completedCount} / {totalWaypoints} étapes</Text>
        </View>
        {lastUpdateTimestamp && (
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statText}>Mis à jour: {formatTimestamp(lastUpdateTimestamp)}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  </Animated.View>
);
