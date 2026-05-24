/* Hallmark · component: search-bar · genre: modern-minimal · theme: brand-aligned app theme
 * Cohesion pass: flat hairline-bordered surface (no glass gradient) matching the card voice.
 * states: empty · typing (clear) · filter (active badge)
 * pre-emit critique: P4 H5 E4 S4 R5 V4
 */
import React, { useMemo } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Rechercher une marchandise..."
          placeholderTextColor={colors.text.secondary}
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 ? (
          <TouchableOpacity onPress={onClear} style={styles.clearButton} hitSlop={8}>
            <Ionicons name="close-circle" size={22} color={colors.text.secondary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onFilterPress} style={styles.filterButton} activeOpacity={0.7}>
            <Ionicons
              name="options-outline"
              size={22}
              color={hasActiveFilters ? colors.primary.main : colors.text.secondary}
            />
            {hasActiveFilters && <View style={[styles.filterBadge, { backgroundColor: colors.primary.main }]} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: Theme.spacing.xl,
      marginTop: -Theme.spacing.md,
      zIndex: 10,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: Theme.radius.xl,
      paddingHorizontal: Theme.spacing.lg,
      height: 54,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      ...Theme.shadows.sm,
    },
    icon: {
      marginRight: Theme.spacing.md,
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontWeight: '500',
      height: '100%',
    },
    clearButton: {
      padding: 4,
    },
    filterButton: {
      width: 36,
      height: 36,
      borderRadius: Theme.radius.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      position: 'relative',
    },
    filterBadge: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });

export default GoodsListSearch;
