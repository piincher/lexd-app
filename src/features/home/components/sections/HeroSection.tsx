/**
 * HeroSection
 * Full-width gradient hero with tagline and primary CTA
 */

import React from 'react';
import { View, Pressable, Linking, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WHATSAPP_URL =
  'whatsapp://send?phone=+8618851725957&text=Bonjour%20ChinaLink,%20J%20ai%20une%20demande%20d%27expedition%20a%20faire%20:)';

export const HeroSection: React.FC = () => {
  return (
    <Animated.View entering={FadeInDown.duration(600).springify()}>
      <LinearGradient
        colors={['#064E3B', '#065F46', '#0F766E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Decorative circles */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.badge}>
            <FontAwesome6 name="truck-fast" size={12} color="#22C55E" />
            <Text style={styles.badgeText}>Chine → Mali</Text>
          </View>

          <Text style={styles.title}>
            Expediez vos{'\n'}marchandises
          </Text>
          <Text style={styles.titleAccent}>en toute securite</Text>

          <Text style={styles.subtitle}>
            Service de fret aerien et maritime fiable, rapide et securise
          </Text>

          <Pressable
            style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaPressed]}
            onPress={() => Linking.openURL(WHATSAPP_URL)}
          >
            <LinearGradient
              colors={['#22C55E', '#16A34A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <FontAwesome6 name="whatsapp" size={18} color="#FFF" />
              <Text style={styles.ctaText}>Demander un Devis</Text>
              <FontAwesome6 name="arrow-right" size={14} color="#FFF" />
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  circle2: {
    position: 'absolute',
    bottom: -20,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  content: {
    paddingHorizontal: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: '#FFF',
    lineHeight: 38,
  },
  titleAccent: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    color: '#4ADE80',
    lineHeight: 38,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    overflow: 'hidden',
    ...Theme.shadows.colored,
  },
  ctaPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  ctaText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#FFF',
  },
});
