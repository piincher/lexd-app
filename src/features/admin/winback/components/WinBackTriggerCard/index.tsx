import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./WinBackTriggerCard.styles";
import type { WinBackConfig } from "../../api/winBackApi";

const TRIGGER_LABELS: Record<string, string> = {
  NO_SHIPMENT_30D: "Aucune expédition (30j)",
  NO_APP_OPEN_14D: "Inactif sur l'app (14j)",
  GOODS_UNPAID: "Marchandises non payées",
  INVOICE_ABANDONED: "Facture abandonnée",
};

const TRIGGER_ICONS: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>["name"]> = {
  NO_SHIPMENT_30D: "package-variant-closed",
  NO_APP_OPEN_14D: "cellphone-off",
  GOODS_UNPAID: "cash-remove",
  INVOICE_ABANDONED: "file-document-remove",
};

type WinBackTriggerCardProps = {
  config: WinBackConfig;
  onToggle: (config: WinBackConfig) => void;
  onEdit: (config: WinBackConfig) => void;
  onPreview: (config: WinBackConfig) => void;
};

export function WinBackTriggerCard({ config, onToggle, onEdit, onPreview }: WinBackTriggerCardProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const isEnabled = config.enabled;

  return (
    <View style={[styles.card, !isEnabled && styles.cardDisabled]}>
      <View style={styles.header}>
        <View style={styles.iconRow}>
          <View style={[styles.iconCircle, { backgroundColor: isEnabled ? colors.primary.main + "15" : colors.neutral[200] }]}>
            <MaterialCommunityIcons
              name={TRIGGER_ICONS[config.triggerType] || "bell-outline"}
              size={22}
              color={isEnabled ? colors.primary.main : colors.text.disabled}
            />
          </View>
          <View style={styles.titleCol}>
            <Text style={[styles.title, !isEnabled && styles.textDisabled]}>
              {TRIGGER_LABELS[config.triggerType] || config.triggerType}
            </Text>
            <Text style={styles.subtitle}>
              Priorité {config.priority} · Max {config.maxPerDay}/jour
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.toggle, isEnabled && styles.toggleActive]}
          onPress={() => onToggle(config)}
          activeOpacity={0.7}
        >
          <View style={[styles.toggleKnob, isEnabled && styles.toggleKnobActive]} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Cooldown</Text>
          <Text style={styles.detailValue}>{config.cooldownDays}j</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Global</Text>
          <Text style={styles.detailValue}>{config.globalCooldownDays}j</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Canaux</Text>
          <Text style={styles.detailValue}>{config.channels.length}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Promo</Text>
          <Text style={styles.detailValue}>
            {config.includePromoCode ? `${config.promoCodeValue}${config.promoCodeType === "PERCENTAGE" ? "%" : " XOF"}` : "Non"}
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onPreview(config)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="eye-outline" size={16} color={colors.primary.main} />
          <Text style={[styles.actionText, { color: colors.primary.main }]}>Aperçu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(config)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="pencil-outline" size={16} color={colors.text.secondary} />
          <Text style={[styles.actionText, { color: colors.text.secondary }]}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
