import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { PromoRecord, PromoStatus } from "../../api/promoAdminApi";
import { createStyles } from './PromoCard.styles';

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateString;
  }
};

const getStatusColor = (colors: any, status: PromoStatus) => {
  switch (status) {
    case "ACTIVE":
      return { bg: colors.status.success + "15", text: colors.status.success };
    case "INACTIVE":
      return { bg: colors.status.error + "15", text: colors.status.error };
    case "EXPIRED":
      return { bg: colors.neutral[100], text: colors.text.disabled };
    default:
      return { bg: colors.neutral[100], text: colors.text.disabled };
  }
};

const getStatusLabel = (status: PromoStatus) => {
  switch (status) {
    case "ACTIVE": return "Actif";
    case "INACTIVE": return "Inactif";
    case "EXPIRED": return "Expiré";
    default: return status;
  }
};

type PromoCardProps = {
  promo: PromoRecord;
  onEdit: (promo: PromoRecord) => void;
  onDeactivate: (promo: PromoRecord) => void;
  onStats: (promo: PromoRecord) => void;
  onClone: (promo: PromoRecord) => void;
};

export function PromoCard({ promo, onEdit, onDeactivate, onStats, onClone }: PromoCardProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const statusColors = getStatusColor(colors, promo.status);
  const isPercentage = promo.type === "PERCENTAGE";
  const usagePercent = promo.maxUsages ? Math.min(100, (promo.currentUsages / promo.maxUsages) * 100) : 0;
  const isNearLimit = usagePercent >= 90 && promo.status === "ACTIVE";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.promoCode}>{promo.code}</Text>
          <Text style={styles.promoName}>{promo.name}</Text>
        </View>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: isPercentage ? colors.status.info + "15" : colors.status.warning + "15" }]}>
            <Text style={[styles.badgeText, { color: isPercentage ? colors.status.info : colors.status.warning }]}>
              {isPercentage ? "Pourcentage" : "Fixe"}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.badgeText, { color: statusColors.text }]}>
              {getStatusLabel(promo.status)}
            </Text>
          </View>
        </View>
      </View>

      {/* Usage progress bar */}
      {promo.maxUsages != null && (
        <View style={styles.usageRow}>
          <View style={[styles.usageTrack, { backgroundColor: colors.neutral[200] }]}>
            <View
              style={[
                styles.usageFill,
                { width: `${usagePercent}%`, backgroundColor: isNearLimit ? colors.status.error : colors.primary.main },
              ]}
            />
          </View>
          <Text style={[styles.usageText, isNearLimit && { color: colors.status.error }]}>
            {promo.currentUsages}/{promo.maxUsages}
          </Text>
        </View>
      )}

      <View style={styles.cardRow}>
        <MaterialCommunityIcons name="tag-outline" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {isPercentage ? `${promo.value}%` : `${promo.value} FCFA`}
          {promo.maxDiscount != null ? ` (max ${promo.maxDiscount} FCFA)` : ""}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <Ionicons name="calendar-outline" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {formatDate(promo.validFrom)} — {formatDate(promo.validUntil)}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <MaterialIcons name="people-outline" size={16} color={colors.text.secondary} />
        <Text style={styles.cardRowText}>
          {promo.currentUsages}/{promo.maxUsages ?? "∞"} utilisations
        </Text>
      </View>

      {promo.minOrderAmount != null && (
        <View style={styles.cardRow}>
          <MaterialIcons name="attach-money" size={16} color={colors.text.secondary} />
          <Text style={styles.cardRowText}>Min. commande : {promo.minOrderAmount} FCFA</Text>
        </View>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.statsButton} onPress={() => onStats(promo)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="chart-bar" size={16} color={colors.primary.main} />
          <Text style={styles.statsButtonText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cloneButton} onPress={() => onClone(promo)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="content-copy" size={16} color={colors.accent.gold} />
          <Text style={styles.cloneButtonText}>Dupliquer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(promo)} activeOpacity={0.7}>
          <MaterialIcons name="edit" size={16} color={colors.primary.main} />
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
        {promo.status === "ACTIVE" && (
          <TouchableOpacity style={styles.deactivateButton} onPress={() => onDeactivate(promo)} activeOpacity={0.7}>
            <MaterialIcons name="block" size={16} color={colors.status.error} />
            <Text style={styles.deactivateButtonText}>Désactiver</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
