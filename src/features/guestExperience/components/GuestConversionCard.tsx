import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface Props {
  supportPhone: string;
  onLogin: () => void;
  onContact: () => void;
}

export const GuestConversionCard: React.FC<Props> = ({ onLogin, onContact }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);
  const gradientColors = Theme.gradients.primary;

  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-3, { duration: 2000 }),
      -1,
      true
    );
  }, [translateY]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View entering={FadeInUp.duration(800).springify()}>
      <Animated.View style={[styles.wrapper, floatStyle]}>
        <LinearGradient colors={gradientColors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.headline}>Devenez client ChinaLink</Text>
          <Text style={styles.subtitle}>
            Créez votre compte et suivez vos vraies marchandises.
          </Text>

          <View style={styles.actions}>
            <Pressable onPress={onLogin} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Se connecter</Text>
            </Pressable>

            <Pressable onPress={onContact} style={styles.secondaryButton}>
              <FontAwesome6 name="whatsapp" size={16} color={colors.text.inverse} />
              <Text style={styles.secondaryText}>Devenir client</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors']) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 20,
      marginTop: 22,
      marginBottom: 28,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: colors.neutral[900], shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 8,
    },
    gradient: {
      padding: 24,
    },
    headline: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 20,
    },
    subtitle: {
      color: colors.text.inverse + 'CC',
      fontFamily: Fonts.regular,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 6,
    },
    actions: {
      gap: 10,
      marginTop: 18,
    },
    primaryButton: {
      backgroundColor: colors.background.paper,
      borderRadius: 9999,
      paddingVertical: 14,
      alignItems: 'center',
    },
    primaryText: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
    secondaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 9999,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: colors.text.inverse + '80',
    },
    secondaryText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
  });
