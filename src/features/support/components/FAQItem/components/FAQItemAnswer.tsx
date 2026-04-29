import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';

interface FAQItemAnswerProps {
  answer: string;
  answerStyle: any;
  textColor: string;
}

export const FAQItemAnswer: React.FC<FAQItemAnswerProps> = ({
  answer,
  answerStyle,
  textColor,
}) => (
  <Animated.View style={[styles.answerContainer, answerStyle]}>
    <Text
      style={[
        styles.answer,
        { color: textColor },
      ]}
    >
      {answer}
    </Text>
  </Animated.View>
);

const styles = StyleSheet.create({
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
