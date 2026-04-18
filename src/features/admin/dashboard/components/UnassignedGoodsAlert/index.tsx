import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface UnassignedGoodsAlertProps {
  total: number;
  byShippingMode: { AIR: number; SEA: number };
  byAge: { "0-3": number; "4-7": number; "8+": number };
  onPress: () => void;
}

export const UnassignedGoodsAlert: React.FC<UnassignedGoodsAlertProps> = ({
  total,
  byShippingMode,
  byAge,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const hasUnassigned = total > 0;

  const gradient = hasUnassigned
    ? (["#F97316", "#EA580C", "#C2410C"] as const)
    : (["#10B981", "#059669", "#047857"] as const);

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
          paddingBottom: hasUnassigned ? 22 : 18,
        },
        decor: {
          position: "absolute",
          top: -30,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: hasUnassigned ? 16 : 10,
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
        count: {
          fontSize: 42,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -1.5,
        },
        countLabel: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.82)",
          marginTop: 2,
        },
        successText: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: "#FFF",
        },
        successSubtext: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.82)",
          marginTop: 2,
        },
        breakdown: {
          padding: 14,
        },
        row: {
          flexDirection: "row",
          gap: 8,
          marginBottom: 10,
        },
        modePill: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          padding: 10,
          borderRadius: 12,
          backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        },
        modeIconWrap: {
          width: 30,
          height: 30,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        modeValue: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        modeLabel: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textTransform: "uppercase",
          letterSpacing: 0.4,
          marginTop: 1,
        },
        ageRow: {
          flexDirection: "row",
          gap: 8,
        },
        agePill: {
          flex: 1,
          alignItems: "center",
          paddingVertical: 8,
          borderRadius: 10,
          backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        },
        agePillCritical: {
          backgroundColor: isDark ? "rgba(239,68,68,0.18)" : "#FEE2E2",
        },
        ageValue: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        ageValueCritical: {
          color: "#EF4444",
        },
        ageLabel: {
          fontSize: 10,
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
          marginTop: 1,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        },
        ageLabelCritical: {
          color: "#EF4444",
        },
        footer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          paddingVertical: 11,
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
    [colors, isDark, hasUnassigned]
  );

  const shippingModes = [
    {
      key: "AIR" as const,
      label: "Air",
      icon: "airplane",
      color: "#3B82F6",
      value: byShippingMode.AIR,
    },
    {
      key: "SEA" as const,
      label: "Maritime",
      icon: "ferry",
      color: "#0EA5E9",
      value: byShippingMode.SEA,
    },
  ];

  const ageRanges = [
    { key: "0-3" as const, label: "0-3j", value: byAge["0-3"], critical: false },
    { key: "4-7" as const, label: "4-7j", value: byAge["4-7"], critical: false },
    { key: "8+" as const, label: "8+j", value: byAge["8+"], critical: true },
  ];

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
        <View style={styles.decor} />

        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons
              name={hasUnassigned ? "package-variant-closed-remove" : "check-decagram"}
              size={22}
              color="#FFF"
            />
          </View>
          <View>
            <Text style={styles.title}>
              {hasUnassigned ? "Marchandises non assignées" : "Tout est assigné"}
            </Text>
            <Text style={styles.subtitle}>
              {hasUnassigned ? "À répartir vers un conteneur" : "Aucune action requise"}
            </Text>
          </View>
        </View>

        {hasUnassigned ? (
          <>
            <Text style={styles.count}>{total}</Text>
            <Text style={styles.countLabel}>colis en attente</Text>
          </>
        ) : (
          <>
            <Text style={styles.successText}>Excellent travail 🎉</Text>
            <Text style={styles.successSubtext}>
              Toutes les marchandises ont été assignées
            </Text>
          </>
        )}
      </LinearGradient>

      {hasUnassigned && (
        <View style={styles.breakdown}>
          <View style={styles.row}>
            {shippingModes.map((mode) => (
              <View key={mode.key} style={styles.modePill}>
                <View
                  style={[
                    styles.modeIconWrap,
                    { backgroundColor: mode.color + "20" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={mode.icon as any}
                    size={16}
                    color={mode.color}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.modeValue}>{mode.value}</Text>
                  <Text style={styles.modeLabel}>{mode.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.ageRow}>
            {ageRanges.map((age) => {
              const isCritical = age.critical && age.value > 0;
              return (
                <View
                  key={age.key}
                  style={[styles.agePill, isCritical && styles.agePillCritical]}
                >
                  <Text
                    style={[styles.ageValue, isCritical && styles.ageValueCritical]}
                  >
                    {age.value}
                  </Text>
                  <Text
                    style={[styles.ageLabel, isCritical && styles.ageLabelCritical]}
                  >
                    {age.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {hasUnassigned ? "Voir tous les colis" : "Voir les marchandises"}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          color={colors.text.secondary}
        />
      </View>
    </Pressable>
  );
};

export default UnassignedGoodsAlert;
