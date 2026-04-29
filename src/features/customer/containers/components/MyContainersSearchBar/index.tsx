import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useMyContainersSearchBarStyles } from './MyContainersSearchBar.styles';

interface MyContainersSearchBarProps {
  value: string;
  onChangeText: (query: string) => void;
}

export const MyContainersSearchBar: React.FC<MyContainersSearchBarProps> = ({
  value,
  onChangeText,
}) => {
  const styles = useMyContainersSearchBarStyles();

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Rechercher un container..."
        onChangeText={onChangeText}
        value={value}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        icon="magnify"
        clearIcon="close-circle"
      />
    </View>
  );
};
