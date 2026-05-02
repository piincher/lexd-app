/**
 * PickupInfoCard - Displays pickup information when container is ready
 * Extracted from ContainerTrackingScreen to follow SRP
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CustomerContainer } from '../types';

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

  const styles = useMemo(() => StyleSheet.create({
    sectionCard: {
      marginBottom: 16,
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 16,
      elevation: 1,
    },
    pickupCard: {
      backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FEF3C7',
    },
    pickupHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    pickupTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.accent.goldDark,
      marginLeft: 8,
    },
    pickupText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 12,
      lineHeight: 20,
    },
    checklist: {
      gap: 8,
      marginBottom: 12,
    },
    checklistItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checklistText: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.primary,
      flex: 1,
    },
    contactInfo: {
      backgroundColor: colors.background.card,
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    contactLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 13,
      color: colors.text.secondary,
    },
    contactValue: {
      fontFamily: Fonts.regular,
      color: colors.text.primary,
    },
    contactButton: {
      marginTop: 8,
    },
  }), [colors, isDark]);

  if (!isReady && !isPreparing) {
    return null;
  }

  const title = isReady ? 'Prêt pour retrait' : 'Retrait en préparation';
  const message = isReady
    ? 'Vos marchandises peuvent être récupérées. Préparez les documents avant de venir.'
    : 'Le container est arrivé. L’équipe prépare les marchandises et confirmera le retrait.';

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
      <View style={styles.checklist}>
        <View style={styles.checklistItem}>
          <MaterialCommunityIcons name="card-account-details-outline" size={18} color={colors.accent.goldDark} />
          <Text style={styles.checklistText}>{"Pièce d'identité du client ou du mandataire"}</Text>
        </View>
        <View style={styles.checklistItem}>
          <MaterialCommunityIcons name="receipt" size={18} color={colors.accent.goldDark} />
          <Text style={styles.checklistText}>Reçu de paiement ou confirmation de solde</Text>
        </View>
        <View style={styles.checklistItem}>
          <MaterialCommunityIcons name="phone-message-outline" size={18} color={colors.accent.goldDark} />
          <Text style={styles.checklistText}>{"Appelez l'entrepôt avant déplacement"}</Text>
        </View>
      </View>
      {container.pickupContact && (
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>
            Adresse:{' '}
            <Text style={styles.contactValue}>
              {container.pickupContact.address}
            </Text>
          </Text>
          {!!container.pickupContact.phone && (
            <Text style={[styles.contactLabel, { marginTop: 6 }]}>
              Téléphone:{' '}
              <Text style={styles.contactValue}>{container.pickupContact.phone}</Text>
            </Text>
          )}
        </View>
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
