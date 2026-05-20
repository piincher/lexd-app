import React from "react";
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { usePromoStats } from "../../hooks/usePromoQueries";
import type { PromoRecord } from "../../api/promoAdminApi";
import { getStyles } from "./PromoStatsModal.styles";

Dimensions.get("window");
const CHART_HEIGHT = 160;

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

function StatBox({ label, value, icon, color }: { label: string; value: string; icon: IconName; color: string }) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={[styles.statBox, { borderColor: color }]}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
      <Text style={[styles.statValue, { color }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function UsageTimeline({ data }: { data: { _id: string; count: number; discountGiven: number }[] }) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  if (!data || data.length === 0) return (
    <View style={styles.emptyTimeline}>
      <Text style={styles.emptyText}>Aucune donnée d&apos;utilisation</Text>
    </View>
  );

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Utilisations par jour</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timelineScroll}>
        {data.map((item) => {
          const barHeight = (item.count / maxCount) * CHART_HEIGHT;
          return (
            <View key={item._id} style={styles.timelineItem}>
              <View style={styles.barWrapper}>
                <View style={[styles.bar, { height: barHeight, backgroundColor: colors.primary.main }]} />
              </View>
              <Text style={styles.barCount}>{item.count}</Text>
              <Text style={styles.barDate}>{item._id.slice(5)}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

type PromoStatsModalProps = {
  visible: boolean;
  promo: PromoRecord | null;
  onClose: () => void;
};

export function PromoStatsModal({ visible, promo, onClose }: PromoStatsModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const { data: stats, isLoading, error } = usePromoStats(promo?._id ?? "", visible && !!promo);

  return (
    <Modal visible={visible} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {promo ? `${promo.code} — Statistiques` : "Statistiques"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.main} />
              <Text style={styles.loadingText}>Chargement des statistiques...</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
              <Text style={styles.errorText}>Impossible de charger les statistiques</Text>
              <TouchableOpacity style={styles.retryButton} onPress={onClose} activeOpacity={0.7}>
                <Text style={styles.retryText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLoading && !error && stats && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
              {/* Stat boxes */}
              <View style={styles.statsGrid}>
                <StatBox
                  label="Utilisations"
                  value={String(stats.totalUses ?? 0)}
                  icon="tag-multiple"
                  color={colors.primary.main}
                />
                <StatBox
                  label="Remise totale"
                  value={`$${(stats.totalDiscountGiven ?? 0).toFixed(2)}`}
                  icon="cash-multiple"
                  color={colors.status.success}
                />
                <StatBox
                  label="Utilisateurs uniques"
                  value={String(stats.uniqueUsers ?? 0)}
                  icon="account-multiple"
                  color={colors.status.info}
                />
                <StatBox
                  label="Remise moy."
                  value={`$${stats.totalUses > 0 ? ((stats.totalDiscountGiven ?? 0) / stats.totalUses).toFixed(2) : "0.00"}`}
                  icon="chart-line"
                  color={colors.status.warning}
                />
              </View>

              {/* Usage timeline */}
              <UsageTimeline data={stats.usageOverTime} />

              {/* Quick info */}
              {promo && (
                <View style={styles.promoInfo}>
                  <Text style={styles.promoInfoTitle}>Détails de la promotion</Text>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Type</Text>
                    <Text style={styles.infoValue}>
                      {promo.type === "PERCENTAGE" ? `${promo.value}%` : `$${promo.value}`}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Plafond max.</Text>
                    <Text style={styles.infoValue}>
                      {promo.maxDiscount ? `$${promo.maxDiscount}` : "Illimité"}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Commande min.</Text>
                    <Text style={styles.infoValue}>
                      {promo.minOrderAmount ? `$${promo.minOrderAmount}` : "Aucune"}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Usages max.</Text>
                    <Text style={styles.infoValue}>
                      {promo.maxUsages ? `${promo.currentUsages} / ${promo.maxUsages}` : "Illimité"}
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
