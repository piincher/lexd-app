import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useRecipientSelectorStyles } from './RecipientSelector.styles';

interface RecipientEmptyStateProps {
  isLoading: boolean;
  mode: 'all' | 'date';
}

export const RecipientEmptyState: React.FC<RecipientEmptyStateProps> = ({ isLoading, mode }) => {
  const styles = useRecipientSelectorStyles();

  return (
    <View style={styles.emptyContainer}>
      <Ionicons
        name={isLoading ? 'hourglass-outline' : 'people-outline'}
        size={40}
        color={Theme.neutral[300]}
      />
      <Text style={styles.emptyText}>
        {isLoading
          ? 'Chargement des clients...'
          : mode === 'date'
            ? 'Choisissez une date et appuyez sur "Chercher"'
            : 'Aucun client trouve'}
      </Text>
    </View>
  );
};
