import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';

interface FAQItemHeaderProps {
  question: string;
  categoryColor: string;
  chevronStyle: any;
  textColor: string;
  chevronColor: string;
}

export const FAQItemHeader: React.FC<FAQItemHeaderProps> = ({
  question,
  categoryColor,
  chevronStyle,
  textColor,
  chevronColor,
}) => (
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
          { color: textColor },
        ]}
        numberOfLines={2}
      >
        {question}
      </Text>
    </View>
    <Animated.View style={chevronStyle}>
      <MaterialCommunityIcons
        name="chevron-down"
        size={24}
        color={chevronColor}
      />
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
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
});
