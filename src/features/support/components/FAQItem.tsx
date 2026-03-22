/**
 * FAQItem Component
 * Displays a single FAQ question/answer with accordion functionality
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { FAQItem as FAQItemType } from '../types/faq.types';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItemProps {
  item: FAQItemType;
}

export const FAQItem: React.FC<FAQItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.question}>{item.question}</Text>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  question: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: COLORS.darkText,
    marginRight: 8,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray + '30',
  },
  answer: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    lineHeight: 20,
  },
});

export default FAQItem;
