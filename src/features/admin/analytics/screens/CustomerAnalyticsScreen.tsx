/**
 * Customer Analytics Screen
 * Detailed customer analysis including cohorts, LTV, and retention
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
  Avatar,
  useTheme,
  Searchbar,
  Chip,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  useGetTopCustomers,
  useFormatCurrency,
  useFormatNumber,
} from '../hooks/useAnalytics';
import { TopCustomersChart } from '../components';
import { DateRangePicker, DateRange } from '@src/components/DateRangePicker';

// ============================================
// MAIN COMPONENT
// ============================================

export const CustomerAnalyticsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const formatCurrency = useFormatCurrency();
  const formatNumber = useFormatNumber();

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'returning' | 'new'>('all');

  // Calculate period in days
  const periodDays = Math.ceil(
    (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Query
  const {
    data: customerData,
    isLoading,
    refetch,
  } = useGetTopCustomers({
    limit: 50,
    period: `${periodDays}d`,
  });

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Date range handler
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setDatePickerVisible(false);
  };

  // Filter customers
  const filteredCustomers = customerData?.customers.filter((customer) => {
    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phoneNumber?.includes(searchQuery);

    // Type filter
    let matchesFilter = true;
    if (selectedFilter === 'returning') {
      matchesFilter = customer.retention.isReturning;
    } else if (selectedFilter === 'new') {
      matchesFilter = !customer.retention.isReturning;
    }

    return matchesSearch && matchesFilter;
  });

  // Calculate metrics
  const totalCustomers = filteredCustomers?.length || 0;
  const returningCustomers = filteredCustomers?.filter((c) => c.retention.isReturning).length || 0;
  const newCustomers = totalCustomers - returningCustomers;
  const totalRevenue = filteredCustomers?.reduce((sum, c) => sum + c.totalRevenueFCFA, 0) || 0;
  const avgRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
  const retentionRate = totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;

  // Get customer initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get avatar color
  const getAvatarColor = (index: number) => {
    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Analytics Clients" />
        <Appbar.Action icon="calendar" onPress={() => setDatePickerVisible(true)} />
        <Appbar.Action icon="filter" onPress={() => {}} />
      </Appbar.Header>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher un client..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
            selectedColor="#3B82F6"
          >
            Tous ({totalCustomers})
          </Chip>
          <Chip
            selected={selectedFilter === 'returning'}
            onPress={() => setSelectedFilter('returning')}
            style={styles.filterChip}
            selectedColor="#10B981"
          >
            Fidèles ({returningCustomers})
          </Chip>
          <Chip
            selected={selectedFilter === 'new'}
            onPress={() => setSelectedFilter('new')}
            style={styles.filterChip}
            selectedColor="#F59E0B"
          >
            Nouveaux ({newCustomers})
          </Chip>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="account-group" size={24} color="#3B82F6" />
              <Text style={styles.summaryValue}>{formatNumber(totalCustomers)}</Text>
              <Text style={styles.summaryLabel}>Total Clients</Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#10B981" />
              <Text style={styles.summaryValue}>{formatCurrency(totalRevenue)}</Text>
              <Text style={styles.summaryLabel}>Revenu Total</Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="account-check" size={24} color="#8B5CF6" />
              <Text style={styles.summaryValue}>{retentionRate.toFixed(1)}%</Text>
              <Text style={styles.summaryLabel}>Rétention</Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content>
              <MaterialCommunityIcons name="trending-up" size={24} color="#F59E0B" />
              <Text style={styles.summaryValue}>{formatCurrency(avgRevenue)}</Text>
              <Text style={styles.summaryLabel}>Panier Moyen</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Top Customers Chart */}
        {customerData && (
          <TopCustomersChart
            customers={filteredCustomers || []}
            maxItems={10}
          />
        )}

        {/* Customer List */}
        <Card style={styles.listCard}>
          <Card.Content>
            <Text style={styles.listTitle}>Liste des Clients</Text>
            
            {filteredCustomers?.map((customer, index) => (
              <TouchableOpacity
                key={customer.userId}
                style={styles.customerRow}
                onPress={() => {
                  // Navigate to customer detail
                  // navigation.navigate('CustomerDetail', { customerId: customer.userId });
                }}
              >
                <View style={styles.customerInfo}>
                  <Avatar.Text
                    size={40}
                    label={getInitials(customer.name)}
                    style={{ backgroundColor: getAvatarColor(index) }}
                    labelStyle={{ fontSize: 14, fontWeight: '600' }}
                  />
                  <View style={styles.customerDetails}>
                    <Text style={styles.customerName}>{customer.name}</Text>
                    <Text style={styles.customerPhone}>
                      {customer.phoneNumber || 'Pas de téléphone'}
                    </Text>
                    <View style={styles.customerStats}>
                      <Chip compact style={styles.customerChip}>
                        {customer.transactionCount} trans.
                      </Chip>
                      <Chip compact style={styles.customerChip}>
                        {customer.goodsStats.totalGoods} march.
                      </Chip>
                      {customer.retention.isReturning && (
                        <Chip
                          compact
                          style={[styles.customerChip, styles.returningChip]}
                          textStyle={{ color: '#059669' }}
                        >
                          Fidèle
                        </Chip>
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.customerRevenue}>
                  <Text style={styles.revenueValue}>
                    {formatCurrency(customer.totalRevenueFCFA)}
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))}

            {filteredCustomers?.length === 0 && (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="account-off" size={48} color="#9CA3AF" />
                <Text style={styles.emptyText}>Aucun client trouvé</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Date Range Picker */}
      <DateRangePicker
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        onConfirm={handleDateRangeChange}
        initialRange={dateRange}
      />
    </SafeAreaView>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F3F4F6',
  },
  filterContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  listCard: {
    marginTop: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  customerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  customerPhone: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  customerStats: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  customerChip: {
    height: 24,
    backgroundColor: '#F3F4F6',
  },
  returningChip: {
    backgroundColor: '#DCFCE7',
  },
  customerRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default CustomerAnalyticsScreen;
