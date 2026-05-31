import React from 'react';
import { View } from 'react-native';
import { Surface, Divider, Text } from 'react-native-paper';
import { createStyles } from './OrderInfoSection.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDate } from '@src/utils/formatDate';
import { OrderInfoBlock } from './OrderInfoBlock';
import { OrderInfoNotes } from './OrderInfoNotes';

interface OrderInfoSectionProps {
  order: any;
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
  const styles = createStyles(colors, isDark);

  // Parse values safely from v1 API (strings need to be converted)
  const quantity = parseNumber(order?.quantity) ?? 1;
  const packageWeight = parseString(order?.packageWeight);
  const packageCBM = parseString(order?.packageCBM) || parseString(order?.calculatedCBM);
  const unitPrice = parseNumber(order?.unitPrice);

  // Extract pricing information
  const totalPrice =
    parsePrice(order?.calculatedTotal) || parsePrice(order?.priceTotal) || parsePrice(order?.totalCost);

  // Format dates with empty string checks
  const departureDate =
    order?.departureDate && order.departureDate !== '' ? formatDate(order.departureDate) : 'Non planifiée';

  const receiptDate =
    order?.dateOfReceipt && order.dateOfReceipt !== '' ? formatDate(order.dateOfReceipt) : 'Non reçue';

  const lastUpdate = order?.updatedAt ? formatDate(order.updatedAt) : 'N/A';
  const createdDate = order?.createdAt ? formatDate(order.createdAt) : 'N/A';

  const clientItems = [
    { icon: 'account', label: 'Client', value: order?.clientName || 'N/A', iconColor: colors.primary.main },
    { icon: 'phone', label: 'Téléphone', value: order?.clientPhone || 'N/A', iconColor: colors.status.success },
  ];

  const packageItems = [
    { icon: 'package-variant-closed', label: 'Quantité', value: `${quantity} colis`, iconColor: colors.status.info },
    { icon: 'weight', label: 'Poids', value: packageWeight ? `${packageWeight} kg` : 'N/A', iconColor: colors.status.warning },
    { icon: 'cube-outline', label: 'CBM', value: `${packageCBM || '0'} m³`, iconColor: colors.status.info },
    { icon: 'package-variant', label: 'Catégorie', value: order?.category?.name || order?.typeOfPackage || 'Général', iconColor: colors.status.warning },
  ];

  const priceItems = [
    ...(unitPrice !== null && unitPrice > 0
      ? [
          {
            icon: 'tag',
            label: 'Prix unitaire',
            value: `${unitPrice.toLocaleString()} FCFA/${order?.shippingMode === 'air' ? 'kg' : 'm³'}`,
            iconColor: colors.status.success,
          },
        ]
      : []),
    ...(order?.shippingMode === 'air'
      ? [{ icon: 'weight', label: 'Poids', value: packageWeight ? `${packageWeight} kg` : 'N/A', iconColor: colors.status.warning }]
      : [{ icon: 'cube-outline', label: 'CBM', value: `${packageCBM || '0'} m³`, iconColor: colors.status.info }]),
    { icon: 'cash', label: 'Prix total', value: totalPrice > 0 ? `${totalPrice.toLocaleString()} FCFA` : 'Non défini', iconColor: colors.status.success },
  ];

  const dateItems = [
    { icon: 'calendar-plus', label: 'Date de création', value: createdDate, iconColor: colors.primary.main },
    { icon: 'calendar-arrow-right', label: 'Date de départ', value: departureDate, iconColor: colors.status.warning },
    { icon: 'calendar-check', label: 'Date de réception', value: receiptDate, iconColor: colors.status.success },
    { icon: 'update', label: 'Dernière mise à jour', value: lastUpdate, iconColor: colors.text.secondary },
  ];

  return (
    <Surface style={styles.container}>
      <OrderInfoBlock title="Informations client" items={clientItems} showDivider={false} />
      <OrderInfoBlock title="Détails du colis" items={packageItems} />
      <OrderInfoBlock title="Prix" items={priceItems} />
      <OrderInfoBlock title="Dates" items={dateItems} />

      {order?.note && (
        <>
          <Divider style={styles.divider} />
          <OrderInfoNotes note={order.note} />
        </>
      )}
    </Surface>
  );
};

export default OrderInfoSection;
