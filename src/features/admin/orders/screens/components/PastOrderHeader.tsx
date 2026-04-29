import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { LOGISTICS_COLORS } from './pastOrderConstants';
import { createStyles } from './PastOrderHeader.styles';

interface PastOrderHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PastOrderHeader: React.FC<PastOrderHeaderProps> = ({ searchQuery, onSearchChange }) => {
  const styles = createStyles();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Commandes passées</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={LOGISTICS_COLORS.gray[500]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher par nom, code ou téléphone"
            placeholderTextColor={LOGISTICS_COLORS.gray[400]}
            value={searchQuery}
            onChangeText={onSearchChange}
            autoCapitalize="none"
          />
        </View>
      </View>
    </View>
  );
};
