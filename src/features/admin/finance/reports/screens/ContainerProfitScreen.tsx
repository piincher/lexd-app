/**
 * ContainerProfitScreen
 * Per-container profitability analysis
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  Button,
  useTheme,
  ActivityIndicator,
  Menu,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@src/constants/Theme';

import {
  useGetAllContainersProfitability,
  useGetContainerProfitability,
  useFormatCurrency,
  useFormatPercentage,
} from '../hooks/useReports';
import { ProfitMarginCard, PieChart } from '../components';
import { ContainerProfitability } from '../types';

// ============================================
// CONTAINER LIST ITEM
// ============================================

const ContainerListItem: React.FC<{
  container: ContainerProfitability;
  isSelected: boolean;
  onPress: () => void;
}> = ({ container, isSelected, onPress }) => {
  const formatCurrency = useFormatCurrency();
  const getProfitColor = (margin: number) => {
    if (margin >= 30) return '#10B981';
    if (margin >= 15) return '#3B82F6';
    if (margin >= 5) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <TouchableOpacity
      style={[styles.listItem, isSelected && styles.listItemSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.listItemIcon}>
        <MaterialCommunityIcons
          name="container"
          size={24}
          color={isSelected ? '#FFFFFF' : Theme.colors?.primary || '#8B5CF6'}
        />
      </View>
      <View style={styles.listItemInfo}>
        <Text
          style={[styles.listItemNumber, isSelected && styles.listItemTextSelected]}
          numberOfLines={1}
        >
          {container.containerNumber}
        </Text>
        <Text
          style={[styles.listItemLine, isSelected && styles.listItemSubtextSelected]}
        >
          {container.shippingLine}
        </Text>
      </View>
      <View style={styles.listItemStats}>
        <Text
          style={[
            styles.listItemProfit,
            { color: isSelected ? '#FFFFFF' : getProfitColor(container.profitMargin) },
          ]}
        >
          {formatCurrency(container.profit)}
        </Text>
        <View style={[styles.marginBadge, { backgroundColor: `${getProfitColor(container.profitMargin)}20` }]}>
          <Text style={[styles.marginBadgeText, { color: getProfitColor(container.profitMargin) }]}>
            {(container.profitMargin || 0).toFixed(1)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

export const ContainerProfitScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const formatCurrency = useFormatCurrency();
  const formatPercentage = useFormatPercentage();

  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Queries
  const {
    data: allContainers,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useGetAllContainersProfitability();

  const {
    data: selectedContainer,
    isLoading: isLoadingSelected,
  } = useGetContainerProfitability(selectedContainerId);

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchAll();
    setRefreshing(false);
  };

  // Get revenue sources data for pie chart
  const getRevenueData = (container: ContainerProfitability | undefined) => {
    if (!container) return [];
    return container.revenue.sources.map((source) => ({
      label: source.source === 'goods' ? 'Marchandises' :
             source.source === 'shipping' ? 'Expédition' :
             source.source === 'customs' ? 'Douanes' : 'Stockage',
      value: source.amount,
      color: source.source === 'goods' ? '#10B981' :
             source.source === 'shipping' ? '#3B82F6' :
             source.source === 'customs' ? '#F59E0B' : '#8B5CF6',
    }));
  };

  // Get expenses breakdown data for pie chart
  const getExpensesData = (container: ContainerProfitability | undefined) => {
    if (!container) return [];
    return container.expenses.breakdown.map((expense) => ({
      label: expense.type === 'shipping' ? 'Transport' :
             expense.type === 'handling' ? 'Manutention' :
             expense.type === 'customs' ? 'Douanes' :
             expense.type === 'storage' ? 'Stockage' :
             expense.type === 'insurance' ? 'Assurance' : 'Autre',
      value: expense.amount,
      color: expense.type === 'shipping' ? '#EF4444' :
             expense.type === 'handling' ? '#F59E0B' :
             expense.type === 'customs' ? '#8B5CF6' :
             expense.type === 'storage' ? '#3B82F6' :
             expense.type === 'insurance' ? '#10B981' : '#6B7280',
    }));
  };

  const currentContainer = selectedContainer || allContainers?.[0];
  const containers = allContainers || [];

  // Loading state
  if (isLoadingAll) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Rentabilité des Conteneurs" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Rentabilité des Conteneurs" />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Container List (Left Panel) */}
        <View style={styles.listPanel}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Conteneurs</Text>
            <Text style={styles.listCount}>{containers.length} total</Text>
          </View>
          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          >
            {containers.map((container) => (
              <ContainerListItem
                key={container.containerId}
                container={container}
                isSelected={currentContainer?.containerId === container.containerId}
                onPress={() => setSelectedContainerId(container.containerId)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Detail Panel (Right Panel) */}
        <ScrollView
          style={styles.detailPanel}
          showsVerticalScrollIndicator={false}
        >
          {currentContainer ? (
            <>
              {/* Profit Margin Card */}
              <ProfitMarginCard
                margin={currentContainer.profitMargin}
                revenue={currentContainer.revenue.total}
                profit={currentContainer.profit}
                size="large"
              />

              {/* Summary Stats */}
              <Card style={styles.statsCard}>
                <Card.Content>
                  <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="cash-plus" size={24} color="#10B981" />
                      <Text style={styles.statValue}>
                        {formatCurrency(currentContainer.revenue.total)}
                      </Text>
                      <Text style={styles.statLabel}>Revenus</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="cash-minus" size={24} color="#EF4444" />
                      <Text style={styles.statValue}>
                        {formatCurrency(currentContainer.expenses.total)}
                      </Text>
                      <Text style={styles.statLabel}>Dépenses</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="package-variant" size={24} color="#3B82F6" />
                      <Text style={styles.statValue}>{currentContainer.goodsCount}</Text>
                      <Text style={styles.statLabel}>Marchandises</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              {/* Revenue Sources */}
              <Card style={styles.chartCard}>
                <Card.Content>
                  <Text style={styles.sectionTitle}>Sources de Revenus</Text>
                  <PieChart
                    data={getRevenueData(currentContainer)}
                    height={180}
                  />
                </Card.Content>
              </Card>

              {/* Expenses Breakdown */}
              <Card style={styles.chartCard}>
                <Card.Content>
                  <Text style={styles.sectionTitle}>Répartition des Dépenses</Text>
                  <PieChart
                    data={getExpensesData(currentContainer)}
                    height={180}
                  />
                </Card.Content>
              </Card>

              {/* Comparison */}
              <Card style={styles.comparisonCard}>
                <Card.Content>
                  <Text style={styles.sectionTitle}>Comparaison</Text>
                  <View style={styles.comparisonStats}>
                    <View style={styles.comparisonItem}>
                      <Text style={styles.comparisonValue}>#{currentContainer.comparison.rank}</Text>
                      <Text style={styles.comparisonLabel}>Classement</Text>
                    </View>
                    <View style={styles.comparisonItem}>
                      <Text style={styles.comparisonValue}>
                        {formatPercentage(currentContainer.comparison.percentile)}
                      </Text>
                      <Text style={styles.comparisonLabel}>Percentile</Text>
                    </View>
                    <View style={styles.comparisonItem}>
                      <Text style={styles.comparisonValue}>
                        {formatCurrency(currentContainer.comparison.averageProfit)}
                      </Text>
                      <Text style={styles.comparisonLabel}>Moyenne</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="container-off" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Aucun conteneur sélectionné</Text>
            </View>
          )}
          
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  // List Panel
  listPanel: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: Theme.neutral[200],
  },
  listHeader: {
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  listCount: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  listItemSelected: {
    backgroundColor: Theme.colors?.primary || '#8B5CF6',
  },
  listItemIcon: {
    marginRight: Theme.spacing.sm,
  },
  listItemInfo: {
    flex: 1,
  },
  listItemNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  listItemTextSelected: {
    color: '#FFFFFF',
  },
  listItemLine: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  listItemSubtextSelected: {
    color: 'rgba(255,255,255,0.7)',
  },
  listItemStats: {
    alignItems: 'flex-end',
  },
  listItemProfit: {
    fontSize: 13,
    fontWeight: '700',
  },
  marginBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  marginBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  // Detail Panel
  detailPanel: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  statsCard: {
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.neutral[200],
  },
  chartCard: {
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  comparisonCard: {
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  comparisonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  comparisonItem: {
    alignItems: 'center',
  },
  comparisonValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  comparisonLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 4,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  emptyText: {
    marginTop: Theme.spacing.md,
    color: Theme.neutral[500],
  },
  // Center States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    color: Theme.neutral[500],
  },
  bottomSpacing: {
    height: Theme.spacing['4xl'],
  },
});

export default ContainerProfitScreen;
