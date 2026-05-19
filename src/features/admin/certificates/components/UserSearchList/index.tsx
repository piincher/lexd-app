import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { CertificateUser } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { UserCard } from "../UserCard";
import { createStyles } from "./UserSearchList.styles";

interface UserSearchListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  users: CertificateUser[];
  isLoading: boolean;
  selectedUserId?: string | null;
  onSelectUser: (user: CertificateUser) => void;
}

export const UserSearchList: React.FC<UserSearchListProps> = ({
  searchQuery,
  onSearchChange,
  users,
  isLoading,
  selectedUserId,
  onSelectUser,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color={colors.text.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher par nom ou téléphone..."
            placeholderTextColor={colors.text.muted}
            value={searchQuery}
            onChangeText={onSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => onSearchChange("")} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={colors.text.muted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={styles.loadingText}>Recherche...</Text>
          </View>
        ) : (
          <FlashList
            data={users}
            renderItem={({ item }) => (
              <UserCard
                user={item}
                isSelected={selectedUserId === item._id}
                onSelect={onSelectUser}
              />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="person-search" size={48} color={colors.neutral[300]} />
                <Text style={styles.emptyText}>
                  {searchQuery.length < 2
                    ? "Tapez au moins 2 caractères pour rechercher"
                    : "Aucun client trouvé"}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};
