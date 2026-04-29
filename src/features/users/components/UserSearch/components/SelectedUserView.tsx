import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { User } from "../../../api/searchUsers";

interface SelectedUserViewProps {
  user: User;
  onClear: () => void;
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
  card: {
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  phone: {
    fontSize: 14,
    marginTop: 4,
  },
  changeText: {
    marginTop: 8,
    textAlign: "right",
  },
});

export const SelectedUserView: React.FC<SelectedUserViewProps> = ({
  user,
  onClear,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>
        👤 Client sélectionné
      </Text>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.background.paper,
            borderLeftColor: colors.primary.main,
          },
        ]}
      >
        <Text style={[styles.name, { color: colors.text.primary }]}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={[styles.phone, { color: colors.text.secondary }]}>
          📞 {user.phoneNumber}
        </Text>
      </View>
      <Pressable onPress={onClear}>
        <Text style={[styles.changeText, { color: colors.primary.main }]}>
          Changer de client
        </Text>
      </Pressable>
    </View>
  );
};
