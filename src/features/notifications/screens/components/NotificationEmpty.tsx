/**
 * NotificationEmpty
 * SRP: Empty state display for notifications
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { FilterTab } from '../../types';

interface NotificationEmptyProps {
  filter: FilterTab;
  isError: boolean;
  onRetry: () => void;
}

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const EMPTY_CONFIG: Record<FilterTab, { icon: MaterialIconName; title: string; subtitle: string }> = {
  all: {
    icon: 'bell-off-outline',
    title: 'Aucune notification',
    subtitle: 'Vous serez notifie des que quelque chose se passe',
  },
  important: {
    icon: 'alert-circle-outline',
    title: "Rien d'important",
    subtitle: 'Les alertes urgentes apparaitront ici',
  },
  shipments: {
    icon: 'truck-delivery-outline',
    title: 'Aucune mise a jour expedition',
    subtitle: 'Les mouvements de vos colis apparaitront ici',
  },
  payments: {
    icon: 'cash-multiple',
    title: 'Aucune notification paiement',
    subtitle: 'Les paiements et factures apparaitront ici',
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
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          backgroundColor: hexToRgba(colors.status.error, 0.08),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        },
        title: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.neutral[800],
          textAlign: 'center',
          marginBottom: 8,
        },
        subtitle: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.neutral[400],
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
          color: colors.text.inverse,
        },
      }),
    [colors]
  );

  if (isError) {
    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.container}>
        <View style={styles.errorCircle}>
          <MaterialCommunityIcons name="cloud-off-outline" size={48} color={colors.status.error} />
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
            <MaterialCommunityIcons name="refresh" size={18} color={colors.text.inverse} />
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
          colors={[colors.primary[50], colors.primary[100]]}
          style={styles.iconGradient}
        >
          <MaterialCommunityIcons name={config.icon} size={56} color={colors.primary[400]} />
        </LinearGradient>
      </View>
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.subtitle}>{config.subtitle}</Text>
    </Animated.View>
  );
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};
