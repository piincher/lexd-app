import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Card, Chip, useTheme, Button, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns';
import { fr } from 'date-fns/locale';

import { ExpenseSummaryCard } from '../components/ExpenseSummaryCard';
import { ExpenseCard } from '../components/ExpenseCard';
import { useGetExpenseSummary, useGetExpenses, useApproveExpense } from '../hooks/useExpenses';
import { EXPENSE_TYPE_CONFIG } from '../types';
import type { Expense, ExpenseType } from '../types';
import { formatCurrency } from '@src/shared/lib/currency';
import type { AdminFinanceStackParamList } from '@src/navigations/type';

type NavigationProp = NativeStackNavigationProp<AdminFinanceStackParamList, 'ExpenseSummary'>;

type PeriodType = 'this_month' | 'last_month' | 'this_year' | 'custom';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PeriodOption {
  value: PeriodType;
  label: string;
  getDates: () => { startDate: string; endDate: string };
}

const PERIOD_OPTIONS: PeriodOption[] = [
  {
    value: 'this_month',
    label: 'Ce mois',
    getDates: () => ({
      startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
    }),
  },
  {
    value: 'last_month',
    label: 'Mois dernier',
    getDates: () => {
      const lastMonth = subMonths(new Date(), 1);
      return {
        startDate: format(startOfMonth(lastMonth), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(lastMonth), 'yyyy-MM-dd'),
      };
    },
  },
  {
    value: 'this_year',
    label: 'Cette année',
    getDates: () => ({
      startDate: format(startOfYear(new Date()), 'yyyy-MM-dd'),
      endDate: format(endOfYear(new Date()), 'yyyy-MM-dd'),
    }),
  },
];

