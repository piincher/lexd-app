import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PastOrderEmpty.styles';

interface PastOrderEmptyProps {
  searchQuery: string;
}

export const PastOrderEmpty: React.FC<PastOrderEmptyProps> = ({ searchQuery }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="archive-outline" size={64} color={colors.text.disabled} />
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'Aucun résultat trouvé' : 'Aucune commande'}
      </Text>
      <Text style={styles.emptyDescription}>
        {searchQuery
          ? 'Essayez de modifier votre recherche'
          : 'Aucune commande trouvée pour cette catégorie'}
      </Text>
    </View>
  );
};
