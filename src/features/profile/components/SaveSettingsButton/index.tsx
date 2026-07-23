/**
 * SaveSettingsButton Component
 * Save action button for settings screens
 */

import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS } from "@src/shared/ui/designLanguage";

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
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: RADIUS.control,
        },
        buttonContent: {
          paddingVertical: 8,
        },
      }),
    []
  );

  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={styles.button}
      contentStyle={styles.buttonContent}
      buttonColor={colors.primary.main}
    >
      {label}
    </Button>
  );
};
