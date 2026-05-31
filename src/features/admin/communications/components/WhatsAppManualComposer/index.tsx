import React from "react";
import { View } from "react-native";
import { Button, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { WhatsAppMediaType } from "../../api/whatsappApi";
import type { WhatsAppSendMode } from "../../hooks/useSendWhatsAppScreen";
import { createStyles } from "./WhatsAppManualComposer.styles";

interface WhatsAppManualComposerProps {
  phone: string;
  message: string;
  mode: WhatsAppSendMode;
  mediaUrl: string;
  mediaType: WhatsAppMediaType;
  canSend: boolean;
  isSending: boolean;
  isEnabled?: boolean;
  isConfigLoading: boolean;
  onPhoneChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onModeChange: (value: WhatsAppSendMode) => void;
  onMediaUrlChange: (value: string) => void;
  onMediaTypeChange: (value: WhatsAppMediaType) => void;
  onSend: () => void;
}

export const WhatsAppManualComposer: React.FC<WhatsAppManualComposerProps> = ({
  phone,
  message,
  mode,
  mediaUrl,
  mediaType,
  canSend,
  isSending,
  isEnabled,
  isConfigLoading,
  onPhoneChange,
  onMessageChange,
  onModeChange,
  onMediaUrlChange,
  onMediaTypeChange,
  onSend,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const statusColor = isEnabled ? colors.status.success : colors.status.error;

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Wasender</Text>
        <Text style={[styles.statusValue, { color: statusColor }]}>
          {isConfigLoading ? "Vérification" : isEnabled ? "Actif" : "Inactif"}
        </Text>
      </View>

      <View style={styles.form}>
        <SegmentedButtons
          value={mode}
          onValueChange={(value) => onModeChange(value as WhatsAppSendMode)}
          buttons={[
            { value: "text", label: "Texte", icon: "message-text" },
            { value: "media", label: "Média", icon: "file-send" },
          ]}
          style={styles.segment}
        />

        <TextInput
          mode="outlined"
          label="Numéro WhatsApp"
          value={phone}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
          left={<TextInput.Icon icon="whatsapp" />}
          style={styles.input}
        />

        {mode === "media" && (
          <>
            <SegmentedButtons
              value={mediaType}
              onValueChange={(value) => onMediaTypeChange(value as WhatsAppMediaType)}
              buttons={[
                { value: "image", label: "Image", icon: "image" },
                { value: "document", label: "Doc", icon: "file-document" },
                { value: "video", label: "Vidéo", icon: "video" },
              ]}
              style={styles.segment}
            />
            <TextInput
              mode="outlined"
              label="URL du média"
              value={mediaUrl}
              onChangeText={onMediaUrlChange}
              keyboardType="url"
              left={<TextInput.Icon icon="link" />}
              style={styles.input}
            />
          </>
        )}

        <TextInput
          mode="outlined"
          label="Message"
          value={message}
          onChangeText={onMessageChange}
          multiline
          left={<TextInput.Icon icon="text" />}
          style={[styles.input, styles.messageInput]}
        />

        <View style={styles.footer}>
          <Text style={styles.count}>{message.trim().length} caractères</Text>
          <Button
            mode="contained"
            icon={isSending ? "timer-sand" : "send"}
            disabled={!canSend}
            loading={isSending}
            onPress={onSend}
            style={styles.sendButton}
          >
            Envoyer
          </Button>
        </View>
      </View>
    </View>
  );
};

export default WhatsAppManualComposer;
