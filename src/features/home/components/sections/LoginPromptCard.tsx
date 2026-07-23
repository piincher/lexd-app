/**
 * LoginPromptCard
 * Auth-gated CTA card prompting users to log in
 */

import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { navigationProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

export const LoginPromptCard: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const buttonColors: [string, string] = isDark
    ? [colors.primary.light, colors.primary.main]
    : [colors.primary.dark, colors.primary[800]];
  const buttonInk = isDark ? colors.neutral[900] : colors.neutral.white;
  // Border-first: this card is a surface, not a floating element.
  const cardShadow = {
    borderWidth: HAIRLINE,
    borderColor: colors.border,
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(500).springify()}
      style={[
        styles.card,
        cardShadow,
        { backgroundColor: colors.background.card, borderColor: colors.border },
      ]}
    >
      <LinearGradient colors={[colors.primary.main, colors.primary.dark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
        <FontAwesome6 name="user-lock" size={18} color={colors.neutral.white} />
      </LinearGradient>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Connectez-vous</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Accedez a vos envois, suivi et tableau de bord</Text>
      </View>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={() => navigation.navigate('Login')}>
        <LinearGradient colors={buttonColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buttonGradient}>
          <Text style={[styles.buttonText, { color: buttonInk }]}>Se connecter</Text>
          <FontAwesome6 name="arrow-right" size={12} color={buttonInk} />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 28,
    borderWidth: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  button: {
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
});
