import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, TextInput, Menu, IconButton, Divider } from "react-native-paper";

import { ExportEntity } from "../../types";
import { STATUS_OPTIONS } from "./exportModalConstants";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ExportDataModal.styles";

interface StatusPickerProps {
  entity: ExportEntity;
  value: string;
  onSelect: (value: string) => void;
  onInputFocus?: () => void;
}

export const StatusPicker: React.FC<StatusPickerProps> = ({ entity, value, onSelect, onInputFocus }) => {
  const [visible, setVisible] = useState(false);
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const options = STATUS_OPTIONS[entity] || [];
  const selectedLabel = options.find((o) => o.value === value)?.label || (value ? value : "All Statuses");

  if (options.length === 0) {
    return (
      <TextInput
        mode="outlined"
        placeholder="e.g., COMPLETED, PENDING"
        value={value}
        onChangeText={onSelect}
        style={styles.input}
        onFocus={onInputFocus}
      />
    );
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.statusPicker} activeOpacity={0.8}>
          <Text variant="bodyMedium" style={value ? styles.statusPickerValue : styles.statusPickerPlaceholder}>
            {selectedLabel}
          </Text>
          <IconButton icon="chevron-down" size={20} style={{ margin: 0 }} />
        </TouchableOpacity>
      }
    >
      <Menu.Item
        onPress={() => { onSelect(""); setVisible(false); }}
        title="All Statuses"
        trailingIcon={value === "" ? "check" : undefined}
      />
      <Divider />
      {options.map((option) => (
        <Menu.Item
          key={option.value}
          onPress={() => { onSelect(option.value); setVisible(false); }}
          title={option.label}
          trailingIcon={value === option.value ? "check" : undefined}
        />
      ))}
    </Menu>
  );
};
