import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from './OrderShippingSection.styles';

interface OrderShippingSectionProps {
  order: any;
}

interface ShippingRowProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

const ShippingRow: React.FC<ShippingRowProps> = ({
  icon,
  label,
  value,
  iconColor = '#6B7280',
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

export const OrderShippingSection: React.FC<OrderShippingSectionProps> = ({ order }) => {
  const lastPosition = order?.currentPosition?.coordinates?.[
    (order.currentPosition?.coordinates?.length ?? 1) - 1
  ]?.location;

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="truck-fast" size={22} color={COLORS.blue} />
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

      <ShippingRow
        icon="identifier"
        label="N° Conteneur"
        value={order?.contenairNumber}
        iconColor="#1976D2"
      />
      <ShippingRow
        icon="handshake"
        label="Transporteur"
        value={order?.partenaire}
        iconColor="#7B1FA2"
      />
      <ShippingRow
        icon="map-marker-radius"
        label="Position actuelle"
        value={lastPosition || order?.currentStatus || 'En attente'}
        iconColor="#E65100"
      />
      <ShippingRow
        icon="package-variant"
        label="Type de colis"
        value={order?.category?.name || order?.typeOfPackage || 'Général'}
        iconColor="#00796B"
      />
    </Surface>
  );
};

export default OrderShippingSection;
