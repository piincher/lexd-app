import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { User } from "../../../api/searchUsers";

interface UserResultsListProps {
  users: User[];
  onSelect: (user: User) => void;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  count: {
    fontSize: 12,
    marginBottom: 8,
  },
  list: {
    maxHeight: 200,
    borderWidth: 1,
    borderRadius: 8,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  phone: {
    fontSize: 14,
    marginTop: 4,
  },
});

export const UserResultsList: React.FC<UserResultsListProps> = ({
  users,
  onSelect,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.count, { color: colors.text.secondary }]}>
        {users.length} résultat{users.length > 1 ? "s" : ""}
      </Text>
      <FlashList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.item, { borderBottomColor: colors.border }]}
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.name, { color: colors.text.primary }]}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={[styles.phone, { color: colors.text.secondary }]}>
              📞 {item.phoneNumber}
            </Text>
          </Pressable>
        )}
        style={[
          styles.list,
          {
            borderColor: colors.border,
            backgroundColor: colors.background.card,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
