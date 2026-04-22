/**
 * PackingListConsignee Component
 * Consignee information section with contact and address actions
 * SRP: Display consignee details with contact buttons
 */

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Card, Divider, Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ClientPackingListScreen.styles';

interface Consignee {
  name?: string;
  phone?: string;
  email?: string;
  warehouseAddress?: string;
}

interface PackingListConsigneeProps {
  consignee?: Consignee;
  onContactPress: () => void;
  onAddressPress: () => void;
}

export const PackingListConsignee: React.FC<PackingListConsigneeProps> = ({
  consignee,
  onContactPress,
  onAddressPress,
}) => {
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  if (!consignee) {
    return null;
  }

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="warehouse"
            size={24}
            color={theme.colors.primary}
          />
          <Text style={styles.sectionTitle}>Informations du Destinataire</Text>
        </View>
        <Divider style={styles.sectionDivider} />

        <View style={styles.consigneeInfo}>
          {consignee.name && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="account" size={20} color={colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nom</Text>
                <Text style={styles.infoValue}>{consignee.name}</Text>
              </View>
            </View>
          )}

          {consignee.phone && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={20} color={colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Téléphone</Text>
                <Text style={styles.infoValue}>{consignee.phone}</Text>
              </View>
            </View>
          )}

          {consignee.email && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="email" size={20} color={colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{consignee.email}</Text>
              </View>
            </View>
          )}

          {consignee.warehouseAddress && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={20} color={colors.text.secondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Adresse de l'entrepôt</Text>
                <Text style={styles.infoValue}>{consignee.warehouseAddress}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.consigneeActions}>
          <Button
            mode="outlined"
            onPress={onContactPress}
            icon="phone"
            style={styles.actionButton}
            labelStyle={{ color: theme.colors.primary, fontFamily: Fonts.meduim }}
            compact
          >
            Contacter
          </Button>
          <Button
            mode="outlined"
            onPress={onAddressPress}
            icon="map-marker"
            style={styles.actionButton}
            labelStyle={{ color: theme.colors.primary, fontFamily: Fonts.meduim }}
            compact
          >
            Voir sur Maps
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PackingListConsignee;
