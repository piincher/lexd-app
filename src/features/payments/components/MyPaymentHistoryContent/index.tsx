import React, { useCallback } from 'react';
import { RefreshControl, Linking, View, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMyPaymentHistory } from '../../hooks/useMyPaymentHistory';
import { useDownloadReceipt, useShareReceipt } from '../../hooks';
import { PaymentHistoryCard } from '../PaymentHistoryCard';
import { PaymentHistorySkeleton } from '../PaymentHistorySkeleton';
import { PaymentHistoryItem } from '../../types';
import { styles } from './styles';

export const MyPaymentHistoryContent: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();
  const {
    payments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useMyPaymentHistory();

  const { downloadReceipt } = useDownloadReceipt();
  const { shareReceipt } = useShareReceipt();

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
    return <PaymentHistorySkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle"
        title="Erreur de chargement"
        message={error.message || "Impossible de charger l'historique des paiements."}
      />
    );
  }

  if (!isLoading && payments.length === 0) {
    return (
      <EmptyState
        icon="cash-remove"
        title="Aucun paiement"
        message="Vous n'avez pas encore de paiements enregistrés."
      />
    );
  }

  return (
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
  );
};
