import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoClientStep } from '../types';

interface Props {
  steps: DemoClientStep[];
}

export const GuestClientJourney: React.FC<Props> = ({ steps }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comment devenir client</Text>
      <Text style={styles.sectionIntro}>
        L’application ne crée pas de comptes ouverts à tout le monde. ChinaLink enregistre d’abord
        le client, puis le suivi devient disponible.
      </Text>
      {steps.map((step) => (
        <View key={step.id} style={styles.row}>
          <View style={styles.iconBox}>
            <FontAwesome5 name={step.icon} size={14} color={colors.primary.main} />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.detail}>{step.detail}</Text>
          </View>
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
    },
    sectionIntro: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 8,
      marginBottom: 12,
    },
    row: {
      minHeight: 58,
      flexDirection: 'row',
      gap: 12,
      alignItems: 'flex-start',
      paddingVertical: 8,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    textBlock: {
      flex: 1,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },
  });
