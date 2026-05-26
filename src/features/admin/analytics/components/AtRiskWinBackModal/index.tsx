import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AtRiskWinBackModal.styles";
import type { AtRiskCustomer } from "../../types";

const TRIGGERS = [
  { key: "inactivity_30", label: "30 jours d'inactivité", icon: "sleep" },
  { key: "inactivity_60", label: "60 jours d'inactivité", icon: "sleep" },
  { key: "inactivity_90", label: "90 jours d'inactivité", icon: "sleep" },
  { key: "abandoned_cart", label: "Panier abandonné", icon: "cart-off" },
  { key: "special_offer", label: "Offre spéciale", icon: "gift-outline" },
] as const;

type AtRiskWinBackModalProps = {
  visible: boolean;
  customer: AtRiskCustomer | null;
  onClose: () => void;
  onTrigger: (userId: string, triggerType: string) => Promise<void>;
  isPending: boolean;
};

export function AtRiskWinBackModal({ visible, customer, onClose, onTrigger, isPending }: AtRiskWinBackModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  const [selected, setSelected] = useState<string>("inactivity_30");

  if (!customer) return null;

  const name = `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "Client";

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Envoyer Win-back</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={22} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle} numberOfLines={1}>
            À: {name}
          </Text>

          <View style={styles.triggerList}>
            {TRIGGERS.map((t) => (
              <TouchableOpacity
                key={t.key}
                style={[styles.triggerItem, selected === t.key && styles.triggerItemActive]}
                onPress={() => setSelected(t.key)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={t.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                  size={20}
                  color={selected === t.key ? colors.primary.main : colors.text.secondary}
                />
                <Text style={[styles.triggerText, selected === t.key && styles.triggerTextActive]}>{t.label}</Text>
                {selected === t.key && (
                  <MaterialCommunityIcons name="check-circle" size={18} color={colors.primary.main} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.triggerBtn, isPending && styles.triggerBtnDisabled]}
            onPress={() => onTrigger(customer.userId, selected)}
            disabled={isPending}
            activeOpacity={0.7}
          >
            {isPending ? (
              <ActivityIndicator size="small" color={colors.text.inverse} />
            ) : (
              <>
                <MaterialCommunityIcons name="send" size={16} color={colors.text.inverse} />
                <Text style={styles.triggerBtnText}>Envoyer</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
