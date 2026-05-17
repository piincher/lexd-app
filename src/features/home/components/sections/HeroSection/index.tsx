/**
 * HeroSection
 * Striking full-width gradient hero with animated floating elements,
 * improved typography hierarchy, and a glowing primary CTA.
 */
import React from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HeroFloatingOrb } from '../HeroFloatingOrb';
import { createStyles } from './HeroSection.styles';
import { HeroBadge } from './HeroBadge';
import { HeroTitle } from './HeroTitle';
import { HeroCTA } from './HeroCTA';

const { width: SCREEN_W } = Dimensions.get('window');

export const HeroSection: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Animated.View entering={FadeInDown.duration(600).springify()}>
      <LinearGradient
        colors={[colors.primary[900], colors.primary[800], colors.primary[700]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <HeroFloatingOrb size={160} color={isDark ? `${colors.background.default}08` : `${colors.neutral.white}08`} top={-30} left={SCREEN_W - 100} duration={4000} />
        <HeroFloatingOrb size={100} color={isDark ? `${colors.background.default}06` : `${colors.neutral.white}06`} top={80} left={-20} duration={5000} />
        <HeroFloatingOrb size={60} color={isDark ? `${colors.background.default}05` : `${colors.neutral.white}05`} top={140} left={SCREEN_W - 60} duration={3500} />

        <View style={styles.gridOverlay} pointerEvents="none" />

        <View style={styles.content}>
          <HeroBadge />
          <HeroTitle />
          <HeroCTA />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
