/**
 * TicketDetailSkeleton
 * Skeleton loading placeholder matching TicketDetailScreen layout
 */

import React from 'react';
import { ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { InfoCardSkeleton } from './InfoCardSkeleton';
import { MessageBubbleSkeleton } from './MessageBubbleSkeleton';
import { RatingCardSkeleton } from './RatingCardSkeleton';
import { createStyles } from './TicketDetailSkeleton.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const TicketDetailSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <InfoCardSkeleton />
      <MessageBubbleSkeleton isCustomer={false} />
      <MessageBubbleSkeleton isCustomer={true} />
      <RatingCardSkeleton />
    </ScrollView>
  </Animated.View>
  );
};
