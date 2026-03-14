/**
 * PackingListPickupSection Component
 * Pickup location and consignee contact information
 * SRP: Display pickup section with warehouse and consignee info
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListPickupSection.styles';

interface Consignee {
  name: string;
  phone: string;
  warehouseAddress: string;
}

interface PackingListPickupSectionProps {
  consignee: Consignee;
}

export const PackingListPickupSection: React.FC<PackingListPickupSectionProps> = ({
  consignee,
}) => {
  return (
    <Card style={styles.pickupSectionCard}>
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        style={styles.pickupGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card.Content>
          <View style={styles.pickupSectionHeader}>
            <MaterialCommunityIcons name="map-marker" size={28} color="#FFF" />
            <Text style={styles.pickupSectionTitle}>📍 POINT DE RETRAIT</Text>
          </View>
          
          <Text style={styles.warehouseMainName}>ChinaLink Express Warehouse - Bamako</Text>
          <Text style={styles.warehouseMainAddress}>Mali</Text>
          
          <Divider style={styles.pickupDivider} />
          
          <Text style={styles.consigneeSectionLabel}>Contact pour le retrait:</Text>
          
          <View style={styles.consigneeInfoCard}>
            <View style={styles.consigneeInfoRow}>
              <MaterialCommunityIcons name="account" size={20} color="#7C3AED" />
              <Text style={styles.consigneeInfoName}>{consignee.name}</Text>
            </View>
            
            <View style={styles.consigneeInfoRow}>
              <MaterialCommunityIcons name="phone" size={20} color="#7C3AED" />
              <Text style={styles.consigneeInfoPhone}>{consignee.phone}</Text>
            </View>
            
            <View style={styles.consigneeInfoRow}>
              <MaterialCommunityIcons name="office-building" size={20} color="#7C3AED" />
              <Text style={styles.consigneeInfoAddress}>{consignee.warehouseAddress}</Text>
            </View>
          </View>
          
          <View style={styles.requiredDocs}>
            <MaterialCommunityIcons name="file-document" size={16} color="rgba(255,255,255,0.9)" />
            <Text style={styles.requiredDocsText}>
              Documents requis pour le retrait: Pièce d'identité valide + Reçu de paiement
            </Text>
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
};

export default PackingListPickupSection;
