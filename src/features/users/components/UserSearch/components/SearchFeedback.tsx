import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface SearchFeedbackProps {
  searchQuery: string;
  isLoading: boolean;
  isFetching: boolean;
  hasSearched: boolean;
  usersCount: number;
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 12,
    marginTop: 8,
    fontStyle: "italic",
  },
  searching: {
    fontSize: 12,
    marginTop: 8,
  },
  noResults: {
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
});

export const SearchFeedback: React.FC<SearchFeedbackProps> = ({
  searchQuery,
  isLoading,
  isFetching,
  hasSearched,
  usersCount,
}) => {
  const { colors } = useAppTheme();

  if (searchQuery.length > 0 && searchQuery.length < 3) {
    return (
      <Text style={[styles.hint, { color: colors.text.secondary }]}>
        Saisissez au moins 3 caractères...
      </Text>
    );
  }

  if ((isLoading || isFetching) && searchQuery.length >= 3) {
    return (
      <Text style={[styles.searching, { color: colors.primary.main }]}>
        Recherche en cours...
      </Text>
    );
  }

  if (hasSearched && usersCount === 0 && !isFetching) {
    return (
      <Text style={[styles.noResults, { color: colors.text.secondary }]}>
        Aucun client trouvé pour "{searchQuery}"
      </Text>
    );
  }

  return null;
};
