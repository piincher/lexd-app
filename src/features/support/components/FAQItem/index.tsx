/**
 * FAQItem Component - Collapsible FAQ accordion with smooth animations
 * Following SRP: Single purpose - FAQ accordion item (< 150 lines)
 */

import React, {useEffect, useMemo} from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FAQItem as FAQItemType, FAQ_CATEGORY_COLORS } from '../../types';
import { FAQItemHeader, FAQItemAnswer } from './components';

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
  const styles = useMemo(() => createStyles(colors), [colors]);
  const animationProgress = useSharedValue(0);

  useEffect(() => {
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
      <FAQItemHeader
        question={item.question}
        categoryColor={categoryColor}
        chevronStyle={chevronStyle}
        textColor={colors.text.primary}
        chevronColor={colors.text.secondary}
      />
      {isExpanded && (
        <FAQItemAnswer
          answer={item.answer}
          answerStyle={answerStyle}
          textColor={colors.text.secondary}
        />
      )}
    </AnimatedTouchable>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default FAQItem;
