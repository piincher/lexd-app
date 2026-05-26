import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderQuickStats.styles';

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

export const OrderQuickStats: React.FC<OrderQuickStatsProps> = ({
  quantity,
  weight,
  cbm,
  shippingMode,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const StatItem: React.FC<StatItemProps> = ({ icon, value, label, color, bgColor }) => (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: bgColor }]}>
        <MaterialCommunityIcons name={icon as any} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

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

  const statColors = useMemo(() => ({
    quantity: { color: colors.status.info, bgColor: colors.status.info + '15' },
    weight: { color: colors.status.warning, bgColor: colors.status.warning + '15' },
    cbm: { color: colors.status.success, bgColor: colors.status.success + '15' },
    mode: { color: colors.primary.main, bgColor: colors.primary.main + '15' },
  }), [colors]);

  return (
    <Surface style={styles.container}>
      <StatItem
        icon="package-variant-closed"
        value={String(parsedQuantity)}
        label="Colis"
        color={statColors.quantity.color}
        bgColor={statColors.quantity.bgColor}
      />
      <View style={styles.divider} />
      <StatItem
        icon="weight"
        value={parsedWeight ? `${parsedWeight} kg` : '--'}
        label="Poids"
        color={statColors.weight.color}
        bgColor={statColors.weight.bgColor}
      />
      <View style={styles.divider} />
      <StatItem
        icon="cube-outline"
        value={parsedCBM ? `${parsedCBM} m³` : '--'}
        label="CBM (m³)"
        color={statColors.cbm.color}
        bgColor={statColors.cbm.bgColor}
      />
      {shippingMode === 'sea' && (
        <>
          <View style={styles.divider} />
          <StatItem
            icon="ferry"
            value={shippingMode}
            label="Mode"
            color={statColors.mode.color}
            bgColor={statColors.mode.bgColor}
          />
        </>
      )}
    </Surface>
  );
};

export default OrderQuickStats;
