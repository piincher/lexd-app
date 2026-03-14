/**
 * SaveSettingsButton Component
 * Save action button for settings screens
 */

import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { COLORS } from "@src/constants/Colors";

interface SaveSettingsButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
}

export const SaveSettingsButton: React.FC<SaveSettingsButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
  label = "Save Settings",
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={styles.button}
      contentStyle={styles.buttonContent}
      buttonColor={COLORS.primary}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
