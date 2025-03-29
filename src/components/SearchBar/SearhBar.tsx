// SearchBar.tsx
import React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import { COLORS } from "@src/constants/Colors";

interface SearchBarProps {
   placeholder?: string;
   value: string;
   onChangeSearch: (query: string) => void;
   customStyle?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({
   placeholder,
   value,
   onChangeSearch,
   customStyle,
}) => {
   return (
      <Searchbar
         placeholder={placeholder || "Search..."}
         onChangeText={onChangeSearch}
         value={value}
         style={[styles.searchbar, customStyle]}
      />
   );
};

const styles = StyleSheet.create({
   searchbar: {
      marginBottom: 16,
      borderRadius: 0,
      backgroundColor: COLORS.white,
      borderColor: COLORS.blue,
      borderWidth: 0.5,
   },
});

export default SearchBar;
