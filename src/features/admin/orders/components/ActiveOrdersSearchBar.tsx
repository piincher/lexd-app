import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface ActiveOrdersSearchBarProps {
   value: string;
   onChangeText: (query: string) => void;
}

export const ActiveOrdersSearchBar: React.FC<ActiveOrdersSearchBarProps> = ({
   value,
   onChangeText,
}) => {
   return (
      <Searchbar
         style={styles.searchBar}
         value={value}
         placeholder="Rechercher par nom, téléphone, code de suivi"
         onChangeText={onChangeText}
      />
   );
};

const styles = StyleSheet.create({
   searchBar: {
      marginHorizontal: 10,
      marginVertical: 10,
   },
});
