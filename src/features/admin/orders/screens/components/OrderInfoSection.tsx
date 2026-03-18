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

  return (
    <Surface style={styles.container}>
      <Text style={styles.sectionTitle}>Order Information</Text>
      
      <View style={styles.grid}>
        <InfoItem 
          icon="phone" 
          label="Phone Number" 
          value={order?.clientPhone || 'N/A'} 
          iconColor="#4CAF50"
        />
        <InfoItem 
          icon="map-marker" 
          label="Destination" 
          value={order?.destinationCountry || 'Bamako, Mali'} 
          iconColor="#F44336"
        />
        <InfoItem 
          icon="cube-outline" 
          label="Package CBM" 
          value={`${order?.packageCBM || order?.calculatedCBM || '0'} CBM`} 
          iconColor="#2196F3"
        />
        <InfoItem 
          icon="package-variant" 
          label="Package Type" 
          value={order?.category?.name || order?.typeOfPackage || 'General'} 
          iconColor="#FF9800"
        />
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Dates</Text>
      
      <View style={styles.grid}>
        <InfoItem 
          icon="calendar-arrow-right" 
          label="Departure Date" 
          value={departureDate} 
          iconColor="#9C27B0"
        />
        <InfoItem 
          icon="calendar-check" 
          label="Receipt Date" 
          value={receiptDate} 
          iconColor="#4CAF50"
        />
        <InfoItem 
          icon="update" 
          label="Last Updated" 
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
