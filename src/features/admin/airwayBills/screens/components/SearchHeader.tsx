/**
 * SearchHeader - Title + search input for airway bill list
 */

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Lettres de transport
        </Text>
        <View style={[styles.countBadge, { backgroundColor: colors.primary.main }]}>
          <Text style={[styles.countText, { color: colors.text.inverse }]}>
            {resultCount}
          </Text>
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.background.paper }]}>
        <Ionicons name="search" size={18} color={colors.text.muted} />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Rechercher un AWB, vol, aéroport..."
          placeholderTextColor={colors.text.muted}
          style={[styles.searchInput, { color: colors.text.primary }]}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCapitalize="characters"
          accessibilityLabel="Rechercher une lettre de transport"
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.text.muted}
            onPress={() => onSearchChange('')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 0,
  },
});

export default SearchHeader;
