import React from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./RoleFilterChips.styles";

interface RoleFilterChipsProps {
  options: Record<string, string>;
  active: string;
  onChange: (value: any) => void;
}

export const RoleFilterChips: React.FC<RoleFilterChipsProps> = ({ options, active, onChange }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {Object.entries(options).map(([key, label]) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onChange(key)}
            activeOpacity={0.8}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default RoleFilterChips;
