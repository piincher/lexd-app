import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoLockedFeature } from '../types';

interface Props {
  features: DemoLockedFeature[];
}

export const DemoLockedFeatures: React.FC<Props> = ({ features }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Fonctionnalités protégées</Text>
        <MaterialCommunityIcons name="lock" size={20} color={colors.text.muted} />
      </View>

      {features.map((feature) => (
        <Animated.View key={feature.id} entering={FadeInDown.springify()} style={styles.card}>
          <View style={styles.iconBox}>
            <FontAwesome6 name={feature.icon as any} size={14} color={colors.text.muted} />
            <View style={styles.lockOverlay}>
              <MaterialCommunityIcons name="lock" size={10} color={colors.text.muted} />
            </View>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>{feature.title}</Text>
            <Text style={styles.detail}>{feature.detail}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>🔒 Connexion</Text>
          </View>

          <BlurView intensity={isDark ? 10 : 20} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
        </Animated.View>
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
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9',
      overflow: 'hidden',
      borderRadius: 12,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : colors.neutral[100],
    },
    lockOverlay: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : colors.neutral[200],
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
      lineHeight: 17,
      marginTop: 2,
    },
    badge: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : colors.neutral[100],
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    badgeText: {
      color: colors.text.muted,
      fontFamily: Fonts.medium,
      fontSize: 10,
    },
  });
