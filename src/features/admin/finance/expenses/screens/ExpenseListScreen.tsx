import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, FAB, Searchbar, Chip, useTheme, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { showMessage } from 'react-native-flash-message';

import { ExpenseCard } from '../components/ExpenseCard';
import { ExpenseMiniSummary } from '../components/ExpenseSummaryCard';
import { ExpenseTypeIcon } from '../components/ExpenseTypeIcon';
import { 
  useGetExpenses, 
  useGetExpenseSummary, 
  useApproveExpense,
  useGetExpensesInfinite 
} from '../hooks/useExpenses';
import type { Expense, ExpenseType, ExpenseFilters } from '../types';
import { EXPENSE_TYPE_CONFIG, EXPENSE_STATUS_CONFIG } from '../types';
import type { AdminFinanceStackParamList } from '@src/navigations/type';

type NavigationProp = NativeStackNavigationProp<AdminFinanceStackParamList, 'ExpenseList'>;

const EXPENSE_TYPES: ExpenseType[] = ['FUEL', 'CUSTOMS', 'WAREHOUSE', 'TRANSPORT', 'INSURANCE', 'MAINTENANCE', 'SALARIES', 'UTILITIES', 'OTHER'];

export const ExpenseListScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ExpenseType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filters: ExpenseFilters = {
    ...(selectedType && { type: selectedType }),
    ...(selectedStatus && { status: selectedStatus as any }),
  };

  const { 
    data: expensesData, 
    isLoading, 
    refetch, 
    isRefetching 
  } = useGetExpenses({ ...filters, limit: 50 });

  const { data: summaryData } = useGetExpenseSummary({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
  });

  const approveMutation = useApproveExpense();

  const handleExpensePress = (expense: Expense) => {
    navigation.navigate('ExpenseDetail', { expenseId: expense._id });
  };

  const handleApprove = (expense: Expense) => {
    approveMutation.mutate(expense._id);
  };

  const handleCreateExpense = () => {
    navigation.navigate('CreateExpense');
  };

  const handleViewSummary = () => {
    navigation.navigate('ExpenseSummary');
  };

  const expenses = expensesData?.data || [];
  const pendingCount = expenses.filter(e => e.status === 'PENDING').length;

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="receipt-text-outline" size={64} color="#D1D5DB" />
      <Text variant="titleMedium" style={styles.emptyTitle}>
        Aucune dépense trouvée
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubtitle}>
        Commencez par ajouter une nouvelle dépense
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Summary */}
      <TouchableOpacity onPress={handleViewSummary}>
        <ExpenseMiniSummary
          total={summaryData?.totalExpenses || 0}
          count={expenses.length}
          pendingCount={pendingCount}
        />
      </TouchableOpacity>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher une dépense..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />
        <TouchableOpacity
          style={[styles.filterButton, showFilters && { backgroundColor: theme.colors.primary + '20' }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={showFilters ? theme.colors.primary : '#6B7280'}
          />
        </TouchableOpacity>
      </View>

      {/* Type Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text variant="bodySmall" style={styles.filterLabel}>
            Type de dépense
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={EXPENSE_TYPES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Chip
                selected={selectedType === item}
                onPress={() => setSelectedType(selectedType === item ? null : item)}
                style={[
                  styles.typeChip,
                  selectedType === item && { backgroundColor: EXPENSE_TYPE_CONFIG[item].color + '30' }
                ]}
                textStyle={selectedType === item ? { color: EXPENSE_TYPE_CONFIG[item].color } : undefined}
                icon={() => (
                  <MaterialCommunityIcons
                    name={EXPENSE_TYPE_CONFIG[item].icon as any}
                    size={16}
                    color={selectedType === item ? EXPENSE_TYPE_CONFIG[item].color : '#6B7280'}
                  />
                )}
              >
                {EXPENSE_TYPE_CONFIG[item].label}
              </Chip>
            )}
            contentContainerStyle={styles.typeList}
          />

          <Text variant="bodySmall" style={styles.filterLabel}>
            Statut
          </Text>
          <View style={styles.statusContainer}>
            {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((status) => (
              <Chip
                key={status}
                selected={selectedStatus === status}
                onPress={() => setSelectedStatus(selectedStatus === status ? null : status)}
                style={[
                  styles.statusChip,
                  selectedStatus === status && { backgroundColor: EXPENSE_STATUS_CONFIG[status].color + '30' }
                ]}
                textStyle={selectedStatus === status ? { color: EXPENSE_STATUS_CONFIG[status].color } : undefined}
              >
                {EXPENSE_STATUS_CONFIG[status].label}
              </Chip>
            ))}
          </View>
        </View>
      )}

      {/* Expenses List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ExpenseCard
              expense={item}
              onPress={handleExpensePress}
              onApprove={handleApprove}
            />
          )}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}

      {/* FAB */}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreateExpense}
        label="Nouvelle dépense"
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    elevation: 0,
    backgroundColor: '#fff',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterLabel: {
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '600',
  },
  typeList: {
    gap: 8,
  },
  typeChip: {
    marginRight: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusChip: {
    flex: 1,
  },
  list: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    marginTop: 16,
    color: '#374151',
    fontWeight: '600',
  },
  emptySubtitle: {
    marginTop: 8,
    color: '#9CA3AF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
});
