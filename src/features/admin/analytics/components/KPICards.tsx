/**
 * KPI Cards Component
 * Displays key performance indicators in card format
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

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

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  gradientColors: [string, string, string];
  trend?: {
    value: number;
    label: string;
  };
}

// ============================================
// SINGLE KPI CARD
// ============================================

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradientColors,
  trend,
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon as any} size={24} color="#FFFFFF" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
          {trend && (
            <View style={styles.trendContainer}>
              <MaterialCommunityIcons
                name={trend.value >= 0 ? 'trending-up' : 'trending-down'}
                size={14}
                color="#FFFFFF"
              />
              <Text style={styles.trendText}>
                {trend.value >= 0 ? '+' : ''}{trend.value.toFixed(1)}% {trend.label}
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const KPICards: React.FC<KPICardsProps> = ({ data, loading = false }) => {
  const { colors } = useAppTheme();
  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 1000000).toFixed(0)}M`;
    }
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toLocaleString('fr-FR');
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-FR');
  };

  const kpiConfig = [
    {
      title: "Revenus Aujourd'hui",
      value: formatCurrency(data.todayRevenueFCFA),
      subtitle: 'FCFA',
      icon: 'cash-plus',
      gradientColors: ['#10B981', '#059669', '#047857'] as [string, string, string],
    },
    {
      title: 'Ce Mois',
      value: formatCurrency(data.thisMonthRevenueFCFA),
      subtitle: 'FCFA',
      icon: 'calendar-month',
      gradientColors: ['#8B5CF6', '#7C3AED', '#6D28D9'] as [string, string, string],
    },
    {
      title: 'Conteneurs Actifs',
      value: formatNumber(data.activeContainers),
      subtitle: 'en transit',
      icon: 'truck-delivery',
      gradientColors: ['#3B82F6', '#2563EB', '#1D4ED8'] as [string, string, string],
    },
    {
      title: 'Paiements en Attente',
      value: formatNumber(data.pendingPayments),
      subtitle: 'à traiter',
      icon: 'clock-outline',
      gradientColors: ['#F59E0B', '#D97706', '#B45309'] as [string, string, string],
    },
    {
      title: 'Nouveaux Clients',
      value: formatNumber(data.newCustomersThisMonth),
      subtitle: 'ce mois',
      icon: 'account-plus',
      gradientColors: ['#EC4899', '#DB2777', '#BE185D'] as [string, string, string],
    },
    {
      title: 'Marchandises',
      value: formatNumber(data.goodsInTransit),
      subtitle: 'en transit',
      icon: 'package-variant-closed',
      gradientColors: ['#06B6D4', '#0891B2', '#0E7490'] as [string, string, string],
    },
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
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            gradientColors={kpi.gradientColors}
          />
        ))}
      </View>
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardContainer: {
    width: (SCREEN_WIDTH - 56) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
    minHeight: 120,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  skeletonCard: {
    width: (SCREEN_WIDTH - 56) / 2,
    height: 120,
    borderRadius: 16,
  },
});

export default KPICards;
