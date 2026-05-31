import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import type { productType } from '@src/api/order';
import { createStyles } from './OrdersStats.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getPaymentSummary } from './OrderCard/OrderCard.utils';

interface OrdersStatsProps {
  orders: productType[];
}

export const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const stats = useMemo(() => {
    if (!orders || !Array.isArray(orders)) {
      return { total: 0, inTransit: 0, paid: 0, partial: 0, unpaid: 0, totalValue: 0, balanceDue: 0 };
    }

    const total = orders.length;
    const inTransit = orders.filter(o => o?.status === 'In Transit').length;
    const payment = orders.reduce((acc, order) => {
      const summary = getPaymentSummary(order);
      acc.totalValue += summary.total;
      acc.balanceDue += summary.balance;
      acc[summary.status.toLowerCase() as 'paid' | 'partial' | 'unpaid'] += 1;
      return acc;
    }, { paid: 0, partial: 0, unpaid: 0, totalValue: 0, balanceDue: 0 });

    return { total, inTransit, ...payment };
  }, [orders]);

  const StatCard = ({
    value,
    label,
    icon,
    color,
  }: {
    value: number | string;
    label: string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Surface style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={[styles.statIconBg, { backgroundColor: color + '15' }]}>
        {icon}
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{typeof value === 'number' ? value.toLocaleString('fr-FR') : value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <View style={styles.workbenchHeader}>
        <View>
          <Text style={styles.sectionTitle}>Orders workbench</Text>
          <Text style={styles.sectionSubtitle}>Payment, route, and container triage</Text>
        </View>
        <Text style={styles.totalBadge}>{stats.total} orders</Text>
      </View>

      <Surface style={styles.balanceCard}>
        <View>
          <Text style={styles.balanceLabel}>À encaisser</Text>
          <Text style={styles.balanceValue}>
            {stats.balanceDue > 0 ? `${stats.balanceDue.toLocaleString('fr-FR')} FCFA` : '0 FCFA'}
          </Text>
        </View>
        <Text style={styles.balanceMeta}>
          Total: {stats.totalValue > 0 ? `${stats.totalValue.toLocaleString('fr-FR')} FCFA` : 'Non défini'}
        </Text>
      </Surface>

      <View style={styles.statsGrid}>
        <StatCard
          value={stats.paid}
          label="Paid"
          icon={<MaterialIcons name="check-circle" size={18} color={colors.status.success} />}
          color={colors.status.success}
        />
        <StatCard
          value={stats.partial}
          label="Partial"
          icon={<MaterialCommunityIcons name="progress-clock" size={18} color={colors.status.warning} />}
          color={colors.status.warning}
        />
        <StatCard
          value={stats.unpaid}
          label="Unpaid"
          icon={<MaterialIcons name="error" size={18} color={colors.status.error} />}
          color={colors.status.error}
        />
        <StatCard
          value={stats.inTransit}
          label="Transit"
          icon={<FontAwesome5 name="shipping-fast" size={14} color={colors.status.info} />}
          color={colors.status.info}
        />
      </View>
    </View>
  );
};

export default OrdersStats;
