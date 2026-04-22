import React, { useCallback, useMemo } from 'react';
import { RefreshControl, Linking, StyleSheet, View, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMyPaymentHistory } from '../hooks/useMyPaymentHistory';
import { useDownloadReceipt, useShareReceipt } from '../hooks';
import { PaymentHistoryCard } from '../components/PaymentHistoryCard';
import { PaymentHistorySkeleton } from '../components/PaymentHistorySkeleton';
import { PaymentHistoryItem } from '../types';

export const MyPaymentHistoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();
  const {
    payments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error
  } = useMyPaymentHistory();

  const { downloadReceipt } = useDownloadReceipt();
  const { shareReceipt } = useShareReceipt();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        listContent: {
          padding: 16,
          gap: 12,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        footerLoader: {
          paddingVertical: 16,
        },
      }),
    []
  );

  const handleViewReceipt = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  const handleDownloadReceipt = useCallback((paymentId: string) => {
    downloadReceipt(paymentId);
  }, [downloadReceipt]);

  const handleShareReceipt = useCallback((paymentId: string) => {
    shareReceipt(paymentId);
  }, [shareReceipt]);

  const handlePressPayment = useCallback((payment: PaymentHistoryItem) => {
    navigation.navigate('UserPaymentDetail', { payment });
  }, [navigation]);

  const receiptUrl = (item: PaymentHistoryItem) => item.receiptUrl || item.metadata?.receiptUrl;

  const renderItem = ({ item }: { item: PaymentHistoryItem }) => (
    <PaymentHistoryCard
      payment={item}
      onPress={() => handlePressPayment(item)}
      onViewReceipt={receiptUrl(item) ? () => handleViewReceipt(receiptUrl(item)!) : undefined}
      onDownloadReceipt={receiptUrl(item) ? () => handleDownloadReceipt(item.id) : undefined}
      onShareReceipt={receiptUrl(item) ? () => handleShareReceipt(item.id) : undefined}
    />
  );

  if (isLoading && payments.length === 0) {
    return (
      <Screen header={{ title: 'Historique des paiements', showBack: true, onBackPress: () => navigation.goBack(), showNotificationBell: true }}>
        <PaymentHistorySkeleton />
      </Screen>
    );
  }

  return (
    <Screen
      header={{
        title: 'Historique des paiements',
        showBack: true,
        onBackPress: () => navigation.goBack(),
        showNotificationBell: true
      }}
      scrollable={false}
    >
      {error ? (
        <EmptyState
          icon="alert-circle"
          title="Erreur de chargement"
          message={error.message || "Impossible de charger l'historique des paiements."}
        />
      ) : !isLoading && payments.length === 0 ? (
        <EmptyState
          icon="cash-remove"
          title="Aucun paiement"
          message="Vous n'avez pas encore de paiements enregistrés."
        />
      ) : (
        <FlashList
          data={payments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footerLoader} color={colors.status.success} />
            ) : null
          }
        />
      )}
    </Screen>
  );
};

export default MyPaymentHistoryScreen;
