import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoFaq } from '../types';

interface Props {
  faqs: DemoFaq[];
}

export const GuestFaqList: React.FC<Props> = ({ faqs }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Questions fréquentes</Text>
      {faqs.map((faq) => (
        <View key={faq.id} style={styles.item}>
          <View style={styles.questionRow}>
            <FontAwesome5 name="question-circle" size={14} color={colors.primary.main} />
            <Text style={styles.question}>{faq.question}</Text>
          </View>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
    </View>
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
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginBottom: 8,
    },
    item: {
      paddingVertical: 11,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    questionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    question: {
      flex: 1,
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
      lineHeight: 19,
    },
    answer: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 7,
      paddingLeft: 22,
    },
  });
