/**
 * PackingListConsignee Component
 * Consignee information card with contact actions
 * SRP: Display consignee details and contact actions
 */

import React from 'react';
import { View, Linking } from 'react-native';
import { Card, Divider, Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListConsignee.styles';

interface Consignee {
  name: string;
  phone: string;
  warehouseAddress: string;
  email?: string;
  businessHours?: string;
}

interface PackingListConsigneeProps {
  consignee: Consignee;
  onContactPress: () => void;
}

export const PackingListConsignee: React.FC<PackingListConsigneeProps> = ({
  consignee,
  onContactPress,
}) => {
  const theme = useTheme();

  const handleOpenMaps = () => {
    if (consignee.warehouseAddress) {
      const encodedAddress = encodeURIComponent(consignee.warehouseAddress);
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
    }
  };

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
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="office-building" size={20} color={COLORS.DimGray} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Destinataire</Text>
              <Text style={styles.infoValue}>{consignee.name}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color={COLORS.DimGray} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Adresse de l'entrepôt</Text>
              <Text style={styles.infoValue}>{consignee.warehouseAddress}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="phone" size={20} color={COLORS.DimGray} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>{consignee.phone}</Text>
            </View>
          </View>

          {consignee.businessHours && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={COLORS.DimGray} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Heures d'ouverture</Text>
                <Text style={styles.infoValue}>{consignee.businessHours}</Text>
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
            labelStyle={{ color: theme.colors.primary }}
            compact
          >
            Appeler
          </Button>
          <Button
            mode="outlined"
            onPress={handleOpenMaps}
            icon="map-marker"
            style={styles.actionButton}
            labelStyle={{ color: theme.colors.primary }}
            compact
          >
            Voir sur la carte
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PackingListConsignee;
