/**
 * PackingListBody - Scrollable content for the packing list screen
 */
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import {
  CapacityCard,
  SectionHeader,
  EmptyState,
  SummaryCard,
} from '../../screens/PackingList/components';
import { ClientSelector } from '../../screens/PackingList/components/ClientSelector';
import { ClientGoodsSection } from '../ClientGoodsSection';
import { getStyles } from '../../screens/PackingList/PackingListScreen.styles';
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
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {allClients.length > 1 && (
        <ClientSelector
          clients={allClients}
          selectedClientId={selectedClientId}
          onSelectClient={onSelectClient}
        />
      )}

      <CapacityCard summary={summary} />

      {selectedClientId && clients.length === 1 && (
        <View style={styles.singleClientBanner}>
          <Text style={styles.singleClientText}>
            📋 Vue client individuel: {clients[0]?.clientName}
          </Text>
        </View>
      )}

      <SectionHeader allExpanded={allExpanded} onToggleAll={onToggleAll} />

      {clients.length === 0 ? (
        <EmptyState />
      ) : (
        clients.map((clientGroup, index) => (
          <ClientGoodsSection
            key={clientGroup.clientId}
            clientGroup={clientGroup}
            index={index}
            defaultExpanded={allExpanded}
          />
        ))
      )}

      {clients.length > 0 && (
        <SummaryCard summary={summary} formatDate={formatDate} />
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};
