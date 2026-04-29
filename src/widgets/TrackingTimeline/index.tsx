import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export interface TimelineEvent {
  status: string;
  location: string;
  timestamp: string;
  description?: string;
}

interface TrackingTimelineProps {
  timeline: TimelineEvent[];
  getStatusConfig: (status: string) => { color: string; label: string };
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  timeline,
  getStatusConfig,
}) => {
  return (
    <Surface style={styles.timelineCard}>
      <Text style={styles.sectionTitle}>Historique</Text>

      {timeline && timeline.length > 0 ? (
        <View style={styles.timeline}>
          {timeline.map((event, index) => {
            const isLast = index === timeline.length - 1;
            const eventStatus = getStatusConfig(event.status);

            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineDot, { backgroundColor: eventStatus.color }]} />
                  {!isLast && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineStatus}>{eventStatus.label}</Text>
                    <Text style={styles.timelineDate}>
                      {new Date(event.timestamp).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                  </View>
                  <Text style={styles.timelineLocation}>{event.location}</Text>
                  {event.description && (
                    <Text style={styles.timelineDescription}>{event.description}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyTimeline}>
          <MaterialCommunityIcons name="timeline-clock" size={48} color={Theme.neutral[300]} />
          <Text style={styles.emptyTimelineText}>Aucun historique disponible</Text>
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  timelineCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  timeline: {
    paddingTop: Theme.spacing.sm,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineStatus: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Theme.neutral[800],
  },
  timelineDate: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[400],
  },
  timelineLocation: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Theme.neutral[600],
    marginTop: 2,
  },
  timelineDescription: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 4,
  },
  emptyTimeline: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  emptyTimelineText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[400],
    marginTop: Theme.spacing.md,
  },
});
