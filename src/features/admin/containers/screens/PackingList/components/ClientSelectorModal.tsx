import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ClientGoodsGroup } from '../../../types/packingList';
import { createStyles } from './ClientSelector.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ClientSelectorOption } from './ClientSelectorOption';

interface ClientSelectorModalProps {
  visible: boolean;
  clients: ClientGoodsGroup[];
  normalizedSelectedId: string | null;
  onSelectClient: (clientId: string | null) => void;
  onClose: () => void;
}

export const ClientSelectorModal: React.FC<ClientSelectorModalProps> = ({
  visible,
  clients,
  normalizedSelectedId,
  onSelectClient,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const showSearch = clients.length > 6;

  const filteredClients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!showSearch || !query) return clients;

    return clients.filter((client) => {
      const haystack = `${client.clientName} ${client.clientPhone}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [clients, searchQuery, showSearch]);

  const handleSelect = useCallback((clientId: string | null) => {
    onSelectClient(clientId);
    onClose();
  }, [onClose, onSelectClient]);

  const renderClient = useCallback(
    ({ item }: { item: ClientGoodsGroup }) => {
      const isSelected = normalizedSelectedId === String(item.clientId).trim();

      return (
        <ClientSelectorOption
          client={item}
          isSelected={isSelected}
          onPress={() => handleSelect(item.clientId)}
          selectedColor={colors.status.success}
          defaultColor={colors.text.secondary}
          styles={styles}
        />
      );
    },
    [colors.status.success, colors.text.secondary, handleSelect, normalizedSelectedId, styles]
  );

  const keyExtractor = useCallback(
    (client: ClientGoodsGroup) => String(client.clientId),
    []
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sélectionner un client</Text>
            <TouchableOpacity
              style={styles.closeButtonTouch}
              onPress={onClose}
              accessibilityRole="button"
            >
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {showSearch && (
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color={colors.text.secondary} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher par nom ou téléphone"
                placeholderTextColor={colors.text.disabled}
                style={styles.searchInput}
                autoCorrect={false}
                returnKeyType="search"
              />
            </View>
          )}

          <FlatList
            style={styles.clientList}
            contentContainerStyle={styles.clientListContent}
            data={filteredClients}
            keyExtractor={keyExtractor}
            renderItem={renderClient}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <ClientSelectorOption
                label="Tous les clients"
                meta={`${clients.length} clients`}
                isSelected={!normalizedSelectedId}
                onPress={() => handleSelect(null)}
                selectedColor={colors.status.success}
                defaultColor={colors.text.secondary}
                styles={styles}
              />
            }
            ListEmptyComponent={
              <View style={styles.clientEmptyState}>
                <Ionicons name="search-outline" size={24} color={colors.text.secondary} />
                <Text style={styles.clientEmptyText}>Aucun client trouvé</Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
};
