import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isLoading: boolean;
  isFetching: boolean;
}

const styles = StyleSheet.create({
  input: {},
});

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  isLoading,
  isFetching,
}) => {
  const { colors } = useAppTheme();

  return (
    <TextInput
      placeholder="Numéro de téléphone (min. 3 chiffres)..."
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, { backgroundColor: colors.background.card }]}
      left={<TextInput.Icon icon="magnify" />}
      right={
        isLoading || isFetching ? (
          <TextInput.Icon
            icon={() => (
              <ActivityIndicator size={20} color={colors.primary.main} />
            )}
          />
        ) : null
      }
      keyboardType="phone-pad"
    />
  );
};
