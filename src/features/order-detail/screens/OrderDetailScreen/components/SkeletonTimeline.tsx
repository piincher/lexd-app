import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

export const SkeletonTimeline: React.FC = () => (
  <Card style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <ShimmerBlock width={20} height={20} borderRadius={10} />
      <ShimmerBlock width={140} height={15} borderRadius={4} />
    </View>
    <Card.Content>
      <View style={styles.timeline}>
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} style={styles.timelineStep}>
            <ShimmerBlock width={34} height={34} borderRadius={17} />
            <ShimmerBlock width={36} height={10} borderRadius={3} style={styles.timelineLabelGap} />
          </View>
        ))}
      </View>
    </Card.Content>
  </Card>
);
