import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface CardHeroProps {
  totalOutstanding: number;
}

const CRITICAL_THRESHOLD = 1_000_000;

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export const CardHero: React.FC<CardHeroProps> = ({ totalOutstanding }) => {
  const { colors, isDark } = useAppTheme();
  const isCritical = totalOutstanding > CRITICAL_THRESHOLD;
  const accent = isCritical ? colors.status.error : colors.status.info;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        heroPanel: {
          padding: 16,
          paddingBottom: 18,
          backgroundColor: isDark ? accent + "16" : accent + "0F",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
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
          width: 44,
          height: 44,
          minWidth: 44,
          borderRadius: 12,
          backgroundColor: accent + "18",
          borderWidth: 1,
          borderColor: accent + "30",
          justifyContent: "center",
          alignItems: "center",
        },
        heroTitle: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        heroSubtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 1,
        },
        criticalBadge: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          backgroundColor: accent + "18",
          borderWidth: 1,
          borderColor: accent + "30",
        },
        criticalText: {
          color: accent,
          fontSize: 10,
          fontFamily: Fonts.bold,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },
        amount: {
          fontSize: 32,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        amountLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
      }),
    [accent, colors, isDark]
  );

  return (
    <View style={styles.heroPanel}>
      <View style={styles.heroHeader}>
        <View style={styles.heroHeaderLeft}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="cash-multiple" size={22} color={accent} />
          </View>
          <View>
            <Text style={styles.heroTitle}>Paiements en attente</Text>
            <Text style={styles.heroSubtitle}>Vue globale</Text>
          </View>
        </View>
        {isCritical && (
          <View style={styles.criticalBadge}>
            <MaterialCommunityIcons name="alert-octagon" size={11} color={accent} />
            <Text style={styles.criticalText}>Critique</Text>
          </View>
        )}
      </View>

      <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
        {formatCurrency(totalOutstanding)}
      </Text>
      <Text style={styles.amountLabel}>Total dû par les clients</Text>
    </View>
  );
};
