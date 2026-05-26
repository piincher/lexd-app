import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SearchResults {
  goodsFound: unknown[];
  containersFound: unknown[];
}

interface WhatsAppRequestCardSearchResultsProps {
  searchResults?: SearchResults | null;
}

export const WhatsAppRequestCardSearchResults: React.FC<WhatsAppRequestCardSearchResultsProps> = ({
  searchResults,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  if (!searchResults) return null;

  return (
    <View style={styles.searchResults}>
      <View style={styles.resultItem}>
        <Ionicons name="cube" size={16} color={colors.neutral[500]} />
        <Text style={styles.resultText}>{searchResults.goodsFound.length} marchandise(s)</Text>
      </View>
      <View style={styles.resultItem}>
        <Ionicons name="cube" size={16} color={colors.neutral[500]} />
        <Text style={styles.resultText}>{searchResults.containersFound.length} container(s)</Text>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  searchResults: {
    flexDirection: 'row',
    gap: 16,
    padding: 12,
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
    marginBottom: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultText: {
    fontSize: 13,
    color: colors.neutral[600],
  },
});
