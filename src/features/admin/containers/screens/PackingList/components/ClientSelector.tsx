/**
 * Client Selector Component
 * Allows admin to filter packing list by specific client
 * For walk-in customers who need their individual packing list
 */

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const styles = createStyles(colors, isDark);

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

  const totals = useMemo(
    () =>
      clients.reduce(
        (acc, client) => ({
          parcels: acc.parcels + client.goods.length,
          articles: acc.articles + (client.summary.totalQuantity || client.summary.totalItems || 0),
        }),
        { parcels: 0, articles: 0 }
      ),
    [clients]
  );

  const displayTitle = selectedClient?.clientName || 'Tous les clients';
  const displayMeta = selectedClient
    ? `${selectedClient.goods.length} colis • ${selectedClient.summary.totalQuantity || selectedClient.summary.totalItems || 0} articles`
    : `${clients.length} clients • ${totals.parcels} colis • ${totals.articles} articles`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sélection client</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
        accessibilityRole="button"
      >
        <View style={styles.selectorIcon}>
          <Ionicons
            name={selectedClient ? 'person-outline' : 'people-outline'}
            size={19}
            color={colors.primary[600]}
          />
        </View>
        <View style={styles.selectorCopy}>
          <Text style={styles.selectorText} numberOfLines={1} ellipsizeMode="tail">
            {displayTitle}
          </Text>
          <Text style={styles.selectorSubtext} numberOfLines={1} ellipsizeMode="tail">
            {displayMeta}
          </Text>
        </View>
        <Ionicons
          name="chevron-down"
          size={18}
          color={colors.text.secondary}
          style={styles.chevron}
        />
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
