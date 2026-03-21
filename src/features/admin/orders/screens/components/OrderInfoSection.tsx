import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from './OrderInfoSection.styles';
import { formatDate } from '@src/utils/formatDate';

interface OrderInfoSectionProps {
  order: any;
}

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, iconColor = COLORS.grey }) => (
  <View style={styles.infoItem}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon as any} size={20} color={iconColor} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
    </View>
  </View>
);

export const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({ order }) => {
  const departureDate = order?.departureDate ? formatDate(order.departureDate) : 'Not scheduled';
  const receiptDate = order?.dateOfReceipt ? formatDate(order.dateOfReceipt) : 'Not received';
  const lastUpdate = order?.updatedAt ? formatDate(order.updatedAt) : 'N/A';
  const createdDate = order?.createdAt ? formatDate(order.createdAt) : 'N/A';

  return (
    <Surface style={styles.container}>
      <Text style={styles.sectionTitle}>Informations client</Text>

      <View style={styles.grid}>
        <InfoItem
          icon="account"
          label="Client"
          value={order?.clientName || 'N/A'}
          iconColor="#1976D2"
        />
        <InfoItem
          icon="phone"
          label="Téléphone"
          value={order?.clientPhone || 'N/A'}
          iconColor="#4CAF50"
        />
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Détails du colis</Text>

      <View style={styles.grid}>
        <InfoItem
          icon="package-variant-closed"
          label="Quantité"
          value={`${order?.quantity ?? 1} colis`}
          iconColor="#7B1FA2"
        />
        <InfoItem
          icon="weight"
          label="Poids"
          value={order?.packageWeight ? `${order.packageWeight} kg` : 'N/A'}
          iconColor="#E65100"
        />
        <InfoItem
          icon="cube-outline"
          label="CBM"
          value={`${order?.packageCBM || order?.calculatedCBM || '0'} m³`}
          iconColor="#2196F3"
        />
        <InfoItem
          icon="package-variant"
          label="Catégorie"
          value={order?.category?.name || order?.typeOfPackage || 'Général'}
          iconColor="#FF9800"
        />
        {order?.unitPrice > 0 && (
          <InfoItem
            icon="tag"
            label="Prix unitaire"
            value={`${order.unitPrice.toLocaleString()} FCFA`}
            iconColor="#00796B"
          />
        )}
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Dates</Text>

      <View style={styles.grid}>
        <InfoItem
          icon="calendar-plus"
          label="Date de création"
          value={createdDate}
          iconColor="#1976D2"
        />
        <InfoItem
          icon="calendar-arrow-right"
          label="Date de départ"
          value={departureDate}
          iconColor="#9C27B0"
        />
        <InfoItem
          icon="calendar-check"
          label="Date de réception"
          value={receiptDate}
          iconColor="#4CAF50"
        />
        <InfoItem
          icon="update"
          label="Dernière mise à jour"
          value={lastUpdate}
          iconColor="#607D8B"
        />
      </View>

      {order?.note && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.notesSection}>
            <View style={styles.notesHeader}>
              <MaterialCommunityIcons name="note-text" size={18} color={COLORS.grey} />
              <Text style={styles.notesTitle}>Notes</Text>
            </View>
            <Text style={styles.notesText}>{order.note}</Text>
          </View>
        </>
      )}
    </Surface>
  );
};

export default OrderInfoSection;
