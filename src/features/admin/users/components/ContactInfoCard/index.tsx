import React, { type ComponentProps } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useClipboard } from "../../hooks/useClipboard";
import { userData } from "@src/shared/types/user";

interface ContactInfoCardProps {
  user: userData | undefined;
}

type IconName = ComponentProps<typeof Ionicons>["name"];

const InfoRow: React.FC<{ icon: IconName; label: string; value?: string; onCopy?: () => void }> = ({
  icon, label, value, onCopy,
}) => {
  const { colors } = useAppTheme();
  if (!value) return null;
  return (
    <View style={[styles.row, { borderBottomColor: colors.neutral[200] }]}>
      <View style={[styles.iconCircle, { backgroundColor: `${colors.primary.main}15` }]}>
        <Ionicons name={icon} size={18} color={colors.primary.main} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.text.primary }]}>{value}</Text>
      </View>
      {onCopy && (
        <TouchableOpacity onPress={onCopy} style={styles.copyBtn} accessibilityRole="button" accessibilityLabel={`Copier ${label}`}>
          <Ionicons name="copy-outline" size={18} color={colors.text.disabled} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ user }) => {
  const { colors } = useAppTheme();
  const { copy } = useClipboard();

  return (
    <Animated.View entering={FadeInUp.delay(400).duration(500)} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Informations de Contact</Text>
      <InfoRow icon="qr-code-outline" label="ID client unique" value={user?.shippingClientId} onCopy={() => copy(user?.shippingClientId || "", "ID client")} />
      <InfoRow icon="call-outline" label="Téléphone" value={user?.phoneNumber} onCopy={() => copy(user?.phoneNumber || "", "Téléphone")} />
      <InfoRow icon="mail-outline" label="Email" value={user?.email} onCopy={() => copy(user?.email || "", "Email")} />
      <InfoRow icon="person-outline" label="Rôle" value={user?.role} />
      <InfoRow icon="shield-outline" label="Statut" value={user?.blocked?.isBlocked ? "Bloqué" : "Actif"} />
    </Animated.View>
  );
};

const styles = {
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "500" as const,
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: "600" as const,
  },
  copyBtn: {
    padding: 8,
  },
};
