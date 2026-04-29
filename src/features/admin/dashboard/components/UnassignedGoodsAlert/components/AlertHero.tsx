import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";

interface AlertHeroProps {
  hasUnassigned: boolean;
  total: number;
}

export const AlertHero: React.FC<AlertHeroProps> = ({ hasUnassigned, total }) => {
  const gradient = hasUnassigned
    ? (["#F97316", "#EA580C", "#C2410C"] as const)
    : (["#10B981", "#059669", "#047857"] as const);

  const styles = StyleSheet.create({
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
  });

  return (
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
  );
};
