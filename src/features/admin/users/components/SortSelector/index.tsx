import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { SortOption } from "../../hooks/useClientManagement";

const SORT_OPTIONS: { key: SortOption; label: string; icon: string }[] = [
  { key: "newest", label: "Plus récents", icon: "time-outline" },
  { key: "oldest", label: "Plus anciens", icon: "time-outline" },
  { key: "name_asc", label: "Nom A-Z", icon: "text-outline" },
  { key: "name_desc", label: "Nom Z-A", icon: "text-outline" },
  { key: "status", label: "Statut", icon: "flag-outline" },
];

interface SortSelectorProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.delay(200)} style={styles.container}>
      <Ionicons name="funnel-outline" size={14} color={colors.text.secondary} />
      <View style={styles.options}>
        {SORT_OPTIONS.map((opt) => {
          const isActive = value === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              onPress={() => onChange(opt.key)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Trier par ${opt.label}`}
              accessibilityState={{ selected: isActive }}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? colors.primary.main : colors.background.paper,
                  borderColor: isActive ? colors.primary.main : colors.neutral[200],
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isActive ? colors.text.inverse : colors.text.secondary },
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = {
  container: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  options: {
    flexDirection: "row" as const,
    gap: 8,
    flex: 1,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600" as const,
  },
};
