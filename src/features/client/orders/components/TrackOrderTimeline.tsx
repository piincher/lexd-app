/**
 * TrackOrderTimeline Component
 * Displays the timeline history of a tracked order
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Card } from '@src/shared/ui/Card';
import { Theme } from '@src/constants/Theme';

interface TimelineEvent {
  status: string;
  timestamp: string;
  location?: string;
  description?: string;
}

interface TrackOrderTimelineProps {
  timeline: TimelineEvent[];
}

export const TrackOrderTimeline: React.FC<TrackOrderTimelineProps> = ({ timeline }) => {
  return (
    <Card style={styles.resultCard}>
      <Text style={styles.sectionTitle}>Historique</Text>
      {timeline.map((event, index) => (
        <View key={index} style={styles.timelineItem}>
          <View style={styles.timelineDot} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineStatus}>{event.status}</Text>
            {event.location && (
              <Text style={styles.timelineLocation}>{event.location}</Text>
            )}
            <Text style={styles.timelineDate}>
              {new Date(event.timestamp).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.sm,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.neutral[400],
    marginTop: 4,
    marginRight: Theme.spacing.md,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  timelineLocation: {
    fontSize: 13,
    color: Theme.neutral[600],
    marginTop: 2,
  },
  timelineDate: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: 2,
  },
});
