/**
 * FAQItem Component - Collapsible FAQ accordion with smooth animations
 * Following SRP: Single purpose - FAQ accordion item (< 150 lines)
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/providers';
import { Fonts } from '@src/constants/Fonts';
import { FAQItem as FAQItemType, FAQ_CATEGORY_COLORS } from '../../types';

interface FAQItemProps {
  item: FAQItemType;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const FAQItem: React.FC<FAQItemProps> = ({
  item,
  isExpanded,
  onToggle,
  index,
}) => {
  const { colors, isDark } = useAppTheme();
  const animationProgress = useSharedValue(0);

  React.useEffect(() => {
    animationProgress.value = withTiming(isExpanded ? 1 : 0, {
      duration: 300,
    });
  }, [isExpanded, animationProgress]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          animationProgress.value,
          [0, 1],
          [0, 180],
          Extrapolate.CLAMP
        )}deg`,
      },
    ],
  }));

  const answerStyle = useAnimatedStyle(() => ({
    opacity: animationProgress.value,
    transform: [
      {
        translateY: interpolate(
          animationProgress.value,
          [0, 1],
          [-10, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const categoryColor = FAQ_CATEGORY_COLORS[item.category];

  return (
    <AnimatedTouchable
      onPress={onToggle}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.background.paper : colors.neutral.white,
          borderColor: isDark ? colors.border : colors.neutral[200],
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
      accessibilityLabel={`${item.question}. Appuyez pour ${isExpanded ? 'réduire' : 'développer'}`}
    >
      <View style={styles.header}>
        <View style={styles.questionRow}>
          <View
            style={[
              styles.categoryIndicator,
              { backgroundColor: categoryColor },
            ]}
          />
          <Text
            style={[
              styles.question,
              {
                color: colors.text.primary,
              },
            ]}
            numberOfLines={2}
          >
            {item.question}
          </Text>
        </View>
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={colors.text.secondary}
          />
        </Animated.View>
      </View>

      {isExpanded && (
        <Animated.View style={[styles.answerContainer, answerStyle]}>
          <Text
            style={[
              styles.answer,
              { color: colors.text.secondary },
            ]}
          >
            {item.answer}
          </Text>
        </Animated.View>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    minHeight: 56,
  },
  questionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  question: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 20,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  answer: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 16,
  },
});

export default FAQItem;
