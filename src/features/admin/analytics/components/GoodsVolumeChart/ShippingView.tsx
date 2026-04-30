import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VolumeByShippingMode } from '../../types';
import { shippingModeColors } from './goodsVolumeConstants';
import { styles } from './GoodsVolumeChart.styles';

interface ShippingViewProps {
  byShippingMode: VolumeByShippingMode[];
  totalGoods: number;
  formatCurrency: (amount: number) => string;
}

export const ShippingView: React.FC<ShippingViewProps> = ({
  byShippingMode,
  totalGoods,
  formatCurrency,
}) => (
  <View style={styles.content}>
    <Text style={styles.sectionTitle}>Par Mode de Transport</Text>

    {byShippingMode.map((mode) => {
      const color = shippingModeColors[mode.shippingMode] || '#6B7280';
      const icon =
        mode.shippingMode === 'AIR'
          ? 'airplane'
          : mode.shippingMode === 'SEA'
            ? 'ferry'
            : 'help-circle';

      return (
        <View key={mode.shippingMode} style={styles.shippingItem}>
          <View style={styles.shippingHeader}>
            <View style={[styles.shippingIcon, { backgroundColor: color }]}>
              <MaterialCommunityIcons name={icon as any} size={16} color="#FFFFFF" />
            </View>
            <View style={styles.shippingInfo}>
              <Text style={styles.shippingLabel}>
                {mode.shippingMode === 'UNASSIGNED' ? 'Non assigné' : mode.shippingMode}
              </Text>
              <Text style={styles.shippingCount}>{mode.count} marchandises</Text>
            </View>
            <Text style={styles.shippingValue}>
              {formatCurrency(mode.totalValueFCFA)} FCFA
            </Text>
          </View>
          <View style={styles.shippingBarContainer}>
            <View style={styles.shippingBarBackground}>
              <View
                style={[
                  styles.shippingBarFill,
                  {
                    width: `${Math.min((mode.count / totalGoods) * 100 * 2, 100)}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
            <Text style={styles.shippingCBM}>{mode.totalCBM.toFixed(1)} CBM</Text>
          </View>
        </View>
      );
    })}
  </View>
);
