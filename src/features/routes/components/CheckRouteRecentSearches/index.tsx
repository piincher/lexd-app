import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface CheckRouteRecentSearchesProps {
  recent: string[];
  onSelect: (value: string) => void;
  onClear: () => void;
}

export const CheckRouteRecentSearches: React.FC<CheckRouteRecentSearchesProps> = ({
  recent,
  onSelect,
  onClear,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>Recherches récentes</Text>
        <Pressable onPress={onClear} hitSlop={8} accessibilityRole="button">
          <Text style={[styles.clearBtn, { color: colors.primary.main }]}>Effacer</Text>
        </Pressable>
      </View>
      <View style={styles.recentRow}>
        {recent.map((value) => (
          <Chip
            key={value}
            icon="history"
            onPress={() => onSelect(value)}
            compact
            accessibilityLabel={`Rechercher ${value}`}
          >
            {value}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Fonts.meduim,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  clearBtn: {
    fontSize: 12,
    fontFamily: Fonts.meduim,
  },
});
