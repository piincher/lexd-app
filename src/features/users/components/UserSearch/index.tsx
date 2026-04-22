import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FlashList } from '@shopify/flash-list';
import { TextInput, Text, ActivityIndicator } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { User } from "../../api/searchUsers";

interface UserSearchProps {
  onSelectUser: (user: User) => void;
  selectedUser?: User | null;
}

export const UserSearch: React.FC<UserSearchProps> = ({
  onSelectUser,
  selectedUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching } = useSearchUsers(
    { query: searchQuery, limit: 10 },
    { enabled: searchQuery.length >= 3, debounceMs: 500 }
  );
  const users = data?.data || [];
  const hasSearched = searchQuery.length >= 3 && !isLoading;
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginVertical: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 8,
      color: colors.text.secondary,
    },
    input: {
      backgroundColor: colors.background.card,
    },
    hint: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 8,
      fontStyle: "italic",
    },
    searching: {
      fontSize: 12,
      color: colors.primary.main,
      marginTop: 8,
    },
    resultsContainer: {
      marginTop: 12,
    },
    resultsCount: {
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 8,
    },
    list: {
      maxHeight: 200,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.background.card,
    },
    userItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    userName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text.primary,
    },
    userPhone: {
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 4,
    },
    noResults: {
      textAlign: "center",
      color: colors.text.secondary,
      marginTop: 16,
      fontStyle: "italic",
    },
    selectedContainer: {
      marginVertical: 16,
    },
    selectedLabel: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 8,
      color: colors.text.secondary,
    },
    selectedCard: {
      backgroundColor: colors.background.paper,
      padding: 16,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary.main,
    },
    selectedName: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    selectedPhone: {
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 4,
    },
    changeText: {
      color: colors.primary.main,
      marginTop: 8,
      textAlign: "right",
    },
  }), [colors, isDark]);

  const handleSelect = useCallback((user: User) => {
    console.log(`[UserSearch] Selected user: ${user._id} - ${user.firstName} ${user.lastName}`);
    onSelectUser(user);
    setSearchQuery("");
  }, [onSelectUser]);

  // Show selected user
  if (selectedUser) {
    return (
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedLabel}>👤 Client sélectionné</Text>
        <View style={styles.selectedCard}>
          <Text style={styles.selectedName}>
            {selectedUser.firstName} {selectedUser.lastName}
          </Text>
          <Text style={styles.selectedPhone}>📞 {selectedUser.phoneNumber}</Text>
        </View>
        <Pressable onPress={() => onSelectUser(null as any)}>
          <Text style={styles.changeText}>Changer de client</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rechercher un client</Text>
      <TextInput
        placeholder="Numéro de téléphone (min. 3 chiffres)..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
        left={<TextInput.Icon icon="magnify" />}
        right={
          isLoading || isFetching ? (
            <TextInput.Icon icon={() => <ActivityIndicator size={20} color={colors.primary.main} />} />
          ) : null
        }
        keyboardType="phone-pad"
      />
      
      {/* Hint text */}
      {searchQuery.length > 0 && searchQuery.length < 3 && (
        <Text style={styles.hint}>
          Saisissez au moins 3 caractères...
        </Text>
      )}
      
      {/* Searching text */}
      {(isLoading || isFetching) && searchQuery.length >= 3 && (
        <Text style={styles.searching}>Recherche en cours...</Text>
      )}
      
      {/* No results */}
      {hasSearched && users.length === 0 && !isFetching && (
        <Text style={styles.noResults}>
          Aucun client trouvé pour "{searchQuery}"
        </Text>
      )}
      
      {/* Results list */}
      {users.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsCount}>
            {users.length} résultat{users.length > 1 ? 's' : ''}
          </Text>
          <FlashList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Pressable style={styles.userItem} onPress={() => handleSelect(item)}>
                <Text style={styles.userName}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.userPhone}>📞 {item.phoneNumber}</Text>
              </Pressable>
            )}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};
