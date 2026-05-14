import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
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
      <View style={styles.grid}>
        {benefits.map((benefit, index) => (
          <Animated.View
            key={benefit.id}
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.card}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${benefit.color}18` }]}>
              <FontAwesome6 name={benefit.icon as any} size={16} color={benefit.color} />
            </View>
            <Text style={styles.title}>{benefit.title}</Text>
            <Text style={styles.detail} numberOfLines={2}>
              {benefit.detail}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    card: {
      width: '47%',
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
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
      marginTop: 4,
    },
  });
