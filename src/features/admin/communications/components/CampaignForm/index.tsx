import React from "react";
import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./CampaignForm.styles";

interface CampaignFormProps {
  title: string;
  body: string;
  onTitleChange: (text: string) => void;
  onBodyChange: (text: string) => void;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({
  title,
  body,
  onTitleChange,
  onBodyChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <>
      <View style={styles.field}>
        <Text style={styles.label}>Titre de la notification</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Offre spéciale ce week-end !"
          placeholderTextColor={colors.text.disabled}
          value={title}
          onChangeText={onTitleChange}
          maxLength={200}
        />
        <Text style={styles.charCount}>{title.length}/200</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex: Profitez de -20% sur vos prochaines expéditions..."
          placeholderTextColor={colors.text.disabled}
          value={body}
          onChangeText={onBodyChange}
          multiline
          numberOfLines={4}
          maxLength={500}
        />
        <Text style={styles.charCount}>{body.length}/500</Text>
      </View>

      {(title.trim() || body.trim()) && (
        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Aperçu</Text>
          <View style={styles.notificationPreview}>
            <View style={styles.previewIcon}>
              <Ionicons name="notifications" size={16} color={colors.primary.main} />
            </View>
            <View style={styles.previewContent}>
              <Text style={styles.previewTitle} numberOfLines={1}>
                {title || "Titre de la notification"}
              </Text>
              <Text style={styles.previewBody} numberOfLines={2}>
                {body || "Votre message ici"}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
