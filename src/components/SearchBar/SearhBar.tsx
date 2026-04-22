// SearchBar.tsx
import React, { useMemo } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { useAppTheme } from "@src/providers/ThemeProvider";

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
   const { colors } = useAppTheme();
   const styles = useMemo(
      () =>
         StyleSheet.create({
            searchbar: {
               marginBottom: 16,
               borderRadius: 0,
               backgroundColor: colors.background.card,
               borderColor: colors.primary.main,
               borderWidth: 0.5,
            },
         }),
      [colors],
   );
   return (
      <Searchbar
         placeholder={placeholder || "Search..."}
         onChangeText={onChangeSearch}
         value={value}
         style={[styles.searchbar, customStyle]}
      />
   );
};

export default SearchBar;
