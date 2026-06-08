import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./WhatsAppMessageComposer.styles";

export type PersonalizationToken = "{{firstName}}" | "{{name}}";

interface WhatsAppMessageComposerProps {
  message: string;
  onMessageChange: (value: string) => void;
  onInsertToken: (token: PersonalizationToken) => void;
  recipientCount: number;
  mediaCount: number;
  isSending: boolean;
  isUploading: boolean;
  canSend: boolean;
  isEnabled?: boolean;
  isConfigLoading: boolean;
  onSend: () => void;
}

const TOKENS: { token: PersonalizationToken; label: string }[] = [
  { token: "{{firstName}}", label: "Prénom" },
  { token: "{{name}}", label: "Nom complet" },
];

export const WhatsAppMessageComposer: React.FC<WhatsAppMessageComposerProps> = ({
  message,
  onMessageChange,
  onInsertToken,
  recipientCount,
  mediaCount,
  isSending,
  isUploading,
  canSend,
  isEnabled,
  isConfigLoading,
  onSend,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const statusColor = isEnabled ? colors.status.success : colors.status.error;
  const statusText = isConfigLoading ? "Vérification de Wasender…" : isEnabled ? "Wasender actif" : "Wasender inactif";

  const sendLabel = isUploading
    ? "Téléversement…"
    : recipientCount > 0
      ? `Envoyer (${recipientCount})`
      : "Envoyer";

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      <TextInput
        mode="outlined"
        label="Message"
        value={message}
        onChangeText={onMessageChange}
        multiline
        left={<TextInput.Icon icon="message-text" />}
        style={styles.input}
      />

      <View style={styles.tokensRow}>
        <Text style={styles.tokensHint}>Insérer :</Text>
        {TOKENS.map(({ token, label }) => (
          <TouchableOpacity
            key={token}
            style={styles.tokenChip}
            onPress={() => onInsertToken(token)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={12} color={colors.primary[700]} />
            <Text style={styles.tokenText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.count}>
          {message.trim().length} car.
          {mediaCount > 0 ? ` · ${mediaCount} média` : ""}
        </Text>
        <Button
          mode="contained"
          icon={isSending ? "timer-sand" : "send"}
          disabled={!canSend}
          loading={isSending}
          onPress={onSend}
          style={styles.sendButton}
        >
          {sendLabel}
        </Button>
      </View>
    </View>
  );
};

export default WhatsAppMessageComposer;
