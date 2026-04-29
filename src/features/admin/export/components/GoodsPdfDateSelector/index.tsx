import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { format } from "date-fns/format";
import { styles } from "./GoodsPdfDateSelector.styles";

interface GoodsPdfDateSelectorProps {
  start: string | null;
  end: string | null;
  onOpenPicker: () => void;
  onClear: () => void;
}

export const GoodsPdfDateSelector: React.FC<GoodsPdfDateSelectorProps> = ({
  start,
  end,
  onOpenPicker,
  onClear,
}) => {
  const fmt = (d: string) => format(new Date(d), "dd/MM/yyyy");

  return (
    <View>
      <Text style={styles.label}>Période d'export</Text>
      {start && end ? (
        <Chip icon="calendar" onClose={onClear} style={styles.chip}>
          {fmt(start)} - {fmt(end)}
        </Chip>
      ) : (
        <TouchableOpacity style={styles.dateBtn} onPress={onOpenPicker}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={Theme.primary[500]}
          />
          <Text style={styles.dateBtnText}>Choisir une période</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
