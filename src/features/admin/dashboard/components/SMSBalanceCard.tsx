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
    status: "success" | "warning" | "danger";
    daysRemaining?: number;
    expirationDateShort?: string | null;
    hasExpired?: boolean;
    hasExpiringSoon?: boolean;
  };
}

const STATUS_META = (colors: any): Record<
  SMSBalanceCardProps["balance"]["status"],
  { label: string; color: string; icon: string; gradient: readonly [string, string, string] }
> => ({
  success: {
    label: "Bon niveau",
    color: colors.status.success,
    icon: "check-circle",
    gradient: ["#10B981", "#059669", "#047857"] as const,
  },
  warning: {
    label: "Bientôt bas",
    color: colors.status.warning,
    icon: "alert",
    gradient: ["#F59E0B", "#D97706", "#B45309"] as const,
  },
  danger: {
    label: "Critique",
    color: colors.status.error,
    icon: "alert-octagon",
    gradient: ["#EF4444", "#DC2626", "#B91C1C"] as const,
  },
});

export const SMSBalanceCard: React.FC<SMSBalanceCardProps> = ({ balance }) => {
  const { colors, isDark } = useAppTheme();
  const meta = STATUS_META(colors)[balance.status] || STATUS_META(colors).success;
  const showExpiry = balance.hasExpired || balance.hasExpiringSoon || (balance.daysRemaining !== undefined && balance.daysRemaining <= 30);
  const progressWidth = balance.hasExpired ? 5 : balance.hasExpiringSoon ? 25 : Math.min(100, Math.max(10, balance.totalUnits / 3));

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
          color: colors.text.inverse,
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
          color: colors.text.inverse,
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
          color: colors.text.inverse,
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
          backgroundColor: Theme.colors.background.card,
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
          color: colors.text.inverse,
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
              <MaterialCommunityIcons name="message-badge" size={20} color={colors.text.inverse} />
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
              color={colors.text.inverse}
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
            style={[styles.progressFill, { width: `${progressWidth}%` }]}
          />
        </View>

        {showExpiry && balance.expirationDateShort ? (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              <Text style={[styles.footerStrong, { color: meta.color }]}>
                {balance.hasExpired ? 'Expiré' : balance.daysRemaining + ' jours'}
              </Text>
              {' '}restants
            </Text>
            <Text style={styles.footerText}>
              Expire le <Text style={styles.footerStrong}>{balance.expirationDateShort}</Text>
            </Text>
          </View>
        ) : (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              <Text style={styles.footerStrong}>{balance.totalUnits.toLocaleString()}</Text> SMS disponibles
            </Text>
            <Text style={styles.footerText}>
              Statut <Text style={[styles.footerStrong, { color: meta.color }]}>{meta.label}</Text>
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default SMSBalanceCard;
