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
import { CreateClientModal } from './CreateClientModal';
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
  const [createModalVisible, setCreateModalVisible] = useState(false);
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

  // Fires from the no-results CTA — open the modal pre-filled with whatever the operator
  // already typed (so they don't retype the phone they were searching for).
  const handleCreateNew = () => setCreateModalVisible(true);

  // The newly-created client lands here. We immediately select it (the screen's wrapped
  // setSelectedClient adds it to persistent recents) so the operator can keep going.
  const handleClientCreated = (client: userData) => {
    handleSelect(client);
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
              placeholder="Rechercher un client (ID, nom ou téléphone)"
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

            {displayResults && (
              <View style={styles.resultsWrapper}>
                <SearchResultsList
                  users={users}
                  isLoading={displayLoading}
                  searchQuery={debouncedQuery}
                  onSelect={handleSelect}
                  onCreateNew={handleCreateNew}
                />
              </View>
            )}

            {!!fetchError && (
              <Text style={styles.errorText}>
                Erreur de recherche. Veuillez réessayer.
              </Text>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </Card.Content>

      <CreateClientModal
        visible={createModalVisible}
        initialQuery={searchQuery}
        onDismiss={() => setCreateModalVisible(false)}
        onCreated={handleClientCreated}
      />
    </Card>
  );
};

export default ClientSearchSection;
