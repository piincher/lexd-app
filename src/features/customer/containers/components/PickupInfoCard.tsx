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

  if (container.status !== 'READY_FOR_PICKUP' && container.status !== 'ARRIVED') {
    return null;
  }

  return (
    <View style={[styles.sectionCard, styles.pickupCard]}>
      <View style={styles.pickupHeader}>
        <MaterialCommunityIcons
          name="information"
          size={24}
          color={colors.accent.goldDark}
        />
        <Text style={styles.pickupTitle}>Informations de Retrait</Text>
      </View>
      <Text style={styles.pickupText}>
        Votre marchandise est prête pour le retrait. Contactez
        l'entrepôt pour organiser la collecte.
      </Text>
      {container.pickupContact && (
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>
            Adresse:{' '}
            <Text style={styles.contactValue}>
              {container.pickupContact.address}
            </Text>
          </Text>
        </View>
      )}
      <Button
        mode="contained"
        onPress={onContactPress}
        style={styles.contactButton}
        icon="phone"
      >
        Contacter l'Entrepôt
      </Button>
    </View>
  );
};
