import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const useTopClientsListStyles = () => {
  const { colors, isDark } = useAppTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          padding: 14,
          ...Theme.shadows.sm,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        },
        iconWrap: {
          width: 34,
          height: 34,
          borderRadius: 11,
          backgroundColor: isDark ? "rgba(245,158,11,0.18)" : "#FEF3C7",
          justifyContent: "center",
          alignItems: "center",
        },
        titleWrap: {
          flex: 1,
        },
        title: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.2,
        },
        subtitle: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 1,
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
        },
        rowLast: {
          borderBottomWidth: 0,
        },
        rankWrap: {
          width: 32,
          height: 32,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        rankText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
        },
        avatar: {
          width: 36,
          height: 36,
          borderRadius: 11,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          justifyContent: "center",
          alignItems: "center",
        },
        avatarText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        info: {
          flex: 1,
        },
        name: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        meta: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          marginTop: 2,
        },
        metaText: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        metaDot: {
          width: 3,
          height: 3,
          borderRadius: 1.5,
          backgroundColor: colors.text.secondary,
          opacity: 0.5,
        },
        amount: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: "#EF4444",
        },
        empty: {
          alignItems: "center",
          paddingVertical: 24,
        },
        emptyIconWrap: {
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#D1FAE5",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        },
        emptyText: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        emptySubtext: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 4,
        },
      }),
    [colors, isDark]
  );
};
