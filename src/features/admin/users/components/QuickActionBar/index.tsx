import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";
import { callPhone, openWhatsApp, sendEmail, sendSMS } from "../../lib/contactActions";
import { userData } from "@src/shared/types/user";

interface QuickActionBarProps {
  user: userData | undefined;
  onBlock: () => void;
  onEdit: () => void;
}

const ActionButton: React.FC<{
  icon: string;
  label: string;
  color: string;
  bgColor: string;
  onPress: () => void;
}> = ({ icon, label, color, bgColor, onPress }) => {
  const { trigger } = useHaptics();
  return (
    <TouchableOpacity
      onPress={() => { trigger("light"); onPress(); }}
      style={[styles.btn, { backgroundColor: bgColor }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon as any} size={20} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ user, onBlock, onEdit }) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.container}>
      {user?.phoneNumber && (
        <ActionButton icon="call" label="Appeler" color={colors.primary.main} bgColor={colors.feedback.successBg} onPress={() => callPhone(user.phoneNumber)} />
      )}
      {user?.phoneNumber && (
        <ActionButton icon="logo-whatsapp" label="WhatsApp" color={colors.status.success} bgColor={`${colors.status.success}15`} onPress={() => openWhatsApp(user.phoneNumber)} />
      )}
      {user?.email && (
        <ActionButton icon="mail" label="Email" color={colors.status.info} bgColor={`${colors.status.info}15`} onPress={() => sendEmail(user.email)} />
      )}
      {user?.phoneNumber && (
        <ActionButton icon="chatbubble" label="SMS" color={colors.status.warning} bgColor={`${colors.status.warning}15`} onPress={() => sendSMS(user.phoneNumber)} />
      )}
      <ActionButton icon="create" label="Modifier" color={colors.text.secondary} bgColor={colors.background.paper} onPress={onEdit} />
      <ActionButton icon="ban" label={user?.blocked?.isBlocked ? "Débloquer" : "Bloquer"} color={colors.status.error} bgColor={colors.feedback.errorBg} onPress={onBlock} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: -30,
    zIndex: 10,
  },
  btn: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
});
