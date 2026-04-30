/**
 * ClientSearchSection - Component for client search and selection
 */

import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import { useGetUsers } from '@src/features/admin/hooks/useGetUsers';
import { userData } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useClientSearchStyles } from './ClientSearchSection.styles';
import { SelectedClientView } from './SelectedClientView';
import { SearchResultsList } from './SearchResultsList';

interface ClientSearchSectionProps {
  selectedClient: userData | null;
  onSelectClient: (client: userData | null) => void;
  error?: string;
}

export const ClientSearchSection: React.FC<ClientSearchSectionProps> = ({
  selectedClient,
  onSelectClient,
  error,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data: users, isLoading, error: fetchError } = useGetUsers();
  const { colors } = useAppTheme();
  const styles = useClientSearchStyles();

  console.log('ClientSearchSection - Users:', users?.length || 0, 'Error:', fetchError?.message || 'none');

  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users) || !searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const queryDigits = query.replace(/\D/g, '');

    return users.filter((user: userData) => {
      const nameMatch = user.firstName?.toLowerCase().includes(query) || user.lastName?.toLowerCase().includes(query);
      const phoneDigits = user.phoneNumber?.replace(/\D/g, '') || '';
      const phoneMatch = phoneDigits.includes(queryDigits);
      return nameMatch || phoneMatch;
    });
  }, [users, searchQuery]);

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
    setShowResults(text.length > 0);
  };

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
              right={
                searchQuery.length > 0 ? (
                  <TextInput.Icon icon="close-circle" onPress={() => { setSearchQuery(''); setShowResults(false); }} color={colors.text.disabled} />
                ) : (
                  <TextInput.Icon icon="magnify" color={colors.text.disabled} />
                )
              }
            />

            {__DEV__ && users && Array.isArray(users) && (
              <Text style={styles.debugText}>
                Total users: {users.length} | Query: "{searchQuery}" | Digits: "{searchQuery.replace(/\D/g, '')}"
              </Text>
            )}

            {showResults && (
              <View style={styles.resultsWrapper}>
                <SearchResultsList users={filteredUsers} isLoading={isLoading} searchQuery={searchQuery} onSelect={handleSelect} />
              </View>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default ClientSearchSection;
