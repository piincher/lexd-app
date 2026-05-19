import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";
import { callPhone, openWhatsApp, sendEmail } from "../../lib/contactActions";
import { styles } from "./ClientPreviewModal.styles";

interface PreviewActionsProps {
  phone?: string;
  email?: string;
}

export const PreviewActions: React.FC<PreviewActionsProps> = ({ phone, email }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  return (
    <View style={styles.actions}>
      {phone && (
        <TouchableOpacity
          onPress={() => { trigger("light"); callPhone(phone); }}
          style={[styles.actionBtn, { backgroundColor: colors.feedback.successBg }]}
        >
          <Ionicons name="call" size={20} color={colors.primary.main} />
          <Text style={[styles.actionLabel, { color: colors.primary.main }]}>Appeler</Text>
        </TouchableOpacity>
      )}
      {phone && (
        <TouchableOpacity
          onPress={() => { trigger("light"); openWhatsApp(phone); }}
          style={[styles.actionBtn, { backgroundColor: `${colors.status.success}15` }]}
        >
          <Ionicons name="logo-whatsapp" size={20} color={colors.status.success} />
          <Text style={[styles.actionLabel, { color: colors.status.success }]}>WhatsApp</Text>
        </TouchableOpacity>
      )}
      {email && (
        <TouchableOpacity
          onPress={() => { trigger("light"); sendEmail(email); }}
          style={[styles.actionBtn, { backgroundColor: `${colors.status.info}15` }]}
        >
          <Ionicons name="mail" size={20} color={colors.status.info} />
          <Text style={[styles.actionLabel, { color: colors.status.info }]}>Email</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
