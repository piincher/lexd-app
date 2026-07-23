/**
 * FAQItem Component
 * Displays a single FAQ question/answer with accordion functionality
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import { FAQItem as FAQItemType } from '../types/faq.types';

interface FAQItemProps {
  item: FAQItemType;
  index?: number;
}

export const FAQItem: React.FC<FAQItemProps> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colors } = useAppTheme();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderRadius: RADIUS.card,
      // Waybill: border-first, no drop shadow.
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      marginBottom: 12,
      overflow: 'hidden',
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
      color: colors.text.primary,
      marginRight: 8,
    },
    answerContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    answer: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      lineHeight: 20,
    },
  });

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
          color={colors.primary.main}
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

export default FAQItem;
