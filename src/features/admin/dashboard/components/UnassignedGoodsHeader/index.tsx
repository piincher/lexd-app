import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./UnassignedGoodsHeader.styles";

interface UnassignedGoodsHeaderProps {
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const UnassignedGoodsHeader: React.FC<UnassignedGoodsHeaderProps> = ({
  onBack,
  rightElement,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Marchandises Non Assignées</Text>
      <View style={styles.right}>
        {rightElement}
      </View>
    </View>
  );
};
