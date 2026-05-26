/**
 * StatsHeader
 * SRP: Admin greeting with current date and quick summary
 * Hallmark: flat surface, no gradient, strong typographic hierarchy
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface StatsHeaderProps {
  firstName?: string;
  totalOrders: number;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bonjour';
  if (hour < 18) return 'Bon après-midi';
  return 'Bonsoir';
};

const formatDate = (): string => {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

export const StatsHeader: React.FC<StatsHeaderProps> = ({ firstName, totalOrders }) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <Animated.View entering={FadeIn.duration(350)} style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {getGreeting()}, {firstName || 'Admin'}
          </Text>
          <Text style={styles.date}>{formatDate()}</Text>
        </View>
        <NotificationBell
          onPress={() => (navigation as any).navigate('Notifications')}
          size={22}
          color={colors.text.primary}
        />
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryPill, { backgroundColor: colors.primary[50] }]}>
          <Ionicons name="cube-outline" size={14} color={colors.primary.main} />
          <Text style={[styles.summaryText, { color: colors.primary.main }]}>
            {totalOrders} commandes
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 20,
      backgroundColor: colors.background.default,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    textContainer: {
      flex: 1,
      gap: 4,
    },
    greeting: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
      letterSpacing: -0.3,
      lineHeight: 32,
    },
    date: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      lineHeight: 18,
    },
    summaryRow: {
      flexDirection: 'row',
      marginTop: 14,
    },
    summaryPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    summaryText: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
  });
