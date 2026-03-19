/**
 * Client Selector Component
 * Allows admin to filter packing list by specific client
 * For walk-in customers who need their individual packing list
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
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
    ? `👤 ${selectedClient.clientName} (${selectedClient.goods.length} colis)`
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
                        {client.goods.length} colis • {client.summary.totalCBM.toFixed(2)} m³
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
    backgroundColor: '#ffffff',
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
    borderColor: '#e5e7eb',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  selectorText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
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
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    fontSize: 20,
    color: '#6b7280',
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
    borderBottomColor: '#f3f4f6',
  },
  clientItemSelected: {
    backgroundColor: '#f0fdf4',
  },
  clientInfo: {
    flex: 1,
  },
  clientItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  clientItemTextSelected: {
    color: '#166534',
    fontWeight: '600',
  },
  clientMeta: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 18,
    color: '#16a34a',
    fontWeight: '700',
    marginLeft: 8,
  },
});
