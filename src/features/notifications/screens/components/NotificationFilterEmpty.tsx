import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { useNotificationEmptyStyles } from './NotificationEmpty.styles';
import type { FilterTab } from '../../types';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const EMPTY_CONFIG: Record<FilterTab, { icon: MaterialIconName; title: string; subtitle: string }> = {
  all: {
    icon: 'bell-off-outline',
    title: 'Aucune notification',
    subtitle: 'Vous serez notifié dès qu’une mise à jour est disponible.',
  },
  important: {
    icon: 'alert-circle-outline',
    title: "Rien d'important",
    subtitle: 'Les alertes urgentes apparaîtront ici.',
  },
  shipments: {
    icon: 'truck-delivery-outline',
    title: 'Aucune mise à jour d’expédition',
    subtitle: 'Les mouvements de vos marchandises apparaîtront ici.',
  },
  payments: {
    icon: 'cash-multiple',
    title: 'Aucune notification de paiement',
    subtitle: 'Les paiements et factures apparaîtront ici.',
  },
  unread: {
    icon: 'check-circle-outline',
    title: 'Tout est lu !',
    subtitle: 'Vous êtes à jour avec toutes vos notifications.',
  },
  system: {
    icon: 'cog-outline',
    title: 'Aucune notification système',
    subtitle: 'Les alertes système apparaîtront ici.',
  },
};

interface NotificationFilterEmptyProps {
  filter: FilterTab;
}

export const NotificationFilterEmpty: React.FC<NotificationFilterEmptyProps> = ({ filter }) => {
  const { colors } = useAppTheme();
  const styles = useNotificationEmptyStyles();
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
