/**
 * KPI Cards Component
 * Displays key performance indicators in card format
 */

import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { KPICard } from './KPICard';
import { styles } from './KPICards.styles';

export interface KPIData {
  todayRevenue: number;
  todayRevenueFCFA: number;
  thisWeekRevenue: number;
  thisWeekRevenueFCFA: number;
  thisMonthRevenue: number;
  thisMonthRevenueFCFA: number;
  activeContainers: number;
  pendingPayments: number;
  newCustomersThisMonth: number;
  goodsInTransit: number;
}

interface KPICardsProps {
  data: KPIData;
  loading?: boolean;
}

const formatCurrency = (amount: number) => {
  if (amount >= 100000000) return `${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return amount.toLocaleString('fr-FR');
};

const formatNumber = (num: number) => num.toLocaleString('fr-FR');

export const KPICards: React.FC<KPICardsProps> = ({ data, loading = false }) => {
  const { colors } = useAppTheme();

  const kpiConfig = [
    { title: "Revenus Aujourd'hui", value: formatCurrency(data.todayRevenueFCFA), subtitle: 'FCFA', icon: 'cash-plus' as const, gradientColors: Theme.gradients.primary as [string, string, string] },
    { title: 'Ce Mois', value: formatCurrency(data.thisMonthRevenueFCFA), subtitle: 'FCFA', icon: 'calendar-month' as const, gradientColors: Theme.gradients.purple as [string, string, string] },
    { title: 'Conteneurs Actifs', value: formatNumber(data.activeContainers), subtitle: 'en transit', icon: 'truck-delivery' as const, gradientColors: Theme.gradients.ocean as [string, string, string] },
    { title: 'Paiements en Attente', value: formatNumber(data.pendingPayments), subtitle: 'à traiter', icon: 'clock-outline' as const, gradientColors: Theme.gradients.gold as [string, string, string] },
    { title: 'Nouveaux Clients', value: formatNumber(data.newCustomersThisMonth), subtitle: 'ce mois', icon: 'account-plus' as const, gradientColors: Theme.gradients.pink as [string, string, string] },
    { title: 'Marchandises', value: formatNumber(data.goodsInTransit), subtitle: 'en transit', icon: 'package-variant-closed' as const, gradientColors: Theme.gradients.cyan as [string, string, string] },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={[styles.skeletonCard, { backgroundColor: colors.neutral[200] }]} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {kpiConfig.map((kpi, index) => (
          <KPICard key={index} title={kpi.title} value={kpi.value} subtitle={kpi.subtitle} icon={kpi.icon} gradientColors={kpi.gradientColors} />
        ))}
      </View>
    </View>
  );
};

export default KPICards;
