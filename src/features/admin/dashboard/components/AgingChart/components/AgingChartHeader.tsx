import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface Props {
  hasCritical: boolean;
}

export const AgingChartHeader: React.FC<Props> = ({ hasCritical }) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          backgroundColor: isDark
            ? hasCritical
              ? "rgba(239,68,68,0.18)"
              : "rgba(14,165,233,0.18)"
            : hasCritical
            ? "#FEE2E2"
            : "#DBEAFE",
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
      }),
    [colors, isDark, hasCritical]
  );

  return (
    <View style={styles.header}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={hasCritical ? "clock-alert" : "chart-timeline-variant"}
          size={18}
          color={hasCritical ? "#EF4444" : "#0EA5E9"}
        />
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Ancienneté des impayés</Text>
        <Text style={styles.subtitle}>Répartition par âge</Text>
      </View>
    </View>
  );
};
