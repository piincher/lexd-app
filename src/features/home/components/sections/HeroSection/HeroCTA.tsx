import React from 'react';
import { Pressable, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './HeroSection.styles';

const WHATSAPP_URL =
  'whatsapp://send?phone=+8618851725957&text=Bonjour%20ChinaLink,%20J%20ai%20une%20demande%20d%27expedition%20a%20faire%20:)';

export const HeroCTA: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
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
  );
};
