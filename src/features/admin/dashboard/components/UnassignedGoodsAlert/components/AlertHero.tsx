import React from 'react';
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface AlertHeroProps {
  hasUnassigned: boolean;
  total: number;
}

export const AlertHero: React.FC<AlertHeroProps> = ({ hasUnassigned, total }) => {
  const { colors, isDark } = useAppTheme();
  const accent = hasUnassigned ? colors.status.error : colors.status.success;

  const styles = StyleSheet.create({
    heroPanel: {
      padding: 16,
      paddingBottom: hasUnassigned ? 18 : 16,
      backgroundColor: isDark ? accent + "16" : accent + "0F",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: hasUnassigned ? 16 : 10,
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
    title: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 1,
    },
    count: {
      fontSize: 42,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    countLabel: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
    successText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    successSubtext: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.heroPanel}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name={hasUnassigned ? "package-variant-closed-remove" : "check-decagram"}
            size={22}
            color={accent}
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
          <Text style={styles.count} numberOfLines={1} adjustsFontSizeToFit>
            {total}
          </Text>
          <Text style={styles.countLabel}>colis en attente</Text>
        </>
      ) : (
        <>
          <Text style={styles.successText}>Excellent travail</Text>
          <Text style={styles.successSubtext}>
            Toutes les marchandises ont été assignées
          </Text>
        </>
      )}
    </View>
  );
};
