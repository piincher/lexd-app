import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useClipboard } from "../../hooks/useClipboard";
import type { CreatedUserSummary } from "../../api/userApi";
import { styles } from "./RegistrationSuccessCard.styles";

interface RegistrationSuccessCardProps {
  client: CreatedUserSummary;
  onCreateAnother: () => void;
  onViewDetails: () => void;
  onShareWithSupplier: () => void;
}

interface DetailRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  copyLabel?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value, copyLabel }) => {
  const { colors } = useAppTheme();
  const { copy } = useClipboard();
  const displayValue = value?.trim() || "Non renseigné";
  const canCopy = !!value?.trim();

  return (
    <View style={[styles.row, { borderBottomColor: colors.neutral[200] }]}>
      <View style={[styles.icon, { backgroundColor: `${colors.primary.main}15` }]}>
        <Ionicons name={icon} size={18} color={colors.primary.main} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.text.primary }]}>{displayValue}</Text>
      </View>
      {canCopy && (
        <Pressable
          accessibilityLabel={`Copier ${label}`}
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => copy(displayValue, copyLabel || label)}
          style={styles.copyButton}
        >
          <Ionicons name="copy-outline" size={18} color={colors.text.secondary} />
        </Pressable>
      )}
    </View>
  );
};

export const RegistrationSuccessCard: React.FC<RegistrationSuccessCardProps> = ({
  client,
  onCreateAnother,
  onViewDetails,
  onShareWithSupplier,
}) => {
  const { colors } = useAppTheme();
  const fullName = [client.firstName, client.lastName].filter(Boolean).join(" ");

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.neutral[900] }]}>
      <View style={[styles.successIcon, { backgroundColor: `${colors.status.success}18` }]}>
        <Ionicons name="checkmark-circle" size={34} color={colors.status.success} />
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>Client enregistré</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        Vérifiez les informations avant de continuer.
      </Text>

      <View style={styles.details}>
        <DetailRow icon="person-outline" label="Nom complet" value={fullName} />
        <DetailRow icon="call-outline" label="Téléphone" value={client.phoneNumber} copyLabel="Téléphone" />
        <DetailRow icon="qr-code-outline" label="ID client unique" value={client.shippingClientId} copyLabel="ID client" />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Partager la marque avec le fournisseur"
        onPress={onShareWithSupplier}
        style={[styles.primaryButton, { backgroundColor: colors.primary.main }]}
      >
        <Ionicons name="paper-plane-outline" size={20} color={colors.text.inverse} />
        <Text style={[styles.primaryButtonText, { color: colors.text.inverse }]}>Partager au fournisseur</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voir la fiche du client"
        onPress={onViewDetails}
        style={[styles.secondaryButton, { borderColor: colors.primary.main }]}
      >
        <Text style={[styles.secondaryButtonText, { color: colors.primary.main }]}>Voir la fiche client</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ajouter un autre client"
        onPress={onCreateAnother}
        style={styles.tertiaryButton}
      >
        <Ionicons name="add-outline" size={19} color={colors.text.secondary} />
        <Text style={[styles.tertiaryButtonText, { color: colors.text.secondary }]}>Ajouter un autre client</Text>
      </Pressable>
    </View>
  );
};
