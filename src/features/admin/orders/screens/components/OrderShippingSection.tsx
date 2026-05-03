import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderShippingSection.styles';

interface OrderShippingSectionProps {
  order: any;
}

interface ShippingRowProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
  styles: ReturnType<typeof createStyles>;
}

const ShippingRow: React.FC<ShippingRowProps> = ({
  icon,
  label,
  value,
  iconColor = '#6B7280',
  styles,
}) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <View style={[styles.rowIcon, { backgroundColor: `${iconColor}15` }]}>
        <MaterialCommunityIcons name={icon as any} size={18} color={iconColor} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    <Text style={styles.rowValue} numberOfLines={1}>
      {value || 'N/A'}
    </Text>
  </View>
);

// Extract position from v1 route data
const getPositionFromRoute = (order: any): string => {
  // Try v2 currentPosition first
  const v2Position = order?.currentPosition?.coordinates?.[
    (order.currentPosition?.coordinates?.length ?? 1) - 1
  ]?.location;
  if (v2Position) return v2Position;
  
  // Try v1 route array
  if (order?.route && Array.isArray(order.route) && order.route.length > 0) {
    // Get the last route entry
    const lastRoute = order.route[order.route.length - 1];
    if (lastRoute?.coordinates && lastRoute.coordinates.length > 0) {
      const lastCoord = lastRoute.coordinates[lastRoute.coordinates.length - 1];
      return lastCoord?.location || lastRoute?.title || 'En transit';
    }
    return lastRoute?.title || 'En transit';
  }
  
  // Fallback to currentStatus
  return order?.currentStatus || 'En attente';
};

const formatDateSafe = (dateValue: any): string => {
  if (!dateValue || dateValue === '') return 'Non défini';
  try {
    return new Date(dateValue).toLocaleDateString('fr-FR');
  } catch {
    return String(dateValue);
  }
};

export const OrderShippingSection: React.FC<OrderShippingSectionProps> = ({ order }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const position = getPositionFromRoute(order);
  const departureDate = formatDateSafe(order?.departureDate);
  const receiptDate = formatDateSafe(order?.dateOfReceipt);

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="truck-fast" size={22} color={colors.primary.main} />
        <Text style={styles.title}>Expédition & Logistique</Text>
      </View>

      {/* Route visualization */}
      <View style={styles.routeCard}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.routeLabel}>Origine</Text>
          <Text style={styles.routeValue}>Chine</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: '#F44336' }]} />
          <Text style={styles.routeLabel}>Destination</Text>
          <Text style={styles.routeValue}>
            {order?.destinationCountry || 'Bamako, Mali'}
          </Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <ShippingRow styles={styles} icon="identifier" label="N° Conteneur" value={order?.contenairNumber} iconColor="#1976D2" />
      <ShippingRow styles={styles} icon="handshake" label="Transporteur" value={order?.partenaire || 'Non spécifié'} iconColor="#7B1FA2" />
      <ShippingRow styles={styles} icon="map-marker-radius" label="Position actuelle" value={position} iconColor="#E65100" />
      <ShippingRow styles={styles} icon="calendar-arrow-right" label="Date de départ" value={departureDate} iconColor="#9C27B0" />
      <ShippingRow styles={styles} icon="calendar-check" label="Date de réception" value={receiptDate} iconColor="#4CAF50" />
      <ShippingRow styles={styles} icon="package-variant" label="Type de colis" value={order?.category?.name || order?.typeOfPackage || 'Général'} iconColor="#00796B" />
    </Surface>
  );
};

export default OrderShippingSection;
