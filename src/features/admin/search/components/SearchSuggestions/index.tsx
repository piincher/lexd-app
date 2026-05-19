import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "../GlobalSearchBar.styles";

interface SuggestionItem {
  id: string;
  type: "goods" | "container" | "client";
  title: string;
  subtitle?: string;
}

interface SearchSuggestionsProps {
  suggestions: { goods: SuggestionItem[]; containers: SuggestionItem[]; clients: SuggestionItem[] };
  hasSuggestions: boolean;
  isLoading: boolean;
  onSelect: (item: SuggestionItem) => void;
}

const SuggestionItemRow: React.FC<{ item: SuggestionItem; onPress: () => void }> = ({ item, onPress }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
  <TouchableOpacity style={styles.suggestionItem} onPress={onPress}>
    <View style={styles.suggestionIconContainer}>
      <Ionicons
        name={item.type === "goods" ? "cube" : item.type === "container" ? "airplane" : "person"}
        size={18}
        color={colors.primary[500]}
      />
    </View>
    <View style={styles.suggestionContent}>
      <Text style={styles.suggestionTitle}>{item.title}</Text>
      {item.subtitle ? (
        <Text style={styles.suggestionSubtitle} numberOfLines={1}>{item.subtitle}</Text>
      ) : null}
    </View>
    <Ionicons name="arrow-forward" size={16} color={colors.neutral[400]} />
  </TouchableOpacity>
  );
};

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions, hasSuggestions, isLoading, onSelect,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (!hasSuggestions) return null;

  const renderCategory = (label: string, data: SuggestionItem[], prefix: string) =>
    data.length > 0 ? (
      <View style={styles.categorySection}>
        <Text style={styles.categoryLabel}>{label}</Text>
        <FlashList
          data={data.slice(0, 3)}
          renderItem={({ item }) => <SuggestionItemRow item={item} onPress={() => onSelect(item)} />}
          keyExtractor={(item) => `${prefix}-${item.id}`}
          scrollEnabled={false}
        />
      </View>
    ) : null;

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        {isLoading && <Ionicons name="sync" size={14} color={colors.primary[500]} />}
      </View>
      {renderCategory("Marchandises", suggestions.goods, "goods")}
      {renderCategory("Containers", suggestions.containers, "container")}
      {renderCategory("Clients", suggestions.clients, "client")}
    </>
  );
};
