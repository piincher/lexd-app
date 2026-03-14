/**
 * FAQItem - Expandable FAQ accordion item
 */

import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from '../FAQSection.styles';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ faq, isExpanded, onToggle }) => {
  return (
    <Surface style={styles.itemContainer}>
      <Pressable onPress={onToggle} style={styles.questionContainer}>
        <Text style={[styles.question, { fontFamily: Fonts.bold }]}>{faq.question}</Text>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={COLORS.blue}
        />
      </Pressable>
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={[styles.answer, { fontFamily: Fonts.regular }]}>{faq.answer}</Text>
        </View>
      )}
    </Surface>
  );
};

export default FAQItem;
