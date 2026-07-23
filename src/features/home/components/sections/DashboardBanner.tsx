/**
 * DashboardBanner
 * CTA card for logged-in users to access their personal dashboard
 */

import React, { useMemo } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

interface DashboardBannerProps {
  firstName?: string;
  onPress: () => void;
}

export const DashboardBanner: React.FC<DashboardBannerProps> = ({ firstName, onPress }) => {
  const { colors, isDark } = useAppTheme();
  const bannerColors: [string, string] = isDark
    ? [colors.primary.light, colors.primary.main]
    : [colors.primary.dark, colors.primary[800]];
  const bannerInk = isDark ? colors.neutral[900] : colors.neutral.white;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: RADIUS.card,
          overflow: 'hidden',
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
        pressed: {
          opacity: 0.95,
          transform: [{ scale: 0.99 }],
        },
        gradient: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 16,
          gap: 12,
        },
        iconCircle: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: isDark ? `${colors.background.default}33` : `${colors.neutral.white}E6`,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textContainer: {
          flex: 1,
        },
        title: {
          fontFamily: Fonts.bold,
          fontSize: 16,
          color: bannerInk,
        },
        subtitle: {
          fontFamily: Fonts.regular,
          fontSize: 12,
          color: bannerInk,
          opacity: 0.85,
          marginTop: 2,
        },
      }),
    [colors, isDark, bannerInk]
  );

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
      >
        <LinearGradient
          colors={bannerColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="view-dashboard" size={22} color={colors.primary.main} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {firstName ? `Bonjour, ${firstName}` : 'Mon Tableau de Bord'}
            </Text>
            <Text style={styles.subtitle}>Suivez vos marchandises et paiements</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={bannerInk} style={{ opacity: 0.8 }} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
