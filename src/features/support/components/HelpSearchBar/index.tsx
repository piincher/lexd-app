import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

import type { SearchHistoryItem, FAQSearchSuggestion } from "../../types";

import { getStyles } from "./HelpSearchBar.styles";

type HelpSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  suggestions: FAQSearchSuggestion[];
  history: SearchHistoryItem[];
  showSuggestions: boolean;
  onSelectSuggestion: (query: string) => void;
  onSelectHistory: (query: string) => void;
  onClearHistory: () => void;
};

export function HelpSearchBar({
  value,
  onChangeText,
  onSubmit,
  suggestions,
  history,
  showSuggestions,
  onSelectSuggestion,
  onSelectHistory,
  onClearHistory,
}: HelpSearchBarProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);
  const [focused, setFocused] = useState(false);

  const showDropdown = focused && (suggestions.length > 0 || history.length > 0) && showSuggestions;

  return (
    <View style={styles.container}>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.text.secondary} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Rechercher une question..."
          placeholderTextColor={colors.text.disabled}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")} activeOpacity={0.7}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.disabled} />
          </TouchableOpacity>
        )}
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          {suggestions.length > 0 && value.length >= 2 && (
            <>
              <Text style={styles.sectionLabel}>Suggestions</Text>
              {suggestions.map((s) => (
                <TouchableOpacity
                  key={s._id}
                  style={styles.dropdownItem}
                  onPress={() => onSelectSuggestion(s.question)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="magnify" size={16} color={colors.text.disabled} />
                  <Text style={styles.dropdownText} numberOfLines={1}>{s.question}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {history.length > 0 && (!value || value.length < 2) && (
            <>
              <View style={styles.historyHeader}>
                <Text style={styles.sectionLabel}>Recherches récentes</Text>
                <TouchableOpacity onPress={onClearHistory} activeOpacity={0.7}>
                  <Text style={styles.clearText}>Effacer</Text>
                </TouchableOpacity>
              </View>
              {history.map((h, i) => (
                <TouchableOpacity
                  key={`${h.query}-${i}`}
                  style={styles.dropdownItem}
                  onPress={() => onSelectHistory(h.query)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="history" size={16} color={colors.text.disabled} />
                  <Text style={styles.dropdownText} numberOfLines={1}>{h.query}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      )}
    </View>
  );
}
