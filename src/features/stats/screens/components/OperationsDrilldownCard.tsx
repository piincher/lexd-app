import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShimmerBlock } from '@src/shared/ui';
import { OperationsAnalyticsResponse } from '../../types';
import { createOperationsDrilldownStyles } from './OperationsDrilldownCard.styles';

interface OperationsDrilldownCardProps {
  operations?: OperationsAnalyticsResponse;
  isLoading?: boolean;
}

const formatAmount = (value?: number) => {
  const num = Number(value) || 0;
  if (Math.abs(num) >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return `${Math.round(num)}`;
};

export const OperationsDrilldownCard: React.FC<OperationsDrilldownCardProps> = ({ operations, isLoading }) => {
  const { colors } = useAppTheme();
  const styles = createOperationsDrilldownStyles(colors);
  const overdueInvoices = operations?.receivables.topOverdueInvoices.slice(0, 3) || [];
  const containers = operations?.containerProfit.topContainers.slice(0, 3) || [];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ShimmerBlock width="55%" height={16} borderRadius={4} />
        <View style={styles.loaderGap}>
          {Array.from({ length: 4 }).map((_, index) => (
            <ShimmerBlock key={index} width="100%" height={40} borderRadius={8} />
          ))}
        </View>
      </View>
    );
  }

  if (!operations) return null;

  return (
    <Animated.View entering={FadeInUp.delay(280).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Priorites finance</Text>
          <Text style={styles.subtitle}>Factures et conteneurs a surveiller</Text>
        </View>
        <Ionicons name="analytics-outline" size={20} color={colors.status.info} />
      </View>

      <Text style={styles.sectionTitle}>Factures en retard</Text>
      {overdueInvoices.length === 0 ? (
        <Text style={styles.emptyText}>Aucune facture en retard</Text>
      ) : (
        overdueInvoices.map((invoice) => (
          <View key={invoice.invoiceId} style={styles.row}>
            <View style={styles.rowMain}>
              <Text style={styles.rowTitle} numberOfLines={1}>{invoice.invoiceNumber}</Text>
              <Text style={styles.rowMeta} numberOfLines={1}>
                {invoice.customerName || 'Client inconnu'} · {invoice.daysOverdue}j
              </Text>
            </View>
            <Text style={[styles.value, { color: colors.status.error }]}>
              {formatAmount(invoice.balanceDue)} F
            </Text>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Conteneurs actifs</Text>
      {containers.length === 0 ? (
        <Text style={styles.emptyText}>Aucun conteneur actif</Text>
      ) : (
        containers.map((container) => (
          <View key={container.containerId} style={styles.row}>
            <View style={styles.rowMain}>
              <Text style={styles.rowTitle} numberOfLines={1}>{container.containerNumber}</Text>
              <Text style={styles.rowMeta} numberOfLines={1}>
                {container.fillRate}% rempli · {container.goodsCount} colis
              </Text>
            </View>
            <Text style={[styles.value, { color: container.profit >= 0 ? colors.status.success : colors.status.error }]}>
              {formatAmount(container.profit)} F
            </Text>
          </View>
        ))
      )}
    </Animated.View>
  );
};
