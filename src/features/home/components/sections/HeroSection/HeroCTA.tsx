import React from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './HeroSection.styles';
import { openSupportWhatsApp } from '@src/shared/lib/openWhatsApp';

export const HeroCTA: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const ctaColors: [string, string] = isDark
    ? [colors.primary.light, colors.primary.main]
    : [colors.primary.dark, colors.primary[800]];
  const ctaInk = isDark ? colors.neutral[900] : colors.neutral.white;
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

  return (
    <Pressable
      onPress={() => openSupportWhatsApp("Bonjour ChinaLink, J ai une demande d'expedition a faire :)")}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.ctaWrapper}
      accessibilityRole="button"
      accessibilityLabel="Demander un devis sur WhatsApp"
    >
      <Animated.View style={[styles.ctaGlow, ctaAnimatedStyle]}>
        <LinearGradient
          colors={ctaColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaGradient}
        >
          <FontAwesome6 name="whatsapp" size={18} color={ctaInk} />
          <Text style={styles.ctaText}>Demander un devis</Text>
          <FontAwesome6 name="arrow-right" size={14} color={ctaInk} />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};
