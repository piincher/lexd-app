import React from "react";
import { Text, TextInput } from "react-native-paper";

import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ExportDataModal.styles";

interface ReasonSectionProps {
  reason: string;
  onChange: (reason: string) => void;
  onInputFocus?: () => void;
}

export const ReasonSection: React.FC<ReasonSectionProps> = ({ reason, onChange, onInputFocus }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Reason (Optional)
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Purpose of this export"
        value={reason}
        onChangeText={onChange}
        style={styles.input}
        multiline
        numberOfLines={2}
        onFocus={onInputFocus}
      />
    </>
  );
};
