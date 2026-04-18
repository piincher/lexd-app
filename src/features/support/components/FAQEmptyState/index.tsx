/**
 * FAQEmptyState Component - Show when no search results found
 * Following SRP: Single purpose - empty state UI (< 100 lines)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Button } from '@src/shared/ui/Button';

interface FAQEmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export const FAQEmptyState: React.FC<FAQEmptyStateProps> = ({
  searchQuery,
  onClearSearch,
}) => {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark
              ? colors.background.paper
              : colors.neutral[100],
          },
        ]}
      >
        <MaterialCommunityIcons
          name="file-search-outline"
          size={48}
          color={colors.text.disabled}
        />
      </View>

      <Text
        style={[
          styles.title,
          { color: colors.text.primary },
        ]}
      >
        Aucun résultat trouvé
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.text.secondary },
        ]}
      >
        {searchQuery
          ? `Nous n'avons trouvé aucune question correspondant à "${searchQuery}"`
          : "Aucune question disponible pour le moment"}
      </Text>

      {searchQuery.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            title="Effacer la recherche"
            onPress={onClearSearch}
            variant="primary"
            size="medium"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
    minWidth: 200,
  },
});

export default FAQEmptyState;
