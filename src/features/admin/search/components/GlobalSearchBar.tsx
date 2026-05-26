import React, { useEffect, useState, useRef } from 'react';
import {
  View, TextInput, TouchableOpacity, Animated, Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSearchSuggestions, useRecentSearches } from "../hooks/useSearch";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./GlobalSearchBar.styles";
import { SearchSuggestions } from "./SearchSuggestions";
import { SearchRecents } from "./SearchRecents";

interface GlobalSearchBarProps {
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
  showSuggestions?: boolean;
  autoFocus?: boolean;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSearch, onFocus, onBlur, onFilterPress,
  placeholder = "Rechercher...", showSuggestions = true, autoFocus = false,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [fadeAnim] = useState(() => new Animated.Value(0));

  const { suggestions, totalSuggestions, isLoading } = useSearchSuggestions(query, { enabled: showSuggestions && isFocused });
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();

  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: isFocused ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [isFocused, fadeAnim]);

  const handleSubmit = () => {
    if (query.trim()) {
      addRecentSearch(query);
      onSearch?.(query);
      Keyboard.dismiss();
      setIsFocused(false);
    }
  };

  const handleSuggestionPress = (suggestion: { title: string }) => {
    setQuery(suggestion.title);
    addRecentSearch(suggestion.title);
    onSearch?.(suggestion.title);
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handleRecentPress = (recent: string) => {
    setQuery(recent);
    onSearch?.(recent);
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const clearSearch = () => { setQuery(""); inputRef.current?.focus(); };

  const hasSuggestions = totalSuggestions > 0 && query.length >= 2;
  const hasRecents = recentSearches.length > 0 && !hasSuggestions && query.length === 0;

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
        <LinearGradient colors={[colors.background.card, colors.background.default]} style={styles.searchGradient}>
          <Ionicons name="search" size={20} color={isFocused ? colors.primary[500] : colors.neutral[400]} style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.neutral[400]}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            onFocus={() => { setIsFocused(true); onFocus?.(); }}
            onBlur={() => { setTimeout(() => { setIsFocused(false); onBlur?.(); }, 200); }}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={22} color={colors.neutral[400]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
              <Ionicons name="options-outline" size={22} color={colors.primary[500]} />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>

      {isFocused && showSuggestions && (hasSuggestions || hasRecents) && (
        <Animated.View style={[styles.dropdown, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }] }]}>
          <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.dropdownGradient}>
            <SearchSuggestions
              suggestions={suggestions}
              hasSuggestions={hasSuggestions}
              isLoading={isLoading}
              onSelect={handleSuggestionPress}
            />
            <SearchRecents
              recents={recentSearches}
              hasRecents={hasRecents}
              onSelect={handleRecentPress}
              onRemove={removeRecentSearch}
              onClear={clearRecentSearches}
            />
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

export default GlobalSearchBar;
