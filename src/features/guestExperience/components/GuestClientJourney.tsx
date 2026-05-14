import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    <Animated.View entering={FadeInRight.springify()} style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Votre parcours client</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {steps.map((step, index) => {
          const isActive = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <View key={step.id} style={styles.step}>
              <View style={styles.topRow}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: isActive ? colors.primary.main : colors.neutral[200],
                      borderColor: isActive ? colors.primary.light : 'transparent',
                    },
                  ]}
                >
                  <FontAwesome6
                    name={step.icon as any}
                    size={14}
                    color={isActive ? colors.text.inverse : colors.text.muted}
                  />
                </View>

                {!isLast && (
                  <View style={styles.lineWrap}>
                    <LinearGradient
                      colors={isActive ? [colors.primary.main, colors.primary.light] : [colors.neutral[200], colors.neutral[100]]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.line}
                    />
                  </View>
                )}
              </View>

              <Text style={[styles.title, { color: isActive ? colors.primary.main : colors.text.primary }]}>
                {step.title}
              </Text>
              <Text style={styles.detail}>{step.detail}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginTop: 22,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginHorizontal: 20,
      marginBottom: 12,
    },
    scrollContent: {
      paddingHorizontal: 20,
      gap: 0,
    },
    step: {
      width: 140,
      alignItems: 'center',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      zIndex: 1,
    },
    lineWrap: {
      width: 100,
      height: 2,
      marginLeft: -4,
      marginRight: -4,
      justifyContent: 'center',
    },
    line: {
      height: 2,
      borderRadius: 1,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      textAlign: 'center',
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 11,
      lineHeight: 16,
      textAlign: 'center',
      marginTop: 4,
      paddingHorizontal: 4,
    },
  });
