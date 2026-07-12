import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';
import { createStyles } from './ClientShippingMarkPreviewModal.styles';

interface ClientShippingMarkPreviewModalProps {
  client: ShippingMarkClient | null;
  visible: boolean;
  isSending: boolean;
  isRegenerating: boolean;
  onClose: () => void;
  onDownload: (client: ShippingMarkClient) => void;
  onSend: (client: ShippingMarkClient) => void;
  onRegenerate: (clientId: string) => void;
}

const getClientName = (client: ShippingMarkClient): string =>
  `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.phoneNumber;

export const ClientShippingMarkPreviewModal: React.FC<ClientShippingMarkPreviewModalProps> = ({
  client,
  visible,
  isSending,
  isRegenerating,
  onClose,
  onDownload,
  onSend,
  onRegenerate,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (!client) return null;

  const hasImage = Boolean(client.shippingMarkImageUrl);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.centered}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Aperçu de la marque</Text>
              <Text style={styles.subtitle} numberOfLines={2} selectable>
                {getClientName(client)} • {client.clientId}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Fermer l'aperçu"
            >
              <Ionicons name="close" size={23} color={colors.text.primary} />
            </Pressable>
          </View>

          <View style={styles.preview}>
            {hasImage ? (
              <Image
                source={{ uri: client.shippingMarkImageUrl }}
                style={styles.image}
                contentFit="contain"
                recyclingKey={client._id}
                transition={160}
              />
            ) : (
              <Text style={styles.emptyText}>
                {"Aucune image générée. Régénérez la marque avant l'envoi."}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            <Button
              title="Partager"
              icon="share-outline"
              variant="outline"
              disabled={!hasImage}
              onPress={() => onDownload(client)}
              style={styles.actionButton}
            />
            <Button
              title="Envoyer WhatsApp"
              icon="logo-whatsapp"
              disabled={!hasImage || isSending}
              loading={isSending}
              onPress={() => onSend(client)}
              style={styles.actionButton}
            />
            <Button
              title="Régénérer"
              icon="refresh-outline"
              variant="secondary"
              loading={isRegenerating}
              onPress={() => onRegenerate(client._id)}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
