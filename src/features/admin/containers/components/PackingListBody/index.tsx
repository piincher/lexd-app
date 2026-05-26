/**
 * PackingListBody - Scrollable content for the packing list screen
 */
import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import {
  SectionHeader,
  EmptyState,
  SummaryCard,
  PackingListCommandPanel,
} from '../../screens/PackingList/components';
import { ClientSelector } from '../../screens/PackingList/components/ClientSelector';
import { ClientGoodsSection } from '../ClientGoodsSection';
import { createStyles } from '../../screens/PackingList/PackingListScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ClientGoodsGroup, ContainerSummary } from '../../types/packingList';

interface PackingListBodyProps {
  allClients: ClientGoodsGroup[];
  clients: ClientGoodsGroup[];
  summary: ContainerSummary;
  allExpanded: boolean;
  selectedClientId: string | null;
  onSelectClient: (clientId: string | null) => void;
  onToggleAll: () => void;
  formatDate: (date: Date | string) => string;
}

export const PackingListBody: React.FC<PackingListBodyProps> = ({
  allClients,
  clients,
  summary,
  allExpanded,
  selectedClientId,
  onSelectClient,
  onToggleAll,
  formatDate,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const totalQuantity = summary.totalQuantity || summary.totalPackages || 0;
  const keyExtractor = useCallback((client: ClientGoodsGroup) => String(client.clientId), []);
  const renderClient: ListRenderItem<ClientGoodsGroup> = useCallback(({ item, index }) => (
    <ClientGoodsSection
      clientGroup={item}
      index={index}
      defaultExpanded={allExpanded}
    />
  ), [allExpanded]);

  const header = (
    <View>
      {allClients.length > 1 && (
        <ClientSelector
          clients={allClients}
          selectedClientId={selectedClientId}
          onSelectClient={onSelectClient}
        />
      )}

      <PackingListCommandPanel
        allClients={allClients}
        clients={clients}
        selectedClientId={selectedClientId}
        summary={summary}
      />

      {selectedClientId && clients.length === 1 && (
        <View style={styles.singleClientBanner}>
          <Text style={styles.singleClientText}>
            Vue client: {clients[0]?.clientName}
          </Text>
        </View>
      )}

      <SectionHeader
        allExpanded={allExpanded}
        clientCount={clients.length}
        totalItems={summary.totalItems}
        totalQuantity={totalQuantity}
        onToggleAll={onToggleAll}
      />
    </View>
  );
  const footer = clients.length > 0 ? (
    <View>
      <SummaryCard summary={summary} formatDate={formatDate} />
      <View style={styles.bottomSpacer} />
    </View>
  ) : (
    <View style={styles.bottomSpacer} />
  );

  return (
    <FlashList
      style={styles.scrollView}
      data={clients}
      keyExtractor={keyExtractor}
      renderItem={renderClient}
      extraData={allExpanded}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <EmptyState
          title="Aucune marchandise dans cette vue"
          subtitle="La liste de colisage sera disponible dès que des colis seront assignés."
        />
      }
      ListFooterComponent={footer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    />
  );
};
