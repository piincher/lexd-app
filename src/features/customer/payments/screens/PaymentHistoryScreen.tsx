/**
 * Payment History Screen
 * Displays customer's payment history with filtering
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  ActivityIndicator,
  Chip,
  Menu,
  Divider,
  Button,
  useTheme,
  Portal,
  Dialog,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { useGetPaymentHistory } from '../hooks/usePayments';
import { Payment, PaymentStatus, PAYMENT_STATUS_LABELS, PAYMENT_METHODS } from '../types';
import { PaymentStatusBadge } from '../components';

type PaymentHistoryScreenProps = RootStackScreenProps<'PaymentHistory'>;

type FilterStatus = 'ALL' | PaymentStatus;

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
  { label: 'Tous', value: 'ALL' },
  { label: 'Payés', value: 'COMPLETED' },
  { label: 'En attente', value: 'PENDING' },
  { label: 'Échoués', value: 'FAILED' },
];

const PaymentHistoryScreen: React.FC<PaymentHistoryScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('ALL');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailDialogVisible, setDetailDialogVisible] = useState(false);

  const filters = statusFilter === 'ALL' ? undefined : { status: statusFilter };

  const {
    data: payments,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetPaymentHistory(filters);

  const formatCurrency = (amount: number, currency: string = 'XOF'): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    } catch {
      return dateString;
    };
  };

  const getPaymentMethodLabel = (method: string): string => {
    const config = PAYMENT_METHODS.find((m) => m.id === method);
    return config?.label || method;
  };

  const getPaymentMethodIcon = (method: string): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    switch (method) {
      case 'ORANGE_MONEY':
        return 'cellphone';
      case 'WAVE':
        return 'wave';
      case 'CARD':
        return 'credit-card';
      default:
        return 'cash';
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleFilterChange = (value: FilterStatus) => {
    setStatusFilter(value);
    setMenuVisible(false);
  };

  const handlePaymentPress = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailDialogVisible(true);
  };

  const renderPaymentItem: ListRenderItem<Payment> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePaymentPress(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.paymentCard}>
        <Card.Content>
          <View style={styles.paymentHeader}>
            <View style={styles.paymentInfo}>
              <MaterialCommunityIcons
                name={getPaymentMethodIcon(item.paymentMethod)}
                size={20}
                color={theme.colors.primary}
                style={styles.paymentIcon}
              />
              <View>
                <Text style={styles.paymentId}>{item.paymentId}</Text>
                <Text style={styles.paymentMethod}>
                  {getPaymentMethodLabel(item.paymentMethod)}
                </Text>
              </View>
            </View>
            <PaymentStatusBadge status={item.status} size="small" />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.paymentDetails}>
            <View>
              <Text style={styles.amountLabel}>Montant</Text>
              <Text style={styles.amount}>
                {formatCurrency(item.amount, item.currency)}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Date</Text>
              <Text style={styles.date}>
                {item.paidAt ? formatDate(item.paidAt) : formatDate(item.createdAt)}
              </Text>
            </View>
          </View>

          {item.goods && item.goods.length > 0 && (
            <View style={styles.goodsContainer}>
              <Text style={styles.goodsLabel}>
                {item.goods.length} article{item.goods.length > 1 ? 's' : ''} payé
                {item.goods.length > 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="receipt-text-outline"
        size={80}
        color={Theme.neutral[300]}
      />
      <Text style={styles.emptyTitle}>Aucun paiement</Text>
      <Text style={styles.emptySubtitle}>
        {statusFilter === 'ALL'
          ? "Vous n'avez effectué aucun paiement pour le moment."
          : `Aucun paiement ${PAYMENT_STATUS_LABELS[statusFilter].toLowerCase()}.`}
      </Text>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('PaymentPortal')}
        style={styles.payButton}
        icon="credit-card-plus"
      >
        Effectuer un paiement
      </Button>
    </View>
  );

  const renderFilterChip = () => {
    const selectedLabel = FILTER_OPTIONS.find((o) => o.value === statusFilter)?.label;
    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Chip
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.filterChip}
            icon="filter-variant"
          >
            {selectedLabel}
          </Chip>
        }
      >
        {FILTER_OPTIONS.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => handleFilterChange(option.value)}
            title={option.label}
            trailingIcon={statusFilter === option.value ? 'check' : undefined}
          />
        ))}
      </Menu>
    );
  };

  const renderDetailDialog = () => {
    if (!selectedPayment) return null;

    return (
      <Portal>
        <Dialog
          visible={detailDialogVisible}
          onDismiss={() => setDetailDialogVisible(false)}
          style={styles.detailDialog}
        >
          <Dialog.Title>Détails du paiement</Dialog.Title>
          <Dialog.Content>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Référence</Text>
              <Text style={styles.detailValue}>{selectedPayment.paymentId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Statut</Text>
              <PaymentStatusBadge status={selectedPayment.status} size="small" />
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Méthode</Text>
              <Text style={styles.detailValue}>
                {getPaymentMethodLabel(selectedPayment.paymentMethod)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Montant</Text>
              <Text style={[styles.detailValue, styles.detailAmount]}>
                {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {selectedPayment.paidAt
                  ? formatDate(selectedPayment.paidAt)
                  : formatDate(selectedPayment.createdAt)}
              </Text>
            </View>
            {selectedPayment.transactionReference && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Réf. transaction</Text>
                <Text style={styles.detailValue}>
                  {selectedPayment.transactionReference}
                </Text>
              </View>
            )}

            {selectedPayment.goods && selectedPayment.goods.length > 0 && (
              <>
                <Divider style={styles.detailDivider} />
                <Text style={styles.goodsTitle}>Articles payés</Text>
                {selectedPayment.goods.map((goods, index) => (
                  <View key={index} style={styles.goodsItem}>
                    <MaterialCommunityIcons
                      name="package-variant"
                      size={16}
                      color={Theme.neutral[400]}
                    />
                    <Text style={styles.goodsText} numberOfLines={1}>
                      {goods.goodsId} - {goods.description}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDetailDialogVisible(false)}>Fermer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Historique des paiements" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Chargement de l'historique...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Historique des paiements" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || "Impossible de charger l'historique des paiements."}
          </Text>
          <Button mode="contained" onPress={handleRefresh} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Historique des paiements" />
      </Appbar.Header>

      <View style={styles.filterContainer}>{renderFilterChip()}</View>

      {payments?.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={payments}
          renderItem={renderPaymentItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {renderDetailDialog()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: Theme.neutral[500],
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
  },
  filterChip: {
    borderRadius: Theme.radius.md,
  },
  listContent: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xs,
    gap: Theme.spacing.md,
  },
  paymentCard: {
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    marginRight: Theme.spacing.sm,
  },
  paymentId: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  paymentMethod: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  divider: {
    marginVertical: Theme.spacing.sm,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
  },
  amount: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
    marginTop: 2,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
  },
  date: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: Theme.neutral[700],
    marginTop: 2,
  },
  goodsContainer: {
    marginTop: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  goodsLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[700],
    marginTop: Theme.spacing.lg,
  },
  emptySubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
  payButton: {
    marginTop: Theme.spacing.lg,
  },
  detailDialog: {
    borderRadius: Theme.radius.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  detailLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  detailValue: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: Theme.neutral[800],
  },
  detailAmount: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.primary[600],
  },
  detailDivider: {
    marginVertical: Theme.spacing.md,
  },
  goodsTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  goodsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  goodsText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Theme.neutral[600],
    marginLeft: Theme.spacing.sm,
    flex: 1,
  },
});

export default PaymentHistoryScreen;
