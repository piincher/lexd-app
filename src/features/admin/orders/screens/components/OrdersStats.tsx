import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { createStyles } from './OrdersStats.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OrdersStatsProps {
  orders: any[];
}

export const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const stats = useMemo(() => {
    if (!orders || !Array.isArray(orders)) {
      return { total: 0, inTransit: 0, pending: 0, delivered: 0, totalValue: 0 };
    }
    
    const total = orders.length;
    const inTransit = orders.filter(o => o?.status === 'In Transit').length;
    const pending = orders.filter(o => o?.status === 'PENDING').length;
    const delivered = orders.filter(o => o?.status === 'Delivered').length;
    const totalValue = orders.reduce((sum, o) => {
      if (!o) return sum;
      const price = o.calculatedTotal || parseFloat(o.priceTotal) || 0;
      return sum + price;
    }, 0);
    
    return { total, inTransit, pending, delivered, totalValue };
  }, [orders]);

  const StatCard = ({ 
    value, 
    label, 
    icon, 
    color 
  }: { 
    value: number; 
    label: string; 
    icon: any; 
    color: string;
  }) => (
    <Surface style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statIconContainer}>
        <View style={[styles.statIconBg, { backgroundColor: color + '15' }]}>
          {icon}
        </View>
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value.toLocaleString()}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.statsGrid}>
        <StatCard
          value={stats.total}
          label="Total Orders"
          icon={<MaterialCommunityIcons name="package-variant" size={18} color={colors.primary.main} />}
          color={colors.primary.main}
        />
        <StatCard
          value={stats.inTransit}
          label="In Transit"
          icon={<FontAwesome5 name="shipping-fast" size={14} color="#FF9800" />}
          color="#FF9800"
        />
        <StatCard
          value={stats.pending}
          label="Pending"
          icon={<MaterialIcons name="access-time" size={18} color="#9C27B0" />}
          color="#9C27B0"
        />
        <StatCard
          value={stats.delivered}
          label="Delivered"
          icon={<MaterialIcons name="check-circle" size={18} color="#4CAF50" />}
          color="#4CAF50"
        />
      </View>
      
      {stats.totalValue > 0 && (
        <Surface style={styles.revenueCard}>
          <View style={styles.revenueRow}>
            <View style={styles.revenueIconBg}>
              <MaterialIcons name="trending-up" size={20} color="#4CAF50" />
            </View>
            <View style={styles.revenueContent}>
              <Text style={styles.revenueLabel}>Total Revenue</Text>
              <Text style={styles.revenueValue}>
                {stats.totalValue.toLocaleString()} FCFA
              </Text>
            </View>
          </View>
        </Surface>
      )}
    </View>
  );
};

export default OrdersStats;
