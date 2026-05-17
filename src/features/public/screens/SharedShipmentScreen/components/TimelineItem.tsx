import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SharedShipmentTimelineItem } from '../../../api/shareApi';
import { getStatusConfig } from './TimelineStatusConfig';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useSharedShipmentTimelineStyles } from './SharedShipmentTimeline.styles';

interface TimelineItemProps {
  event: SharedShipmentTimelineItem;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, isLast }) => {
  const { colors } = useAppTheme();
  const styles = useSharedShipmentTimelineStyles();
  const config = getStatusConfig(event.status, colors);

  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: config.color }]} />
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.statusText}>{config.label}</Text>
          <Text style={styles.date}>
            {new Date(event.timestamp).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
            })}
          </Text>
        </View>
        <Text style={styles.location}>{event.location}</Text>
        {event.description && (
          <Text style={styles.description}>{event.description}</Text>
        )}
      </View>
    </View>
  );
};
