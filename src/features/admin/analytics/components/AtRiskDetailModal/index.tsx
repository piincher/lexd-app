import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { AppTheme } from "@src/constants/Theme";
import { getStyles } from "./AtRiskDetailModal.styles";
import type { AtRiskCustomer } from "../../types";

type ThemeColors = AppTheme['colors'];

type AtRiskDetailModalProps = {
  visible: boolean;
  customer: AtRiskCustomer | null;
  onClose: () => void;
  onWhatsApp: (c: AtRiskCustomer) => void;
  onCall: (c: AtRiskCustomer) => void;
  onWinBack: (c: AtRiskCustomer) => void;
};

export function AtRiskDetailModal({ visible, customer, onClose, onWhatsApp, onCall, onWinBack }: AtRiskDetailModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (!customer) return null;

  const riskColor = customer.neverShipped
    ? colors.status.error
    : customer.daysInactive >= 120
    ? colors.status.error
    : customer.daysInactive >= 90
    ? colors.status.warning
    : colors.status.info;

  const riskLabel = customer.neverShipped
    ? "Jamais expédié"
    : `${customer.daysInactive} jours inactif`;

  const initials = `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase();
  const name = `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "Client inconnu";
  const hasPhone = !!customer.phoneNumber;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                <MaterialCommunityIcons name="close" size={22} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={[styles.avatar, { backgroundColor: riskColor + "15" }]}>
              <Text style={[styles.avatarText, { color: riskColor }]}>{initials}</Text>
            </View>

            <Text style={styles.name}>{name}</Text>

            <View style={[styles.badge, { backgroundColor: riskColor + "12" }]}>
              <Text style={[styles.badgeText, { color: riskColor }]}>{riskLabel}</Text>
            </View>

            <View style={styles.details}>
              <DetailRow icon="email-outline" label="Email" value={customer.email || "Non renseigné"} colors={colors} />
              <DetailRow icon="phone-outline" label="Téléphone" value={customer.phoneNumber || "Non renseigné"} colors={colors} />
              <DetailRow icon="package-variant-closed" label="Total envois" value={String(customer.totalShipments)} colors={colors} />
              <DetailRow icon="cube-outline" label="Total CBM" value={customer.totalCBM > 0 ? `${customer.totalCBM.toFixed(2)} CBM` : "N/A"} colors={colors} />
              <DetailRow icon="map-marker-path" label="Dernière route" value={customer.lastRoute || "N/A"} colors={colors} />
              <DetailRow
                icon="calendar-clock"
                label="Dernier envoi"
                value={customer.lastShipmentAt ? new Date(customer.lastShipmentAt).toLocaleDateString("fr-FR") : "Jamais"}
                colors={colors}
              />
            </View>
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.whatsappBtn, !hasPhone && styles.actionBtnDisabled]}
              onPress={() => onWhatsApp(customer)}
              disabled={!hasPhone}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="whatsapp" size={18} color={hasPhone ? "#25D366" : colors.text.disabled} />
              <Text style={[styles.actionText, { color: hasPhone ? "#25D366" : colors.text.disabled }]}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn, !hasPhone && styles.actionBtnDisabled]}
              onPress={() => onCall(customer)}
              disabled={!hasPhone}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="phone" size={18} color={hasPhone ? colors.status.info : colors.text.disabled} />
              <Text style={[styles.actionText, { color: hasPhone ? colors.status.info : colors.text.disabled }]}>Appeler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.winbackBtn]}
              onPress={() => { onClose(); onWinBack(customer); }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="send" size={18} color={colors.primary.main} />
              <Text style={[styles.actionText, { color: colors.primary.main }]}>Win-back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function DetailRow({ icon, label, value, colors }: { icon: string; label: string; value: string; colors: ThemeColors }) {
  const { isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.detailRow}>
      <MaterialCommunityIcons name={icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={18} color={colors.text.secondary} />
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue} numberOfLines={1}>{value}</Text>
      </View>
    </View>
  );
}
