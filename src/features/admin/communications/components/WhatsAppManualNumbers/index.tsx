import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./WhatsAppManualNumbers.styles";

interface WhatsAppManualNumbersProps {
  numbers: string[];
  /** Returns true if the number was accepted (valid + not a duplicate). */
  onAddNumber: (raw: string) => boolean;
  onRemoveNumber: (value: string) => void;
}

export const WhatsAppManualNumbers: React.FC<WhatsAppManualNumbersProps> = ({
  numbers,
  onAddNumber,
  onRemoveNumber,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const accepted = onAddNumber(value);
    if (accepted) setValue("");
  };

  const canAdd = value.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numéros manuels (optionnel)</Text>

      <View style={styles.inputRow}>
        <TextInput
          mode="outlined"
          dense
          placeholder="+223 70 00 00 00"
          value={value}
          onChangeText={setValue}
          keyboardType="phone-pad"
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          left={<TextInput.Icon icon="phone-plus" />}
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.addButton, !canAdd && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={!canAdd}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {numbers.length > 0 && (
        <View style={styles.chipsWrap}>
          {numbers.map((num) => (
            <View key={num} style={styles.chip}>
              <Text style={styles.chipText}>{num}</Text>
              <TouchableOpacity onPress={() => onRemoveNumber(num)} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={16} color={colors.primary[600]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default WhatsAppManualNumbers;
