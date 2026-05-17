import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RoadSegment } from '../../../types';
import { Theme } from '@src/constants/Theme';
import { styles } from './RoadSegmentsSection.styles';

interface RoadSegmentCardProps {
  segment: RoadSegment;
  index: number;
}

export const RoadSegmentCard: React.FC<RoadSegmentCardProps> = ({ segment, index }) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View
      key={`road-${index}`}
      entering={FadeInUp.delay(200 + index * 100)}
      style={styles.segmentCard}
    >
      <View style={styles.segmentHeader}>
        <View style={[styles.segmentIconContainer, { backgroundColor: Theme.status.warning }]}>
          <Ionicons name="car" size={20} color={colors.text.inverse} />
        </View>
        <View style={styles.segmentInfo}>
          <Text style={styles.segmentTitle}>
            {segment.fromLocation} → {segment.toLocation}
          </Text>
          {segment.truckPlate && (
            <Text style={styles.segmentVehicle}>Camion: {segment.truckPlate}</Text>
          )}
        </View>
        <View style={[styles.segmentBadge, { backgroundColor: `${Theme.status.warning}15` }]}>
          <Text style={[styles.segmentBadgeText, { color: Theme.status.warning }]}>
            Route
          </Text>
        </View>
      </View>

      <View style={styles.segmentDetails}>
        {segment.driverName && (
          <View style={styles.detailRow}>
            <Ionicons name="person" size={14} color={Theme.neutral[500]} />
            <Text style={styles.detailText}>Chauffeur: {segment.driverName}</Text>
          </View>
        )}
        {segment.driverPhone && (
          <View style={styles.detailRow}>
            <Ionicons name="call" size={14} color={Theme.neutral[500]} />
            <Text style={styles.detailText}>Tél: {segment.driverPhone}</Text>
          </View>
        )}
        {segment.carrier && (
          <View style={styles.detailRow}>
            <Ionicons name="business" size={14} color={Theme.neutral[500]} />
            <Text style={styles.detailText}>Transporteur: {segment.carrier}</Text>
          </View>
        )}
        {segment.estimatedTransitHours && (
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={14} color={Theme.neutral[500]} />
            <Text style={styles.detailText}>
              Transit estimé: {segment.estimatedTransitHours}h
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
