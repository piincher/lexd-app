/**
 * FAQScreenSkeleton - Loading skeleton for FAQ screen
 * Following SRP: Single purpose - loading UI (< 100 lines)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers';

const SkeletonItem: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: isDark ? colors.background.paper : colors.neutral[100],
        },
      ]}
    >
      <View style={styles.row}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: isDark ? colors.border : colors.neutral[200] },
          ]}
        />
        <View style={styles.content}>
          <View
            style={[
              styles.line,
              { backgroundColor: isDark ? colors.border : colors.neutral[200] },
            ]}
          />
          <View
            style={[
              styles.lineShort,
              { backgroundColor: isDark ? colors.border : colors.neutral[200] },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export const FAQSkeleton: React.FC = () => {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonItem key={i} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  line: {
    height: 14,
    borderRadius: 4,
    width: '80%',
  },
  lineShort: {
    height: 14,
    borderRadius: 4,
    width: '50%',
  },
});

export default FAQSkeleton;
