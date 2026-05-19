import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const CardFooter: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        footer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 11,
          gap: 4,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
          backgroundColor: colors.action.hover,
        },
        footerText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.secondary,
        },
      }),
    [colors, isDark]
  );

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Voir les détails</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={16}
        color={colors.text.secondary}
      />
    </View>
  );
};
