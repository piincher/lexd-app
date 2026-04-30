/**
 * GlobalSearchBar - Floating search bar with real-time suggestions
 * Accessible from any screen via navigation header
 */

import React, { useState, useRef, useEffect } from "react";
// Note: useRef is kept for inputRef, but Animated values use useState
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Dimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSearchSuggestions, useRecentSearches } from "../hooks/useSearch";
import { Theme } from "@src/constants/Theme";
import { styles } from "./GlobalSearchBar.styles";

const { width } = Dimensions.get("window");

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
  onSearch,
  onFocus,
  onBlur,
  onFilterPress,
  placeholder = "Rechercher...",
  showSuggestions = true,
  autoFocus = false,
}) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  // Use useState with lazy initializer for React Compiler compatibility
  const [fadeAnim] = useState(() => new Animated.Value(0));

  const { suggestions, totalSuggestions, isLoading } = useSearchSuggestions(
    query,
    { enabled: showSuggestions && isFocused }
  );

  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const handleSubmit = () => {
    if (query.trim()) {
      addRecentSearch(query);
      onSearch?.(query);
      Keyboard.dismiss();
      setIsFocused(false);
    }
  };

  const handleSuggestionPress = (suggestion: any) => {
    const searchQuery = suggestion.title;
    setQuery(searchQuery);
    addRecentSearch(searchQuery);
    onSearch?.(searchQuery);
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handleRecentPress = (recent: string) => {
    setQuery(recent);
    onSearch?.(recent);
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const renderSuggestionItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <View style={styles.suggestionIconContainer}>
        <Ionicons
          name={
            item.type === "goods"
              ? "cube"
              : item.type === "container"
              ? "airplane"
              : "person"
          }
          size={18}
          color={Theme.primary[500]}
        />
      </View>
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        {item.subtitle ? (
          <Text style={styles.suggestionSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        ) : null}
      </View>
      <Ionicons name="arrow-forward" size={16} color={Theme.neutral[400]} />
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => handleRecentPress(item)}
    >
      <Ionicons
        name="time-outline"
        size={18}
        color={Theme.neutral[400]}
        style={styles.recentIcon}
      />
      <Text style={styles.recentText} numberOfLines={1}>
        {item}
      </Text>
      <TouchableOpacity
        onPress={() => removeRecentSearch(item)}
        style={styles.removeRecentButton}
      >
        <Ionicons name="close" size={16} color={Theme.neutral[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const hasSuggestions = totalSuggestions > 0 && query.length >= 2;
  const hasRecents = recentSearches.length > 0 && !hasSuggestions && query.length === 0;

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View
        style={[
          styles.searchContainer,
          isFocused && styles.searchContainerFocused,
        ]}
      >
        <LinearGradient
          colors={["#FFFFFF", "#FAFAFA"]}
          style={styles.searchGradient}
        >
          <Ionicons
            name="search"
            size={20}
            color={isFocused ? Theme.primary[500] : Theme.neutral[400]}
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={Theme.neutral[400]}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              // Delay to allow tapping suggestions
              setTimeout(() => {
                setIsFocused(false);
                onBlur?.();
              }, 200);
            }}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={22} color={Theme.neutral[400]} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
              <Ionicons name="options-outline" size={22} color={Theme.primary[500]} />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>

      {/* Suggestions/Recents Dropdown */}
      {isFocused && showSuggestions && (hasSuggestions || hasRecents) && (
        <Animated.View
          style={[
            styles.dropdown,
            { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }) }] },
          ]}
        >
          <LinearGradient colors={["#FFFFFF", "#F8F8F8"]} style={styles.dropdownGradient}>
            {/* Suggestions Section */}
            {hasSuggestions && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Suggestions</Text>
                  {isLoading && (
                    <Ionicons name="sync" size={14} color={Theme.primary[500]} />
                  )}
                </View>
                {suggestions.goods.length > 0 && (
                  <View style={styles.categorySection}>
                    <Text style={styles.categoryLabel}>Marchandises</Text>
                    <FlashList
                      data={suggestions.goods.slice(0, 3)}
                      renderItem={renderSuggestionItem}
                      keyExtractor={(item) => `goods-${item.id}`}
                      scrollEnabled={false}
                    />
                  </View>
                )}
                {suggestions.containers.length > 0 && (
                  <View style={styles.categorySection}>
                    <Text style={styles.categoryLabel}>Containers</Text>
                    <FlashList
                      data={suggestions.containers.slice(0, 3)}
                      renderItem={renderSuggestionItem}
                      keyExtractor={(item) => `container-${item.id}`}
                      scrollEnabled={false}
                    />
                  </View>
                )}
                {suggestions.clients.length > 0 && (
                  <View style={styles.categorySection}>
                    <Text style={styles.categoryLabel}>Clients</Text>
                    <FlashList
                      data={suggestions.clients.slice(0, 3)}
                      renderItem={renderSuggestionItem}
                      keyExtractor={(item) => `client-${item.id}`}
                      scrollEnabled={false}
                    />
                  </View>
                )}
              </>
            )}

            {/* Recent Searches Section */}
            {hasRecents && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recherches récentes</Text>
                  <TouchableOpacity onPress={clearRecentSearches}>
                    <Text style={styles.clearAllText}>Effacer</Text>
                  </TouchableOpacity>
                </View>
                <FlashList
                  data={recentSearches.slice(0, 5)}
                  renderItem={renderRecentItem}
                  keyExtractor={(item, index) => `recent-${index}`}
                  scrollEnabled={false}
                />
              </>
            )}
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

export default GlobalSearchBar;
