/**
 * NotificationEmpty
 * SRP: Empty state display for notifications
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Theme } from '@src/constants/Theme';
import type { FilterTab } from '../../types';
import { styles } from './NotificationEmpty.styles';

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
          <MaterialCommunityIcons name={config.icon} size={56} color={Theme.primary[400]} />
        </LinearGradient>
      </View>
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.subtitle}>{config.subtitle}</Text>
    </Animated.View>
  );
};
