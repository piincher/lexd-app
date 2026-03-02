/**
 * CustomerAnalyticsScreen
 * Customer spending analysis and history
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  Button,
  useTheme,
  ActivityIndicator,
  Avatar,
  Searchbar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '@src/constants/Theme';

import {
  useGetTopCustomers,
  useGetCustomerAnalytics,
  useFormatCurrency,
} from '../hooks/useReports';
import { RevenueChart } from '../components';
import { CustomerAnalytics, CustomerInvoice, CustomerPayment } from '../types';

// ============================================
// CUSTOMER LIST ITEM
// ============================================

const CustomerListItem: React.FC<{
  customer: CustomerAnalytics;
  isSelected: boolean;
  onPress: () => void;
}> = ({ customer, isSelected, onPress }) => {
  const formatCurrency = useFormatCurrency();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity
      style={[styles.listItem, isSelected && styles.listItemSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Avatar.Text
        size={36}
        label={getInitials(customer.name)}
        style={[
          styles.listAvatar,
          { backgroundColor: isSelected ? '#FFFFFF' : Theme.colors?.primary || '#8B5CF6' },
        ]}
        color={isSelected ? Theme.colors?.primary || '#8B5CF6' : '#FFFFFF'}
      />
      <View style={styles.listItemInfo}>
        <Text
          style={[styles.listItemName, isSelected && styles.listItemTextSelected]}
          numberOfLines={1}
        >
          {customer.name}
        </Text>
        <Text
          style={[styles.listItemPhone, isSelected && styles.listItemSubtextSelected]}
        >
          {customer.phone || 'N/A'}
        </Text>
      </View>
      <View style={styles.listItemAmount}>
        <Text
          style={[
            styles.listItemRevenue,
            isSelected && styles.listItemTextSelected,
          ]}
        >
          {formatCurrency(customer.totalRevenue)}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isSelected
                ? 'rgba(255,255,255,0.2)'
                : customer.outstandingBalance > 0
                ? '#EF444420'
                : '#10B98120',
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: isSelected
                  ? '#FFFFFF'
                  : customer.outstandingBalance > 0
                  ? '#EF4444'
                  : '#10B981',
              },
            ]}
          >
            {customer.outstandingBalance > 0 ? 'Dû' : 'OK'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// INVOICE ITEM
// ============================================

const InvoiceItem: React.FC<{ invoice: CustomerInvoice }> = ({ invoice }) => {
  const formatCurrency = useFormatCurrency();

  const statusColors = {
    paid: { bg: '#10B98120', text: '#10B981' },
    pending: { bg: '#F59E0B20', text: '#F59E0B' },
    overdue: { bg: '#EF444420', text: '#EF4444' },
  };

  const statusLabels = {
    paid: 'Payée',
    pending: 'En attente',
    overdue: 'En retard',
  };

  const status = statusColors[invoice.status];

  return (
    <View style={styles.invoiceItem}>
      <View style={styles.invoiceIcon}>
        <MaterialCommunityIcons
          name="file-document"
          size={20}
          color={Theme.colors?.primary || '#8B5CF6'}
        />
      </View>
      <View style={styles.invoiceInfo}>
        <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
        <Text style={styles.invoiceDate}>
          {new Date(invoice.issuedAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      <View style={styles.invoiceAmount}>
        <Text style={styles.invoiceValue}>{formatCurrency(invoice.amount)}</Text>
        <View style={[styles.invoiceStatus, { backgroundColor: status.bg }]}>
          <Text style={[styles.invoiceStatusText, { color: status.text }]}>
            {statusLabels[invoice.status]}
          </Text>
        </View>
      </View>
    </View>
  );
};

// ============================================
// PAYMENT ITEM
// ============================================

const PaymentItem: React.FC<{ payment: CustomerPayment }> = ({ payment }) => {
  const formatCurrency = useFormatCurrency();

  const methodIcons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
    balance: 'wallet',
    card: 'credit-card',
    mobile_money: 'cellphone',
    cash: 'cash',
  };

  const methodLabels: Record<string, string> = {
    balance: 'Solde',
    card: 'Carte',
    mobile_money: 'Mobile Money',
    cash: 'Espèces',
  };

  return (
    <View style={styles.paymentItem}>
      <View style={styles.paymentIcon}>
        <MaterialCommunityIcons
          name={methodIcons[payment.method] || 'cash'}
          size={20}
          color="#10B981"
        />
      </View>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentMethod}>{methodLabels[payment.method] || payment.method}</Text>
        <Text style={styles.paymentDate}>
          {new Date(payment.paidAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      <Text style={styles.paymentAmount}>{formatCurrency(payment.amount)}</Text>
    </View>
  );
};

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

export const CustomerAnalyticsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const formatCurrency = useFormatCurrency();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Queries
  const { data: topCustomers, isLoading: isLoadingList, refetch: refetchList } = useGetTopCustomers(20);

  const { data: customerDetails, isLoading: isLoadingDetails } = useGetCustomerAnalytics(selectedCustomerId);

  // Filter customers based on search
  const filteredCustomers = (topCustomers || []).filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.includes(searchQuery)
  );

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetchList();
    setRefreshing(false);
  };

  // Transform spending trend for chart
  const getSpendingTrendData = (customer: CustomerAnalytics | undefined) => {
    if (!customer) return [];
    return customer.spendingTrend.map((trend) => ({
      date: trend.month,
      revenue: trend.amount,
      expenses: 0,
    }));
  };

  const currentCustomer = customerDetails || filteredCustomers[0];

  // Loading state
  if (isLoadingList) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Analyse Clients" />
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
        <Appbar.Content title="Analyse Clients" />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Customer List (Left Panel) */}
        <View style={styles.listPanel}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Rechercher..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              inputStyle={styles.searchInput}
            />
          </View>
          <FlatList
            data={filteredCustomers}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <CustomerListItem
                customer={item}
                isSelected={currentCustomer?.userId === item.userId}
                onPress={() => setSelectedCustomerId(item.userId)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>Aucun client trouvé</Text>
              </View>
            }
          />
        </View>

        {/* Detail Panel (Right Panel) */}
        <ScrollView
          style={styles.detailPanel}
          showsVerticalScrollIndicator={false}
        >
          {currentCustomer ? (
            <>
              {/* Customer Header */}
              <Card style={styles.headerCard}>
                <Card.Content>
                  <View style={styles.customerHeader}>
                    <Avatar.Text
                      size={60}
                      label={currentCustomer.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      style={{ backgroundColor: theme.colors.primary }}
                      color="#FFFFFF"
                    />
                    <View style={styles.customerInfo}>
                      <Text style={styles.customerName}>{currentCustomer.name}</Text>
                      <Text style={styles.customerContact}>
                        {currentCustomer.phone || 'N/A'}
                      </Text>
                      {currentCustomer.email && (
                        <Text style={styles.customerContact}>{currentCustomer.email}</Text>
                      )}
                    </View>
                  </View>
                </Card.Content>
              </Card>

              {/* Key Stats */}
              <Card style={styles.statsCard}>
                <Card.Content>
                  <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>
                        {formatCurrency(currentCustomer.totalRevenue)}
                      </Text>
                      <Text style={styles.statLabel}>Revenus Total</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>
                        {formatCurrency(currentCustomer.averageOrderValue)}
                      </Text>
                      <Text style={styles.statLabel}>Panier Moyen</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>
                        {currentCustomer.totalInvoices}
                      </Text>
                      <Text style={styles.statLabel}>Factures</Text>
                    </View>
                  </View>

                  <View style={styles.balanceRow}>
                    <View style={styles.balanceItem}>
                      <MaterialCommunityIcons name="alert-circle" size={20} color="#EF4444" />
                      <Text style={styles.balanceLabel}>Solde Dû:</Text>
                      <Text style={[styles.balanceValue, { color: '#EF4444' }]}>
                        {formatCurrency(currentCustomer.outstandingBalance)}
                      </Text>
                    </View>
                    <View style={styles.balanceItem}>
                      <MaterialCommunityIcons name="clock-alert" size={20} color="#F59E0B" />
                      <Text style={styles.balanceLabel}>En Retard:</Text>
                      <Text style={[styles.balanceValue, { color: '#F59E0B' }]}>
                        {currentCustomer.overdueInvoices}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              {/* Spending Trend */}
              {customerDetails?.spendingTrend && customerDetails.spendingTrend.length > 0 && (
                <Card style={styles.chartCard}>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Tendance de Dépenses</Text>
                    <RevenueChart
                      data={getSpendingTrendData(customerDetails)}
                      height={200}
                    />
                  </Card.Content>
                </Card>
              )}

              {/* Invoice History */}
              {customerDetails?.invoiceHistory && customerDetails.invoiceHistory.length > 0 && (
                <Card style={styles.listCard}>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Historique des Factures</Text>
                    {customerDetails.invoiceHistory.slice(0, 5).map((invoice) => (
                      <InvoiceItem key={invoice.invoiceId} invoice={invoice} />
                    ))}
                    {customerDetails.invoiceHistory.length > 5 && (
                      <Button mode="text" style={styles.viewMoreButton}>
                        Voir tout ({customerDetails.invoiceHistory.length})
                      </Button>
                    )}
                  </Card.Content>
                </Card>
              )}

              {/* Payment History */}
              {customerDetails?.paymentHistory && customerDetails.paymentHistory.length > 0 && (
                <Card style={styles.listCard}>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Historique des Paiements</Text>
                    {customerDetails.paymentHistory.slice(0, 5).map((payment) => (
                      <PaymentItem key={payment.paymentId} payment={payment} />
                    ))}
                    {customerDetails.paymentHistory.length > 5 && (
                      <Button mode="text" style={styles.viewMoreButton}>
                        Voir tout ({customerDetails.paymentHistory.length})
                      </Button>
                    )}
                  </Card.Content>
                </Card>
              )}

              {/* Customer Since */}
              <Text style={styles.customerSince}>
                Client depuis: {new Date(currentCustomer.firstOrderDate).toLocaleDateString('fr-FR')}
              </Text>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="account-off" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Sélectionnez un client</Text>
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
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: Theme.neutral[200],
  },
  searchContainer: {
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  searchBar: {
    height: 40,
    elevation: 0,
    backgroundColor: Theme.neutral[100],
  },
  searchInput: {
    fontSize: 14,
    minHeight: 0,
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
  listAvatar: {
    marginRight: Theme.spacing.sm,
  },
  listItemInfo: {
    flex: 1,
  },
  listItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  listItemTextSelected: {
    color: '#FFFFFF',
  },
  listItemPhone: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  listItemSubtextSelected: {
    color: 'rgba(255,255,255,0.7)',
  },
  listItemAmount: {
    alignItems: 'flex-end',
  },
  listItemRevenue: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  emptyList: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  emptyListText: {
    color: Theme.neutral[500],
    fontSize: 14,
  },
  // Detail Panel
  detailPanel: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  headerCard: {
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerInfo: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  customerName: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  customerContact: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: 2,
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
    paddingVertical: Theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
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
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  balanceLabel: {
    fontSize: 13,
    color: Theme.neutral[600],
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: '700',
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
  listCard: {
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    elevation: 2,
  },
  // Invoice Item
  invoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  invoiceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  invoiceDate: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  invoiceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  invoiceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  invoiceStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  // Payment Item
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  paymentDate: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  viewMoreButton: {
    marginTop: Theme.spacing.sm,
  },
  customerSince: {
    textAlign: 'center',
    color: Theme.neutral[500],
    fontSize: 12,
    marginTop: Theme.spacing.lg,
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

export default CustomerAnalyticsScreen;
