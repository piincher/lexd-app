import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./AtRiskCustomerCard.styles";
import type { AtRiskCustomer } from "../../types";

type AtRiskCustomerCardProps = {
  customer: AtRiskCustomer;
  onWhatsApp: (customer: AtRiskCustomer) => void;
  onCall: (customer: AtRiskCustomer) => void;
  onDetail: (customer: AtRiskCustomer) => void;
  onWinBack: (customer: AtRiskCustomer) => void;
};

export function AtRiskCustomerCard({ customer, onWhatsApp, onCall, onDetail, onWinBack }: AtRiskCustomerCardProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const initials = `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase();
  const name = `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "Client inconnu";

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

  const hasPhone = !!customer.phoneNumber;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={() => onDetail(customer)} activeOpacity={0.7}>
        <View style={[styles.avatar, { backgroundColor: riskColor + "15" }]}>
          <Text style={[styles.avatarText, { color: riskColor }]}>{initials}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.metaRow}>
            <View style={[styles.badge, { backgroundColor: riskColor + "12" }]}>
              <Text style={[styles.badgeText, { color: riskColor }]}>{riskLabel}</Text>
            </View>
          </View>
          {customer.phoneNumber && (
            <Text style={styles.phone}>{customer.phoneNumber}</Text>
          )}
          {customer.totalShipments > 0 && (
            <Text style={styles.shipmentMeta}>
              {customer.totalShipments} envoi{customer.totalShipments > 1 ? "s" : ""}
              {customer.totalCBM > 0 ? ` · ${customer.totalCBM.toFixed(2)} CBM` : ""}
            </Text>
          )}
          {customer.lastRoute && (
            <Text style={styles.route} numberOfLines={1}>
              Dernière route: {customer.lastRoute}
            </Text>
          )}
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.disabled} />
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.whatsappBtn, !hasPhone && styles.actionBtnDisabled]}
          onPress={() => onWhatsApp(customer)}
          disabled={!hasPhone}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="whatsapp" size={16} color={hasPhone ? "#25D366" : colors.text.disabled} />
          <Text style={[styles.actionText, { color: hasPhone ? "#25D366" : colors.text.disabled }]}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.callBtn, !hasPhone && styles.actionBtnDisabled]}
          onPress={() => onCall(customer)}
          disabled={!hasPhone}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="phone" size={16} color={hasPhone ? colors.status.info : colors.text.disabled} />
          <Text style={[styles.actionText, { color: hasPhone ? colors.status.info : colors.text.disabled }]}>Appeler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.winbackBtn]}
          onPress={() => onWinBack(customer)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="send" size={16} color={colors.primary.main} />
          <Text style={[styles.actionText, { color: colors.primary.main }]}>Win-back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
