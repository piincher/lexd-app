/**
 * Client Selector Component
 * Allows admin to filter packing list by specific client
 * For walk-in customers who need their individual packing list
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { ClientGoodsGroup } from '../../../types/packingList';

interface ClientSelectorProps {
  clients: ClientGoodsGroup[];
  selectedClientId: string | null; // null = all clients
  onSelectClient: (clientId: string | null) => void;
}

export const ClientSelector: React.FC<ClientSelectorProps> = ({
  clients,
  selectedClientId,
  onSelectClient,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Normalize IDs for comparison
  const normalizedSelectedId = selectedClientId ? String(selectedClientId).trim() : null;
  const selectedClient = clients.find(c => String(c.clientId).trim() === normalizedSelectedId);
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner un client</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.clientList}>
              <TouchableOpacity
                style={[
                  styles.clientItem,
                  !normalizedSelectedId && styles.clientItemSelected
                ]}
                onPress={() => {
                  onSelectClient(null);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.clientItemText,
                  !normalizedSelectedId && styles.clientItemTextSelected
                ]}>
                  📋 Tous les clients
                </Text>
                {!normalizedSelectedId && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>

              {clients.map((client) => {
                const isSelected = normalizedSelectedId === String(client.clientId).trim();
                return (
                  <TouchableOpacity
                    key={client.clientId}
                    style={[
                      styles.clientItem,
                      isSelected && styles.clientItemSelected
                    ]}
                    onPress={() => {
                      onSelectClient(client.clientId);
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.clientInfo}>
                      <Text style={[
                        styles.clientItemText,
                        isSelected && styles.clientItemTextSelected
                      ]}>
                        👤 {client.clientName}
                      </Text>
                      <Text style={styles.clientMeta}>
                        {client.goods.length} colis • {client.summary.totalQuantity || client.summary.totalItems || 0} articles • {client.summary.totalCBM.toFixed(2)} m³
                      </Text>
                    </View>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Theme.neutral[300],
  },
  selectorText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  closeButton: {
    fontSize: 20,
    color: Theme.colors.text.secondary,
    padding: 4,
  },
  clientList: {
    maxHeight: 400,
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[100],
  },
  clientItemSelected: {
    backgroundColor: '#f0fdf4',
  },
  clientInfo: {
    flex: 1,
  },
  clientItemText: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    fontWeight: '500',
  },
  clientItemTextSelected: {
    color: '#166534',
    fontWeight: '600',
  },
  clientMeta: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  checkmark: {
    fontSize: 18,
    color: '#16a34a',
    fontWeight: '700',
    marginLeft: 8,
  },
});
