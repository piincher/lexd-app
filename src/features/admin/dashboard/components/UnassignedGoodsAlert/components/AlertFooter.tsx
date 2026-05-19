import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface AlertFooterProps {
  hasUnassigned: boolean;
}

type AppThemeColors = ReturnType<typeof useAppTheme>["colors"];

const createStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      paddingVertical: 11,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background.default,
    },
    footerText: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
    },
  });

export const AlertFooter: React.FC<AlertFooterProps> = ({ hasUnassigned }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
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
  );
};
