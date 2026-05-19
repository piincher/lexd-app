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

interface DashboardBannerProps {
  firstName?: string;
  onPress: () => void;
}

export const DashboardBanner: React.FC<DashboardBannerProps> = ({ firstName, onPress }) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 16,
          overflow: 'hidden',
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.3 : 0.08,
          shadowRadius: 12,
          elevation: 4,
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
          color: colors.text.inverse,
        },
        subtitle: {
          fontFamily: Fonts.regular,
          fontSize: 12,
          color: colors.text.inverse,
          opacity: 0.85,
          marginTop: 2,
        },
      }),
    [colors, isDark]
  );

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
      >
        <LinearGradient
          colors={[colors.primary.main, colors.primary.dark]}
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
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.inverse} style={{ opacity: 0.8 }} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
