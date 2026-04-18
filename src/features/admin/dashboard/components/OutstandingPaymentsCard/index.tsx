import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface OutstandingPaymentsCardProps {
  totalOutstanding: number;
  counts: { UNPAID: number; PARTIAL: number; PAID: number };
  onPress: () => void;
}

const CRITICAL_THRESHOLD = 1_000_000;

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export const OutstandingPaymentsCard: React.FC<OutstandingPaymentsCardProps> = ({
  totalOutstanding,
  counts,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const isCritical = totalOutstanding > CRITICAL_THRESHOLD;

  const gradient = isCritical
    ? (["#EF4444", "#DC2626", "#B91C1C"] as const)
    : (["#0EA5E9", "#0284C7", "#0369A1"] as const);

  const statusConfig = [
    {
      key: "UNPAID" as const,
      label: "Impayés",
      icon: "alert-circle",
      color: "#EF4444",
    },
    {
      key: "PARTIAL" as const,
      label: "Partiels",
      icon: "progress-clock",
      color: "#F59E0B",
    },
    {
      key: "PAID" as const,
      label: "Payés",
      icon: "check-circle",
      color: "#10B981",
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 16,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          ...Theme.shadows.md,
        },
        heroGradient: {
          padding: 18,
          paddingBottom: 22,
        },
        heroDecor: {
          position: "absolute",
          top: -30,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        heroHeader: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        },
        heroHeaderLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        },
        iconWrap: {
          width: 40,
          height: 40,
          borderRadius: 13,
          backgroundColor: "rgba(255,255,255,0.22)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.25)",
          justifyContent: "center",
          alignItems: "center",
        },
        heroTitle: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -0.2,
        },
        heroSubtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.8)",
          marginTop: 1,
        },
        criticalBadge: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.3)",
        },
        criticalText: {
          color: "#FFF",
          fontSize: 10,
          fontFamily: Fonts.bold,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },
        amount: {
          fontSize: 32,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -1,
        },
        amountLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.82)",
          marginTop: 2,
        },
        statusRow: {
          flexDirection: "row",
          paddingVertical: 14,
          paddingHorizontal: 12,
        },
        statusItem: {
          flex: 1,
          alignItems: "center",
        },
        statusIconWrap: {
          width: 34,
          height: 34,
          borderRadius: 11,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 6,
        },
        statusCount: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        statusLabel: {
          fontSize: 10,
          fontFamily: Fonts.bold,
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        },
        statusDivider: {
          width: 1,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          marginVertical: 4,
        },
        footer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 11,
          gap: 4,
          borderTopWidth: 1,
          borderTopColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
          backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
        },
        footerText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
        },
      }),
    [colors, isDark]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.92 },
      ]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        <View style={styles.heroDecor} />

        <View style={styles.heroHeader}>
          <View style={styles.heroHeaderLeft}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="cash-multiple" size={22} color="#FFF" />
            </View>
            <View>
              <Text style={styles.heroTitle}>Paiements en attente</Text>
              <Text style={styles.heroSubtitle}>Vue d'ensemble</Text>
            </View>
          </View>
          {isCritical && (
            <View style={styles.criticalBadge}>
              <MaterialCommunityIcons name="alert-octagon" size={11} color="#FFF" />
              <Text style={styles.criticalText}>Critique</Text>
            </View>
          )}
        </View>

        <Text style={styles.amount}>{formatCurrency(totalOutstanding)}</Text>
        <Text style={styles.amountLabel}>Total dû par les clients</Text>
      </LinearGradient>

      <View style={styles.statusRow}>
        {statusConfig.map((status, idx) => (
          <React.Fragment key={status.key}>
            <View style={styles.statusItem}>
              <View
                style={[
                  styles.statusIconWrap,
                  { backgroundColor: status.color + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={status.icon as any}
                  size={18}
                  color={status.color}
                />
              </View>
              <Text style={styles.statusCount}>{counts[status.key]}</Text>
              <Text style={[styles.statusLabel, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
            {idx < statusConfig.length - 1 && <View style={styles.statusDivider} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Voir les détails</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          color={colors.text.secondary}
        />
      </View>
    </Pressable>
  );
};

export default OutstandingPaymentsCard;
