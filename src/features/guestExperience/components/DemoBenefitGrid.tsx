import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoBenefit } from '../types';

interface Props {
  benefits: DemoBenefit[];
}

export const DemoBenefitGrid: React.FC<Props> = ({ benefits }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ce que voit un client connecté</Text>
      <View style={styles.grid}>
        {benefits.map((benefit) => (
          <View key={benefit.id} style={styles.card}>
            <View style={styles.iconBox}>
              <FontAwesome5 name={benefit.icon} size={15} color={colors.primary.main} />
            </View>
            <Text style={styles.title}>{benefit.title}</Text>
            <Text style={styles.detail}>{benefit.detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginTop: 22,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginBottom: 12,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    card: {
      width: '48%',
      minHeight: 150,
      borderRadius: 14,
      padding: 14,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
      marginBottom: 10,
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
      lineHeight: 17,
      marginTop: 6,
    },
  });
