/**
 * Client Selector Component
 * Allows admin to filter packing list by specific client
 * For walk-in customers who need their individual packing list
 */

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ClientGoodsGroup } from '../../../types/packingList';
import { ClientSelectorModal } from './ClientSelectorModal';
import { createStyles } from './ClientSelector.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ClientSelectorProps {
  clients: ClientGoodsGroup[];
  selectedClientId: string | null;
  onSelectClient: (clientId: string | null) => void;
}

export const ClientSelector: React.FC<ClientSelectorProps> = ({
  clients,
  selectedClientId,
  onSelectClient,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const normalizedSelectedId = selectedClientId
    ? String(selectedClientId).trim()
    : null;

  const selectedClient = useMemo(
    () =>
      clients.find(
        (c) => String(c.clientId).trim() === normalizedSelectedId
      ),
    [clients, normalizedSelectedId]
  );

  const displayText = selectedClient
    ? `👤 ${selectedClient.clientName} (${selectedClient.goods.length} colis • ${selectedClient.summary.totalQuantity || selectedClient.summary.totalItems || 0} articles)`
    : '📋 Tous les clients';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sélectionner un client (optionnel)</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText} numberOfLines={1} ellipsizeMode="tail">
          {displayText}
        </Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <ClientSelectorModal
        visible={modalVisible}
        clients={clients}
        normalizedSelectedId={normalizedSelectedId}
        onSelectClient={onSelectClient}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};