export const ExpenseSummaryScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('this_month');
  const [selectedType, setSelectedType] = useState<ExpenseType | null>(null);

  const currentPeriod = PERIOD_OPTIONS.find(p => p.value === selectedPeriod) || PERIOD_OPTIONS[0];
  const dateRange = currentPeriod.getDates();

  const { data: summary, isLoading: summaryLoading } = useGetExpenseSummary(dateRange);
  const { data: expensesData, isLoading: expensesLoading } = useGetExpenses({
    ...dateRange,
    limit: 10,
  });
  const approveMutation = useApproveExpense();

  const expenses = expensesData?.data || [];

  const typeBreakdown = (() => {
    if (!summary?.byType) return [];
    return Object.entries(summary.byType)
      .map(([type, amount]) => ({
        type: type as ExpenseType,
        amount,
        percentage: summary.totalExpenses > 0 ? (amount / summary.totalExpenses) * 100 : 0,
      }))
      .filter(item => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  })();

  const handleExpensePress = (expense: Expense) => {
    navigation.navigate('ExpenseDetail', { expenseId: expense._id });
  };

  const handleViewAll = () => {
    navigation.navigate('ExpenseList');
  };

  const isLoading = summaryLoading || expensesLoading;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Résumé des dépenses
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.periodList}>
          {PERIOD_OPTIONS.map((period) => (
            <Chip
              key={period.value}
              selected={selectedPeriod === period.value}
              onPress={() => setSelectedPeriod(period.value)}
              style={[
                styles.periodChip,
                selectedPeriod === period.value && { backgroundColor: theme.colors.primary + '20' }
              ]}
              textStyle={selectedPeriod === period.value ? { color: theme.colors.primary } : undefined}
            >
              {period.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Total Card */}
          <Card style={styles.totalCard}>
            <Card.Content style={styles.totalContent}>
              <MaterialCommunityIcons name="cash-remove" size={32} color="#EF4444" />
              <View style={styles.totalTextContainer}>
                <Text variant="bodyMedium" style={styles.totalLabel}>
                  Total des dépenses
                </Text>
                <Text variant="headlineMedium" style={styles.totalAmount}>
                  {formatCurrency(summary?.totalExpenses || 0)}
                </Text>
                <Text variant="bodySmall" style={styles.totalPeriod}>
                  {currentPeriod.label}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Expenses by Type */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Par catégorie
            </Text>
            <Card style={styles.breakdownCard}>
              <Card.Content>
                {typeBreakdown.length === 0 ? (
                  <View style={styles.emptyBreakdown}>
                    <MaterialCommunityIcons name="chart-pie" size={48} color="#D1D5DB" />
                    <Text variant="bodyMedium" style={styles.emptyText}>
                      Aucune dépense pour cette période
                    </Text>
                  </View>
                ) : (
                  <View style={styles.breakdownList}>
                    {typeBreakdown.map((item) => {
                      const config = EXPENSE_TYPE_CONFIG[item.type];
                      return (
                        <TouchableOpacity
                          key={item.type}
                          style={[
                            styles.breakdownItem,
                            selectedType === item.type && { backgroundColor: config.color + '10' }
                          ]}
                          onPress={() => setSelectedType(selectedType === item.type ? null : item.type)}
                        >
                          <View style={[styles.breakdownIcon, { backgroundColor: config.color + '20' }]}>
                            <MaterialCommunityIcons name={config.icon as any} size={20} color={config.color} />
                          </View>
                          <View style={styles.breakdownInfo}>
                            <Text variant="bodyMedium" style={styles.breakdownLabel}>
                              {config.label}
                            </Text>
                            <View style={styles.progressBarContainer}>
                              <View
                                style={[
                                  styles.progressBar,
                                  { width: `${Math.min(item.percentage, 100)}%`, backgroundColor: config.color }
                                ]}
                              />
                            </View>
                          </View>
                          <View style={styles.breakdownAmount}>
                            <Text variant="bodyMedium" style={styles.breakdownValue}>
                              {formatCurrency(item.amount)}
                            </Text>
                            <Text variant="bodySmall" style={styles.breakdownPercent}>
                              {(item.percentage || 0).toFixed(1)}%
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </Card.Content>
            </Card>
          </View>

          {/* By Container */}
          {summary?.byContainer && summary.byContainer.length > 0 && (
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Par conteneur
              </Text>
              <Card style={styles.containerCard}>
                <Card.Content style={styles.containerList}>
                  {summary.byContainer.slice(0, 5).map((container, index) => (
                    <View key={container.containerId} style={styles.containerItem}>
                      <View style={styles.containerRank}>
                        <Text variant="bodySmall" style={styles.containerRankText}>
                          #{index + 1}
                        </Text>
                      </View>
                      <MaterialCommunityIcons name="cube" size={20} color="#6B7280" />
                      <Text variant="bodyMedium" style={styles.containerId}>
                        {container.containerId}
                      </Text>
                      <Text variant="bodyMedium" style={styles.containerAmount}>
                        {formatCurrency(container.total)}
                      </Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            </View>
          )}

          {/* Recent Expenses */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Dépenses récentes
              </Text>
              <Button mode="text" onPress={handleViewAll} compact>
                Voir tout
              </Button>
            </View>
            
            {expenses.length === 0 ? (
              <View style={styles.emptyRecent}>
                <MaterialCommunityIcons name="receipt-text-outline" size={48} color="#D1D5DB" />
                <Text variant="bodyMedium" style={styles.emptyText}>
                  Aucune dépense récente
                </Text>
              </View>
            ) : (
              expenses.map((expense) => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  onPress={handleExpensePress}
                  showActions={false}
                />
              ))
            )}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
  },
  periodContainer: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  periodList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  periodChip: {
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  totalCard: {
    marginBottom: 20,
    elevation: 2,
    backgroundColor: '#EF444410',
  },
  totalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  totalTextContainer: {
    flex: 1,
  },
  totalLabel: {
    color: '#6B7280',
  },
  totalAmount: {
    fontWeight: '700',
    color: '#EF4444',
    marginVertical: 4,
  },
  totalPeriod: {
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#374151',
  },
  breakdownCard: {
    elevation: 2,
  },
  emptyBreakdown: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 12,
    color: '#9CA3AF',
  },
  breakdownList: {
    gap: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    borderRadius: 8,
  },
  breakdownIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownInfo: {
    flex: 1,
  },
  breakdownLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  breakdownAmount: {
    alignItems: 'flex-end',
  },
  breakdownValue: {
    fontWeight: '600',
  },
  breakdownPercent: {
    color: '#9CA3AF',
  },
  containerCard: {
    elevation: 2,
  },
  containerList: {
    gap: 12,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  containerRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRankText: {
    fontWeight: '600',
    color: '#6B7280',
  },
  containerId: {
    flex: 1,
  },
  containerAmount: {
    fontWeight: '600',
  },
  emptyRecent: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  bottomSpacing: {
    height: 40,
  },
});
