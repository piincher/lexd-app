import React, { useCallback, useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { ListRenderItem } from '@shopify/flash-list';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';
import { ClientRow } from './ClientRow';
import { ClientSelectionBar } from './ClientSelectionBar';
import { PaginationControls } from './PaginationControls';
import { styles } from './ClientsList.styles';

interface ClientsListProps {
  clients: ShippingMarkClient[];
  header: React.ReactNode;
  selected: Set<string>;
  allCurrentPageSelected: boolean;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onPreview: (client: ShippingMarkClient) => void;
  onShareSupplier: (client: ShippingMarkClient) => void;
  onSend: (client: ShippingMarkClient) => void;
  onRegenerate: (id: string) => void;
  regeneratingClientId?: string;
  sendingClientIds: string[];
  sharingClientId?: string;
  isFetching: boolean;
  isError: boolean;
  errorMessage?: string;
  onRefresh: () => void;
  page: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
  onCreateClient?: () => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  header,
  selected,
  allCurrentPageSelected,
  onToggle,
  onToggleAll,
  onPreview,
  onShareSupplier,
  onSend,
  onRegenerate,
  regeneratingClientId,
  sendingClientIds,
  sharingClientId,
  isFetching,
  isError,
  errorMessage,
  onRefresh,
  page,
  pages,
  hasPrev,
  hasNext,
  onPageChange,
  onCreateClient,
}) => {
  const { colors } = useAppTheme();
  const selectedOnPage = clients.filter((client) => selected.has(client._id)).length;
  const sendingIds = useMemo(() => new Set(sendingClientIds), [sendingClientIds]);

  const renderItem: ListRenderItem<ShippingMarkClient> = useCallback(({ item }) => (
    <ClientRow
      client={item}
      selected={selected.has(item._id)}
      onToggle={onToggle}
      onPreview={onPreview}
      onShareSupplier={onShareSupplier}
      onSend={onSend}
      onRegenerate={onRegenerate}
      isRegenerating={regeneratingClientId === item._id}
      isSending={sendingIds.has(item._id)}
      isSharing={sharingClientId === item._id}
    />
  ), [onPreview, onRegenerate, onSend, onShareSupplier, onToggle, regeneratingClientId, selected, sendingIds, sharingClientId]);

  const listHeader = useMemo(() => (
    <View style={styles.header}>
      {header}
      <ClientSelectionBar
        clientCount={clients.length}
        selectedCount={selectedOnPage}
        allSelected={allCurrentPageSelected}
        onToggleAll={onToggleAll}
      />
    </View>
  ), [allCurrentPageSelected, clients.length, header, onToggleAll, selectedOnPage]);

  const listFooter = pages > 1 ? (
    <PaginationControls
      page={page}
      pages={pages}
      hasPrev={hasPrev}
      hasNext={hasNext}
      onPageChange={onPageChange}
    />
  ) : <View style={styles.shortFooter} />;

  return (
    <FlashList
      style={styles.list}
      data={clients}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      extraData={selected}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={listHeader}
      ListFooterComponent={listFooter}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={onRefresh}
          tintColor={colors.primary.main}
          colors={[colors.primary.main]}
        />
      }
      ListEmptyComponent={
        <EmptyState
          icon={isError ? 'cloud-alert-outline' : 'account-search-outline'}
          title={isError ? 'Chargement impossible' : 'Aucun client trouvé'}
          message={isError ? errorMessage || 'Le service est temporairement indisponible.' : 'Modifiez la recherche pour afficher des clients.'}
          actionLabel={isError ? 'Réessayer' : 'Créer un nouveau client'}
          onAction={isError ? onRefresh : onCreateClient}
          style={styles.emptyState}
        />
      }
    />
  );
};

const keyExtractor = (item: ShippingMarkClient) => item._id;
const ItemSeparator = () => <View style={styles.separator} />;
