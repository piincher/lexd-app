import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMyContainersEmptyStateStyles } from './MyContainersEmptyState.styles';
import { FilterMode } from '../../hooks/useMyContainersScreen';

interface MyContainersEmptyStateProps {
  searchQuery: string;
  modeFilter: FilterMode;
  onNavigateToGoods: () => void;
}

export const MyContainersEmptyState: React.FC<MyContainersEmptyStateProps> = ({
  searchQuery,
  modeFilter,
  onNavigateToGoods,
}) => {
  const { colors } = useAppTheme();
  const styles = useMyContainersEmptyStateStyles();

  const getEmptyMessage = () => {
    if (searchQuery.trim()) {
      return "Aucun container ne correspond à votre recherche.";
    }
    if (modeFilter !== 'ALL') {
      const label = modeFilter === 'SEA' ? 'maritime' : 'aérien';
      return `Aucun conteneur ${label} trouvé.`;
    }
    return "Vous n'avez pas de marchandises dans un container pour le moment.";
  };

  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="container-off"
        size={80}
        color={colors.status.success}
      />
      <Text style={styles.emptyTitle}>Aucun container</Text>
      <Text style={styles.emptyText}>{getEmptyMessage()}</Text>
      {!searchQuery.trim() && (
        <Button mode="contained" onPress={onNavigateToGoods} style={styles.emptyButton}>
          Voir mes marchandises
        </Button>
      )}
    </View>
  );
};
