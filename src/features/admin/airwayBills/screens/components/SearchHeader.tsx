/* Hallmark · redesign · macrostructure: Marquee Hero + Catalogue · genre: modern-minimal · theme: air-freight violet→sky */
/**
 * SearchHeader — air-freight marquee hero for the airway bill list: a violet→sky
 * gradient band carrying the title, result count, and a glass search field.
 * Behaviour and props are unchanged; only the visual layer is redesigned.
 */

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

// Air-freight accent: a violet→sky sweep (matches the AIR convention used on the
// goods detail). Theme-independent, so reading it statically is safe.
const AIR_GRADIENT = [
  Theme.gradients.purple[0],
  Theme.gradients.purple[1],
  Theme.gradients.ocean[1],
] as const;

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
}) => {
  const { colors } = useAppTheme();

  return (
    <LinearGradient
      colors={AIR_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.topRow}>
        <View style={styles.eyebrowRow}>
          <MaterialCommunityIcons name="airplane" size={14} color="rgba(255,255,255,0.85)" />
          <Text style={styles.eyebrow}>FRET AÉRIEN</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{resultCount}</Text>
        </View>
      </View>

      <Text style={styles.title}>Lettres de transport</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="rgba(255,255,255,0.8)" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Rechercher un AWB, vol, aéroport..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.searchInput}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCapitalize="characters"
          accessibilityLabel="Rechercher une lettre de transport"
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color="rgba(255,255,255,0.85)"
            onPress={() => onSearchChange('')}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eyebrow: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  countBadge: {
    minWidth: 30,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  countText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingVertical: 0,
  },
});

export default SearchHeader;
