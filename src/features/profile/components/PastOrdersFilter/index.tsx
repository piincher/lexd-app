import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ShippingMode, FILTER_OPTIONS } from "../../hooks/pastOrdersConstants";
import { createStyles } from "./PastOrdersFilter.styles";

interface PastOrdersFilterProps {
  mode: ShippingMode;
  onChange: (mode: ShippingMode) => void;
}

export const PastOrdersFilter: React.FC<PastOrdersFilterProps> = ({
  mode,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((option) => {
          const isSelected = mode === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={[styles.filterChip, isSelected && styles.filterChipActive]}
            >
              <MaterialCommunityIcons
                name={option.icon}
                size={18}
                color={isSelected ? colors.text.inverse : colors.text.secondary}
              />
              <Text style={isSelected ? styles.filterChipTextActive : styles.filterChipText}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
