import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface ManualOrderSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const ManualOrderSearchBar: React.FC<ManualOrderSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Rechercher (nom, code, téléphone)...",
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="magnify"
        size={24}
        iconColor={COLORS.grey}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
      />
      {value.length > 0 && (
        <IconButton
          icon="close"
          size={20}
          iconColor={COLORS.grey}
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.lightBackground || "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  icon: {
    margin: 0,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.black,
  },
});
