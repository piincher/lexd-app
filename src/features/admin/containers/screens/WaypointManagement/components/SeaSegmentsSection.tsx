import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { SeaSegment } from '../../../types';

interface SeaSegmentsSectionProps {
  seaSegments: SeaSegment[];
}

export const SeaSegmentsSection: React.FC<SeaSegmentsSectionProps> = ({ seaSegments }) => {
  return (
    <ScrollView style={styles.segmentsContainer}>
      <Animated.View entering={FadeInUp.delay(100)} style={styles.segmentsHeader}>
        <Ionicons name="boat" size={32} color={Theme.status.info} />
        <Text style={styles.segmentsTitle}>Segments Maritimes</Text>
        <Text style={styles.segmentsSubtitle}>{seaSegments.length} segment(s)</Text>
      </Animated.View>
      {seaSegments.map((segment, index) => (
        <Animated.View key={`sea-${index}`} entering={FadeInUp.delay(200 + index * 100)} style={styles.segmentCard}>
          <View style={styles.segmentHeader}>
            <View style={styles.segmentIconContainer}>
              <Ionicons name="boat-outline" size={24} color={Theme.neutral.white} />
            </View>
            <View style={styles.segmentInfo}>
              <Text style={styles.segmentTitle}>{segment.fromPort} → {segment.toPort}</Text>
              <Text style={styles.segmentType}>Transport Maritime</Text>
            </View>
          </View>
          
          <View style={styles.segmentDetails}>
            {segment.vesselName && (
              <View style={styles.detailRow}>
                <Ionicons name="boat-outline" size={16} color={Theme.neutral[500]} />
                <Text style={styles.detailText}>Navire: {segment.vesselName}</Text>
              </View>
            )}
            {segment.vesselIMO && (
              <View style={styles.detailRow}>
                <Ionicons name="document-text-outline" size={16} color={Theme.neutral[500]} />
                <Text style={styles.detailText}>IMO: {segment.vesselIMO}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Ionicons name="business-outline" size={16} color={Theme.neutral[500]} />
              <Text style={styles.detailText}>Compagnie: {segment.carrier}</Text>
            </View>
            {segment.departureDate && (
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color={Theme.neutral[500]} />
                <Text style={styles.detailText}>Départ: {new Date(segment.departureDate).toLocaleDateString()}</Text>
              </View>
            )}
            {segment.estimatedArrival && (
              <View style={styles.detailRow}>
                <Ionicons name="flag-outline" size={16} color={Theme.neutral[500]} />
                <Text style={styles.detailText}>Arrivée estimée: {new Date(segment.estimatedArrival).toLocaleDateString()}</Text>
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
    width: 48,
    height: 48,
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.status.info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentInfo: {
    marginLeft: Theme.spacing.lg,
    flex: 1,
  },
  segmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[900],
  },
  segmentType: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.sm,
  },
  segmentDetails: {
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
    paddingTop: Theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  detailText: {
    fontSize: 15,
    color: Theme.neutral[700],
    marginLeft: Theme.spacing.md,
  },
});

export default SeaSegmentsSection;
