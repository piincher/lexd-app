import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Appbar,
  Text,
  useTheme,
  SegmentedButtons,
  ActivityIndicator,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { useGetMyInvoices } from '../hooks/useInvoices';
import { InvoiceCard } from '../components/InvoiceCard';
import { Invoice, InvoiceStatus } from '../types';
import { RootStackParamList } from '@src/navigations/type';

type MyInvoicesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyInvoices'
>;

type FilterTab = 'ALL' | 'SENT' | 'PAID';

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'SENT', label: 'À payer' },
  { value: 'PAID', label: 'Payées' },
];

export const MyInvoicesScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<MyInvoicesScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');

  const filters = {
    status: activeFilter === 'ALL' ? undefined : activeFilter as InvoiceStatus,
    limit: 20,
  };

  const { data, isLoading, isRefetching, refetch } = useGetMyInvoices(filters);
  const invoices = data?.data || [];

  const handleRefresh = () => {
    refetch();
  };

  const handleInvoicePress = (invoice: Invoice) => {
    navigation.navigate('InvoiceDetail', { invoiceId: invoice._id });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>
        {activeFilter === 'ALL'
          ? 'Aucune facture disponible'
          : activeFilter === 'SENT'
          ? 'Aucune facture à payer'
          : 'Aucune facture payée'}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Invoice }) => (
    <InvoiceCard invoice={item} onPress={() => handleInvoicePress(item)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="Mes factures" />
      </Appbar.Header>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <SegmentedButtons
          value={activeFilter}
          onValueChange={(value) => setActiveFilter(value as FilterTab)}
          buttons={FILTER_TABS.map((tab) => ({
            value: tab.value,
            label: tab.label,
          }))}
          style={styles.segmentedButtons}
        />
      </View>

      {isLoading && !isRefetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={invoices}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  segmentedButtons: {
    width: '100%',
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
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
    padding: 32,
  },
});
