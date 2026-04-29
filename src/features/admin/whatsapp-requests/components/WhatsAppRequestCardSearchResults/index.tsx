import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

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
  if (!searchResults) return null;

  return (
    <View style={styles.searchResults}>
      <View style={styles.resultItem}>
        <Ionicons name="cube" size={16} color={Theme.neutral[500]} />
        <Text style={styles.resultText}>{searchResults.goodsFound.length} marchandise(s)</Text>
      </View>
      <View style={styles.resultItem}>
        <Ionicons name="cube" size={16} color={Theme.neutral[500]} />
        <Text style={styles.resultText}>{searchResults.containersFound.length} container(s)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResults: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultText: {
    fontSize: 13,
    color: Theme.neutral[600],
  },
});
