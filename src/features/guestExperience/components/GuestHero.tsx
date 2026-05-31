import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const GuestHero: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const gradientColors = Theme.gradients.primary;

  return (
    <Animated.View entering={FadeInDown.duration(700)} style={styles.wrap}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.grad}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <FontAwesome6 name="eye" size={12} color={colors.text.inverse} />
            <Text style={styles.badgeText}>Mode démo</Text>
          </View>
          <Text style={styles.title}>Découvrez ChinaLink Express</Text>
          <Text style={styles.subtitle}>
            Suivez vos marchandises de la Chine jusqu'au Mali en temps réel.
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    wrap: {
      width: '100%',
      borderBottomLeftRadius: Theme.radius['2xl'],
      borderBottomRightRadius: Theme.radius['2xl'],
      overflow: 'hidden',
    },
    grad: {
      minHeight: 200,
      paddingTop: Theme.spacing.xl,
      paddingBottom: Theme.spacing['2xl'],
      paddingHorizontal: Theme.spacing.xl,
    },
    content: {
      gap: Theme.spacing.md,
    },
    badge: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      borderRadius: Theme.radius.full,
      paddingHorizontal: Theme.spacing.md,
      paddingVertical: Theme.spacing.sm,
      backgroundColor: 'rgba(255,255,255,0.22)',
    },
    badgeText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 12,
      letterSpacing: 0.3,
    },
    title: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      fontSize: 30,
      lineHeight: 36,
      letterSpacing: -0.3,
    },
    subtitle: {
      color: colors.text.inverse + 'CC',
      fontFamily: Fonts.regular,
      fontSize: 15,
      lineHeight: 22,
      maxWidth: '92%',
    },
  });
