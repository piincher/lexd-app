/**
 * LoginHeader Component
 * Header section with gradient background and logo
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IMAGES } from '@src/constants/Images';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  const { isDark } = useAppTheme();
  const gradientColors = isDark
    ? ['#15803D', '#166534', '#14532D']
    : ['#22C55E', '#16A34A', '#15803D'];

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.container}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
        <View style={styles.decorCircle3} />
        <Image source={IMAGES.flat_logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  gradient: {
    paddingTop: 40, paddingBottom: 36, paddingHorizontal: 24, alignItems: 'center',
    borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden',
  },
  decorCircle1: { position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.07)' },
  decorCircle2: { position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.05)' },
  decorCircle3: { position: 'absolute', top: 20, left: 40, width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.04)' },
  logo: { width: 160, height: 44, marginBottom: 20, tintColor: '#FFF' },
  title: { fontSize: 28, fontFamily: Fonts.bold, color: '#FFF', letterSpacing: -0.5, marginBottom: 6 },
  subtitle: { fontSize: 14, fontFamily: Fonts.regular, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
});

export default LoginHeader;
