import React from "react";
import { TextInput } from "react-native-paper";
import { createStyles } from "./UserSearchInput.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface UserSearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
}

export const UserSearchInput: React.FC<UserSearchInputProps> = ({
  value,
  onChangeText,
  label = "Rechercher un client",
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <TextInput
      label={label}
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default UserSearchInput;
