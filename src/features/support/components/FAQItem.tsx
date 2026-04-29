/**
 * FAQItem Component
 * Displays a single FAQ question/answer with accordion functionality
 */

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FAQItem as FAQItemType } from '../types/faq.types';

const isNewArchitectureEnabled = Boolean(
  (globalThis as { nativeFabricUIManager?: unknown }).nativeFabricUIManager
);

// Enable LayoutAnimation on Android old architecture
if (Platform.OS === 'android' && !isNewArchitectureEnabled && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItemProps {
  item: FAQItemType;
}

export const FAQItem: React.FC<FAQItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colors, isDark } = useAppTheme();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      marginBottom: 12,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
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
  }), [colors, isDark]);

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
