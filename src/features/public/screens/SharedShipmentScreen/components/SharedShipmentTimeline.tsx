import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { SharedShipmentTimelineItem } from '../../../api/shareApi';
import { TimelineItem } from './TimelineItem';
import { TimelineEmptyState } from './TimelineEmptyState';
import { useSharedShipmentTimelineStyles } from './SharedShipmentTimeline.styles';

interface Props {
  timeline: SharedShipmentTimelineItem[];
}

export const SharedShipmentTimeline: React.FC<Props> = ({ timeline }) => {
  const styles = useSharedShipmentTimelineStyles();

  if (!timeline || timeline.length === 0) {
    return (
      <Surface style={styles.card}>
        <Text style={styles.title}>Historique</Text>
        <TimelineEmptyState />
      </Surface>
    );
  }

  return (
    <Surface style={styles.card}>
      <Text style={styles.title}>Historique</Text>
      <View style={styles.container}>
        {timeline.map((event, index) => (
          <TimelineItem
            key={index}
            event={event}
            isLast={index === timeline.length - 1}
          />
        ))}
      </View>
    </Surface>
  );
};
