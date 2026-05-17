import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ClientGoodsGroup } from '../../../types/packingList';
import { styles } from './ClientSelector.styles';

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
  const handleSelect = (clientId: string | null) => {
    onSelectClient(clientId);
    onClose();
  };

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
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.clientList}>
            <TouchableOpacity
              style={[
                styles.clientItem,
                !normalizedSelectedId && styles.clientItemSelected,
              ]}
              onPress={() => handleSelect(null)}
            >
              <Text
                style={[
                  styles.clientItemText,
                  !normalizedSelectedId && styles.clientItemTextSelected,
                ]}
              >
                📋 Tous les clients
              </Text>
              {!normalizedSelectedId && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>

            {clients.map((client) => {
              const isSelected =
                normalizedSelectedId === String(client.clientId).trim();
              return (
                <TouchableOpacity
                  key={client.clientId}
                  style={[
                    styles.clientItem,
                    isSelected && styles.clientItemSelected,
                  ]}
                  onPress={() => handleSelect(client.clientId)}
                >
                  <View style={styles.clientInfo}>
                    <Text
                      style={[
                        styles.clientItemText,
                        isSelected && styles.clientItemTextSelected,
                      ]}
                    >
                      👤 {client.clientName}
                    </Text>
                    <Text style={styles.clientMeta}>
                      {client.goods.length} colis •{' '}
                      {client.summary.totalQuantity ||
                        client.summary.totalItems ||
                        0}{' '}
                      articles • {client.summary.totalCBM.toFixed(2)} m³
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
  );
};
