import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Appbar,
  Text,
  FAB,
  Searchbar,
  useTheme,
  SegmentedButtons,
  ActivityIndicator,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { useGetInvoices } from '../hooks/useInvoices';
import { InvoiceCard } from '../components/InvoiceCard';
import { Invoice, InvoiceStatus } from '../types';
import { RootStackParamList } from '@src/navigations/type';

type InvoiceListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AdminInvoiceList'
>;

type FilterTab = 'ALL' | InvoiceStatus;

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'DRAFT', label: 'Brouillon' },
  { value: 'SENT', label: 'Envoyées' },
  { value: 'PAID', label: 'Payées' },
  { value: 'OVERDUE', label: 'En retard' },
];

export const InvoiceListScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<InvoiceListScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filters = {
    status: activeFilter === 'ALL' ? undefined : activeFilter,
    search: searchQuery || undefined,
    limit: 20,
  };

  const { data, isLoading, isRefetching, refetch } = useGetInvoices(filters);
  const invoices = data?.data || [];

  const handleRefresh = () => {
    refetch();
  };

  const handleInvoicePress = (invoice: Invoice) => {
    navigation.navigate('AdminInvoiceDetail', { invoiceId: invoice._id });
  };

  const handleCreateInvoice = () => {
    navigation.navigate('CreateInvoice');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>
        {searchQuery
          ? 'Aucune facture trouvée pour cette recherche'
          : activeFilter === 'ALL'
          ? 'Aucune facture disponible'
          : `Aucune facture ${FILTER_TABS.find(t => t.value === activeFilter)?.label.toLowerCase()}`}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Invoice }) => (
    <InvoiceCard invoice={item} onPress={() => handleInvoicePress(item)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="Factures" />
        <Appbar.Action
          icon={isSearchVisible ? 'close' : 'magnify'}
          onPress={() => {
            setIsSearchVisible(!isSearchVisible);
            if (isSearchVisible) setSearchQuery('');
          }}
        />
      </Appbar.Header>

      {isSearchVisible && (
        <Searchbar
          placeholder="Rechercher par numéro ou client..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      )}

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <SegmentedButtons
            value={activeFilter}
            onValueChange={(value) => setActiveFilter(value as FilterTab)}
            buttons={FILTER_TABS.map((tab) => ({
              value: tab.value,
              label: tab.label,
              style: styles.filterButton,
            }))}
            style={styles.segmentedButtons}
          />
        </ScrollView>
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

      <FAB
        icon="plus"
        label="Nouvelle facture"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreateInvoice}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
  },
  filterContainer: {
    paddingVertical: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  segmentedButtons: {
    minWidth: 500,
  },
  filterButton: {
    minWidth: 80,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
