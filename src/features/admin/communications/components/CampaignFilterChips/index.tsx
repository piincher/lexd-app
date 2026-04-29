import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { FILTERS, type FilterKey } from "../../lib/campaignHelpers";

interface CampaignFilterChipsProps {
  activeFilter: FilterKey;
  onChange: (filter: FilterKey) => void;
}

export const CampaignFilterChips: React.FC<CampaignFilterChipsProps> = ({
  activeFilter,
  onChange,
}) => {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, borderBottomColor: colors.border }]}>
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f.key}
          style={[
            styles.chip,
            { backgroundColor: isDark ? colors.background.paper : "#F3F4F6" },
            activeFilter === f.key && [
              styles.chipActive,
              { backgroundColor: isDark ? "#4C1D95" : "#EDE9FE" },
            ],
          ]}
          onPress={() => onChange(f.key)}
        >
          <Text
            style={[
              styles.chipText,
              { color: colors.text.secondary },
              activeFilter === f.key && [
                styles.chipTextActive,
                { color: isDark ? "#C4B5FD" : "#7C3AED" },
              ],
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipActive: {},
  chipText: { fontFamily: Fonts.medium, fontSize: 13 },
  chipTextActive: {},
});
