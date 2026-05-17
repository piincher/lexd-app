import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
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

  const gradient = isCritical
    ? Theme.gradients.sunset
    : Theme.gradients.ocean;

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          color: colors.text.inverse,
          letterSpacing: -0.2,
        },
        heroSubtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.inverse,
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
          color: colors.text.inverse,
          fontSize: 10,
          fontFamily: Fonts.bold,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },
        amount: {
          fontSize: 32,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
          letterSpacing: -1,
        },
        amountLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.inverse,
          marginTop: 2,
        },
      }),
    [colors, isDark]
  );

  return (
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
            <MaterialCommunityIcons name="cash-multiple" size={22} color={colors.text.inverse} />
          </View>
          <View>
            <Text style={styles.heroTitle}>Paiements en attente</Text>
            <Text style={styles.heroSubtitle}>Vue d'ensemble</Text>
          </View>
        </View>
        {isCritical && (
          <View style={styles.criticalBadge}>
            <MaterialCommunityIcons name="alert-octagon" size={11} color={colors.text.inverse} />
            <Text style={styles.criticalText}>Critique</Text>
          </View>
        )}
      </View>

      <Text style={styles.amount}>{formatCurrency(totalOutstanding)}</Text>
      <Text style={styles.amountLabel}>Total dû par les clients</Text>
    </LinearGradient>
  );
};
