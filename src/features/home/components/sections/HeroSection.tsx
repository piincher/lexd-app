/**
 * HeroSection
 * Striking full-width gradient hero with animated floating elements,
 * improved typography hierarchy, and a glowing primary CTA.
 */

import React, { useMemo } from 'react';
import { View, Pressable, Linking, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HeroFloatingOrb } from './HeroFloatingOrb';

const { width: SCREEN_W } = Dimensions.get('window');

const WHATSAPP_URL =
  'whatsapp://send?phone=+8618851725957&text=Bonjour%20ChinaLink,%20J%20ai%20une%20demande%20d%27expedition%20a%20faire%20:)';

/* ── Main Component ── */
export const HeroSection: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const ctaScale = useSharedValue(1);

  const ctaAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ctaScale.value }],
  }));

  const onPressIn = () => {
    ctaScale.value = withSpring(0.96, { damping: 14, stiffness: 300 });
  };
  const onPressOut = () => {
    ctaScale.value = withSpring(1, { damping: 14, stiffness: 300 });
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingTop: 36,
          paddingBottom: 40,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          overflow: 'hidden',
        },
        gridOverlay: {
          ...StyleSheet.absoluteFillObject,
          opacity: 0.04,
          backgroundColor: 'transparent',
        },
        content: {
          paddingHorizontal: 20,
        },
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: 8,
          backgroundColor: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          paddingHorizontal: 14,
          paddingVertical: 7,
          borderRadius: 24,
          marginBottom: 18,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
        },
        pulseDot: {
          width: 7,
          height: 7,
          borderRadius: 4,
          backgroundColor: colors.primary.light,
        },
        badgeText: {
          fontFamily: Fonts.meduim,
          fontSize: 13,
          color: colors.text.inverse,
          opacity: 0.92,
        },
        title: {
          fontFamily: Fonts.bold,
          fontSize: 32,
          color: colors.text.inverse,
          lineHeight: 40,
          letterSpacing: -0.8,
        },
        titleAccent: {
          fontFamily: Fonts.bold,
          fontSize: 32,
          color: colors.primary.light,
          lineHeight: 40,
          letterSpacing: -0.8,
          marginBottom: 14,
        },
        subtitle: {
          fontFamily: Fonts.regular,
          fontSize: 15,
          color: colors.text.inverse,
          opacity: 0.72,
          lineHeight: 22,
          marginBottom: 28,
          maxWidth: 320,
        },
        ctaWrapper: {
          alignSelf: 'flex-start',
        },
        ctaGlow: {
          borderRadius: 16,
          shadowColor: colors.primary.main,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 10,
        },
        ctaGradient: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 15,
          paddingHorizontal: 24,
          borderRadius: 16,
        },
        ctaText: {
          fontFamily: Fonts.bold,
          fontSize: 15,
          color: colors.text.inverse,
          letterSpacing: 0.3,
        },
      }),
    [colors, isDark]
  );

  return (
    <Animated.View entering={FadeInDown.duration(600).springify()}>
      <LinearGradient
        colors={[colors.primary[900], colors.primary[800], colors.primary[700]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Decorative floating orbs */}
        <HeroFloatingOrb size={160} color={isDark ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'} top={-30} left={SCREEN_W - 100} duration={4000} />
        <HeroFloatingOrb size={100} color={isDark ? 'rgba(0,0,0,0.025)' : 'rgba(255,255,255,0.025)'} top={80} left={-20} duration={5000} />
        <HeroFloatingOrb size={60} color={isDark ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'} top={140} left={SCREEN_W - 60} duration={3500} />

        {/* Subtle grid pattern overlay */}
        <View style={styles.gridOverlay} pointerEvents="none" />

        {/* Content */}
        <View style={styles.content}>
          {/* Badge */}
          <View style={styles.badge}>
            <View style={styles.pulseDot} />
            <FontAwesome6 name="truck-fast" size={12} color={colors.primary.light} />
            <Text style={styles.badgeText}>Chine → Mali</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Expediez vos{'\n'}marchandises</Text>
          <Text style={styles.titleAccent}>en toute securite</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Service de fret aerien et maritime fiable, rapide et securise entre la Chine et le Mali
          </Text>

          {/* CTA */}
          <Pressable
            onPress={() => Linking.openURL(WHATSAPP_URL)}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.ctaWrapper}
          >
            <Animated.View style={[styles.ctaGlow, ctaAnimatedStyle]}>
              <LinearGradient
                colors={[colors.primary.main, colors.primary.dark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
              >
                <FontAwesome6 name="whatsapp" size={18} color={colors.text.inverse} />
                <Text style={styles.ctaText}>Demander un Devis</Text>
                <FontAwesome6 name="arrow-right" size={14} color={colors.text.inverse} />
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
