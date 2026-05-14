import React, { useMemo, useState, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoFaq } from '../types';

interface Props {
  faqs: DemoFaq[];
}

export const GuestFaqList: React.FC<Props> = ({ faqs }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Questions fréquentes</Text>

      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.id}
          faq={faq}
          index={index}
          isOpen={openId === faq.id}
          onToggle={() => toggle(faq.id)}
          styles={styles}
          colors={colors}
        />
      ))}
    </View>
  );
};

const FaqItem: React.FC<{
  faq: DemoFaq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  styles: ReturnType<typeof createStyles>;
  colors: ReturnType<typeof useAppTheme>['colors'];
}> = ({ faq, index, isOpen, onToggle, styles, colors }) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
  }, [isOpen, progress]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.value, [0, 1], [0, 180], Extrapolate.CLAMP)}deg`,
      },
    ],
  }));

  const answerStyle = useAnimatedStyle(() => ({
    maxHeight: interpolate(progress.value, [0, 1], [0, 500], Extrapolate.CLAMP),
    opacity: progress.value,
  }));

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()} style={styles.item}>
      <Pressable onPress={onToggle} style={styles.questionRow}>
        <Text style={styles.question}>{faq.question}</Text>
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons name="chevron-down" size={22} color={colors.text.secondary} />
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.answerWrap, answerStyle]}>
        <Text style={styles.answer}>{faq.answer}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginBottom: 8,
    },
    item: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      overflow: 'hidden',
    },
    questionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      gap: 8,
    },
    question: {
      flex: 1,
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
      lineHeight: 19,
    },
    answerWrap: {
      overflow: 'hidden',
    },
    answer: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 13,
      lineHeight: 20,
      paddingBottom: 12,
    },
  });
