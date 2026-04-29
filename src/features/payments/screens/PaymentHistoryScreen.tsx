import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePaymentHistoryScreen } from '../hooks/usePaymentHistoryScreen';
import { usePaymentHistoryScreenStyles } from './PaymentHistoryScreen.styles';
import {
  PaymentHistoryHeader,
  PaymentHistoryFilter,
  PaymentHistoryList,
  PaymentHistoryEmptyState,
  PaymentHistoryErrorState,
  PaymentHistorySkeleton,
} from '../components';

const PaymentHistoryScreen: React.FC = () => {
  const {
    payments,
    isLoading,
    error,
    refreshing,
    selectedFilter,
    handlers,
  } = usePaymentHistoryScreen();

  const styles = usePaymentHistoryScreenStyles();

  return (
    <SafeAreaView style={styles.container}>
      <PaymentHistoryHeader
        title="Payment History"
        onBackPress={handlers.handleBackPress}
        onNotificationPress={handlers.handleNotificationPress}
      />
      <PaymentHistoryFilter
        selectedFilter={selectedFilter}
        onFilterChange={handlers.handleFilterChange}
      />
      {error ? (
        <PaymentHistoryErrorState
          error={error}
          onRetry={handlers.handleRefresh}
        />
      ) : isLoading && payments.length === 0 ? (
        <PaymentHistorySkeleton />
      ) : (
        <PaymentHistoryList
          payments={payments}
          isLoading={isLoading}
          refreshing={refreshing}
          onRefresh={handlers.handleRefresh}
          onEndReached={handlers.handleLoadMore}
          ListEmptyComponent={!isLoading ? <PaymentHistoryEmptyState /> : null}
        />
      )}
    </SafeAreaView>
  );
};

export default PaymentHistoryScreen;
