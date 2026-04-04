/**
 * GoodsListSearch - Search bar with glass effect
 * SRP: Search input with clear button and filter trigger
 */

import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface GoodsListSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onFilterPress: () => void;
  hasActiveFilters?: boolean;
}

export const GoodsListSearch: React.FC<GoodsListSearchProps> = ({
  value,
  onChangeText,
  onClear,
  onFilterPress,
  hasActiveFilters = false,
}) => (
  <View style={styles.wrapper}>
    <LinearGradient colors={['#FFFFFF', '#FAFAFA']} style={styles.container}>
      <Ionicons name="search" size={20} color={Theme.primary[400]} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Rechercher une marchandise..."
        placeholderTextColor={Theme.neutral[400]}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={22} color={Theme.neutral[400]} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color={hasActiveFilters ? Theme.primary[500] : Theme.neutral[400]} />
          {hasActiveFilters && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      )}
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Theme.spacing.xl,
    marginTop: -Theme.spacing.lg,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius.xl,
    paddingHorizontal: Theme.spacing.lg,
    height: 56,
    ...Theme.shadows.md,
  },
  icon: {
    marginRight: Theme.spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.primary[500],
  },
});

export default GoodsListSearch;
