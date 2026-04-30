import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Text, ActivityIndicator } from 'react-native-paper';
import { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientSearchStyles } from './ClientSearchSection.styles';

interface SearchResultsListProps {
  users: userData[];
  isLoading: boolean;
  searchQuery: string;
  onSelect: (client: userData) => void;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  users,
  isLoading,
  searchQuery,
  onSelect,
}) => {
  const { colors } = useAppTheme();
  const styles = useClientSearchStyles();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.status.success} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (users.length > 0) {
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsHeaderText}>
            {users.length} résultat{users.length > 1 ? 's' : ''} trouvé{users.length > 1 ? 's' : ''}
          </Text>
        </View>
        <View style={styles.resultsList}>
          {users.map((item, index) => (
            <TouchableOpacity
              key={item._id}
              style={[styles.resultItem, index === users.length - 1 && styles.resultItemLast]}
              onPress={() => onSelect(item)}
              activeOpacity={0.7}
            >
              <Avatar.Text
                size={40}
                label={`${item.firstName?.[0] || ''}${item.lastName?.[0] || ''}`}
                style={styles.avatar}
                color={colors.status.success}
              />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.resultPhone}>{item.phoneNumber}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (searchQuery.length > 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Avatar.Icon size={48} icon="account-off" style={styles.noResultsIcon} color={colors.text.disabled} />
        <Text style={styles.noResults}>Aucun client trouvé</Text>
        <Text style={styles.noResultsHint}>Essayez avec un autre nom ou numéro</Text>
      </View>
    );
  }

  return null;
};
