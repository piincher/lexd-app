import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './OrderQuickStats.styles';

interface OrderQuickStatsProps {
  quantity?: number;
  weight?: number;
  cbm?: string | number;
  shippingMode?: string;
}

interface StatItemProps {
  icon: string;
  value: string;
  label: string;
  color: string;
  bgColor: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, color, bgColor }) => (
  <View style={styles.statItem}>
    <View style={[styles.statIcon, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons name={icon as any} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const OrderQuickStats: React.FC<OrderQuickStatsProps> = ({
  quantity,
  weight,
  cbm,
  shippingMode,
}) => (
  <Surface style={styles.container}>
    <StatItem
      icon="package-variant-closed"
      value={String(quantity ?? 0)}
      label="Colis"
      color="#1976D2"
      bgColor="#E3F2FD"
    />
    <View style={styles.divider} />
    <StatItem
      icon="weight"
      value={weight ? `${weight} kg` : '--'}
      label="Poids"
      color="#E65100"
      bgColor="#FFF3E0"
    />
    <View style={styles.divider} />
    <StatItem
      icon="cube-outline"
      value={cbm ? String(cbm) : '--'}
      label="CBM (m³)"
      color="#2E7D32"
      bgColor="#E8F5E9"
    />
    {shippingMode === 'sea' && (
      <>
        <View style={styles.divider} />
        <StatItem
          icon="ferry"
          value={shippingMode}
          label="Mode"
          color="#00796B"
          bgColor="#E0F2F1"
        />
      </>
    )}
  </Surface>
);

export default OrderQuickStats;
