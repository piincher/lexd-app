import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface AgeBreakdownProps {
  byAge: { "0-3": number; "4-7": number; "8+": number };
}

export const AgeBreakdown: React.FC<AgeBreakdownProps> = ({ byAge }) => {
  const { colors, isDark } = useAppTheme();

  const styles = StyleSheet.create({
    ageRow: {
      flexDirection: "row",
      gap: 8,
    },
    agePill: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: colors.background.paper,
    },
    agePillCritical: {
      backgroundColor: colors.feedback.errorBg,
    },
    ageValue: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    ageValueCritical: {
      color: colors.status.error,
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
      color: colors.status.error,
    },
  });

  const ageRanges = [
    { key: "0-3" as const, label: "0-3j", value: byAge["0-3"], critical: false },
    { key: "4-7" as const, label: "4-7j", value: byAge["4-7"], critical: false },
    { key: "8+" as const, label: "8+j", value: byAge["8+"], critical: true },
  ];

  return (
    <View style={styles.ageRow}>
      {ageRanges.map((age) => {
        const isCritical = age.critical && age.value > 0;
        return (
          <View
            key={age.key}
            style={[styles.agePill, isCritical && styles.agePillCritical]}
          >
            <Text style={[styles.ageValue, isCritical && styles.ageValueCritical]}>
              {age.value}
            </Text>
            <Text style={[styles.ageLabel, isCritical && styles.ageLabelCritical]}>
              {age.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
