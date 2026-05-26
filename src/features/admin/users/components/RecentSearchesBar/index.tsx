import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

interface RecentSearchesBarProps {
  recents: string[];
  visible: boolean;
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
}

export const RecentSearchesBar: React.FC<RecentSearchesBarProps> = ({
  recents,
  visible,
  onSelect,
  onRemove,
  onClear,
}) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();
  const styles = createStyles(colors);

  if (!visible || recents.length === 0) return null;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.container, { backgroundColor: colors.background.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.secondary }]}>Recherches récentes</Text>
        <TouchableOpacity onPress={onClear} accessibilityRole="button" accessibilityLabel="Effacer l'historique">
          <Text style={[styles.clear, { color: colors.status.error }]}>Effacer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {recents.map((query) => (
          <TouchableOpacity
            key={query}
            onPress={() => {
              trigger("light");
              onSelect(query);
            }}
            style={[styles.chip, { backgroundColor: colors.background.paper, borderColor: colors.neutral[200] }]}
            accessibilityRole="button"
          >
            <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
            <Text style={[styles.chipText, { color: colors.text.primary }]} numberOfLines={1}>
              {query}
            </Text>
            <TouchableOpacity
              onPress={() => onRemove(query)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={`Supprimer ${query}`}
            >
              <Ionicons name="close" size={14} color={colors.text.disabled} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const createStyles = (colors: any) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "600" as const,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  clear: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  chips: {
    flexDirection: "row" as const,
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    maxWidth: 200,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500" as const,
  },
});
