import React from "react";
import { Text, RadioButton } from "react-native-paper";

import { ExportFormat } from "../../types";
import { EXPORT_FORMATS } from "./exportModalConstants";
import { styles } from "./ExportDataModal.styles";

interface FormatSectionProps {
  format: ExportFormat;
  onChange: (format: ExportFormat) => void;
}

export const FormatSection: React.FC<FormatSectionProps> = ({ format, onChange }) => (
  <>
    <Text variant="titleMedium" style={styles.sectionTitle}>
      Export Format
    </Text>
    <RadioButton.Group
      onValueChange={(value) => onChange(value as ExportFormat)}
      value={format}
    >
      {EXPORT_FORMATS.map((f) => (
        <RadioButton.Item
          key={f.value}
          label={f.label}
          value={f.value}
          position="leading"
        />
      ))}
    </RadioButton.Group>
  </>
);
