import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface FAQAccordionProps {
  question: string;
  answer: string;
  categoryColor: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  question,
  answer,
  categoryColor,
  isExpanded,
  onToggle,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withTiming(isExpanded ? 1 : 0, { duration: 300 });
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

  return (
    <AnimatedTouchable
      onPress={onToggle}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.background.paper : colors.neutral.white,
          borderColor: isDark ? colors.border : colors.neutral[200],
          shadowColor: colors.neutral[900],
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.questionRow}>
          <View style={[styles.categoryIndicator, { backgroundColor: categoryColor }]} />
          <Text style={[styles.question, { color: colors.text.primary }]} numberOfLines={2}>
            {question}
          </Text>
        </View>
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons name="chevron-down" size={24} color={colors.text.secondary} />
        </Animated.View>
      </View>

      {/* Answer */}
      {isExpanded && (
        <Animated.View style={[styles.answerContainer, answerStyle]}>
          <Text style={[styles.answer, { color: colors.text.secondary }]}>{answer}</Text>
        </Animated.View>
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
