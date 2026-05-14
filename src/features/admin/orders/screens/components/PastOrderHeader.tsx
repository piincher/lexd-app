import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PastOrderHeader.styles';

interface PastOrderHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PastOrderHeader: React.FC<PastOrderHeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Commandes passées</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.text.secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher par nom, code ou téléphone"
            placeholderTextColor={colors.text.disabled}
            value={searchQuery}
            onChangeText={onSearchChange}
            autoCapitalize="none"
          />
        </View>
      </View>
    </View>
  );
};
