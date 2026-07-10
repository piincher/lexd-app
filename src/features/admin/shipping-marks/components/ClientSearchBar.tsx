import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';

interface ClientSearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const ClientSearchBar: React.FC<ClientSearchBarProps> = ({
  initialQuery = '',
  onSearch,
  loading,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = () => {
    onSearch(query.trim());
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Rechercher par ID, nom ou téléphone"
        value={query}
        onChangeText={setQuery}
        containerStyle={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      <Button title="Rechercher" onPress={handleSubmit} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
  },
});
