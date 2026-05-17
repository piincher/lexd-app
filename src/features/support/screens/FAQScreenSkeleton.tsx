/**
 * FAQScreenSkeleton - Loading skeleton for FAQ screen
 * Following SRP: Single purpose - loading UI (< 100 lines)
 */

import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FAQSkeletonItem } from '../components/FAQSkeletonItem';
import { styles } from './FAQScreenSkeleton.styles';

export const FAQSkeleton: React.FC = () => (
  <Animated.View entering={FadeIn} style={styles.container}>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <FAQSkeletonItem key={i} />
    ))}
  </Animated.View>
);

export default FAQSkeleton;
