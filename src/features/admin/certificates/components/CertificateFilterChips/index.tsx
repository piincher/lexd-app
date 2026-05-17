import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { FILTER_CHIPS } from "../../hooks/useCertificateHistory";
import { getStyles } from "./CertificateFilterChips.styles";

interface CertificateFilterChipsProps {
  activeFilter: string;
  onChange: (key: string) => void;
}

export const CertificateFilterChips: React.FC<CertificateFilterChipsProps> = ({
  activeFilter,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.key;
          return (
            <TouchableOpacity
              key={chip.key}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => onChange(chip.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
