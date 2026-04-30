import React from "react";
import { Text, TextInput } from "react-native-paper";

import { styles } from "./ExportDataModal.styles";

interface ReasonSectionProps {
  reason: string;
  onChange: (reason: string) => void;
}

export const ReasonSection: React.FC<ReasonSectionProps> = ({ reason, onChange }) => (
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
    />
  </>
);
