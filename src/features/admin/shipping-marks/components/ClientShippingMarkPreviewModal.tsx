import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';

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

  if (!client) return null;

  const hasImage = Boolean(client.shippingMarkImageUrl);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.centered}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.card, { backgroundColor: colors.background.card }]}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={[styles.title, { color: colors.text.primary }]}>Aperçu de la marque</Text>
              <Text style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={2}>
                {getClientName(client)} • {client.clientId}
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={12}>
              <Text style={[styles.close, { color: colors.text.secondary }]}>×</Text>
            </Pressable>
          </View>

          <View style={[styles.preview, { backgroundColor: colors.background.paper }]}>
            {hasImage ? (
              <Image source={{ uri: client.shippingMarkImageUrl }} style={styles.image} resizeMode="contain" />
            ) : (
              <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                {"Aucune image générée. Régénérez la marque avant l'envoi."}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            <Button
              title="Télécharger"
              icon="download-outline"
              variant="outline"
              size="small"
              disabled={!hasImage}
              onPress={() => onDownload(client)}
              style={styles.actionButton}
            />
            <Button
              title="Envoyer WhatsApp"
              icon="logo-whatsapp"
              size="small"
              disabled={!hasImage || isSending}
              loading={isSending}
              onPress={() => onSend(client)}
              style={styles.actionButton}
            />
            <Button
              title="Régénérer"
              icon="refresh-outline"
              variant="secondary"
              size="small"
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.64)',
  },
  card: {
    width: '92%',
    maxHeight: '88%',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 3,
    fontSize: 13,
  },
  close: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '600',
  },
  preview: {
    width: '100%',
    aspectRatio: 0.96,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyText: {
    padding: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  actionButton: {
    flexGrow: 1,
  },
});
