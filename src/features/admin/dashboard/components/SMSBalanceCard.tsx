import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface SMSBalanceCardProps {
  balance: {
    totalUnits: number;
    percentageUsed: number;
    status: "success" | "warning" | "danger";
  };
}

const STATUS_META: Record<
  SMSBalanceCardProps["balance"]["status"],
  { label: string; color: string; icon: string; gradient: readonly [string, string, string] }
> = {
  success: {
    label: "Bon niveau",
    color: "#10B981",
    icon: "check-circle",
    gradient: ["#10B981", "#059669", "#047857"] as const,
  },
  warning: {
    label: "Bientôt bas",
    color: "#F59E0B",
    icon: "alert",
    gradient: ["#F59E0B", "#D97706", "#B45309"] as const,
  },
  danger: {
    label: "Critique",
    color: "#EF4444",
    icon: "alert-octagon",
    gradient: ["#EF4444", "#DC2626", "#B91C1C"] as const,
  },
};

export const SMSBalanceCard: React.FC<SMSBalanceCardProps> = ({ balance }) => {
  const { colors, isDark } = useAppTheme();
  const meta = STATUS_META[balance.status] || STATUS_META.success;
  const pctUsed = Math.round(balance.percentageUsed * 100);
  const pctRemaining = 100 - pctUsed;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 20,
          borderRadius: 20,
          overflow: "hidden",
          ...Theme.shadows.md,
        },
        gradient: {
          padding: 18,
        },
        decor: {
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        },
        headerLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        },
        iconWrap: {
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: "rgba(255,255,255,0.22)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.25)",
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -0.2,
        },
        subtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.8)",
          marginTop: 1,
        },
        statusBadge: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.25)",
        },
        statusText: {
          color: "#FFF",
          fontSize: 11,
          fontFamily: Fonts.bold,
        },
        valueRow: {
          flexDirection: "row",
          alignItems: "baseline",
          gap: 6,
          marginBottom: 12,
        },
        value: {
          fontSize: 32,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -1,
        },
        valueLabel: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.82)",
        },
        progressTrack: {
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.2)",
          overflow: "hidden",
          marginBottom: 8,
        },
        progressFill: {
          height: "100%",
          backgroundColor: "#FFF",
          borderRadius: 4,
        },
        footer: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        footerText: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.85)",
        },
        footerStrong: {
          fontFamily: Fonts.bold,
          color: "#FFF",
        },
      }),
    [colors, isDark]
  );

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={meta.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.decor} />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="message-badge" size={20} color="#FFF" />
            </View>
            <View>
              <Text style={styles.title}>Crédits SMS</Text>
              <Text style={styles.subtitle}>Solde disponible</Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <MaterialCommunityIcons
              name={meta.icon as any}
              size={12}
              color="#FFF"
            />
            <Text style={styles.statusText}>{meta.label}</Text>
          </View>
        </View>

        <View style={styles.valueRow}>
          <Text style={styles.value}>{balance.totalUnits.toLocaleString()}</Text>
          <Text style={styles.valueLabel}>SMS restants</Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${Math.max(2, pctRemaining)}%` }]}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={styles.footerStrong}>{pctUsed}%</Text> utilisés
          </Text>
          <Text style={styles.footerText}>
            <Text style={styles.footerStrong}>{pctRemaining}%</Text> disponibles
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SMSBalanceCard;
