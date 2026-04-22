import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { RoadSegment } from '../../../types';

interface RoadSegmentsSectionProps {
  roadSegments: RoadSegment[];
}

export const RoadSegmentsSection: React.FC<RoadSegmentsSectionProps> = ({ roadSegments }) => {
  return (
    <ScrollView style={styles.segmentsContainer}>
      <Animated.View entering={FadeInUp.delay(100)} style={styles.segmentsHeader}>
        <Ionicons name="car" size={32} color={Theme.status.warning} />
        <Text style={styles.segmentsTitle}>Segments Routiers</Text>
        <Text style={styles.segmentsSubtitle}>
          {roadSegments.length} segment{roadSegments.length > 1 ? 's' : ''} routier
          {roadSegments.length > 1 ? 's' : ''}
        </Text>
      </Animated.View>

      {roadSegments.map((segment, index) => (
        <Animated.View
          key={`road-${index}`}
          entering={FadeInUp.delay(200 + index * 100)}
          style={styles.segmentCard}
        >
          <View style={styles.segmentHeader}>
            <View style={[styles.segmentIconContainer, { backgroundColor: Theme.status.warning }]}>
              <Ionicons name="car" size={20} color={Theme.neutral.white} />
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
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  segmentsContainer: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  segmentsHeader: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,
  },
  segmentsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Theme.neutral[900],
    marginTop: Theme.spacing.md,
  },
  segmentsSubtitle: {
    fontSize: 16,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.sm,
  },
  segmentCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  segmentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Theme.status.warning}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  segmentInfo: {
    flex: 1,
  },
  segmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[900],
  },
  segmentVehicle: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  segmentBadge: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
  },
  segmentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  segmentDetails: {
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
    paddingTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  detailText: {
    fontSize: 13,
    color: Theme.neutral[700],
    marginLeft: Theme.spacing.md,
  },
});

export default RoadSegmentsSection;
