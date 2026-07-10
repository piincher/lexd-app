import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from '@src/shared/ui/Button';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';
import { ClientRow } from './ClientRow';

interface ClientsListProps {
  clients: ShippingMarkClient[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onPreview: (client: ShippingMarkClient) => void;
  onDownload: (client: ShippingMarkClient) => void;
  onSend: (client: ShippingMarkClient) => void;
  onRegenerate: (id: string) => void;
  isRegenerating: boolean;
  isSending: boolean;
  page?: number;
  pages?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPageChange: (page: number) => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  selected,
  onToggle,
  onToggleAll,
  onPreview,
  onDownload,
  onSend,
  onRegenerate,
  isRegenerating,
  isSending,
  page,
  pages,
  hasPrev,
  hasNext,
  onPageChange,
}) => {
  const { colors } = useAppTheme();
  const allSelected = clients.length > 0 && selected.size === clients.length;

  return (
    <View style={styles.container}>
      <Button
        title={allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
        variant="outline"
        onPress={onToggleAll}
        style={styles.toggleButton}
      />
      <FlatList
        data={clients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ClientRow
            client={item}
            selected={selected.has(item._id)}
            onToggle={() => onToggle(item._id)}
            onPreview={() => onPreview(item)}
            onDownload={() => onDownload(item)}
            onSend={() => onSend(item)}
            onRegenerate={() => onRegenerate(item._id)}
            isRegenerating={isRegenerating}
            isSending={isSending}
          />
        )}
        ListEmptyComponent={
          <EmptyState title="Aucun client" message="Aucun client ne correspond à votre recherche." />
        }
      />
      {pages && pages > 1 && (
        <View style={styles.pagination}>
          <Button title="Précédent" variant="outline" onPress={() => onPageChange(page! - 1)} disabled={!hasPrev} />
          <Text style={{ color: colors.text.primary }}>
            {page} / {pages}
          </Text>
          <Button title="Suivant" variant="outline" onPress={() => onPageChange(page! + 1)} disabled={!hasNext} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    marginBottom: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
});
