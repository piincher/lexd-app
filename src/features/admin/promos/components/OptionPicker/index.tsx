import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./OptionPicker.styles";

type OptionPickerProps<T extends string> = {
  label: string;
  options: { label: string; value: T }[];
  selected: T;
  onSelect: (value: T) => void;
};

export function OptionPicker<T extends string>({ label, options, selected, onSelect }: OptionPickerProps<T>) {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map((opt) => {
          const isSelected = opt.value === selected;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.optionChip, isSelected && styles.optionChipSelected]}
              onPress={() => onSelect(opt.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionChipText, isSelected && styles.optionChipTextSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
