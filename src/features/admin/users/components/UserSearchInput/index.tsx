import React from "react";
import { TextInput } from "react-native-paper";
import { styles } from "./UserSearchInput.styles";

interface UserSearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
}

export const UserSearchInput: React.FC<UserSearchInputProps> = ({
  value,
  onChangeText,
  label = "Rechercher un client",
}) => (
  <TextInput
    label={label}
    style={styles.input}
    onChangeText={onChangeText}
    value={value}
  />
);

export default UserSearchInput;
