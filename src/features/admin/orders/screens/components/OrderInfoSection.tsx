import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './OrderInfoSection.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
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

// Helper functions to parse string values safely from v1 API
const parseNumber = (value: any): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const num = parseFloat(String(value));
  return isNaN(num) ? null : num;
};

const parseString = (value: any): string | null => {
  if (value === null || value === undefined || value === '') return null;
  return String(value);
};

const parsePrice = (value: any): number => {
  if (value === null || value === undefined || value === '') return 0;
  const num = parseFloat(String(value));
  return isNaN(num) ? 0 : num;
};

export const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({ order }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  // Parse values safely from v1 API (strings need to be converted)
  const quantity = parseNumber(order?.quantity) ?? 1;
  const packageWeight = parseString(order?.packageWeight);
  const packageCBM = parseString(order?.packageCBM) || parseString(order?.calculatedCBM);
  const unitPrice = parseNumber(order?.unitPrice);

  // Extract pricing information
  const totalPrice = parsePrice(order?.calculatedTotal) || 
                     parsePrice(order?.priceTotal) || 
                     parsePrice(order?.totalCost);

  // Format dates with empty string checks
  const departureDate = order?.departureDate && order.departureDate !== ''
    ? formatDate(order.departureDate)
    : 'Not scheduled';

  const receiptDate = order?.dateOfReceipt && order.dateOfReceipt !== ''
    ? formatDate(order.dateOfReceipt)
    : 'Not received';

  const lastUpdate = order?.updatedAt ? formatDate(order.updatedAt) : 'N/A';
  const createdDate = order?.createdAt ? formatDate(order.createdAt) : 'N/A';

  const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, iconColor = colors.text.secondary }) => (
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

  return (
    <Surface style={styles.container}>
      <Text style={styles.sectionTitle}>Informations client</Text>

      <View style={styles.grid}>
        <InfoItem
          icon="account"
          label="Client"
          value={order?.clientName || 'N/A'}
          iconColor={colors.primary.main}
        />
        <InfoItem
          icon="phone"
          label="Téléphone"
          value={order?.clientPhone || 'N/A'}
          iconColor={colors.status.success}
        />
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Détails du colis</Text>

      <View style={styles.grid}>
        <InfoItem
          icon="package-variant-closed"
          label="Quantité"
          value={`${quantity} colis`}
          iconColor={colors.status.info}
        />
        <InfoItem
          icon="weight"
          label="Poids"
          value={packageWeight ? `${packageWeight} kg` : 'N/A'}
          iconColor={colors.status.warning}
        />
        <InfoItem
          icon="cube-outline"
          label="CBM"
          value={`${packageCBM || '0'} m³`}
          iconColor={colors.status.info}
        />
        <InfoItem
          icon="package-variant"
          label="Catégorie"
          value={order?.category?.name || order?.typeOfPackage || 'Général'}
          iconColor={colors.status.warning}
        />
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Prix</Text>

      <View style={styles.grid}>
        {unitPrice !== null && unitPrice > 0 && (
          <InfoItem
            icon="tag"
            label="Prix unitaire"
            value={`${unitPrice.toLocaleString()} FCFA/${order?.shippingMode === 'air' ? 'kg' : 'm³'}`}
            iconColor={colors.status.success}
          />
        )}
        {order?.shippingMode === 'air' ? (
          <InfoItem
            icon="weight"
            label="Poids"
            value={packageWeight ? `${packageWeight} kg` : 'N/A'}
            iconColor={colors.status.warning}
          />
        ) : (
          <InfoItem
            icon="cube-outline"
            label="CBM"
            value={`${packageCBM || '0'} m³`}
            iconColor={colors.status.info}
          />
        )}
        <InfoItem
          icon="cash"
          label="Prix total"
          value={totalPrice > 0 ? `${totalPrice.toLocaleString()} FCFA` : 'Non défini'}
          iconColor={colors.status.success}
        />
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Dates</Text>

      <View style={styles.grid}>
        <InfoItem
          icon="calendar-plus"
          label="Date de création"
          value={createdDate}
          iconColor={colors.primary.main}
        />
        <InfoItem
          icon="calendar-arrow-right"
          label="Date de départ"
          value={departureDate}
          iconColor={colors.status.warning}
        />
        <InfoItem
          icon="calendar-check"
          label="Date de réception"
          value={receiptDate}
          iconColor={colors.status.success}
        />
        <InfoItem
          icon="update"
          label="Dernière mise à jour"
          value={lastUpdate}
          iconColor={colors.text.secondary}
        />
      </View>

      {order?.note && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.notesSection}>
            <View style={styles.notesHeader}>
              <MaterialCommunityIcons name="note-text" size={18} color={colors.text.secondary} />
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
