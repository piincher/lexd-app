import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const gradientColors = Theme.gradients.primary;

  return (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.wrapper}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headline}>Devenez client ChinaLink</Text>
        <Text style={styles.subtitle}>
          Créez votre compte et suivez vos vraies marchandises en temps réel.
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
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors']) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: 20,
      marginTop: Theme.spacing['2xl'],
      borderRadius: Theme.radius.xl,
      overflow: 'hidden',
      ...Theme.shadows.lg,
    },
    gradient: {
      padding: Theme.spacing['2xl'],
    },
    headline: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 22,
      letterSpacing: -0.2,
    },
    subtitle: {
      color: colors.text.inverse + 'CC',
      fontFamily: Fonts.regular,
      fontSize: 14,
      lineHeight: 20,
      marginTop: Theme.spacing.sm,
    },
    actions: {
      gap: Theme.spacing.md,
      marginTop: Theme.spacing.xl,
    },
    primaryButton: {
      backgroundColor: colors.background.paper,
      borderRadius: Theme.radius.full,
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
      borderRadius: Theme.radius.full,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: colors.text.inverse + '50',
    },
    secondaryText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
  });
