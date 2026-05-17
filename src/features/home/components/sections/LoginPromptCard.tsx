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
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const LoginPromptCard: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(500).springify()} style={[styles.card, { backgroundColor: colors.background.card }]}>
      <LinearGradient colors={[colors.primary.main, colors.primary.dark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
        <FontAwesome6 name="user-lock" size={18} color={colors.neutral.white} />
      </LinearGradient>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Connectez-vous</Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Accedez a vos envois, suivi et tableau de bord</Text>
      </View>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={() => navigation.navigate('Login')}>
        <LinearGradient colors={[colors.primary.main, colors.status.success]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Se connecter</Text>
          <FontAwesome6 name="arrow-right" size={12} color={colors.neutral.white} />
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
    ...Theme.shadows.md,
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
    color: Theme.neutral.white,
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
});
