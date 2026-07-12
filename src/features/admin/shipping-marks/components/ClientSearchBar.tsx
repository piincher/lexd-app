import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ClientSearchBar.styles';

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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const handleSubmit = () => {
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={21} color={colors.text.secondary} />
      <TextInput
        placeholder="Rechercher par ID, nom ou téléphone"
        placeholderTextColor={colors.text.disabled}
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        autoCorrect={false}
        accessibilityLabel="Rechercher un client"
      />
      {query.length > 0 && !loading && (
        <Pressable
          onPress={handleClear}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Effacer la recherche"
        >
          <Ionicons name="close-circle" size={22} color={colors.text.secondary} />
        </Pressable>
      )}
      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Lancer la recherche"
        accessibilityState={{ disabled: Boolean(loading) }}
        android_ripple={{ color: colors.primary.dark }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.text.inverse} />
        ) : (
          <Ionicons name="arrow-forward" size={22} color={colors.text.inverse} />
        )}
      </Pressable>
    </View>
  );
};
