import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OrderQuickStats.styles';

interface OrderQuickStatsProps {
  quantity?: number | string;
  weight?: number | string;
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
}) => {
  const { colors, isDark } = useAppTheme();
  // Parse values safely to handle v1 API string responses
  const parsedQuantity = quantity !== undefined && quantity !== '' 
    ? parseInt(String(quantity), 10) || 0 
    : 0;
    
  const parsedWeight = weight !== undefined && weight !== '' && weight !== '0' && weight !== 0
    ? String(weight)
    : null;
    
  const parsedCBM = cbm !== undefined && cbm !== '' && cbm !== '0' && cbm !== 0
    ? String(cbm)
    : null;

  return (
    <Surface style={styles.container}>
      <StatItem
        icon="package-variant-closed"
        value={String(parsedQuantity)}
        label="Colis"
        color={isDark ? '#93C5FD' : '#1976D2'}
        bgColor={isDark ? '#1E3A8A' : '#E3F2FD'}
      />
      <View style={styles.divider} />
      <StatItem
        icon="weight"
        value={parsedWeight ? `${parsedWeight} kg` : '--'}
        label="Poids"
        color={isDark ? '#FDBA74' : '#E65100'}
        bgColor={isDark ? '#7C2D12' : '#FFF3E0'}
      />
      <View style={styles.divider} />
      <StatItem
        icon="cube-outline"
        value={parsedCBM ? `${parsedCBM} m³` : '--'}
        label="CBM (m³)"
        color={isDark ? '#86EFAC' : '#2E7D32'}
        bgColor={isDark ? '#14532D' : '#E8F5E9'}
      />
      {shippingMode === 'sea' && (
        <>
          <View style={styles.divider} />
          <StatItem
            icon="ferry"
            value={shippingMode}
            label="Mode"
            color={isDark ? '#6FE7DE' : '#00796B'}
            bgColor={isDark ? '#134E4A' : '#E0F2F1'}
          />
        </>
      )}
    </Surface>
  );
};

export default OrderQuickStats;
