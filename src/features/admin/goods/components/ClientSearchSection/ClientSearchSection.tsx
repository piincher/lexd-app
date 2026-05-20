/**
 * ClientSearchSection - Component for client search and selection
 * Loads users upfront (limit 200) and filters client-side to avoid
 * repeated API calls on every keystroke.
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientSearchStyles } from './ClientSearchSection.styles';
import { SelectedClientView } from './SelectedClientView';
import { SearchResultsList } from './SearchResultsList';
import { useSearchUsers } from './hooks/useSearchUsers';

interface ClientSearchSectionProps {
  selectedClient: userData | null;
  onSelectClient: (client: userData | null) => void;
  error?: string;
  onInputFocus?: () => void;
}

export const ClientSearchSection: React.FC<ClientSearchSectionProps> = ({
  selectedClient,
  onSelectClient,
  error,
  onInputFocus,
}) => {
  const [showResults, setShowResults] = useState(false);
  const { colors } = useAppTheme();
  const styles = useClientSearchStyles();

  const {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    users,
    isLoading,
    fetchError,
  } = useSearchUsers();

  const handleSelect = (client: userData) => {
    onSelectClient(client);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleClear = () => {
    onSelectClient(null);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowResults(text.trim().length > 0);
  };

  const isSearching = searchQuery.trim().length >= 2;
  const displayLoading = isLoading && isSearching;
  const displayResults = showResults && isSearching;

  return (
    <Card style={[styles.card, error && styles.cardError]} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>Client</Text>

        {selectedClient ? (
          <SelectedClientView client={selectedClient} onChange={handleClear} />
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Rechercher un client (nom ou téléphone)"
              mode="outlined"
              error={!!error}
              outlineColor={colors.border}
              activeOutlineColor={colors.status.success}
              style={styles.searchInput}
              onFocus={onInputFocus}
              right={
                searchQuery.length > 0 ? (
                  <TextInput.Icon icon="close-circle" onPress={() => { setSearchQuery(''); setShowResults(false); }} color={colors.text.disabled} />
                ) : (
                  <TextInput.Icon icon="magnify" color={colors.text.disabled} />
                )
              }
            />

            {__DEV__ && (
              <Text style={styles.debugText}>
                Query: "{searchQuery}" | Debounced: "{debouncedQuery}" | Results: {users.length}
              </Text>
            )}

            {displayResults && (
              <View style={styles.resultsWrapper}>
                <SearchResultsList
                  users={users}
                  isLoading={displayLoading}
                  searchQuery={debouncedQuery}
                  onSelect={handleSelect}
                />
              </View>
            )}

            {fetchError && (
              <Text style={styles.errorText}>
                Erreur de recherche. Veuillez réessayer.
              </Text>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default ClientSearchSection;
