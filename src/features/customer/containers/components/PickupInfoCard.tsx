/**
 * PickupInfoCard - Displays pickup information when container is ready
 * Extracted from ContainerTrackingScreen to follow SRP
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CustomerContainer } from '../types';
import { PickupChecklist } from './PickupChecklist';
import { PickupContactInfo } from './PickupContactInfo';
import { createPickupInfoCardStyles } from './PickupInfoCard.styles';

interface PickupInfoCardProps {
  container: CustomerContainer;
  onContactPress: () => void;
}

export const PickupInfoCard: React.FC<PickupInfoCardProps> = ({
  container,
  onContactPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const isReady = container.status === 'READY_FOR_PICKUP';
  const isPreparing = container.status === 'ARRIVED' || container.status === 'DISCHARGED';
  const styles = createPickupInfoCardStyles(colors, isDark);

  if (!isReady && !isPreparing) {
    return null;
  }

  const title = isReady ? 'Prêt pour retrait' : 'Retrait en préparation';
  const message = isReady
    ? 'Vos marchandises peuvent être récupérées. Préparez les documents avant de venir.'
    : 'Le container est arrivé. L\u2019équipe prépare les marchandises et confirmera le retrait.';

  return (
    <View style={[styles.sectionCard, styles.pickupCard]}>
      <View style={styles.pickupHeader}>
        <MaterialCommunityIcons
          name={isReady ? 'check-circle' : 'progress-clock'}
          size={24}
          color={colors.accent.goldDark}
        />
        <Text style={styles.pickupTitle}>{title}</Text>
      </View>
      <Text style={styles.pickupText}>{message}</Text>
      <PickupChecklist />
      {container.pickupContact && (
        <PickupContactInfo
          address={container.pickupContact.address}
          phone={container.pickupContact.phone}
        />
      )}
      <Button
        mode="contained"
        onPress={onContactPress}
        style={styles.contactButton}
        icon="phone"
      >
        {"Appeler l'entrepôt"}
      </Button>
    </View>
  );
};
