/**
 * ClientSearchSection - Component for client search and selection
 * Improved with better visual feedback, clear button, and results list
 */

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, TextInput, Avatar, Chip, ActivityIndicator } from 'react-native-paper';
import { useGetUsers } from '@src/features/admin/hooks/useGetUsers';
import { userData } from '@src/constants/types';
import { COLORS } from '@src/constants/Colors';

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
  
  // Debug logging
  console.log('ClientSearchSection - Users:', users?.length || 0, 'Error:', fetchError?.message || 'none');

  /**
   * Filter users based on search query
   * Supports partial phone number matching by extracting digits
   */
  const filteredUsers = (() => {
    if (!users || !Array.isArray(users) || !searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const queryDigits = query.replace(/\D/g, ''); // Extract digits from query

    return users.filter((user: userData) => {
      // Name search (case insensitive)
      const nameMatch = 
        user.firstName?.toLowerCase().includes(query) ||
        user.lastName?.toLowerCase().includes(query);
      
      // Phone search - extract digits for comparison
      const phoneDigits = user.phoneNumber?.replace(/\D/g, '') || '';
      const phoneMatch = phoneDigits.includes(queryDigits);
      
      return nameMatch || phoneMatch;
    });
  })();

  /**
   * Handle client selection
   */
  const handleSelectClient = (client: userData) => {
    onSelectClient(client);
    setSearchQuery('');
    setShowResults(false);
  };

  /**
   * Handle clearing selected client
   */
  const handleClearClient = () => {
    onSelectClient(null);
    setSearchQuery('');
    setShowResults(false);
  };

  /**
   * Clear search query only
   */
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  /**
   * Render search result item
   */
  const renderItem = ({ item, index }: { item: userData; index: number }) => (
    <TouchableOpacity
      style={[
        styles.resultItem,
        index === filteredUsers.length - 1 && styles.resultItemLast,
      ]}
      onPress={() => handleSelectClient(item)}
      activeOpacity={0.7}
    >
      <Avatar.Text
        size={40}
        label={`${item.firstName?.[0] || ''}${item.lastName?.[0] || ''}`}
        style={styles.avatar}
        color={COLORS.Crimson || '#dc3545'}
      />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.resultPhone}>{item.phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * Handle search input change
   */
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowResults(text.length > 0);
  };

  return (
    <Card style={[styles.card, error && styles.cardError]} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>Client</Text>

        {selectedClient ? (
          <View style={styles.selectedClient}>
            <Avatar.Text
              size={48}
              label={`${selectedClient.firstName?.[0] || ''}${
                selectedClient.lastName?.[0] || ''
              }`}
              style={styles.selectedAvatar}
              color="#fff"
            />
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedName}>
                {selectedClient.firstName} {selectedClient.lastName}
              </Text>
              <Text style={styles.selectedPhone}>
                {selectedClient.phoneNumber}
              </Text>
            </View>
            <Chip 
              onPress={handleClearClient} 
              style={styles.changeChip}
              textStyle={styles.changeChipText}
              mode="outlined"
            >
              Changer
            </Chip>
          </View>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Rechercher un client (nom ou téléphone)"
              mode="outlined"
              error={!!error}
              outlineColor="#e0e0e0"
              activeOutlineColor={COLORS.Crimson || '#dc3545'}
              style={styles.searchInput}
              right={
                searchQuery.length > 0 ? (
                  <TextInput.Icon 
                    icon="close-circle" 
                    onPress={handleClearSearch}
                    color="#999"
                  />
                ) : (
                  <TextInput.Icon 
                    icon="magnify" 
                    color="#999"
                  />
                )
              }
            />

            {/* Debug info - remove in production */}
            {__DEV__ && users && Array.isArray(users) && (
              <Text style={styles.debugText}>
                Total users: {users.length} | Query: "{searchQuery}" | Digits: "{searchQuery.replace(/\D/g, '')}"
              </Text>
            )}

            {/* Search Results Dropdown */}
            {showResults && (
              <View style={styles.resultsWrapper}>
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={COLORS.Crimson || '#dc3545'} />
                    <Text style={styles.loadingText}>Chargement...</Text>
                  </View>
                ) : filteredUsers.length > 0 ? (
                  <View style={styles.resultsContainer}>
                    <View style={styles.resultsHeader}>
                      <Text style={styles.resultsHeaderText}>
                        {filteredUsers.length} résultat{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
                      </Text>
                    </View>
                    <View style={styles.resultsList}>
                      {filteredUsers.map((item) => (
                        <React.Fragment key={item._id}>
                          {renderItem({ item })}
                        </React.Fragment>
                      ))}
                    </View>
                  </View>
                ) : searchQuery.length > 0 ? (
                  <View style={styles.noResultsContainer}>
                    <Avatar.Icon 
                      size={48} 
                      icon="account-off" 
                      style={styles.noResultsIcon}
                      color="#999"
                    />
                    <Text style={styles.noResults}>Aucun client trouvé</Text>
                    <Text style={styles.noResultsHint}>
                      Essayez avec un autre nom ou numéro
                    </Text>
                  </View>
                ) : null}
              </View>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cardError: {
    borderWidth: 1,
    borderColor: COLORS.danger || '#dc3545',
  },
  cardContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  selectedClient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedAvatar: {
    backgroundColor: COLORS.Crimson || '#dc3545',
  },
  selectedInfo: {
    flex: 1,
    marginLeft: 12,
  },
  selectedName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  changeChip: {
    marginLeft: 8,
    borderColor: COLORS.Crimson || '#dc3545',
  },
  changeChipText: {
    color: COLORS.Crimson || '#dc3545',
    fontSize: 12,
    fontWeight: '600',
  },
  resultsWrapper: {
    marginTop: 8,
  },
  resultsContainer: {
    maxHeight: 250,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  resultsHeaderText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  resultsList: {
    paddingVertical: 4,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  resultItemLast: {
    borderBottomWidth: 0,
  },
  avatar: {
    backgroundColor: '#fce4ec',
  },
  resultInfo: {
    marginLeft: 12,
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  resultPhone: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  noResultsContainer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noResultsIcon: {
    backgroundColor: '#e9ecef',
    marginBottom: 12,
  },
  noResults: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  noResultsHint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  errorText: {
    color: COLORS.danger || '#dc3545',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  debugText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default ClientSearchSection;
