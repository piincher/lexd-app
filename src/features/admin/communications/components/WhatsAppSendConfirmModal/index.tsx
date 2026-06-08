import React from "react";
import { View, Modal } from "react-native";
import { Button, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./WhatsAppSendConfirmModal.styles";

interface WhatsAppSendConfirmModalProps {
  visible: boolean;
  recipientCount: number;
  mediaCount: number;
  messagePreview: string;
  isSending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WhatsAppSendConfirmModal: React.FC<WhatsAppSendConfirmModalProps> = ({
  visible,
  recipientCount,
  mediaCount,
  messagePreview,
  isSending = false,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const preview = messagePreview.trim();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name="logo-whatsapp" size={22} color={colors.primary[600]} />
            </View>
            <Text style={styles.title}>Confirmer l'envoi</Text>
          </View>

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Ionicons name="people" size={16} color={colors.text.secondary} />
              <Text style={styles.summaryLabel}>Destinataires</Text>
              <Text style={styles.summaryValue}>{recipientCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Ionicons name="images" size={16} color={colors.text.secondary} />
              <Text style={styles.summaryLabel}>Pièces jointes</Text>
              <Text style={styles.summaryValue}>{mediaCount}</Text>
            </View>
          </View>

          {preview.length > 0 && (
            <View>
              <Text style={styles.previewLabel}>Aperçu du message</Text>
              <Text style={styles.preview} numberOfLines={5}>
                {preview}
              </Text>
            </View>
          )}

          <View style={styles.actions}>
            <Button mode="outlined" onPress={onCancel} disabled={isSending} style={styles.button}>
              Annuler
            </Button>
            <Button
              mode="contained"
              icon={isSending ? "timer-sand" : "send"}
              loading={isSending}
              disabled={isSending}
              onPress={onConfirm}
              style={styles.button}
            >
              Envoyer
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WhatsAppSendConfirmModal;
