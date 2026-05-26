import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { RoadSegment } from '../../../types';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RoadSegmentCard } from './RoadSegmentCard';
import { createStyles } from './RoadSegmentsSection.styles';

interface RoadSegmentsSectionProps {
  roadSegments: RoadSegment[];
}

export const RoadSegmentsSection: React.FC<RoadSegmentsSectionProps> = ({ roadSegments }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <ScrollView style={styles.segmentsContainer}>
      <Animated.View entering={FadeInUp.delay(100)} style={styles.segmentsHeader}>
        <Ionicons name="car" size={32} color={colors.status.warning} />
        <Text style={styles.segmentsTitle}>Segments Routiers</Text>
        <Text style={styles.segmentsSubtitle}>
          {roadSegments.length} segment{roadSegments.length > 1 ? 's' : ''} routier
          {roadSegments.length > 1 ? 's' : ''}
        </Text>
      </Animated.View>

      {roadSegments.map((segment, index) => (
        <RoadSegmentCard key={`road-${index}`} segment={segment} index={index} />
      ))}
    </ScrollView>
  );
};

export default RoadSegmentsSection;
