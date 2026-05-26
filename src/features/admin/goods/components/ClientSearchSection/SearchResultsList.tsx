import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Text, ActivityIndicator, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientSearchStyles } from './ClientSearchSection.styles';

interface SearchResultsListProps {
  users: userData[];
  isLoading: boolean;
  searchQuery: string;
  onSelect: (client: userData) => void;
  /** Optional — when provided, the no-results state shows an "Ajouter ce client" CTA. */
  onCreateNew?: () => void;
}

const ResultItem = React.memo(({ item, onSelect }: { item: userData; onSelect: (client: userData) => void }) => {
  const { colors } = useAppTheme();
  const styles = useClientSearchStyles();

  return (
    <TouchableOpacity
      style={styles.resultItem}
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
        <Text style={styles.resultName}>
          {item.firstName || ''} {item.lastName || ''}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Ionicons name="call-outline" size={12} color={colors.text.secondary} />
          <Text style={styles.resultPhone}>
            {item.phoneNumber || 'Numéro non disponible'}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.text.disabled} />
    </TouchableOpacity>
  );
});

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  users,
  isLoading,
  searchQuery,
  onSelect,
  onCreateNew,
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
    // This component lives inside the receive form's ScrollView (which itself sits inside
    // the screen's ScrollView). Using a FlatList here triggered "VirtualizedLists should
    // never be nested inside plain ScrollViews". Results are capped at 50 by the search
    // hook, so a plain mapped ScrollView is the correct, warning-free pattern.
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsHeaderText}>
            {users.length} résultat{users.length > 1 ? 's' : ''} trouvé{users.length > 1 ? 's' : ''}
          </Text>
        </View>
        <ScrollView
          style={{ maxHeight: 280 }}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          {users.map((item) => (
            <ResultItem key={item._id} item={item} onSelect={onSelect} />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (searchQuery.length > 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Avatar.Icon size={48} icon="account-off" style={styles.noResultsIcon} color={colors.text.disabled} />
        <Text style={styles.noResults}>Aucun client trouvé</Text>
        <Text style={styles.noResultsHint}>Essayez avec un autre nom ou numéro</Text>
        {onCreateNew ? (
          <Button
            mode="contained"
            onPress={onCreateNew}
            icon="account-plus"
            style={styles.createClientButton}
            contentStyle={styles.createClientButtonContent}
            labelStyle={styles.createClientButtonLabel}
          >
            Ajouter ce client
          </Button>
        ) : null}
      </View>
    );
  }

  return null;
};
