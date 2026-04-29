/**
 * NotificationEmpty
 * SRP: Empty state display for notifications
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { FilterTab } from '../../types';

interface NotificationEmptyProps {
  filter: FilterTab;
  isError: boolean;
  onRetry: () => void;
}

const EMPTY_CONFIG: Record<FilterTab, { icon: string; title: string; subtitle: string }> = {
  all: {
    icon: 'bell-off-outline',
    title: 'Aucune notification',
    subtitle: 'Vous serez notifie des que quelque chose se passe',
  },
  unread: {
    icon: 'check-circle-outline',
    title: 'Tout est lu !',
    subtitle: 'Vous etes a jour avec toutes vos notifications',
  },
  system: {
    icon: 'cog-outline',
    title: 'Aucune notification systeme',
    subtitle: 'Les alertes systeme apparaitront ici',
  },
};

export const NotificationEmpty: React.FC<NotificationEmptyProps> = ({
  filter,
  isError,
  onRetry,
}) => {
  if (isError) {
    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.container}>
        <View style={styles.errorCircle}>
          <MaterialCommunityIcons name="cloud-off-outline" size={48} color="#EF4444" />
        </View>
        <Text style={styles.title}>Erreur de chargement</Text>
        <Text style={styles.subtitle}>
          Impossible de recuperer vos notifications
        </Text>
        <TouchableOpacity onPress={onRetry} style={styles.retryButton} activeOpacity={0.8}>
          <LinearGradient
            colors={Theme.gradients.primary}
            style={styles.retryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons name="refresh" size={18} color="#FFF" />
            <Text style={styles.retryText}>Reessayer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const config = EMPTY_CONFIG[filter];

  return (
    <Animated.View entering={FadeInUp.springify()} style={styles.container}>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[Theme.primary[50], Theme.primary[100]]}
          style={styles.iconGradient}
        >
          <MaterialCommunityIcons name={config.icon as any} size={56} color={Theme.primary[400]} />
        </LinearGradient>
      </View>
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.subtitle}>{config.subtitle}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    minHeight: 400,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(239,68,68,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: '#FFF',
  },
});
