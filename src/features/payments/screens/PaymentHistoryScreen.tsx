import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { PaymentHistorySkeleton } from '@src/features/payments/components/PaymentHistorySkeleton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePaymentHistory } from '../hooks/usePayments';
import { PaymentHistoryItem, PaymentStatus, PaymentProvider, PAYMENT_STATUS_COLORS, PAYMENT_STATUS_LABELS, PROVIDER_ICONS, PROVIDER_LABELS } from '../types';

const STATUS_FILTERS: { label: string; value: PaymentStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Failed', value: 'FAILED' },
];

const PaymentHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const [selectedFilter, setSelectedFilter] = useState<PaymentStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(1);

  const {
    payments,
    isLoading,
    error,
    refetch,
    loadMore,
    hasNextPage,
  } = usePaymentHistory({
    status: selectedFilter === 'ALL' ? undefined : selectedFilter,
    page,
    limit: 20,
  });

  const [refreshing, setRefreshing] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        backButton: {
          padding: 8,
        },
        headerTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        placeholder: {
          width: 40,
        },
        filterContainer: {
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        filterList: {
          paddingHorizontal: 16,
          gap: 8,
        },
        filterButton: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: colors.background.paper,
        },
        filterButtonActive: {
          backgroundColor: colors.primary.main,
        },
        filterButtonText: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        filterButtonTextActive: {
          color: colors.text.inverse,
        },
        listContent: {
          padding: 16,
          paddingBottom: 32,
          flexGrow: 1,
        },
        paymentCard: {
          backgroundColor: colors.background.card,
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        paymentHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        },
        providerInfo: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        providerIcon: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.primary.main + '10',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        providerName: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        paymentDate: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        statusBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
        },
        statusDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
          marginRight: 6,
        },
        statusText: {
          fontSize: 12,
          fontFamily: Fonts.medium,
        },
        paymentBody: {
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        amountContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        },
        amountLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        amount: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        detailRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 6,
        },
        detailText: {
          marginLeft: 6,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        paymentFooter: {
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        receiptButton: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        receiptText: {
          marginLeft: 6,
          fontSize: 13,
          fontFamily: Fonts.medium,
          color: colors.primary.main,
        },
        loaderContainer: {
          paddingVertical: 24,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 64,
        },
        emptyTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginTop: 16,
          marginBottom: 8,
        },
        emptyText: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          paddingHorizontal: 32,
        },
        errorContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 32,
        },
        errorTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.status.error,
          marginTop: 16,
          marginBottom: 8,
        },
        errorText: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 24,
        },
        retryButton: {
          backgroundColor: colors.primary.main,
          borderRadius: 8,
          paddingHorizontal: 24,
          paddingVertical: 12,
        },
        retryButtonText: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
      }),
    [colors]
  );

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      setPage(prev => prev + 1);
      loadMore();
    }
  };

  // Get provider icon
  const getProviderIcon = (provider: PaymentProvider) => {
    return PROVIDER_ICONS[provider] || 'credit-card';
  };

  // Render status badge
  const renderStatusBadge = (status: PaymentStatus) => {
    const color = PAYMENT_STATUS_COLORS[status];
    const label = PAYMENT_STATUS_LABELS[status];

    return (
      <View style={[styles.statusBadge, { backgroundColor: color + '15' }]}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{label}</Text>
      </View>
    );
  };

  // Render payment item
  const renderPaymentItem = ({ item }: { item: PaymentHistoryItem }) => (
    <TouchableOpacity
      style={styles.paymentCard}
      onPress={() => {/* Navigate to payment details */}}
      activeOpacity={0.7}
    >
      <View style={styles.paymentHeader}>
        <View style={styles.providerInfo}>
          <View style={styles.providerIcon}>
            <MaterialCommunityIcons
              name={getProviderIcon(item.paymentMethod as PaymentProvider) as any}
              size={20}
              color={colors.primary.main}
            />
          </View>
          <View>
            <Text style={styles.providerName}>
              {PROVIDER_LABELS[item.paymentMethod as PaymentProvider] || item.paymentMethod}
            </Text>
            <Text style={styles.paymentDate}>
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
        {renderStatusBadge(item.status)}
      </View>

      <View style={styles.paymentBody}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amount}>
            {item.amountFCFA.toLocaleString()} {item.currency}
          </Text>
        </View>

        {item.metadata?.phoneNumber && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="phone" size={14} color={colors.text.secondary} />
            <Text style={styles.detailText}>{item.metadata.phoneNumber}</Text>
          </View>
        )}

        {item.metadata?.cardLast4 && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="credit-card" size={14} color={colors.text.secondary} />
            <Text style={styles.detailText}>•••• {item.metadata.cardLast4}</Text>
          </View>
        )}

        {item.goodsIds && item.goodsIds.length > 0 && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="package-variant" size={14} color={colors.text.secondary} />
            <Text style={styles.detailText}>
              {item.goodsIds.length} item{item.goodsIds.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>

      {item.status === 'COMPLETED' && (
        <View style={styles.paymentFooter}>
          <TouchableOpacity style={styles.receiptButton}>
            <MaterialCommunityIcons name="receipt" size={16} color={colors.primary.main} />
            <Text style={styles.receiptText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  // Render filter buttons
  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <FlashList
        horizontal
        data={STATUS_FILTERS}
        keyExtractor={(item) => item.value}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === item.value && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(item.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === item.value && styles.filterButtonTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.filterList}
      />
    </View>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="credit-card-off"
        size={64}
        color={colors.text.disabled}
      />
      <Text style={styles.emptyTitle}>No Payments Yet</Text>
      <Text style={styles.emptyText}>
        You haven't made any payments yet. Your payment history will appear here.
      </Text>
    </View>
  );

  // Render error state
  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={48}
        color={colors.status.error}
      />
      <Text style={styles.errorTitle}>Failed to Load</Text>
      <Text style={styles.errorText}>
        {error?.message || 'Something went wrong. Please try again.'}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={refetch}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filters */}
      {renderFilterButtons()}

      {/* Content */}
      {error ? (
        renderErrorState()
      ) : isLoading && payments.length === 0 ? (
        <PaymentHistorySkeleton />
      ) : (
        <FlashList
          data={payments}
          keyExtractor={(item) => item.id}
          renderItem={renderPaymentItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={!isLoading ? renderEmptyState : null}
          ListFooterComponent={
            isLoading && payments.length > 0 ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary.main} />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PaymentHistoryScreen;
