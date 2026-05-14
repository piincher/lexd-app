import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const AgingChartEmpty: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        empty: {
          alignItems: "center",
          paddingVertical: 24,
        },
        emptyIconWrap: {
          width: 48,
          height: 48,
          borderRadius: 16,
          backgroundColor: isDark ? "rgba(16,185,129,0.15)" : colors.feedback.successBg,
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

  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconWrap}>
        <MaterialCommunityIcons name="check-decagram" size={24} color={colors.status.success} />
      </View>
      <Text style={styles.emptyText}>Aucun impayé</Text>
      <Text style={styles.emptySubtext}>Situation saine</Text>
    </View>
  );
};
