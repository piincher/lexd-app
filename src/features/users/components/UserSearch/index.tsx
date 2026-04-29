import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { User } from "../../api/searchUsers";
import { useUserSearchForm } from "../../hooks/useUserSearchForm";
import { SelectedUserView } from "./components/SelectedUserView";
import { SearchInput } from "./components/SearchInput";
import { SearchFeedback } from "./components/SearchFeedback";
import { UserResultsList } from "./components/UserResultsList";

interface UserSearchProps {
  onSelectUser: (user: User) => void;
  selectedUser?: User | null;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
});

export const UserSearch: React.FC<UserSearchProps> = ({
  onSelectUser,
  selectedUser,
}) => {
  const { colors } = useAppTheme();
  const {
    searchQuery,
    setSearchQuery,
    users,
    isLoading,
    isFetching,
    hasSearched,
    handleSelect,
  } = useUserSearchForm({ onSelectUser });

  if (selectedUser) {
    return (
      <SelectedUserView
        user={selectedUser}
        onClear={() => onSelectUser(null as any)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>
        Rechercher un client
      </Text>
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <SearchFeedback
        searchQuery={searchQuery}
        isLoading={isLoading}
        isFetching={isFetching}
        hasSearched={hasSearched}
        usersCount={users.length}
      />
      {users.length > 0 && (
        <UserResultsList users={users} onSelect={handleSelect} />
      )}
    </View>
  );
};
