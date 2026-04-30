import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useContainerCardStyles } from './ContainerCard.styles';
import { CustomerContainer } from '../../types';
import { formatDate } from './ContainerCard';

interface StatusBannerProps {
  container: CustomerContainer;
}

const PRIMARY_COLOR = '#16A34A';

export const StatusBanner: React.FC<StatusBannerProps> = ({ container }) => {
  const { colors } = useAppTheme();
  const styles = useContainerCardStyles();

  if (container.status === 'READY_FOR_PICKUP') {
    return (
      <View style={styles.readyBanner}>
        <MaterialCommunityIcons name="truck-delivery-outline" size={16} color={colors.text.inverse} />
        <Text style={styles.readyBannerText}>Prêt pour retrait - Contactez l'entrepôt</Text>
      </View>
    );
  }

  if (container.status === 'IN_TRANSIT' && container.timeline?.departedAt) {
    return (
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="information-outline" size={14} color={PRIMARY_COLOR} />
        <Text style={styles.infoBannerText}>En transit depuis le {formatDate(container.timeline.departedAt)}</Text>
      </View>
    );
  }

  if (container.status === 'ARRIVED' && container.timeline?.arrivedAt) {
    return (
      <View style={[styles.infoBanner, styles.arrivedBanner]}>
        <MaterialCommunityIcons name="check-circle-outline" size={14} color={colors.status.success} />
        <Text style={[styles.infoBannerText, styles.arrivedBannerText]}>Arrivé le {formatDate(container.timeline.arrivedAt)}</Text>
      </View>
    );
  }

  return null;
};
