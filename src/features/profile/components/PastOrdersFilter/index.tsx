import React from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ShippingMode, FILTER_OPTIONS } from "../../hooks/usePastOrders";
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
            <Chip
              key={option.value}
              selected={isSelected}
              onPress={() => onChange(option.value)}
              style={[styles.filterChip, isSelected && styles.filterChipActive]}
              textStyle={isSelected ? styles.filterChipTextActive : styles.filterChipText}
              icon={() => (
                <MaterialCommunityIcons
                  name={option.icon}
                  size={16}
                  color={isSelected ? colors.text.inverse : colors.text.secondary}
                />
              )}
            >
              {option.label}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};
